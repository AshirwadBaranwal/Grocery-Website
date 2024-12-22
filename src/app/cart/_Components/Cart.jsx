"use client";
import React from "react";
import { X } from "lucide-react";
import { useGrocery } from "../../../context/GroceryContext";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
const Cart = () => {
  const { cart, updateCartItem, deleteCartItem, addToOrder } = useGrocery();

  const subTotal = cart.reduce(
    (total, item) => total + item?.product?.sellingPrice * item.quantity,
    0
  );
  const tax = 10.07;
  const discount = 9.99;
  const total = subTotal + tax - discount;

  return (
    <div className="bg-gray-50 min-h-screen p-4 font-sans">
      <h1 className="text-2xl font-semibold mb-6 font-concertOne text-primary ">
        My Bag
      </h1>
      <div className="space-y-6 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          {cart.length > 0 &&
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start bg-white p-4 rounded-lg shadow-md relative pt-8"
              >
                <span
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => deleteCartItem(item.id)}
                >
                  <X size={16} />
                </span>
                <Image
                  src={item?.product?.images.trim()}
                  alt="img"
                  width={100}
                  height={10}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-medium text-gray-900 leading-tight">
                    {item?.product?.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Quantity-Type: {item?.product?.itemQuantityType}
                  </p>
                  <div className="flex items-center mt-4">
                    <button
                      className="w-7 h-7 flex justify-center items-center bg-gray-200 text-gray-700 rounded-md"
                      onClick={() =>
                        item?.quantity > 1 &&
                        updateCartItem(item.id, { quantity: item.quantity - 1 })
                      }
                    >
                      -
                    </button>
                    <input
                      readOnly
                      type="number"
                      min="1"
                      value={item?.quantity}
                      className="w-12 mx-2 text-center border border-gray-300 rounded-md"
                    />
                    <button
                      className="w-7 h-7 flex justify-center items-center bg-gray-200 text-gray-700 rounded-md"
                      onClick={() =>
                        updateCartItem(item.id, { quantity: item.quantity + 1 })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-800">
                  ₹{item.product.sellingPrice?.toFixed(2)}
                </p>
              </div>
            ))}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md md:h-fit md:mx-10 md:sticky top-20">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <Button
            onClick={addToOrder}
            className="w-full my-2 py-3   rounded-lg font-medium "
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
