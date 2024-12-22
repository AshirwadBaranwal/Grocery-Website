import React from "react";

const ProductLoadingmodel = () => {
  const Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
      {Array.map((item, index) => {
        return (
          <div
            key={index}
            className="h-[250px] w-full bg-gray-300 animate-pulse rounded-lg mt-5"
          ></div>
        );
      })}
    </div>
  );
};

export default ProductLoadingmodel;
