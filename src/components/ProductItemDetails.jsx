"use client";
import Formatter from "@/lib/utils/Formatter";
import Image from "next/image";
import React, { useState } from "react";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useGrocery } from "@/context/GroceryContext";

const ProductItemDetails = ({ product }) => {
  const { addToCart, user } = useGrocery();
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex flex-col items-center md:grid md:grid-cols-2 bg-white text-black p-7">
      {product?.images ? (
        <Image
          src={product?.images.trim()}
          alt={product.name}
          height={250}
          width={250}
          loading="lazy"
          className="object-contain rounded-lg bg-white"
        />
      ) : (
        <Image
          src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
          alt={product.name}
          height={250}
          width={250}
          className="object-contain rounded-lg bg-white"
        />
      )}

      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <h2 className="text-md font-bold">{product.desc}</h2>
        <span className="flex gap-1 items-center font-poppins text-md md:text-lg">
          MRP:
          <h2 className="line-through font-poppins text-md md:text-lg">
            ₹{Formatter.formatNumber(product.mrp)}
          </h2>
        </span>
        {product.sellingPrice && (
          <h2 className="font-poppins text-md md:text-lg font-bold">
            Rate: ₹{Formatter.formatNumber(product.sellingPrice)}
          </h2>
        )}
        <h2 className="font-poppins text-md md:text-lg">
          Unit: {product.itemQuantityType}
        </h2>
        <div className="flex gap-6 border shadow-sm w-fit px-3 py-2 items-center rounded-lg">
          <button
            onClick={() => {
              setQuantity((prev) => prev - 1);
            }}
            className=""
            disabled={quantity == 1}
          >
            <Minus size={20} />
          </button>
          <span className="text-lg font-bold">{quantity}</span>
          <button
            onClick={() => {
              setQuantity((prev) => prev + 1);
            }}
            className=""
          >
            <Plus size={20} />
          </button>
        </div>
        <Button
          onClick={() => {
            addToCart({
              product: product.id,
              user: user.email,
              quantity: quantity,
            });
          }}
          className="w-full mt-3 font-poppins"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItemDetails;
