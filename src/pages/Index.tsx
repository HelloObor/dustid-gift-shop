import { Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDustid } from "@/context/DustidContext";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Index = () => {
  const { openAuthModal, selectedContact } = useDustid();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-background via-lavender/20 to-background py-20">
        <div className="container grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Thoughtful gifts,
              <br />
              delivered with <span className="text-primary">ease</span>
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              Browse curated gifts and send them directly to your loved ones — no address needed.
            </p>
          </div>

          {/* Dustid Widget */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-sm rounded-2xl bg-lavender p-8 shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
                <Gift className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Send gifts using your Dustid contacts
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Connect your Dustid address book and we'll handle the delivery details.
              </p>
              {selectedContact ? (
                <div className="mt-6 rounded-lg bg-background/70 p-3 text-sm">
                  <span className="text-muted-foreground">Shopping for </span>
                  <strong className="text-foreground">{selectedContact.name}</strong>
                </div>
              ) : (
                <Button className="mt-6 w-full h-12 text-base font-semibold gap-2" onClick={openAuthModal}>
                  Connect with Dustid <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container py-16">
        <h2 className="font-heading text-2xl font-bold text-foreground">Curated Gifts</h2>
        <p className="mt-1 text-muted-foreground">Perfect presents for every occasion</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
