import ProductPage from "@/components/product_page";
import React from "react";

const ProductList = () => {
  return (
    <div className="bg-gray-100">
      <div className="relative bg-contain bg-center h-52">
        <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-end">
          <h1 className="text-white text-3xl font-semibold py-6">ផលិតផល</h1>
        </div>
      </div>

      <h2 className="lg:text-2xl text-xl font-bold mt-6 text-rose-500 px-6">
        | បញ្ជីទាំងអស់
      </h2>

      <ProductPage />
    </div>
  );
};

export default ProductList;
