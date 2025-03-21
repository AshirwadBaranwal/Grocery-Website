import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrderedCartDetails from "./OrderedCartDetails";

const OrderedCartDetailsPop = ({ cart }) => {
  return (
    <div>
      <Dialog className="">
        <DialogTrigger className="text-sm">View Order Details</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Detail</DialogTitle>
            <DialogDescription asChild className="overflow-y-auto">
              <OrderedCartDetails cart={cart} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderedCartDetailsPop;
