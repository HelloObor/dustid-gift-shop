import { useState } from "react";
import { useDustid } from "@/context/DustidContext";
import { Gift, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthModal() {
  const { showAuthModal, authStep, closeAuthModal, setAuthStep, authenticate, selectContact, contacts } = useDustid();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  if (!showAuthModal) return null;

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const next = [...otpValues];
    next[index] = value;
    setOtpValues(next);
    if (value && index < 5) {
      const el = document.getElementById(`otp-${index + 1}`);
      el?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-xl bg-card p-8 shadow-2xl animate-fade-in">
        <button onClick={closeAuthModal} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender">
            <Gift className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-heading text-xl font-semibold">
            {authStep === "input" && "Connect with Dustid"}
            {authStep === "otp" && "Verify your identity"}
            {authStep === "select" && "Who are you shopping for?"}
          </h2>
          <p className="text-sm text-muted-foreground text-center">
            {authStep === "input" && "Enter your phone number or email to get started."}
            {authStep === "otp" && "We sent a 6-digit code to your device."}
            {authStep === "select" && "Choose a contact from your Dustid address book."}
          </p>
        </div>

        {/* Step: Input */}
        {authStep === "input" && (
          <div className="space-y-4">
            <Input placeholder="Phone number or email" className="h-12" />
            <Button className="w-full h-12 text-base font-semibold" onClick={() => setAuthStep("otp")}>
              Send OTP
            </Button>
          </div>
        )}

        {/* Step: OTP */}
        {authStep === "otp" && (
          <div className="space-y-5">
            <div className="flex justify-center gap-2">
              {otpValues.map((v, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={v}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="h-12 w-12 rounded-lg border border-input bg-background text-center text-lg font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                />
              ))}
            </div>
            <Button className="w-full h-12 text-base font-semibold" onClick={() => authenticate()}>
              Verify
            </Button>
            <button
              onClick={() => setAuthStep("input")}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mx-auto"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          </div>
        )}

        {/* Step: Select */}
        {authStep === "select" && (
          <div className="space-y-2">
            {contacts.map((c) => (
              <button
                key={c.name}
                onClick={() => selectContact(c)}
                className="flex w-full items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:border-primary hover:bg-lavender/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender font-heading text-sm font-semibold text-primary">
                  {c.name[0]}
                </div>
                <div>
                  <div className="font-medium text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.address.city}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
