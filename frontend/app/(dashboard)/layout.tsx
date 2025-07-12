import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon, Package2Icon, BarChart3Icon, BoxesIcon, HomeIcon } from 'lucide-react'; // Install lucide-react: npm install lucide-react
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Uncomment if using Avatar

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-40">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Inventory Insights</span>
          </Link>
          <Link
            href="/dashboard/overview"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/products"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="/dashboard/analytics"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Analytics
          </Link>
          {/* Optional: Add a Reviews tab if you implement it */}
          {/* <Link
            href="/dashboard/reviews"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Reviews
          </Link> */}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                <Package2Icon className="h-6 w-6" />
                <span>Inventory Insights</span>
              </Link>
              <Link
                href="/dashboard/overview"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <HomeIcon className="h-5 w-5" />
                Overview
              </Link>
              <Link
                href="/dashboard/products"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <BoxesIcon className="h-5 w-5" />
                Products
              </Link>
              <Link
                href="/dashboard/analytics"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <BarChart3Icon className="h-5 w-5" />
                Analytics
              </Link>
               {/* Optional: Add a Reviews tab if you implement it */}
              {/* <Link
                href="/dashboard/reviews"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <ClipboardListIcon className="h-5 w-5" />
                Reviews
              </Link> */}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            {/* Search or other header elements */}
          </div>
          {/* User Profile/Logout */}
          {/* <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar> */}
          <Button variant="ghost" className="text-sm">
            Logout
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {children}
      </main>
    </div>
  );
}