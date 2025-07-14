// // Dashboard layout
// "use client";
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { MenuIcon, Package2Icon, BarChart3Icon, BoxesIcon, HomeIcon } from 'lucide-react';

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {

//   const handleLogout = async () => {
//   await fetch('http://localhost:5000/api/auth/logout', { method: 'POST', credentials: 'include' });
//   window.location.href = '/home';
// };


//   return (
//     <div className="flex min-h-screen w-full flex-col">
//       <nav className="flex items-center justify-between bg-gray-100 p-4">
//         <div className="flex space-x-4">
//           <Link href="/dashboard/overview" passHref>
//             <Button variant="outline" className="capitalize">
//               Overview
//             </Button>
//           </Link>
//           <Link href="/dashboard/products" passHref>
//             <Button variant="outline" className="capitalize">
//               Products
//             </Button>
//           </Link>
//         </div>
//         <Button variant="destructive" onClick={handleLogout}>
//           Logout
//         </Button>
//       </nav>
//       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
//         {children}
//       </main>
//     </div>
//   );
// }




"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon, Package2Icon, BoxesIcon, HomeIcon, LogOut, Bell, Search, User } from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await fetch('https://insightory.onrender.com/api/auth/logout', { method: 'POST', credentials: 'include' });
    window.location.href = '/home';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header with right-aligned navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Package2Icon className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Insightory
            </span>
          </div>

          {/* Right-aligned Navigation - ENHANCED as requested */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100 rounded-full p-1">
            <Link href="/dashboard/overview">
              <Button
                variant={activeTab === 'overview' ? 'default' : 'ghost'}
                size="sm"
                className={`rounded-full px-6 ${
                  activeTab === 'overview' 
                    ? 'bg-white shadow-sm text-indigo-600' 
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Overview
              </Button>
            </Link>
            <Link href="/dashboard/products">
              <Button
                variant={activeTab === 'products' ? 'default' : 'ghost'}
                size="sm"
                className={`rounded-full px-6 ${
                  activeTab === 'products' 
                    ? 'bg-white shadow-sm text-indigo-600' 
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
                onClick={() => setActiveTab('products')}
              >
                <BoxesIcon className="h-4 w-4 mr-2" />
                Products
              </Button>
            </Link>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <User className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="rounded-full border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="rounded-full">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/dashboard/overview" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100">
                  <HomeIcon className="h-5 w-5" />
                  <span>Overview</span>
                </Link>
                <Link href="/dashboard/products" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-100">
                  <BoxesIcon className="h-5 w-5" />
                  <span>Products</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main content with enhanced styling */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

