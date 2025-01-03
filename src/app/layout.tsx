import type { Metadata } from "next";
import { Geist, Geist_Mono,Concert_One,Poppins } from "next/font/google";
import "./globals.css";
import {GroceryProvider} from '@/context/GroceryContext.js'
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const concertOne = Concert_One({
  variable: '--font-concertOne', // Define a CSS variable
  weight: '400', // Concert One has only 400 weight
  subsets: ['latin'], // Specify the subset, typically 'latin'
});
const poppins = Poppins({
  variable: '--font-poppins', // Define a CSS variable
  weight: '400', // Concert One has only 400 weight
  subsets: ['latin'], // Specify the subset, typically 'latin'
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${concertOne.variable} ${poppins.variable} antialiased`}
      >
         <GroceryProvider>

        {children}
        </GroceryProvider>
        <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
      </body>
    </html>
  );
}
