import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider, SignInButton, SignedOut } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Track Your Domain - Free & Premium Domain Tracking Solutions",
  description:
    "Easily monitor your domain's status, SSL, expiration dates, and uptime with Track Your Domain. Free plans available, plus premium features for advanced domain tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta
            name="keywords"
            content="domain, monitoring, uptime, ssl, domain tracking, domain monitoring, track domain status, SSL monitoring, domain expiration alerts, uptime monitoring, Track Your Domain, domain management tools"
          />
          {/* og tags */}
          <meta
            property="og:title"
            content="Track Your Domain - Free & Premium Domain Tracking Solutions"
          />
          <meta
            property="og:description"
            content="Easily monitor your domain's status, SSL, expiration dates, and uptime with Track Your Domain. Free plans available, plus premium features for advanced domain tracking."
          />
          <meta
            property="og:image"
            content="https://yourwebsite.com/preview.png"
          />
          <meta property="og:url" content="https://trackyourdomain.com" />
          <meta property="og:type" content="website" />
          {/* twitter or x tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Track Your Domain - Free & Premium Domain Tracking Solutions"
          />
          <meta
            name="twitter:description"
            content="Easily monitor your domain's status, SSL, expiration dates, and uptime with Track Your Domain. Free plans available, plus premium features for advanced domain tracking."
          />
          <meta
            name="twitter:image"
            content="https://yourwebsite.com/preview.png"
          />
          <link rel="canonical" href="https://trackyourdomain.com" />
        </Head>
        <body className={inter.className}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
