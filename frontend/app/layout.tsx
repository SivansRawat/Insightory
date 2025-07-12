import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inventory Insights', // Your app title
  description: 'Gain insights into your product inventory.', // Your app description
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}



// import './globals.css'
// import { Inter } from 'next/font/google'
// import type { Metadata } from 'next'

// // Load Inter font with Next.js font optimization
// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Inventory Insights',
//   description: 'A modern inventory dashboard built with Next.js',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className + ' bg-gray-50 min-h-screen'}>
//         {children}
//       </body>
//     </html>
//   )
// }
