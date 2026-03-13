import { useDustid } from "@/context/DustidContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { selectedContact, cart, placeOrder } = useDustid();
  const navigate = useNavigate();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = 4.99;

  const handlePlaceOrder = () => {
    placeOrder();
    navigate("/success");
  };

  if (!selectedContact) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-[80vh] bg-checkout animate-fade-in">
      <div className="container max-w-5xl py-12">
        <h1 className="font-heading text-2xl font-bold text-foreground">Checkout</h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-5">
          {/* Left – Shipping */}
          <div className="lg:col-span-3 space-y-8">
            {/* Shipping Address */}
            <div className="rounded-xl border border-lavender bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold text-foreground">Shipping Address</h3>
                <span className="ml-auto rounded-full bg-lavender px-3 py-0.5 text-xs font-semibold text-primary">
                  Address provided by Dustid
                </span>
              </div>
              <div className="space-y-3">
                <Input value={selectedContact.name} disabled className="bg-lavender/30 text-foreground font-medium border-lavender" />
                <Input value={selectedContact.address.line1} disabled className="bg-lavender/30 text-foreground border-lavender" />
                <Input value={selectedContact.address.city} disabled className="bg-lavender/30 text-foreground border-lavender" />
                <Input value={selectedContact.address.country} disabled className="bg-lavender/30 text-foreground border-lavender" />
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-heading font-semibold text-foreground">Payment</h3>
              </div>
              <div className="space-y-3">
                <Input placeholder="Card number" className="h-12" defaultValue="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="MM / YY" className="h-12" defaultValue="12/28" />
                  <Input placeholder="CVC" className="h-12" defaultValue="123" />
                </div>
              </div>
            </div>
          </div>

          {/* Right – Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading font-semibold text-foreground">Order Summary</h3>
              <div className="mt-4 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-foreground">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">£{shipping.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span>£{(total + shipping).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button className="mt-6 w-full h-12 text-base font-semibold" onClick={handlePlaceOrder}>
                Place Order
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Gift will be delivered to {selectedContact.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
