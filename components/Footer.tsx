import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors"></Link>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-muted-foreground">&copy; 2023 InvoiceApp, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
