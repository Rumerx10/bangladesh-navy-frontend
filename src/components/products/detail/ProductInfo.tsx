"use client";
import parse from "html-react-parser";
import { INavyProduct } from "@/src/components/products/types";
import { getProductSlug } from "@/src/data/navyProducts";
import { addToCart } from "@/src/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface ProductInfoProps {
  product: INavyProduct;
  discountedPrice: number;
  formatPrice: (poysha: number) => string;
}

export default function ProductInfo({
  product,
  discountedPrice,
  formatPrice,
}: ProductInfoProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const slug = getProductSlug(product);
  const hasDiscount = discountedPrice < product.price;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.nameEn,
        slug,
        image: product.images[0] ?? "/products/chart-coxbazar.jpg",
        price: discountedPrice / 100,
        compareAtPrice: hasDiscount ? product.price / 100 : undefined,
        quantity,
        stock: product.stock,
      })
    );
    toast.success(`${product.nameEn} added to cart`);
  };

  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="text-2xl lg:text-3xl font-bold text-[#001836] leading-tight">
        {product.nameEn}
      </h1>
      <p className="text-base text-gray-500 mt-1">{product.nameBn}</p>

      {/* Price */}
      <div className="mt-5 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-[#001836]">
          {formatPrice(discountedPrice)}
        </span>
        {/* {hasDiscount && (
          <>
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-600 text-xs font-bold">
              {product.discountType === DiscountType.PERCENTAGE
                ? `${product.discountValue}% OFF`
                : `৳${product.discountValue} OFF`}
            </span>
          </>
        )} */}
      </div>

      {/* Stock */}
      <div className="mt-4 flex items-center gap-2">
        <Check size={16} className="text-green-500" />
        <span className="text-sm text-green-600 font-medium">In Stock</span>
      </div>

      {/* Description */}
      {product.descriptionEn && (
        <p className="mt-5 text-sm text-gray-600 leading-relaxed">
          {parse(product.descriptionEn)}
        </p>
      )}

      {/* Quantity + Add to Cart */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="w-12 h-10 flex items-center justify-center text-sm font-semibold border-x border-gray-200">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            disabled={quantity >= product.stock}
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg bg-[#003f71] text-white font-semibold text-sm hover:bg-[#004d8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>

      {/* Category */}
      <div className="mt-6 pt-5 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Category:{" "}
          <span className="text-[#003f71] font-medium">
            {product.category.nameEn}
          </span>
        </p>
      </div>
    </div>
  );
}
