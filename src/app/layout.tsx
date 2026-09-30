import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import LoginModal from "../components/auth/LoginModal/LoginModal";
import ToastProvider from "../components/shared/Toast/ToastProvider";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import ThemeScript from "../components/theme/ThemeScript";
import { siteConfig } from "../config/siteConfig";
import GoogleAuthClientProvider from "../lib/google-auth/GoogleAuthClientProvider";
import QueryProvider from "../lib/react-query/QueryProvider";
import StoreProvider from "../lib/redux/provider/StoreProvider";
import { UserFetcher } from "./UserFetcher";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {/* Must stay the first child — it runs before anything below it is
            painted, which is what prevents the white flash on reload. */}
        <ThemeScript />
        <ThemeProvider>
          <StoreProvider>
            <QueryProvider>
              <GoogleAuthClientProvider>
                <ToastProvider>
                  <UserFetcher />
                  <main>{children}</main>
                  <LoginModal />
                </ToastProvider>
              </GoogleAuthClientProvider>
            </QueryProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
