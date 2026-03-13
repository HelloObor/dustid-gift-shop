import { Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDustid } from "@/context/DustidContext";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Link } from "react-router-dom";

export default function Collection() {
  const { openAuthModal, selectedContact } = useDustid();

  return (
    <div className="animate-fade-in">
      <section className="container py-12">
        {/* Dustid Banner */}
        {!selectedContact && (
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-lavender/40 border border-lavender px-6 py-4">
            <div className="flex items-center gap-3">
              <Gift className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm font-medium text-foreground">
                Shopping for someone? Send gifts easily using Dustid.
              </p>
            </div>
            <Button size="sm" onClick={openAuthModal} className="gap-2 shrink-0">
              Connect Dustid <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}

        <h1 className="font-heading text-3xl font-bold text-foreground">All Gifts</h1>
        <p className="mt-1 text-muted-foreground">Browse our full collection of curated gifts</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
