"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/SupbaseConfig";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ProductItem from "@/components/ProductItem.jsx";

const CategoriesContent = () => {
  const [categoryItems, setCategoryItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");

  const getAllCategories = async () => {
    try {
      let { data: Categories, error } = await supabase
        .from("Categories")
        .select("*");
      if (Categories) {
        setCategoryItems(Categories);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsByCategory = async (categoryTitle) => {
    try {
      let { data: Products, error } = await supabase
        .from("AllProducts")
        .select("*")
        .eq("category", categoryTitle);

      if (Products) {
        setProducts(Products);
        setSelectedCategory(categoryTitle);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (categoryName) {
      getProductsByCategory(categoryName);
    }
  }, [categoryName]);

  return (
    <div className="flex bg-gray-100 pt-16">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white shadow-sm h-[calc(100vh-64px)]">
        {categoryItems.length > 0 ? (
          <div className="pb-20 md:pb-0 h-[calc(100vh-64px)] overflow-y-auto">
            {categoryItems.map((category, index) => (
              <Link
                href={`/categories?category=${encodeURIComponent(
                  category.title
                )}`}
                key={index}
                className={`block ${
                  selectedCategory === category.title
                    ? "bg-green-50 border-l-4 border-green-600 "
                    : "hover:bg-green-50/50"
                }`}
              >
                <div className="flex flex-col justify-center md:justify-start md:flex-row gap-2 items-center p-4 cursor-pointer transition-all duration-200">
                  <Image
                    className="size-10 md:size-12  mix-blend-multiply"
                    alt="icon"
                    height={20}
                    width={20}
                    loading="lazy"
                    src={category.image}
                  />
                  <span
                    className={`text-sm md:text-left text-center ${
                      selectedCategory === category.title
                        ? "text-green-700 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {category.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-600">No categories found</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 md:p-4 h-[calc(100vh-64px)] overflow-y-auto pb-20 md:pb-5">
        {selectedCategory ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedCategory}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5">
              {products.map((product, index) => (
                <ProductItem key={index} productItem={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-600">Select a category to view products</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesContent;
