"use client";
import parse from "html-react-parser";
import { INavyProduct } from "@/src/components/products/types";
import { getProductSlug } from "@/src/data/navyProducts";
import { addToCart } from "@/src/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

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
      <h1 className="text-2xl lg:text-5xl font-bold text-pBlue leading-tight">
        {product.nameEn}
      </h1>
      {/* Category */}
      <div className="mt-6 pt-5 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Category:{" "}
          <span className="text-liteBlue font-medium">
            {product.category.nameEn}
          </span>
        </p>
      </div>
      {/* Description */}
      {product.descriptionEn && (
        <p className="mt-5 text-sm text-gray-600 leading-relaxed">
          {parse(product.descriptionEn)}
        </p>
      )}
      <Link href="/how-to-collect">
        <button className="bg-green-500 shadow-md hover:bg-green-600 duration-300 text-white font-semibold rounded-lg mt-10 lg:mt-20 py-2 px-5 max-w-40">
          How to collect
        </button>
      </Link>
    </div>
  );
}
