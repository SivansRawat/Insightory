import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <div className="z-10 w-full max-w-xl items-center justify-between font-mono text-sm lg:flex flex-col text-center">
        <h1 className="text-5xl font-bold mb-6 text-indigo-800 leading-tight">
          Welcome to <span className="text-blue-600">Insightory</span>
        </h1>
        <p className="text-lg mb-8 max-w-prose">
          Unlock the power of your product data. Track stock, analyze performance, and gain valuable insights for smarter decisions.
        </p>
        <div className="flex space-x-4">
          <Link href="/login" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
            Get Started
          </Link>
          {/* Optional: A link to a public 'About' or 'Features' page */}
          {/* <Link href="/features" className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 transition duration-300 ease-in-out">
            Learn More
          </Link> */}
        </div>
      </div>
      <footer className="absolute bottom-6 text-gray-600">
        <p>&copy; {new Date().getFullYear()} Insightory. All rights reserved.</p>
      </footer>
    </main>
  );
}
