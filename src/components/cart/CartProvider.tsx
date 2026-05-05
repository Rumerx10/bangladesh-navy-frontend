"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartDrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const CartDrawerContext = createContext<CartDrawerContextType>({
  isOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleDrawer: () => {},
});

export function CartDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartDrawerContext.Provider
      value={{
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
        toggleDrawer: () => setIsOpen((prev) => !prev),
      }}
    >
      {children}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer() {
  return useContext(CartDrawerContext);
}
