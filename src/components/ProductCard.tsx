import { useDustid } from "@/context/DustidContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useDustid();

  const colors = [
    "from-lavender/60 to-lavender/20",
    "from-primary/10 to-lavender/30",
    "from-muted to-lavender/20",
    "from-accent/40 to-muted",
  ];

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div
          className={`flex h-56 items-center justify-center bg-gradient-to-br ${colors[product.id % colors.length]} cursor-pointer`}
        >
          <span className="font-heading text-4xl opacity-60">🎁</span>
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs font-medium text-muted-foreground">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 font-heading text-base font-semibold text-foreground hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">£{product.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={() =>
              addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
            }
          >
            <ShoppingBag className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
