"use client";
import React, { useState } from "react";
import CategoryList from "@/components/CategoryList";
import ProductItem from "@/components/ProductItem";
import supabase from "@/lib/SupbaseConfig";

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      let { data: Products, error } = await supabase
        .from("Products")
        .select("*")
        .eq("category", categoryId);

      if (Products) {
        setProducts(Products);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-20 md:pb-0">
      <h1 className="text-2xl font-bold my-4">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Categories Section */}
        <div className="md:col-span-3">
          <CategoryList
            onCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Products Section */}
        <div className="md:col-span-9">
          {selectedCategory ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductItem key={product.id} productItem={product} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">
                Select a category to view products
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
