import Image from "next/image";
import React, { useEffect, useState } from "react";

const OrderedCartDetails = ({ cart }) => {
  const [cartToRender, setCartToRender] = useState([]);
  useEffect(() => {
    const parsedItems = typeof cart === "string" ? JSON.parse(cart) : cart;

    setCartToRender(parsedItems);
  }, [cart]);

  return (
    <div>
      {cartToRender &&
        cartToRender.map((item, index) => (
          <div
            key={index}
            className="flex items-start bg-white p-4 rounded-lg shadow-md relative pt-8 mb-5 "
          >
            {item?.product?.images ? (
              <Image
                src={item?.product?.images.trim()}
                alt="img"
                width={100}
                height={10}
                className="w-20 h-20 rounded-lg object-contain"
              />
            ) : (
              <Image
                src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                alt="img"
                width={100}
                height={10}
                className="w-20 h-20 rounded-lg object-contain"
              />
            )}

            <div className="ml-4 flex-1">
              <p className="text-lg font-medium text-gray-900 leading-tight">
                {item?.product?.name}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Quantity-Type: {item?.product?.itemQuantityType}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Quantity: {item?.quantity}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Price: ₹{item?.product?.sellingPrice?.toFixed(2)}
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              ₹{item?.quantity * item?.product?.sellingPrice?.toFixed(2)}
            </p>
          </div>
        ))}
    </div>
  );
};

export default OrderedCartDetails;
