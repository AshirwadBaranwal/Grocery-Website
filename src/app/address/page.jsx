"use client";
import { useState, useEffect } from "react";
import { useGrocery } from "@/context/GroceryContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import BackBar from "@/components/BackBar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";
import supabase from "@/lib/SupbaseConfig";

// Form validation schema
const addressSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  phone_number: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  address_line1: z.string().min(5, "Address must be at least 5 characters"),
  address_line2: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postal_code: z.string().regex(/^\d{6}$/, "Postal code must be 6 digits"),
  is_default: z.boolean().default(false),
});

const AddressPage = () => {
  const { user } = useGrocery();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      is_default: false,
    },
  });

  // Fetch addresses
  const fetchAddresses = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("UserAddresses")
      .select("*")
      .eq("user_email", user.email)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch addresses");
      return;
    }

    setAddresses(data || []);
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  // Handle form submission
  const onSubmit = async (data) => {
    if (!user) {
      toast.error("Please login to add address");
      return;
    }

    setLoading(true);
    try {
      // If this is the first address or marked as default, update all other addresses to non-default
      if (data.is_default || addresses.length === 0) {
        await supabase
          .from("UserAddresses")
          .update({ is_default: false })
          .eq("user_email", user.email);
      }

      // If this is the first address, make it default
      if (addresses.length === 0) {
        data.is_default = true;
      }

      const { error } = await supabase.from("UserAddresses").insert({
        ...data,
        user_email: user.email,
      });

      if (error) throw error;

      toast.success("Address added successfully");
      form.reset();
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to add address");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Set address as default
  const setDefaultAddress = async (addressId) => {
    try {
      // First, set all addresses to non-default
      await supabase
        .from("UserAddresses")
        .update({ is_default: false })
        .eq("user_email", user.email);

      // Then set the selected address as default
      await supabase
        .from("UserAddresses")
        .update({ is_default: true })
        .eq("id", addressId);

      toast.success("Default address updated");
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to update default address");
      console.error(error);
    }
  };

  // Delete address
  const deleteAddress = async (addressId) => {
    try {
      const { error } = await supabase
        .from("UserAddresses")
        .delete()
        .eq("id", addressId);

      if (error) throw error;

      toast.success("Address deleted successfully");
      fetchAddresses();
    } catch (error) {
      toast.error("Failed to delete address");
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">
          Please login to manage addresses.
        </p>
      </div>
    );
  }

  return (
    <>
      <BackBar path="/" />
      <div className="container mx-auto p-4 mt-16">
        <h1 className="text-2xl font-bold mb-6">Manage Addresses</h1>

        {/* Address Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address_line1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input placeholder="Street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address_line2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2 (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apartment, suite, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_default"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Set as default address</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Address"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border rounded-lg p-4 relative hover:border-yellow-400"
              >
                {address.is_default && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{address.full_name}</p>
                    <p className="text-sm text-gray-600">
                      {address.phone_number}
                    </p>
                    <p className="text-sm mt-2">
                      {address.address_line1}
                      {address.address_line2 && `, ${address.address_line2}`}
                    </p>
                    <p className="text-sm">
                      {address.city}, {address.state} - {address.postal_code}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!address.is_default && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDefaultAddress(address.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteAddress(address.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {addresses.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No addresses saved yet
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
