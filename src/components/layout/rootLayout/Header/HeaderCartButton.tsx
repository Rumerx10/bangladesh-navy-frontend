"use client";

import { useCartDrawer } from "@/src/components/cart/CartProvider";
import { selectCanAccessAdmin } from "@/src/lib/redux/features/permission/permissionSelectors";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { ShoppingCart } from "lucide-react";

/** Opens the cart drawer. The cart lives in this browser until checkout, so
 *  visitors have one too; admin accounts don't buy, so they don't. */
const HeaderCartButton = () => {
  const { openDrawer } = useCartDrawer();
  const isAdmin = useAppSelector(selectCanAccessAdmin);
  const count = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  if (isAdmin) return null;

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={count > 0 ? `Open cart, ${count} items` : "Open cart"}
      className="relative inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-nav-ink transition-colors hover:bg-nav-wash focus-visible:ring-2 focus-visible:ring-nav-ink/60 focus-visible:outline-none"
    >
      <ShoppingCart size={20} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white tabular-nums">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
};

export default HeaderCartButton;
