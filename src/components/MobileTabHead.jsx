import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import CartSheet from "./CartSheet";
import { ShoppingCart } from "lucide-react";
import { useGrocery } from "@/context/GroceryContext";

const MobileTabHead = ({ TabHead }) => {
  const { cart } = useGrocery();
  return (
    <div className="flex items-center w-full fixed top-0  z-50 bg-white justify-between p-5 border border-gray-300 font-semibold text-lg">
      <p>{TabHead}</p>
      <Sheet>
        <SheetTrigger asChild>
          <span className="cursor-pointer relative">
            <ShoppingCart />
            <span className="h-5  w-5 flex justify-center items-center bg-[#e80000] font-bold text-white absolute text-[10px]   rounded-full  -top-2 -right-2">
              {cart?.length}
            </span>
          </span>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>My Cart</SheetTitle>
          </SheetHeader>
          <CartSheet />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileTabHead;
