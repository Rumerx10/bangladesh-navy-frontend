import InternetStatus from "@/src/components/InternetStatus";
import CartDrawer from "@/src/components/cart/CartDrawer";
import { CartDrawerProvider } from "@/src/components/cart/CartProvider";
import FloatingCartButton from "@/src/components/cart/FloatingCartButton";
import Footer from "@/src/components/layout/rootLayout/Footer";
import Header from "@/src/components/layout/rootLayout/Header/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <CartDrawerProvider>
      <div>
        <InternetStatus />
        <Header />
        {children}
        <Footer />
        <FloatingCartButton />
        <CartDrawer />
      </div>
    </CartDrawerProvider>
  );
}
