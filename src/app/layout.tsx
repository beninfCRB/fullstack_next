import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//ThemeProvider
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DIAN REJEKI TOYOTA",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        inter.className, {
        'debug-screens': process.env.NODE_ENV === 'development'
      })}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <main>
            {children}
            <div className="fixed inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse blur-lg y-10 h-4 mt-auto" />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
