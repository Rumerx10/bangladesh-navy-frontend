"use client";
import parse from "html-react-parser";
import { useCartDrawer } from "@/src/components/cart/CartProvider";
import { INavyProduct } from "@/src/components/products/types";
import { getProductSlug } from "@/src/data/navyProducts";
import { addToCart } from "@/src/lib/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

interface ProductInfoProps {
  product: INavyProduct;
  discountedPrice: number;
  formatPrice: (poysha: number) => string;
}

const ProductInfo = ({
  product,
  discountedPrice,
  formatPrice,
}: ProductInfoProps) => {
  const dispatch = useAppDispatch();
  const { openDrawer } = useCartDrawer();
  const role = useAppSelector((state) => state.permission.role);
  // The cart lives in this browser until checkout, so visitors can fill it
  // and log in when they check out. Admin accounts don't place orders.
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  const isGuest = role === "GUEST";
  const [quantity, setQuantity] = useState(1);
  const slug = getProductSlug(product);
  const hasDiscount = discountedPrice < product.price;

  const handleAddToCart = () => {
    if (isAdmin) return;
    dispatch(
      addToCart({
        productId: product.id,
        name: product.nameEn,
        slug,
        image: product.images[0] ?? "",
        price: discountedPrice / 100,
        compareAtPrice: hasDiscount ? product.price / 100 : undefined,
        quantity,
        stock: product.stock,
      })
    );
    toast.success(`${product.nameEn} added to cart`);
    openDrawer();
  };

  const stepButton =
    "grid size-10 cursor-pointer place-items-center text-secondary-foreground transition-colors hover:bg-light hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="text-2xl lg:text-5xl font-bold text-pBlue leading-tight">
        {product.nameEn}
      </h1>
      {/* Price */}
      <div className="mt-5 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-pBlue">
          {formatPrice(discountedPrice)}
        </span>
        {hasDiscount && (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div
          role="group"
          aria-label="Quantity"
          className="flex items-center overflow-hidden rounded-lg border border-border"
        >
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={isAdmin || quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className={stepButton}
          >
            <Minus size={16} />
          </button>
          <span
            aria-live="polite"
            className="w-10 text-center text-sm font-semibold tabular-nums"
          >
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={isAdmin || quantity >= product.stock}
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className={stepButton}
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdmin}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
        >
          <ShoppingCart size={16} />
          Add to cart
        </button>
        {isAdmin && (
          <p className="w-full text-xs text-muted-foreground">
            You&apos;re signed in as an admin. Use a customer account to place
            orders.
          </p>
        )}
        {isGuest && (
          <p className="w-full text-xs text-muted-foreground">
            You can add charts now and log in when you check out.
          </p>
        )}
      </div>

      {/* Category */}
      <div className="mt-6 pt-5 border-t border-border">
        <p className="text-sm text-secondary-foreground">
          Category:{" "}
          <span className="text-liteBlue font-medium">
            {product.category.nameEn}
          </span>
        </p>
      </div>
      {/* Description */}
      {product.descriptionEn && (
        <div className="mt-5 text-sm text-justify text-secondary-foreground leading-relaxed">
          {parse(product.descriptionEn)}
        </div>
      )}
      <Link
        href="/how-to-collect"
        className="mt-10 inline-flex w-fit rounded-lg bg-green-500 px-5 py-2 font-semibold text-white shadow-md duration-300 hover:bg-green-600 lg:mt-20"
      >
        How to collect
      </Link>
    </div>
  );
};

export default ProductInfo;
