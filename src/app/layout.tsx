import "./globals.css";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import Providers from "@/utils/provider";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify API",
  description: "Edit Spotify playlist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <StyledComponentsRegistry>
            <Header />
            {children}
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
