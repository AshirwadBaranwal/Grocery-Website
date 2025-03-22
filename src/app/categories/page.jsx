import React, { Suspense } from "react";
import Navbar from "@/components/Navbar.jsx";
import CategoriesContent from "./CategoriesContent";

const CategoriesPage = () => {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
        <CategoriesContent />
      </Suspense>
    </>
  );
};

export default CategoriesPage;
