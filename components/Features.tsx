import { CheckCircle, Clock, DollarSign, PieChart } from "lucide-react";

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
  return (
    <div className="py-12 bg-card" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-accent font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">Everything you need to manage your invoices</p>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">Our invoicing application provides powerful tools...</p>
        </div>
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-accent text-accent-foreground">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-foreground">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
