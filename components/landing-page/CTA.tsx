import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <div className="bg-primary">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl">
          <span className="block">Ready to simplify your invoicing?</span>
          <span className="block">Start your free trial today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-primary/80">Join thousands of businesses...</p>
        <Button size="lg" variant="outline" className="mt-8 bg-background text-primary hover:bg-primary/10">
          Get started for free
        </Button>
      </div>
    </div>
  );
}
