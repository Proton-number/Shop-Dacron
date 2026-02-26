"use client";
import type { Post } from "@/types/type";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { appStore } from "@/store/appStore";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AnimatePresence } from "motion/react";

interface DetailsProps {
  productData: Post;
}

export default function Details({ productData }: DetailsProps) {
  const { addToCart } = appStore();

  const formatPrice = (price: { amount: number; currency: string }) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency,
    }).format(price.amount);
  };

  return (
    <AnimatePresence mode="wait">
      <div className="pt-10 md:pt-40 text-black max-w-5xl mx-auto min-h-screen px-4 pb-5 ">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* main section */}
          {productData?.mainImage?.asset?.url && (
            <div className="w-full md:w-1/2 flex flex-col gap-3">
              {/* main image */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={productData.mainImage.asset.url}
                  alt={productData.mainImage.alt || productData.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative w-16 h-16 md:w-20 md:h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
                <Image
                  src={productData.mainImage.asset.url}
                  alt={productData.mainImage.alt || productData.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">
                {productData?.category?.[0]?.title}
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold">
                {productData?.title}
              </h1>
              <p className="text-xl mt-2 font-medium">
                {formatPrice(productData?.price)}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 leading-relaxed">
                {productData?.description}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <HoverCard openDelay={10} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <span className="text-sm text-gray-400 underline  hover:text-gray-600 transition-colors cursor-context-menu">
                    Disclaimer
                  </span>
                </HoverCardTrigger>
                <HoverCardContent
                  className="flex w-64 flex-col gap-0.5"
                  align="start"
                >
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-900">
                      Disclaimer
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Luvra is a portfolio project and does not offer real
                      products for sale.
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            <Button
              onClick={() => {
                const alreadyInCart = appStore
                  .getState()
                  .cart.some((prod) => prod._id === productData._id);

                addToCart(productData);
                if (alreadyInCart) {
                  toast.info(`${productData.title} is already in your cart!`);
                } else {
                  toast.success(
                    `${productData.title} has been added to your cart!`,
                  );
                }
              }}
              variant="ghost"
              className="mt-2 w-full hover:bg-black hover:text-white active:bg-black active:text-white cursor-pointer border-none shadow-none transition-all justify-start text-lg font-medium p-10 px-5 rounded-none duration-300 ease-in-out"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
