import { useDustid } from "@/context/DustidContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useDustid();

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/20">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1.5 font-heading text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">£{product.price.toFixed(2)}</span>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() =>
              addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
            }
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
