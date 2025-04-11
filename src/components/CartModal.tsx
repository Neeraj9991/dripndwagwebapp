"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import { Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();
  const lineItems = cart?.lineItems ?? [];

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  const calculateSubtotal = (): number => {
    return lineItems.reduce((total, item) => {
      const price = Number(item.price?.amount || 0);
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30 }}
          className="relative w-full max-w-md h-full bg-white shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {lineItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-gray-100 rounded-full mb-4 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <circle cx="8" cy="21" r="1"></circle>
                  <circle cx="19" cy="21" r="1"></circle>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
              </motion.div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Start adding some items to your cart
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="h-[calc(100%-180px)] overflow-y-auto p-4">
                {lineItems.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0"
                  >
                    {item.image && (
                      <div className="relative w-16 h-20 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={wixMedia.getScaledToFillImageUrl(
                            item.image,
                            72,
                            96,
                            {}
                          )}
                          alt={item.productName?.original || "Product image"}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900 line-clamp-2">
                          {item.productName?.original}
                        </h3>
                        <button
                          onClick={() =>
                            !isLoading && removeItem(wixClient, item._id!)
                          }
                          disabled={isLoading}
                          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">
                        {item.availability?.status}
                      </p>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-medium text-gray-900">
                          ${item.price?.amount}
                          {item.quantity && item.quantity > 1 && (
                            <span className="text-xs text-gray-500 ml-1">
                              ($
                              {(
                                Number(item.price?.amount) * item.quantity
                              ).toFixed(2)}
                              )
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    Subtotal
                  </span>
                  <span className="font-bold text-gray-900">
                    ${calculateSubtotal().toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4 text-center">
                  Shipping and taxes calculated at checkout
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-black hover:bg-gray-800 transition-colors text-white py-3 px-4 rounded-md font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal;
