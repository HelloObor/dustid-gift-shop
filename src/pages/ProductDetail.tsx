import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Gift, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDustid } from "@/context/DustidContext";
import { products } from "@/data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openAuthModal, selectedContact } = useDustid();
  const [giftMode, setGiftMode] = useState(false);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === Number(id));
  if (!product) {
    return (
      <div className="container py-32 text-center">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Product not found</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/collection")}>
          Back to Collection
        </Button>
      </div>
    );
  }

  const colors = [
    "from-lavender/60 to-lavender/20",
    "from-primary/10 to-lavender/30",
    "from-muted to-lavender/20",
    "from-accent/40 to-muted",
  ];

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container max-w-5xl py-12 animate-fade-in">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Image */}
        <div className={`flex h-80 md:h-[28rem] items-center justify-center rounded-2xl bg-gradient-to-br ${colors[product.id % colors.length]}`}>
          <span className="text-7xl opacity-60">🎁</span>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground">{product.category}</p>
          <h1 className="mt-1 font-heading text-3xl font-bold text-foreground">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold text-foreground">£{product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            A carefully curated gift, perfect for any occasion. Each item is hand-selected for quality and thoughtfulness.
          </p>

          <Button className="mt-6 h-12 text-base font-semibold gap-2" onClick={handleAddToCart}>
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </>
            )}
          </Button>

          {/* Dustid Gift Option */}
          <div className="mt-6 rounded-xl border border-lavender bg-lavender/20 p-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={giftMode}
                onChange={(e) => setGiftMode(e.target.checked)}
                className="h-4 w-4 rounded border-primary text-primary accent-primary"
              />
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Send this as a gift with Dustid</span>
              </div>
            </label>

            {giftMode && !selectedContact && (
              <Button
                size="sm"
                className="mt-3 gap-2"
                onClick={openAuthModal}
              >
                Connect Dustid <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            )}

            {giftMode && selectedContact && (
              <p className="mt-3 text-sm text-muted-foreground">
                Gift will be sent to <strong className="text-foreground">{selectedContact.name}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
