import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm backdrop-saturate-150 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 rounded-full border px-4 py-2 font-medium text-foreground shadow-sm hover:bg-muted/50 transition-colors">
            <div className="h-4 w-4 rounded-full bg-gradient-to-r from-primary to-primary/60"></div>
            <span>EasyInvoice</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-muted-foreground">
            <Link href="/features" className="hover:text-primary transition-colors duration-200">
              Features
            </Link>
            <Link href="/documentation" className="hover:text-primary transition-colors duration-200">
              Documentation
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors duration-200">
              Blog
            </Link>
            <Link href="/showcase" className="hover:text-primary transition-colors duration-200">
              Showcase
            </Link>
            <Link href="/sponsors" className="hover:text-primary transition-colors duration-200">
              Sponsors
            </Link>
          </nav>
        </div>

        {/* Right Section: Auth Buttons and Mode Toggle */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="rounded-full text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-200">
            Login
          </Button>

          <Button className="rounded-full bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all duration-200">
            <Link href={"/signup"}>Sign up</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
