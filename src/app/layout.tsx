import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Edtheta - Global Education Platform",
  description:
    "Using modern technology to transform education for students and simplify school management worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <main className='flex-grow'>{children}</main>
      </body>
    </html>
  );
}
