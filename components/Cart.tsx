"use client";
import { appStore } from "@/store/appStore";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function Cart() {
  const { cartOpen, toggleCart, cart, removeFromCart, updateCartQuantity } =
    appStore();

  const formatPrice = (price: { amount: number; currency: string }) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency,
    }).format(price.amount);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price.amount * item.quantity,
    0,
  );

  return (
    <AnimatePresence mode="wait">
      {cartOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="w-full sm:w-100 h-full fixed top-0 right-0 bg-white border-l border-black z-50 shadow-2xl flex flex-col"
        >
          <div className="p-6 border-b border-black">
            <div className="flex justify-between items-center font-semibold">
              <Button
                onClick={toggleCart}
                variant={"outline"}
                className="hover:opacity-70 transition-opacity bg-transparent border-none shadow-none p-0 h-auto font-normal hover:bg-transparent hover:cursor-pointer text-md text-black"
              >
                Close
              </Button>
              <p>Cart ({cart.length})</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 mt-8">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
                      className="flex gap-4 border-b border-gray-200 pb-4"
                    >
                      {item.mainImage?.asset && (
                        <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                          <Image
                            src={item.mainImage.asset.url}
                            alt={item.mainImage.alt || item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            onClick={() =>
                              updateCartQuantity(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="w-6 h-6 flex items-center justify-center border border-black rounded hover:bg-gray-50 disabled:opacity-30 hover:text-gray-700 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-sm w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() =>
                              updateCartQuantity(item._id, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center border border-black rounded hover:bg-gray-50 disabled:opacity-30 hover:text-gray-700 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            variant={"ghost"}
                            onClick={() => removeFromCart(item._id)}
                            className="ml-auto text-red-500 hover:text-red-700 bg-transparent border-none shadow-none p-0 h-auto font-normal hover:bg-transparent hover:cursor-pointer text-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-black">
              <div className="flex justify-between items-center mb-4 font-semibold">
                <span>Total</span>
                <span>
                  {formatPrice({
                    amount: total,
                    currency: cart[0]?.price.currency,
                  })}
                </span>
              </div>
              <Button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors p-6 cursor-pointer">
                Checkout
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
