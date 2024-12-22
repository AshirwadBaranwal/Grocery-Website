"use client";
import React, { useEffect } from "react";
import { useGrocery } from "@/context/GroceryContext"; // Assuming your context is here
import Formatter from "../../lib/utils/Formatter.jsx";
import OrderedCartDetailsPop from "../../components/OrderedCartDetailsPop.jsx";
import BackBar from "../../components/BackBar.jsx";

const MyOrders = () => {
  const { orders, user } = useGrocery();
  // Calculate total price for an order
  const calculateTotal = (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.product.sellingPrice,
      0
    );
  };
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">
          Please log in to view your orders.
        </p>
      </div>
    );
  }

  return (
    <>
      <BackBar path="/" />
      <div className="p-4 flex flex-col lg:flex-row gap-5 min-h-screen mt-16">
        {/* Profile Information */}
        <div className="  h-fit p-4 rounded-lg shadow-md mb-1 w-full lg:w-1/2 lg:sticky lg:top-20 bg-green-50 ">
          <h3 className="text-lg font-semibold  mb-2">Name: Ashirwad Kumar</h3>
          <p className="">Email: ashirwadkumar77566@gmail.com</p>
          <p className="">Address: Sariswa Bazar, Bettiah</p>
          <p className="">Phone: 8252261062</p>
        </div>

        {/* Orders List */}
        <div className="space-y-4 w-full lg:w-1/2 ">
          {orders.map((order) => (
            <div
              key={order.id}
              className="  text-sm bg-white border border-green-200 p-4 rounded-lg shadow-md relative"
            >
              <span
                className={` top-10 lg:top-5 right-2 px-3 py-1 absolute text-xs font-medium rounded-full ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.status}
              </span>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Order ID:</span> {order.orderId}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Order Date:</span>{" "}
                {Formatter.formatDate(order?.created_at)}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Total Amount:</span> ₹ ₹
                {calculateTotal(Object.values(order.cartItems))}
              </p>
              <div className=" w-full grid grid-cols-2 gap-4 text-sm ">
                <div className="px-4 py-2 w-full border-r-2 border-gray-400  text-black text-sm font-medium  flex justify-center items-center ">
                  <OrderedCartDetailsPop
                    cart={Object.values(order.cartItems)}
                  />
                </div>
                <div className=" text-sm px-4 py-2 w-full  text-black text-sm font-medium flex justify-center items-center  ">
                  Cancel Order
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrders;