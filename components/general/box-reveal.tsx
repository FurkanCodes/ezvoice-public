import { CheckCircle } from "lucide-react";
import { BoxReveal } from "../magicui/box-reveal";
import { RainbowButton } from "../magicui/rainbow-button";

export function HeroBoxReveal() {
  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <div className="text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl">
            <span className="block">Simplify your</span>
            <span className="block text-primary mt-2">invoicing process</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:mt-5 sm:text-xl">Streamline your billing, get paid faster, and manage finances with ease.</p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <div className="mt-8 space-y-4">
          <p className="text-lg text-muted-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Professional invoice templates
          </p>
          <p className="text-lg text-muted-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Automated payment reminders
          </p>
          <p className="text-lg text-muted-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Real-time payment tracking
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
        <div className="mt-8 flex gap-4">
          <RainbowButton className="bg-primary hover:bg-primary/90">Get Started Free</RainbowButton>
        </div>
      </BoxReveal>
    </div>
  );
}
