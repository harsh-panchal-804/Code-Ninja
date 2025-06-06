import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import Footer from "@/components/providers/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Code Ninja",
  description: "Online code editor with real-time execution and output",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider

    >
    
    <html lang="en">
      <head>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/711/711284.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Online code editor with real-time execution and output" />
        <meta name="keywords" content="code editor, online coding, real-time execution, programming, development" />
        <meta name="author" content="Code Ninja Team" />
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
          min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 
          flex flex-col  
          
          `}
      >
        <ConvexClientProvider>
        {children}
        </ConvexClientProvider>
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
