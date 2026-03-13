import { useDustid } from "@/context/DustidContext";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, Gift, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, selectedContact, openAuthModal } = useDustid();
  const navigate = useNavigate();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center gap-4 py-32 text-center animate-fade-in">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
        <h2 className="font-heading text-2xl font-semibold text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some gifts to get started.</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-12 animate-fade-in">
      <h1 className="font-heading text-2xl font-bold text-foreground">Your Cart</h1>
      <div className="mt-8 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-lavender/50 text-2xl">🎁</div>
              <div>
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-foreground">£{(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dustid connect card - shown when not connected */}
      {!selectedContact && (
        <div className="mt-6 rounded-xl border border-lavender bg-lavender/20 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lavender">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground">
                Send this order as a gift using Dustid
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Connect your Dustid address book and we'll deliver directly to your recipient.
              </p>
              <Button className="mt-3 gap-2" onClick={openAuthModal}>
                Connect to Dustid <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <div className="flex justify-between text-lg font-semibold text-foreground">
          <span>Total</span>
          <span>£{total.toFixed(2)}</span>
        </div>
        {selectedContact && (
          <p className="mt-2 text-sm text-muted-foreground">
            Gift will be delivered to <strong className="text-foreground">{selectedContact.name}</strong>
          </p>
        )}
        <Button
          className="mt-4 w-full h-12 text-base font-semibold"
          onClick={() => navigate("/checkout")}
          disabled={!selectedContact}
        >
          {selectedContact ? "Proceed to Checkout" : "Connect Dustid to continue"}
        </Button>
      </div>
    </div>
  );
}
