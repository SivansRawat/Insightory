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

  const handleLogout = async () => {
  await fetch('http://localhost:5000/api/auth/logout', { method: 'POST', credentials: 'include' });
  window.location.href = '/home';
};


  return (
    <div className="flex min-h-screen w-full flex-col">
      <nav className="flex items-center justify-between bg-gray-100 p-4">
        <div className="flex space-x-4">
          <Link href="/dashboard/overview" passHref>
            <Button variant="outline" className="capitalize">
              Overview
            </Button>
          </Link>
          <Link href="/dashboard/products" passHref>
            <Button variant="outline" className="capitalize">
              Products
            </Button>
          </Link>
        </div>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </nav>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {children}
      </main>
    </div>
  );
}
