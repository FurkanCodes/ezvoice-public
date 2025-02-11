"use client";

import { CheckCircle, Clock, DollarSign, PieChart } from "lucide-react";
import { useTheme } from "next-themes";
import { MagicCard } from "../magicui/magic-card";

const features = [
  {
    name: "Easy Invoice Creation",
    description: "Create professional invoices in minutes with our intuitive interface.",
    icon: CheckCircle,
  },
  {
    name: "Automated Reminders",
    description: "Set up automatic payment reminders to improve cash flow.",
    icon: Clock,
  },
  {
    name: "Multiple Payment Options",
    description: "Accept various payment methods to make it convenient for your clients.",
    icon: DollarSign,
  },
  {
    name: "Insightful Reports",
    description: "Generate detailed financial reports to track your business performance.",
    icon: PieChart,
  },
];

export default function Features() {
  const { theme } = useTheme();

  return (
    <div className="py-12 bg-card" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">Everything you need to manage your invoices</p>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">Our invoicing application provides powerful tools...</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <MagicCard key={feature.name} className="cursor-pointer p-6 shadow-2xl hover:shadow-foreground/10 transition-shadow" gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}>
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16 space-y-2">
                  <h3 className="text-lg font-medium text-foreground">{feature.name}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </div>
  );
}
