import { useDustid } from "@/context/DustidContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Gift } from "lucide-react";
import { Link } from "react-router-dom";

export default function Success() {
  const { resetOrder, selectedContact } = useDustid();
  const recipientName = selectedContact?.name ?? "your recipient";

  return (
    <div className="flex min-h-[80vh] items-center justify-center animate-fade-in">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-lavender">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Order placed successfully</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Gift will be delivered to <strong className="text-foreground">{recipientName}</strong>
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-lavender px-4 py-1.5 text-sm font-medium text-primary">
          <Gift className="h-4 w-4" /> Address provided by Dustid
        </div>
        <div className="mt-8">
          <Link to="/" onClick={resetOrder}>
            <Button variant="outline" className="h-12 px-8 text-base">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
