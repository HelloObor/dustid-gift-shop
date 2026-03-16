import { useDustid } from "@/context/DustidContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Lock, ChevronRight, CreditCard } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Checkout() {
  const { selectedContact, cart, placeOrder } = useDustid();
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    placeOrder();
    navigate("/success");
  };

  if (!selectedContact) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-[80vh] bg-muted/30 animate-fade-in">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="container flex items-center gap-2 py-3 text-sm text-muted-foreground">
          <Link to="/cart" className="hover:text-foreground transition-colors">Cart</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Checkout</span>
        </div>
      </div>

      <div className="container max-w-5xl py-10">
        <h1 className="font-heading text-2xl font-bold text-foreground">Checkout</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          {/* Left – Forms */}
          <div className="lg:col-span-3 space-y-6">
            {/* Shipping Address */}
            <div className="rounded-xl border border-lavender bg-card p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-heading font-semibold text-foreground">Shipping Address</h3>
                </div>
                <span className="rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-primary">
                  Provided by Dustid
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Recipient</label>
                  <Input value={selectedContact.name} disabled className="mt-1 bg-lavender/20 text-foreground font-medium border-lavender" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Address</label>
                  <Input value={selectedContact.address.line1} disabled className="mt-1 bg-lavender/20 text-foreground border-lavender" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">City</label>
                    <Input value={selectedContact.address.city} disabled className="mt-1 bg-lavender/20 text-foreground border-lavender" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Country</label>
                    <Input value={selectedContact.address.country} disabled className="mt-1 bg-lavender/20 text-foreground border-lavender" />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Address provided by Dustid — the recipient's details are kept private.
              </p>
            </div>

            {/* Contact Info */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">Contact Information</h3>
              <Input placeholder="Email for order confirmation" className="h-12" defaultValue="you@example.com" />
            </div>

            {/* Payment */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-5 flex items-center gap-2">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-heading font-semibold text-foreground">Payment</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Card Number</label>
                  <div className="relative mt-1">
                    <Input placeholder="1234 5678 9012 3456" className="h-12 pr-10" defaultValue="4242 4242 4242 4242" />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Expiry</label>
                    <Input placeholder="MM / YY" className="mt-1 h-12" defaultValue="12/28" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">CVC</label>
                    <Input placeholder="123" className="mt-1 h-12" defaultValue="123" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right – Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading font-semibold text-foreground">Order Summary</h3>
              <div className="mt-4 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-lavender/20 border border-lavender px-3 py-2.5 text-sm text-center">
                <span className="text-muted-foreground">Gift for </span>
                <strong className="text-foreground">{selectedContact.name}</strong>
              </div>

              <Button className="mt-4 w-full h-13 text-base font-semibold" onClick={handlePlaceOrder}>
                Place Order — £{total.toFixed(2)}
              </Button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Your payment information is encrypted and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
