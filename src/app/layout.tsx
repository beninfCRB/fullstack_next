import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

//ThemeProvider
import { auth } from "@/auth";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          inter.className, {
          'debug-screens': process.env.NODE_ENV === 'development'
        })}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <main>
              <ToastContainer
                position="top-center"
              />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
