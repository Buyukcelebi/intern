import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Listing - Engagement Rings",
  description: "Discover our collection of beautiful engagement rings with real-time gold pricing",
  keywords: ["engagement rings", "jewelry", "gold", "wedding rings"],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
