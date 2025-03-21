"use client";
import supabase from "@/lib/SupbaseConfig";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CategoryList = () => {
  const [categoryItems, setCategoryItems] = useState([]);
  const array = [1, 2, 3, 4, 5, 6, 7];
  // const categoryItems = [
  //   {
  //     iamge:
  //       "https://img.freepik.com/free-vector/font-design-word-organic-with-fresh-bell-peppers_1308-42711.jpg?ga=GA1.1.1915150324.1734125249&semt=ais_hybrid",
  //     title: "Vegetables",
  //   },
  //   {
  //     iamge:
  //       "https://img.freepik.com/premium-vector/fresh-fruit-logo_25327-200.jpg?ga=GA1.1.1915150324.1734125249&semt=ais_hybrid",
  //     title: "Fruits",
  //   },
  //   {
  //     iamge:
  //       "https://img.freepik.com/premium-vector/fresh-milk-with-text_1308-13917.jpg?w=740",
  //     title: "Milk & Juice",
  //   },
  //   {
  //     iamge:
  //       "https://img.freepik.com/free-vector/different-types-breads_1308-114542.jpg?t=st=1734160305~exp=1734163905~hmac=855d9d2f6cc13647971aeca18b16743e3c488d4fe13b38877e65c5a45a0e1884&w=740",
  //     title: "Bakery",
  //   },
  //   {
  //     iamge:
  //       "https://img.freepik.com/premium-vector/spa-cosmetics_222142-63.jpg?w=740",
  //     title: "Personal care",
  //   },
  //   {
  //     iamge:
  //       "https://img.freepik.com/free-vector/realistic-wheat-spikelets-pasta_1284-22991.jpg?t=st=1734160399~exp=1734163999~hmac=07074a9a154852fc224efea1db3569eb05c637ee999c2ad02f19f6773a9ac8ec&w=740",
  //     title: "Grains",
  //   },
  //   {
  //     iamge:
  //       "https://img.freepik.com/premium-vector/soy-bag-isolated-white-background-dried-chickpeas-sack-isolated-white_1050166-4415.jpg?w=900",
  //     title: "Pulses",
  //   },
  // ];
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
                <div
                  key={index}
                  className="flex items-center justify-center gap-2 flex-col bg-green-100 p-2 rounded-md cursor-pointer "
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
                </div>
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
