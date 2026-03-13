import { Link } from "react-router-dom";
import { ShoppingBag, Gift } from "lucide-react";
import { useDustid } from "@/context/DustidContext";

export default function Navbar() {
  const { cart } = useDustid();
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
          <Gift className="h-6 w-6 text-primary" />
          GiftStore
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Shop
          </Link>
          <Link to="/cart" className="relative text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
