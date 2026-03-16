import { useDustid } from "@/context/DustidContext";
import { ChevronDown } from "lucide-react";

export default function DustidBanner() {
  const { selectedContact, openRecipientPicker } = useDustid();

  if (!selectedContact) return null;

  return (
    <div className="sticky top-0 z-50 flex items-center justify-center gap-3 bg-lavender px-4 py-2.5 text-sm font-medium text-lavender-foreground">
      <span>
        Shopping for <strong>{selectedContact.name}</strong>
      </span>
      <button
        onClick={openRecipientPicker}
        className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
      >
        Change Recipient <ChevronDown className="h-3 w-3" />
      </button>
    </div>
  );
}
