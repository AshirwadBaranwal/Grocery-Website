"use client";
import React from "react";
import { useGrocery } from "../../context/GroceryContext.js";
import Cart from "./_Components/Cart.jsx";
import BackBar from "../../components/BackBar.jsx";

const page = () => {
  const { cart, updateCartItem, deleteCartItem } = useGrocery();
  return (
    <div className="mt-16">
      {/* {cart.map((items, index) => {
        return <div key={index}>{items.quantity}</div>;
      })} */}
      <BackBar path="/" />
      <Cart />
    </div>
  );
};

export default page;
