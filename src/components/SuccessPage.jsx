"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const SuccessPage = () => {
  return (
    <div className="flex  p-4">
      <div className="max-w-md w-full h-screen md:h-fit bg-white p-6 rounded-lg shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-xl font-semibold text-center mt-4">
            Order Placed Successfully!
          </h1>
          <p className="text-center mt-2 text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-3 mt-6"
        >
          <Link href="/orders" className="w-full">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-6"
            >
              <Package size={20} />
              View Orders
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
            onClick={() => {
              // Handle e-receipt download or view
              console.log("View e-receipt");
            }}
          >
            <FileText size={20} />
            View E-Receipt
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          A confirmation email has been sent to your registered email address.
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;
