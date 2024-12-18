"use client";
// context/GroceryContext.js
import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../lib/SupbaseConfig.js";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import toast from "react-hot-toast";

const GroceryContext = createContext();

export const GroceryProvider = ({ children }) => {
  const { user, getUser } = useKindeBrowserClient();
  const [groceryProducts, setGroceryProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch all products
  const fetchProducts = async () => {
    let { data: PopularProducts, error } = await supabase
      .from("PopularProducts")
      .select("*");
    if (error) console.error(error);
    else setGroceryProducts(PopularProducts);
  };

  // Fetch cart data
  const fetchCart = async (email) => {
    const { data, error } = await supabase
      .from("cart")
      .select("*,product(*)")
      .eq("user", email); // Filter by user email
    if (error) console.error(error);
    else setCart(data);
  };

  // Add item to cart
  const addToCart = async (product) => {
    try {
      // Check if the product already exists in the local cart state
      const existingCartItem = cart.find(
        (item) => String(item.product.id) === String(product.product)
      );
      console.log(existingCartItem);
      if (existingCartItem) {
        // Product already in cart, increase quantity
        const updatedQuantity = existingCartItem.quantity + 1;

        // Update the quantity in the database
        const { error: updateError } = await supabase
          .from("cart")
          .update({ quantity: updatedQuantity })
          .eq("id", existingCartItem.id); // Update the specific cart item by its ID

        if (updateError) {
          toast.error("Error updating cart item:");
        } else {
          // Update the quantity in the local state
          setCart((prev) =>
            prev.map((item) =>
              item.id === existingCartItem.id
                ? { ...item, quantity: updatedQuantity }
                : item
            )
          );
          toast.success("Item quantity updated");
        }
      } else {
        const { data, error } = await supabase
          .from("cart")
          .insert([product])
          .select("*,product(*)");
        if (error) console.error(error);
        else {
          setCart((prev) => [...prev, ...data]);
          toast.success("Item added to cart");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // Update cart item
  const updateCartItem = async (id, updatedData) => {
    const { data, error } = await supabase
      .from("cart")
      .update(updatedData)
      .eq("id", id);
    if (error) console.error(error);
    else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        )
      );
    }
  };

  // Delete cart item
  const deleteCartItem = async (id) => {
    const { error } = await supabase.from("cart").delete().eq("id", id);
    if (error) console.error(error);
    else {
      setCart((prev) => prev.filter((item) => item.id !== id));
      toast.error("Item removed from cart");
    }
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchCart(user.email);
    }
  }, [user]);

  return (
    <GroceryContext.Provider
      value={{
        groceryProducts,
        cart,
        addToCart,
        updateCartItem,
        deleteCartItem,
        user,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export const useGrocery = () => useContext(GroceryContext);
