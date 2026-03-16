import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Contact {
  name: string;
  address: {
    line1: string;
    city: string;
    country: string;
  };
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface DustidState {
  isAuthenticated: boolean;
  selectedContact: Contact | null;
  contacts: Contact[];
  cart: CartItem[];
  showAuthModal: boolean;
  authStep: "input" | "otp" | "select";
  orderPlaced: boolean;
}

interface DustidContextType extends DustidState {
  openAuthModal: () => void;
  openRecipientPicker: () => void;
  closeAuthModal: () => void;
  setAuthStep: (step: DustidState["authStep"]) => void;
  authenticate: () => void;
  selectContact: (contact: Contact) => void;
  clearContact: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  placeOrder: () => void;
  resetOrder: () => void;
}

const DustidContext = createContext<DustidContextType | null>(null);

const CONTACTS: Contact[] = [
  { name: "Sarah", address: { line1: "221 Baker Street", city: "London", country: "United Kingdom" } },
  { name: "John", address: { line1: "42 Elm Avenue", city: "Manchester", country: "United Kingdom" } },
  { name: "Mum", address: { line1: "7 Rose Lane", city: "Edinburgh", country: "United Kingdom" } },
  { name: "Alex", address: { line1: "15 King's Road", city: "Brighton", country: "United Kingdom" } },
];

export function DustidProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DustidState>({
    isAuthenticated: false,
    selectedContact: null,
    contacts: CONTACTS,
    cart: [],
    showAuthModal: false,
    authStep: "input",
    orderPlaced: false,
  });

  const openAuthModal = () => setState((s) => ({ ...s, showAuthModal: true, authStep: "input" }));
  const openRecipientPicker = () => setState((s) => ({ ...s, showAuthModal: true, authStep: "select" }));
  const closeAuthModal = () => setState((s) => ({ ...s, showAuthModal: false }));
  const setAuthStep = (step: DustidState["authStep"]) => setState((s) => ({ ...s, authStep: step }));
  const authenticate = () => setState((s) => ({ ...s, isAuthenticated: true, authStep: "select" }));
  const selectContact = (contact: Contact) =>
    setState((s) => ({ ...s, selectedContact: contact, showAuthModal: false }));
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
  const resetOrder = () =>
    setState((s) => ({ ...s, orderPlaced: false, selectedContact: null, isAuthenticated: false }));

  return (
    <DustidContext.Provider
      value={{
        ...state,
        openAuthModal,
        openRecipientPicker,
        closeAuthModal,
        setAuthStep,
        authenticate,
        selectContact,
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
