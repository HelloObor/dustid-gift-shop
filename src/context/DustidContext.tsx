import { createContext, useContext, useState, type ReactNode } from "react";
import {
  getApiErrorMessage,
  getFriendDetails,
  getProfile,
  normalizePhoneNumber,
  requestOtp as sendOtpRequest,
  searchContacts as searchDustidContacts,
  validateOtp,
  type DustidFriend,
  type DustidFriendSummary,
} from "@/lib/dustid-api";

export type Contact = DustidFriend;
export type ContactSummary = DustidFriendSummary;

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface DustidState {
  isAuthenticated: boolean;
  authToken: string | null;
  pendingPhoneNumber: string;
  verifiedPhoneNumber: string | null;
  profileName: string | null;
  selectedContact: Contact | null;
  contacts: ContactSummary[];
  cart: CartItem[];
  showAuthModal: boolean;
  authStep: "input" | "otp" | "select";
  orderPlaced: boolean;
  isAuthLoading: boolean;
  isContactsLoading: boolean;
  authError: string | null;
}

interface DustidContextType extends DustidState {
  openAuthModal: () => void;
  openRecipientPicker: () => void;
  closeAuthModal: () => void;
  setAuthStep: (step: DustidState["authStep"]) => void;
  requestOtp: (phoneNumber: string) => Promise<{ message: string; otp?: string }>;
  authenticate: (otp: string) => Promise<void>;
  searchContacts: (query?: string) => Promise<void>;
  selectContact: (friendId: string) => Promise<void>;
  clearAuthError: () => void;
  clearContact: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  placeOrder: () => void;
  resetOrder: () => void;
}

const DustidContext = createContext<DustidContextType | null>(null);

export function DustidProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DustidState>({
    isAuthenticated: false,
    authToken: null,
    pendingPhoneNumber: "",
    verifiedPhoneNumber: null,
    profileName: null,
    selectedContact: null,
    contacts: [],
    cart: [],
    showAuthModal: false,
    authStep: "input",
    orderPlaced: false,
    isAuthLoading: false,
    isContactsLoading: false,
    authError: null,
  });

  const openAuthModal = () => {
    const nextStep = state.isAuthenticated ? "select" : "input";
    setState((s) => ({ ...s, showAuthModal: true, authStep: nextStep, authError: null }));

    if (state.isAuthenticated) {
      void searchContacts("");
    }
  };

  const openRecipientPicker = () => {
    if (!state.isAuthenticated) {
      openAuthModal();
      return;
    }

    setState((s) => ({ ...s, showAuthModal: true, authStep: "select", authError: null }));
    void searchContacts("");
  };

  const closeAuthModal = () => setState((s) => ({ ...s, showAuthModal: false, authError: null }));
  const clearAuthError = () => setState((s) => ({ ...s, authError: null }));
  const setAuthStep = (step: DustidState["authStep"]) => setState((s) => ({ ...s, authStep: step, authError: null }));

  const requestOtp = async (phoneNumber: string) => {
    const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

    if (!normalizedPhoneNumber) {
      const message = "Enter a valid phone number to continue.";
      setState((s) => ({ ...s, authError: message }));
      throw new Error(message);
    }

    setState((s) => ({
      ...s,
      isAuthLoading: true,
      authError: null,
      pendingPhoneNumber: normalizedPhoneNumber,
    }));

    try {
      const response = await sendOtpRequest(normalizedPhoneNumber);
      setState((s) => ({ ...s, isAuthLoading: false, authStep: "otp" }));
      return response;
    } catch (error) {
      const message = getApiErrorMessage(error, "We couldn't send the OTP.");
      setState((s) => ({ ...s, isAuthLoading: false, authError: message }));
      throw error;
    }
  };

  const authenticate = async (otp: string) => {
    if (!state.pendingPhoneNumber) {
      const message = "Request an OTP before verifying your number.";
      setState((s) => ({ ...s, authError: message }));
      throw new Error(message);
    }

    setState((s) => ({ ...s, isAuthLoading: true, authError: null }));

    try {
      const { token } = await validateOtp(state.pendingPhoneNumber, otp);
      const profileResponse = await getProfile(state.pendingPhoneNumber);
      const resultsResponse = await searchDustidContacts(state.pendingPhoneNumber, token, "");

      setState((s) => ({
        ...s,
        isAuthenticated: true,
        authToken: token,
        verifiedPhoneNumber: state.pendingPhoneNumber,
        profileName: profileResponse.contact.name,
        contacts: resultsResponse.results,
        isAuthLoading: false,
        authStep: "select",
        authError: null,
      }));
    } catch (error) {
      const message = getApiErrorMessage(error, "We couldn't verify that OTP.");
      setState((s) => ({ ...s, isAuthLoading: false, authError: message }));
      throw error;
    }
  };

  const searchContacts = async (query = "") => {
    if (!state.authToken || !state.verifiedPhoneNumber) {
      return;
    }

    setState((s) => ({ ...s, isContactsLoading: true, authError: null }));

    try {
      const response = await searchDustidContacts(state.verifiedPhoneNumber, state.authToken, query);
      setState((s) => ({ ...s, contacts: response.results, isContactsLoading: false }));
    } catch (error) {
      const message = getApiErrorMessage(error, "We couldn't load your contacts.");
      setState((s) => ({ ...s, isContactsLoading: false, authError: message }));
      throw error;
    }
  };

  const selectContact = async (friendId: string) => {
    if (!state.authToken) {
      const message = "Connect to Dustid before picking a recipient.";
      setState((s) => ({ ...s, authError: message }));
      throw new Error(message);
    }

    setState((s) => ({ ...s, isContactsLoading: true, authError: null }));

    try {
      const contact = await getFriendDetails(friendId, state.authToken);
      setState((s) => ({
        ...s,
        selectedContact: contact,
        showAuthModal: false,
        isContactsLoading: false,
      }));
    } catch (error) {
      const message = getApiErrorMessage(error, "We couldn't load that recipient.");
      setState((s) => ({ ...s, isContactsLoading: false, authError: message }));
      throw error;
    }
  };

  const clearContact = () => setState((s) => ({ ...s, selectedContact: null }));

  const addToCart = (item: Omit<CartItem, "quantity">) =>
    setState((s) => {
      const existing = s.cart.find((c) => c.id === item.id);
      if (existing) {
        return { ...s, cart: s.cart.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)) };
      }
      return { ...s, cart: [...s.cart, { ...item, quantity: 1 }] };
    });

  const removeFromCart = (id: number) => setState((s) => ({ ...s, cart: s.cart.filter((c) => c.id !== id) }));
  const placeOrder = () => setState((s) => ({ ...s, orderPlaced: true, cart: [] }));
  const resetOrder = () => setState((s) => ({ ...s, orderPlaced: false, selectedContact: null }));

  return (
    <DustidContext.Provider
      value={{
        ...state,
        openAuthModal,
        openRecipientPicker,
        closeAuthModal,
        setAuthStep,
        requestOtp,
        authenticate,
        searchContacts,
        selectContact,
        clearAuthError,
        clearContact,
        addToCart,
        removeFromCart,
        placeOrder,
        resetOrder,
      }}
    >
      {children}
    </DustidContext.Provider>
  );
}

export function useDustid() {
  const ctx = useContext(DustidContext);
  if (!ctx) throw new Error("useDustid must be used within DustidProvider");
  return ctx;
}
