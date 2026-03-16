import { Link } from "react-router-dom";
import { Gift } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 mt-16">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
              <Gift className="h-5 w-5 text-primary" />
              GiftStore
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Curated gifts for every occasion. Send directly to your loved ones with Dustid.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground">Shop</h4>
            <ul className="mt-3 space-y-2">
              <li><Link to="/collection" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link to="/collection" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home & Living</Link></li>
              <li><Link to="/collection" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Wellness</Link></li>
              <li><Link to="/collection" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Food & Drink</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground">Help</h4>
            <ul className="mt-3 space-y-2">
              <li><span className="text-sm text-muted-foreground">Shipping & Returns</span></li>
              <li><span className="text-sm text-muted-foreground">FAQ</span></li>
              <li><span className="text-sm text-muted-foreground">Contact Us</span></li>
              <li><span className="text-sm text-muted-foreground">Track Order</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground">Dustid</h4>
            <ul className="mt-3 space-y-2">
              <li><span className="text-sm text-muted-foreground">About Dustid</span></li>
              <li><span className="text-sm text-muted-foreground">How It Works</span></li>
              <li><span className="text-sm text-muted-foreground">Privacy Policy</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 GiftStore. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Powered by Dustid</p>
        </div>
      </div>
    </footer>
  );
}
