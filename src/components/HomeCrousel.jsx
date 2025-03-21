"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const SliderList = [
  {
    image:
      "https://img.freepik.com/free-vector/flat-design-supermarket-facebook-cover-template_23-2150336119.jpg?t=st=1734158547~exp=1734162147~hmac=d29759e8d47046c731bb0884e9a8af0f573935dbfeb407059592d6084011a21f&w=900",
  },
  {
    image:
      "https://img.freepik.com/free-vector/flat-supermarket-social-media-cover-template_23-2149372555.jpg?t=st=1734158499~exp=1734162099~hmac=b58822926dcdb3254b75eaa361443e0a8de00142de6176eebc5152b817950558&w=1380",
  },
  {
    image:
      "https://img.freepik.com/free-vector/hand-drawn-nutritionist-advice-facebook-cover_23-2150172973.jpg?t=st=1734126613~exp=1734130213~hmac=a6119dd9799e0de83bad374c15fc66eaeaa954e96db3603b12a8f696cf9c63cf&w=1380",
  },
];

const HomeCrousel = () => {
  return (
    <div className="  md:py-5">
      <Carousel className="">
        <CarouselContent>
          {SliderList.map((items, index) => {
            return (
              <CarouselItem key={index}>
                <Image
                  src={items.image}
                  alt="banner"
                  height={300}
                  width={1500}
                  className="w-full h-[200px] md:h-[300px]  object-cover rounded-2xl"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HomeCrousel;
