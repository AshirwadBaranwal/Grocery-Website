"use client";
import supabase from "@/lib/SupbaseConfig";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CategoryList = () => {
  const [categoryItems, setCategoryItems] = useState([]);
  const array = [1, 2, 3, 4, 5, 6, 7];

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

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="my-2">
      <h2 className="my-3 text-2xl font-concertOne text-primary  md:font-bold">
        Shop By Category
      </h2>
      <div className="">
        {categoryItems.length > 0 ? (
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7  gap-3">
            {categoryItems?.map((items, index) => {
              return (
                <Link
                  href={`/categories?category=${encodeURIComponent(
                    items.title
                  )}`}
                  key={index}
                  className="flex items-center justify-center gap-2 flex-col bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out"
                >
                  <Image
                    className="size-12 mix-blend-multiply "
                    src={items.image}
                    alt="icon"
                    height={500}
                    width={500}
                    loading="lazy"
                  />
                  <p className="font-poppins text-xs md:text-sm font-semibold text-gray-600 text-center">
                    {items.title}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7  gap-3">
            {array?.map((items, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2 flex-col bg-gray-100 w-full h-[90px] rounded-md cursor-pointer animate-pulse "
                ></div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
