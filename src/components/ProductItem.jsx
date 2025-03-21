"use client";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Formatter from "@/lib/utils/Formatter.jsx";
import { Minus, Plus } from "lucide-react";
import { useGrocery } from "@/context/GroceryContext";

const ProductItem = ({ productItem }) => {
  const { cart, addToCart, updateCartItem, deleteCartItem, user } =
    useGrocery();

  // Find if item exists in cart
  const cartItem = cart.find(
    (item) => String(item.product.id) === String(productItem.id)
  );

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      // Remove from cart if quantity is 0
      deleteCartItem(cartItem.id);
    } else if (cartItem) {
      // Update quantity if item exists
      updateCartItem(cartItem.id, { quantity: newQuantity });
    } else {
      // Add to cart if item doesn't exist
      addToCart({
        product: productItem.id,
        user: user.email,
        quantity: newQuantity,
      });
    }
  };

  return (
    <div className=" p-2 md:p-6 flex flex-col items-center justify-center  border rounded-lg shadow-sm font-popppins  ">
      {productItem?.images ? (
        <Image
          src={productItem?.images.trim()}
          alt="product"
          height={200}
          width={500}
          className=" h-[100px] w-[100px] md:h-[150px] md:w-[150px]"
        />
      ) : (
        <Image
          src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
          alt="product"
          height={200}
          width={500}
          className=" h-[100px] w-[100px] md:h-[170px] md:w-[150px]"
        />
      )}
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-poppins text-xs md:text-md text-center font-bold text-gray-700">
          {productItem.name}
        </h2>
        <span className="flex gap-1 items-center font-poppins text-xs md:text-md">
          MRP:
          <h2 className="line-through font-poppins text-xs md:text-md">
            ₹{Formatter.formatNumber(productItem.mrp)}
          </h2>
        </span>
        {productItem.sellingPrice && (
          <h2 className="font-poppins font-semibold  text-xs md:text-md">
            {" "}
            Rate: ₹{Formatter.formatNumber(productItem.sellingPrice)}
          </h2>
        )}
      </div>

      {!cartItem ? (
        <Button
          onClick={() => handleQuantityChange(1)}
          variant="outline"
          className="mt-4 font-poppins text-xs md:text-md"
        >
          Add to cart
        </Button>
      ) : (
        <div className="flex gap-4 items-center mt-4 bg-primary rounded-md">
          <button
            onClick={() => handleQuantityChange(cartItem.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full"
          >
            <Minus size={16} />
          </button>
          <span className="font-medium text-white">{cartItem.quantity}</span>
          <button
            onClick={() => handleQuantityChange(cartItem.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
