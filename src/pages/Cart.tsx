import { useDustid } from "@/context/DustidContext";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, Gift, ArrowRight, Plus, Minus } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, addToCart, selectedContact, openAuthModal } = useDustid();
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center gap-4 py-32 text-center animate-fade-in">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
        <h2 className="font-heading text-2xl font-semibold text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground">Browse our collection and add some gifts.</p>
        <Link to="/collection">
          <Button className="mt-2 gap-2">
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10 animate-fade-in">
      <h1 className="font-heading text-2xl font-bold text-foreground">Shopping Cart</h1>
      <p className="mt-1 text-sm text-muted-foreground">{cart.reduce((s, i) => s + i.quantity, 0)} items</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Cart Items */}
        <div className="lg:col-span-3 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-foreground truncate">{item.name}</p>
                <p className="text-sm text-muted-foreground">£{item.price.toFixed(2)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      onClick={() => item.quantity > 1 ? null : removeFromCart(item.id)}
                      className="p-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                      className="p-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">£{(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="mt-2 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-4">
          {/* Dustid connect card */}
          {!selectedContact && (
            <div className="rounded-xl border border-lavender bg-lavender/15 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lavender">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    Send this order as a gift using Dustid
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Connect your address book and we'll deliver directly.
                  </p>
                  <Button size="sm" className="mt-3 gap-2" onClick={openAuthModal}>
                    Connect to Dustid <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-heading font-semibold text-foreground">Order Summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-base font-bold text-foreground">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>

            {selectedContact && (
              <div className="mt-4 rounded-lg bg-lavender/20 border border-lavender px-3 py-2 text-sm">
                <span className="text-muted-foreground">Gift will be delivered to </span>
                <strong className="text-foreground">{selectedContact.name}</strong>
              </div>
            )}

            <Button
              className="mt-4 w-full h-12 text-base font-semibold"
              onClick={() => navigate("/checkout")}
              disabled={!selectedContact}
            >
              {selectedContact ? "Proceed to Checkout" : "Connect Dustid to continue"}
            </Button>

            {!selectedContact && (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Connect Dustid to set a delivery address
              </p>
            )}
          </div>

          <Link to="/collection" className="block">
            <Button variant="ghost" className="w-full gap-2 text-muted-foreground">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
