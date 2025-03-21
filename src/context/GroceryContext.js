"use client";
// context/GroceryContext.js
import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../lib/SupbaseConfig.js";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import toast from "react-hot-toast";

const GroceryContext = createContext();

export const GroceryProvider = ({ children }) => {
  const { user } = useKindeBrowserClient();
  const [groceryProducts, setGroceryProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // New orders state

  // Fetch all products
  const fetchProducts = async () => {
    let { data: AllProducts, error } = await supabase
      .from("AllProducts")
      .select("*");
    if (error) console.error(error);
    else {
      setGroceryProducts(AllProducts);
    }
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
        const updatedQuantity = existingCartItem.quantity + product.quantity;

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
          toast.success("Item is already in cart,Item quantity updated");
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
    const { error } = await supabase
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
  // Fetch orders data
  const fetchOrders = async (email) => {
    const { data, error } = await supabase
      .from("Orders")
      .select("*")
      .eq("user", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
    } else {
      const parsedOrders = data.map((order) => ({
        ...order,
        cartItems: JSON.parse(order.cartItems),
      }));
      setOrders(parsedOrders); // Orders will already be sorted
    }
  };

  // Add cart items to the order table
  const addToOrder = async () => {
    try {
      if (!cart.length) {
        toast.error("Your cart is empty!");
        return;
      }

      const orderData = {
        cartItems: JSON.stringify(cart), // Convert the cart state to JSON
        status: "pending", // Set default order status
        user: user.email, // Add user email
      };

      // Insert the order into the Supabase order table
      const { data, error } = await supabase
        .from("Orders")
        .insert(orderData)
        .select("*"); // Ensure the inserted data is returned;

      if (error) {
        console.error("Error adding order:", error);
        toast.error("Error placing order");
      } else {
        // Update the orders state with the new order
        setOrders((prev) => [...prev, ...data]);

        // Clear the cart state
        setCart([]);

        // Optionally, delete items from the cart in the database
        const { error: cartClearError } = await supabase
          .from("cart")
          .delete()
          .in(
            "id",
            cart.map((item) => item.id)
          );

        if (cartClearError) {
          console.error("Error clearing cart:", cartClearError);
          toast.error("Error clearing cart after placing order");
        } else {
          toast.success("Order placed successfully!");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error while placing order");
    }
  };

  // Cancel order function
  const cancelOrder = async (orderId) => {
    try {
      const { error } = await supabase
        .from("Orders")
        .update({ status: "Cancelled" })
        .eq("id", orderId)
        .select();

      if (error) {
        console.error("Error cancelling order:", error);
        toast.error("Failed to cancel order");
        return false;
      }

      // Update the orders state with the cancelled order
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );

      toast.success("Order cancelled successfully");
      return true;
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchCart(user.email);
      fetchOrders(user.email);
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
        addToOrder,
        orders,
        cancelOrder,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export const useGrocery = () => useContext(GroceryContext);
