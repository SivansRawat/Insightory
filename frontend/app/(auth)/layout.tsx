interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <main className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {children}
      </main>
    </div>
  );
}
