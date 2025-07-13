// Dashboard layout
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon, Package2Icon, BarChart3Icon, BoxesIcon, HomeIcon } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* ...existing code... */} 
      <nav className="flex space-x-4 bg-gray-100 p-4">
        <Link href="/dashboard/products" passHref>
          <Button variant="outline" className="capitalize">
            Products
          </Button>
        </Link>
        <Link href="/dashboard/analytics" passHref>
          <Button variant="outline" className="capitalize">
            Analytics
          </Button>
        </Link>
      </nav>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {children}
      </main>
    </div>
  );
}
