import InternetStatus from "@/src/components/InternetStatus";
import CartDrawer from "@/src/components/cart/CartDrawer";
import { CartDrawerProvider } from "@/src/components/cart/CartProvider";
// import FloatingCartButton from "@/src/components/cart/FloatingCartButton";
import Footer from "@/src/components/layout/rootLayout/Footer";
import Header from "@/src/components/layout/rootLayout/Header/Header";
import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <CartDrawerProvider>
      <div>
        <InternetStatus />
        <Suspense fallback={<div className="h-20" />}>
          <Header />
        </Suspense>
        {children}
        <Footer />
        {/* <FloatingCartButton /> */}
        <CartDrawer />
      </div>
    </CartDrawerProvider>
  );
}
