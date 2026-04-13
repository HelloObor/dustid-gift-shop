import { useEffect, useState } from "react";
import { useDustid } from "@/context/DustidContext";
import { toast } from "@/components/ui/sonner";
import { Gift, X, ArrowLeft, Check, LoaderCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/dustid-api";

export default function AuthModal() {
  const {
    showAuthModal,
    authStep,
    closeAuthModal,
    setAuthStep,
    requestOtp,
    authenticate,
    selectContact,
    searchContacts,
    contacts,
    isAuthLoading,
    isContactsLoading,
    authError,
    profileName,
  } = useDustid();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!showAuthModal) {
      setOtpValues(["", "", "", "", "", ""]);
      setSelectedId(null);
      setSearchQuery("");
    }
  }, [showAuthModal]);

  if (!showAuthModal) return null;

  const handleOtpChange = (index: number, value: string) => {
    const nextValue = value.replace(/\D/g, "").slice(-1);
    const next = [...otpValues];
    next[index] = nextValue;
    setOtpValues(next);

    if (nextValue && index < 5) {
      const el = document.getElementById(`otp-${index + 1}`);
      el?.focus();
    }
  };

  const handleOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    event.preventDefault();
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((digit, index) => {
      next[index] = digit;
    });
    setOtpValues(next);
  };

  const handleSendOtp = async () => {
    try {
      const response = await requestOtp(phoneNumber);
      toast.success(response.otp ? `OTP sent. Dev code: ${response.otp}` : "OTP sent successfully.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to send OTP."));
    }
  };

  const handleVerifyCode = async () => {
    const otp = otpValues.join("");

    if (otp.length !== 6) {
      toast.error("Enter the 6-digit OTP to continue.");
      return;
    }

    try {
      await authenticate(otp);
      toast.success("Phone verified. Choose a recipient.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "The OTP could not be validated."));
    }
  };

  const handleConfirmRecipient = async () => {
    if (!selectedId) return;

    try {
      await selectContact(selectedId);
      toast.success("Recipient selected.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to load the recipient details."));
    }
  };

  const handleSearchChange = async (value: string) => {
    setSearchQuery(value);

    try {
      await searchContacts(value);
    } catch {
      // Inline error state is already shown in the modal.
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-xl bg-card p-8 shadow-2xl animate-fade-in">
        <button onClick={closeAuthModal} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender">
            <Gift className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-heading text-xl font-semibold">
            {authStep === "input" && "Connect with Dustid"}
            {authStep === "otp" && "Verify your identity"}
            {authStep === "select" && "Who are you shopping for?"}
          </h2>
          <p className="text-center text-sm text-muted-foreground">
            {authStep === "input" && "Enter your Dustid phone number to receive a one-time code."}
            {authStep === "otp" && "Enter the 6-digit code sent by the backend service."}
            {authStep === "select" && "Search your Dustid address book and load the delivery details."}
          </p>
        </div>

        {authError && (
          <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {authError}
          </div>
        )}

        {authStep === "input" && (
          <div className="space-y-4">
            <Input
              placeholder="254712345678"
              className="h-12"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button className="h-12 w-full text-base font-semibold" onClick={handleSendOtp} disabled={isAuthLoading}>
              {isAuthLoading ? (
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Sending OTP...
                </span>
              ) : (
                "Send OTP"
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              Demo tip: try a seeded number such as <code>254712345678</code>. In local development, the OTP is logged by the backend.
            </p>
          </div>
        )}

        {authStep === "otp" && (
          <div className="space-y-5">
            <div className="flex justify-center gap-2">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onPaste={handleOtpPaste}
                  className="h-12 w-12 rounded-lg border border-input bg-background text-center text-lg font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                />
              ))}
            </div>
            <Button className="h-12 w-full text-base font-semibold" onClick={handleVerifyCode} disabled={isAuthLoading}>
              {isAuthLoading ? (
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Verifying...
                </span>
              ) : (
                "Verify Code"
              )}
            </Button>
            <button
              onClick={() => setAuthStep("input")}
              className="mx-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          </div>
        )}

        {authStep === "select" && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => void handleSearchChange(e.target.value)}
                placeholder="Search by name or email"
                className="h-12 pl-9"
              />
            </div>

            {profileName && (
              <p className="text-xs text-muted-foreground">Signed in as <strong className="text-foreground">{profileName}</strong></p>
            )}

            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {isContactsLoading && (
                <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Loading contacts...
                </div>
              )}

              {!isContactsLoading && contacts.length === 0 && (
                <div className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                  No matching Dustid contacts were found.
                </div>
              )}

              {!isContactsLoading && contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedId(contact.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                    selectedId === contact.id
                      ? "border-primary bg-lavender/30"
                      : "border-border hover:border-primary hover:bg-lavender/20"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender font-heading text-sm font-semibold text-primary">
                    {contact.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-foreground">{contact.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{contact.email || "Dustid contact"}</div>
                  </div>
                  {selectedId === contact.id && <Check className="h-5 w-5 text-primary" />}
                </button>
              ))}
            </div>

            <Button
              className="h-12 w-full text-base font-semibold"
              disabled={!selectedId || isContactsLoading}
              onClick={handleConfirmRecipient}
            >
              {isContactsLoading ? "Loading recipient..." : "Confirm Recipient"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
