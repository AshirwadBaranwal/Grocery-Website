import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackBar = ({ path }) => {
  return (
    <div className="  flex items-center w-full fixed top-0  z-50 bg-white  gap-2 font-poppins font-bold   pr-5 md:px-10 py-3 md:py-5 border border-gray-300">
      <Link className="flex gap-2" href={path}>
        <ArrowLeft />
        Back
      </Link>
    </div>
  );
};

export default BackBar;
