import { Sour_Gummy, Imperial_Script, Fascinate_Inline } from "next/font/google";
import "./globals.css";

const sourGummy = Sour_Gummy({
  variable: "--font-sour-gummy",
  subsets: ["latin"],
  weight: ["400"], 
  display: "swap",
});

const imperial = Imperial_Script({
  variable: "--font-imperial",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fascinateInline = Fascinate_Inline({
  variable: "--font-fascinate-inline",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Dera Love Poem Generator",
  description: "Created by Chidera Ulu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sourGummy.variable} ${imperial.variable} ${fascinateInline.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
