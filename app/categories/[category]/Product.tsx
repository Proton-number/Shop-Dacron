"use client";

import Image from "next/image";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/type";
import { appStore } from "@/store/appStore";
import Link from "next/link";
import { toast } from "sonner";
export default function Product({
  products,
  category,
}: {
  products: Post[];
  category: string;
}) {
  const { addToCart } = appStore();

  // Format price function to convert the price object into a readable format with currency symbol
  const formatPrice = (price: { amount: number; currency: string }) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency,
    }).format(price.amount);
  };

  return (
    <div className="min-h-screen ">
      <div className="border-b border-black mb-6 p-3 text-center">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {category.charAt(0).toUpperCase() +
            category.slice(1).replace(/-/g, " ")}
        </h1>
      </div>
      {/* The grid  */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id}>
              <Link href={`/categories/${category}/${product.slug?.current}`}>
                {product.mainImage && product.mainImage.asset && (
                  <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={product.mainImage.asset.url}
                      alt={product.mainImage.alt || product.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </Link>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold ">{product.title}</h2>

                  <Button
                    onClick={() => {
                      addToCart(product);
                      toast.success(
                        `${product.title} has been added to your cart!`,
                      );
                    }}
                    variant="outline"
                    size="icon"
                    className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-transparent border-none shadow-none hover:bg-transparent hover:scale-110 transition-all text-black cursor-pointer "
                  >
                    <CirclePlus className="w-4 h-4 sm:w-5 sm:h-5 " />
                  </Button>
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
