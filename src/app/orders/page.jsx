"use client";
import React, { useState } from "react";
import { useGrocery } from "@/context/GroceryContext"; // Assuming your context is here
import Formatter from "../../lib/utils/Formatter.jsx";
import useIsMobile from "@/hooks/use-mobile";

import BackBar from "../../components/BackBar.jsx";
import Image from "next/image";
import InvoicePopup from "../../components/InvoicePopup.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import MobileTabHead from "@/components/MobileTabHead";
import BottomNav from "@/components/BottomNav";

const MyOrders = () => {
  const { orders, user, cancelOrder } = useGrocery();
  const [activeTab, setActiveTab] = useState("All");
  const [cancellingOrder, setCancellingOrder] = useState(null);
  const isMobile = useIsMobile();

  // Filter and sort orders based on active tab
  const filteredOrders = orders
    ?.filter((order) => {
      if (activeTab === "All") return true;
      return order.status === activeTab;
    })
    .sort((a, b) => {
      // Sort by created_at in descending order (newest first)
      return new Date(b.created_at) - new Date(a.created_at);
    });

  // Calculate total price for an order
  const calculateTotal = (cartItems) => {
    try {
      // Parse the JSON string if it's a string, otherwise use the object directly
      const parsedItems =
        typeof cartItems === "string" ? JSON.parse(cartItems) : cartItems;

      // Ensure it's an array
      if (!Array.isArray(parsedItems)) return 0;

      // Calculate the total
      return parsedItems.reduce((total, item) => {
        const quantity = item?.quantity || 0;
        const sellingPrice = item?.product?.sellingPrice || 0;
        return total + quantity * sellingPrice;
      }, 0);
    } catch (error) {
      console.error("Error calculating total:", error);
      return 0;
    }
  };

  // Handle cancel order
  const handleCancelOrder = async (order) => {
    if (order.status === "Cancelled") {
      return;
    }
    const success = await cancelOrder(order.id);
    if (success) {
      setCancellingOrder(null);
    }
  };

  const tabs = [
    { id: "All", label: "All Orders" },
    { id: "Pending", label: "Pending" },
    { id: "Delivered", label: "Delivered" },
    { id: "Cancelled", label: "Cancelled" },
  ];

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
      {!isMobile && <BackBar path="/" />}
      {isMobile && <MobileTabHead TabHead="My Orders" />}
      <div className="p-4 flex flex-col lg:flex-row gap-5 min-h-screen mt-16 mb-16">
        {/* Side Navigation Tabs */}
        <div className="lg:w-1/4 space-y-2 relative ">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <div className="flex flex-col space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-yellow-400 text-black font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 text-sm text-gray-500">
                    (
                    {orders?.filter((order) =>
                      tab.id === "All" ? true : order.status === tab.id
                    ).length || 0}
                    )
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="lg:w-3/4 space-y-4">
          {filteredOrders && filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-yellow-400 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium">Order ID</p>
                      <p className="text-sm">#{order.orderId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Payment</p>
                      <p className="text-sm">
                        ₹{calculateTotal(order.cartItems)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Payment Method</p>
                      <p className="text-sm">
                        {order.paymentMethod || "Paypal"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Order Date</p>
                      <p className="text-sm">
                        {Formatter.formatDate(order?.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 space-y-4">
                  {order.cartItems &&
                    (typeof order.cartItems === "string"
                      ? JSON.parse(order.cartItems)
                      : order.cartItems
                    ).map((item, index) => (
                      <div key={index} className="flex items-center gap-3 py-2">
                        <div className="w-12 h-12 relative">
                          {item?.product?.images ? (
                            <Image
                              src={item?.product?.images.trim()}
                              alt={item?.product?.name}
                              width={48}
                              height={48}
                              className="object-contain rounded-lg"
                            />
                          ) : (
                            <Image
                              src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                              alt="No image"
                              width={48}
                              height={48}
                              className="object-contain rounded-lg"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-medium">
                            {item?.product?.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item?.product?.itemQuantityType} | {item?.quantity}{" "}
                            Qty.
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Order Status and Actions */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    <p className="text-sm">
                      Your Order has been {order.status}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {order.status !== "Cancelled" && (
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm">
                        Track Order
                      </button>
                    )}
                    <InvoicePopup order={order} user={user} />
                    {order.status === "Pending" && (
                      <Dialog>
                        <DialogTrigger className="px-6 py-2 text-red-500 ml-auto text-sm hover:bg-red-50 rounded-lg transition-colors">
                          Cancel Order
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">
                              Cancel Order
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <p>Are you sure you want to cancel this order?</p>
                            <p className="text-sm text-gray-500">
                              This action cannot be undone. The order status
                              will be changed to cancelled.
                            </p>
                          </div>
                          <div className="flex justify-end gap-3">
                            <DialogClose className="px-4 py-2 border rounded-lg text-sm">
                              No, keep it
                            </DialogClose>
                            <button
                              onClick={() => handleCancelOrder(order)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                            >
                              Yes, cancel order
                            </button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders found in this category</p>
            </div>
          )}
        </div>
      </div>
      {isMobile && <BottomNav />}
    </>
  );
};

export default MyOrders;
