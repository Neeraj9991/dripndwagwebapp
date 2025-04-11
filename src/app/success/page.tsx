"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { width, height } = useWindowSize();
  const orderId = searchParams.get("orderId");
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const timer = setTimeout(() => {
      setShowConfetti(false);
      router.push("/orders/" + orderId);
    }, 5000);

    return () => clearTimeout(timer);
  }, [orderId, router]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center px-4 text-center h-[calc(100vh-180px)]">
      {showConfetti && <Confetti width={width} height={height} />}

      <motion.h1
        className="text-5xl sm:text-6xl font-bold text-green-600"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Payment Successful 🎉
      </motion.h1>

      <motion.h2
        className="text-lg sm:text-xl font-medium text-gray-700"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        We&apos;ve emailed you the invoice!
      </motion.h2>

      <motion.p
        className="text-sm sm:text-base text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Redirecting you to your order details...
      </motion.p>
    </div>
  );
};

export default SuccessPage;
