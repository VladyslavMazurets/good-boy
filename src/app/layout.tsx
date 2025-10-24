import { Inter } from "next/font/google";

import FormContextProvider from "@/context/formContext";
import Providers from "@/providers";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <FormContextProvider>{children}</FormContextProvider>
        </Providers>
      </body>
    </html>
  );
}
