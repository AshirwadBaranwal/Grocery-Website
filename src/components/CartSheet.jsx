"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { useGrocery } from "@/context/GroceryContext";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { SheetClose } from "./ui/sheet";
import { useRouter } from "next/navigation";

const CartSheet = () => {
  const router = useRouter();
  const { cart, updateCartItem, deleteCartItem, addToOrder } = useGrocery();

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity === 0) {
      // Remove from cart if quantity is 0
      deleteCartItem(item.id);
    } else {
      // Update quantity if item exists
      updateCartItem(item.id, { quantity: newQuantity });
    }
  };

  const subTotal = cart.reduce(
    (total, item) => total + item?.product?.sellingPrice * item.quantity,
    0
  );
  const tax = 0;
  const discount = 0;
  const total = subTotal + tax - discount;

  const handleCheckout = async () => {
    await addToOrder();
    router.replace("/success");
  };

  return (
    <>
      <div className="flex flex-col h-full ">
        {cart.length > 0 ? (
          <div className="flex-1 overflow-auto  py-2 space-y-4 md:px-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white p-3 rounded-lg border relative"
              >
                <button
                  className="absolute right-2 top-2 hover:bg-gray-100 p-1 rounded-full"
                  onClick={() => deleteCartItem(item.id)}
                >
                  <X size={16} />
                </button>

                {/* Product Image */}
                <div className="w-20 h-20 relative">
                  <Image
                    src={
                      item?.product?.images
                        ? item.product.images.trim()
                        : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                    }
                    alt={item.product.name}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 ml-4">
                  <h2 className="font-medium text-gray-900 text-sm">
                    {item?.product?.name}
                  </h2>

                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-gray-600">
                      ₹{item.product.sellingPrice?.toFixed(2)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-primary rounded-md">
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-white rounded-l-md hover:bg-primary/90"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium text-white px-3">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center text-white rounded-r-md hover:bg-primary/90"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col  items-center justify-center">
            <Image
              src="/empty-cart.png"
              alt="empty-cart"
              width={100}
              height={100}
            />
            <h1 className="text-gray-500 text-lg">Your Cart is Empty</h1>
          </div>
        )}

        {/* Cart Summary */}
        <div className="border-t pt-4 mt-auto bg-gray-50 p-4 md:mx-2 rounded-lg">
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Discount</span>
              <span className="text-green-600">-₹{discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold pt-2 border-t">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <SheetClose asChild>
            <Button
              onClick={handleCheckout}
              className="w-full mt-4 mb-3 py-6 rounded-lg font-medium bg-primary hover:bg-primary/90"
              disabled={cart.length === 0}
            >
              Proceed to Checkout • ₹{total.toFixed(2)}
            </Button>
          </SheetClose>
        </div>
      </div>

      {/* <SuccessModal open={showSuccess} /> */}
    </>
  );
};

export default CartSheet;
