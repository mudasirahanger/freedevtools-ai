import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AdSenseScript from "@/components/adsense/AdSenseScript";
import { SITE_NAME } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Free Developer Tools & AI Prompt Generators`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Format JSON, decode JWTs, generate UUIDs, test regex, convert timestamps, and create powerful AI prompts for coding, debugging, and UI design.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
  other: {
    "google-adsense-account": "ca-pub-4959080563967978",
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <GoogleAnalytics />
        <AdSenseScript />
      </body>
    </html>
  );
}
