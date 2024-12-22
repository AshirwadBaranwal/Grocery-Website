"use client";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Formatter from "@/lib/utils/Formatter.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetails from "@/components/ProductItemDetails";


const ProductItem = ({ productItem }) => {
  return (
    <div className=" p-2 md:p-6 flex flex-col items-center justify-center  border rounded-lg shadow-sm font-popppins  ">
      <Image
        src={productItem?.images.trim()}
        alt="product"
        height={200}
        width={500}
        className=" h-[100px] w-[100px] md:h-[200px] md:w-[200px]"
      />
      <h2 className="font-poppins text-xs md:text-md text-center">
        {productItem.name}
      </h2>
      <span className="flex gap-1 items-center font-poppins text-xs md:text-md">
        MRP:
        <h2 className="line-through font-poppins text-xs md:text-md">
          ₹{Formatter.formatNumber(productItem.mrp)}
        </h2>
      </span>
      {productItem.sellingPrice && (
        <h2 className="font-poppins text-xs md:text-md">
          {" "}
          Rate: ₹{Formatter.formatNumber(productItem.sellingPrice)}
        </h2>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mt-4 font-poppins  text-xs md:text-md"
          >
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add your item to cart -</DialogTitle>
            <DialogDescription asChild>
              <ProductItemDetails product={productItem} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;
