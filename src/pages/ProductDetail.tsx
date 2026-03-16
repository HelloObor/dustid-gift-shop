import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Gift, ShoppingBag, ArrowRight, Check, ChevronRight, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDustid } from "@/context/DustidContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openAuthModal, selectedContact } = useDustid();
  const [giftMode, setGiftMode] = useState(false);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

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

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container flex items-center gap-2 py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/collection" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container max-w-6xl py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{product.category}</p>
            <h1 className="mt-2 font-heading text-3xl font-bold text-foreground lg:text-4xl">{product.name}</h1>
            <p className="mt-4 text-2xl font-bold text-foreground">£{product.price.toFixed(2)}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Quantity</span>
              <div className="flex items-center rounded-lg border border-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-medium text-foreground">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button className="mt-6 h-13 text-base font-semibold gap-2" onClick={handleAddToCart}>
              {added ? (
                <><Check className="h-4 w-4" /> Added to Cart</>
              ) : (
                <><ShoppingBag className="h-4 w-4" /> Add to Cart — £{(product.price * qty).toFixed(2)}</>
              )}
            </Button>

            {/* Dustid Gift Option */}
            <div className="mt-6 rounded-xl border border-lavender bg-lavender/15 p-5">
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
                <Button size="sm" className="mt-3 gap-2" onClick={openAuthModal}>
                  Connect Dustid <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              )}
              {giftMode && selectedContact && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Gift will be sent to <strong className="text-foreground">{selectedContact.name}</strong>
                </p>
              )}
            </div>

            {/* Shipping Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 shrink-0" />
                <span>Free shipping on orders over £50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <RotateCcw className="h-4 w-4 shrink-0" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="font-heading text-2xl font-bold text-foreground">You may also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
