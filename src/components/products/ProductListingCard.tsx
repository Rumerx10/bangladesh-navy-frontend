"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Package, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import {
  IProduct,
  PRODUCT_CATEGORY_LABELS,
} from "@/src/components/admin/ContentManagement/products/types";
import { MAX_ORDER_ITEM_QUANTITY } from "@/src/components/cart/types/order";
import { siteConfig } from "@/src/config/siteConfig";
import { addToCart } from "@/src/lib/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import { isAdminRole } from "@/src/utils/UserRoleEnum";

interface ProductListingCardProps {
  product: IProduct;
}

// The backend stores a flat BDT amount (not poysha).
const formatPrice = (amount: number) =>
  `${siteConfig.currencySymbol}${amount.toLocaleString("en-BD")}`;

const ProductListingCard = ({ product }: ProductListingCardProps) => {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.permission.role);
  const inCartQuantity = useAppSelector(
    (state) =>
      state.cart.items.find((item) => item.productId === product.id)
        ?.quantity ?? 0
  );

  // Same rule as the detail page: the cart lives in this browser until
  // checkout, so visitors can fill it too; admin accounts don't place orders.
  const isAdmin = isAdminRole(role);
  const href = `/products/${product.id}`;
  const hasPrice = product.price != null && product.price > 0;
  const isCartFull = inCartQuantity >= MAX_ORDER_ITEM_QUANTITY;

  const details = [
    product.scale && `Scale ${product.scale}`,
    product.edition && `Edition ${product.edition}`,
  ].filter(Boolean) as string[];

  const handleAddToCart = () => {
    if (isAdmin || !hasPrice || isCartFull) return;
    dispatch(
      addToCart({
        productId: product.id,
        name: product.nameEn,
        // The detail route looks products up by id.
        slug: product.id,
        image: product.images?.[0] ?? "",
        price: product.price!,
        quantity: 1,
        // Charts aren't stock-counted; this is the most one order line holds.
        stock: MAX_ORDER_ITEM_QUANTITY,
      })
    );
    toast.success(`${product.nameEn} added to cart`);
  };

  return (
    // A size container: the footer lays out by the card's own width, since a
    // narrow card shows up both in the 2-up phone grid and the 3-up tablet one.
    <article className="@container group flex h-full min-w-0 flex-col rounded-md md:rounded-lg border border-border shadow bg-card overflow-hidden hover:shadow-lg hover:border-liteBlue/15 transition-all duration-300">
      <Link href={href} className="flex flex-1 flex-col">
        <div className="relative aspect-4/3 bg-linear-to-br from-brand-navy to-brand-blue overflow-hidden">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.nameEn}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package size={40} className="text-white/20" />
            </div>
          )}
          <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-white text-[11px] font-medium @[17rem]:bottom-3 @[17rem]:left-3 @[17rem]:max-w-[calc(100%-1.5rem)] @[17rem]:px-2.5 @[17rem]:py-1">
            {product.category
              ? PRODUCT_CATEGORY_LABELS[product.category]
              : "Tidal Product"}
          </span>
        </div>
        <div className="flex-1 p-3 pb-2 flex flex-col gap-1 @[17rem]:p-4 @[17rem]:pb-3">
          <h3 className="text-sm font-semibold text-pBlue line-clamp-2 min-h-[2lh] wrap-break-word group-hover:text-liteBlue transition-colors leading-snug">
            {product.nameEn}
          </h3>
          <p className="text-xs text-muted-foreground font-mono min-h-lh truncate">
            {product.chartCode ? `Chart #${product.chartCode}` : ""}
          </p>
          {details.length > 0 && (
            <p className="text-xs text-secondary-foreground truncate">
              {details.join(" · ")}
            </p>
          )}
        </div>
      </Link>

      {/* Narrow cards stack price over a full-width button; wide enough
          cards (≈272px) put them side by side. */}
      <div className="flex flex-col gap-2 border-t border-border p-3 @[17rem]:flex-row @[17rem]:items-center @[17rem]:justify-between @[17rem]:gap-3 @[17rem]:px-4">
        {hasPrice ? (
          <span className="min-w-0 truncate text-base font-bold text-pBlue tabular-nums @[17rem]:text-lg">
            {formatPrice(product.price!)}
          </span>
        ) : (
          <span className="text-sm font-medium text-muted-foreground">
            Price on request
          </span>
        )}

        {isAdmin || !hasPrice ? (
          <Link
            href={href}
            className="shrink-0 text-sm font-medium text-liteBlue hover:underline"
          >
            View details
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isCartFull}
            aria-label={`Add ${product.nameEn} to cart`}
            className="inline-flex h-11 w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 @[17rem]:h-10 @[17rem]:w-auto @[17rem]:px-3.5"
          >
            {inCartQuantity > 0 ? (
              <>
                <Check size={16} />
                In cart ({inCartQuantity})
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to cart
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductListingCard;
