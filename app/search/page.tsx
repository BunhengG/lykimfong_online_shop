"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import productData from "@/data/product_data.json";
import { Product } from "@/models/product_model";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import { FaTimesCircle } from "react-icons/fa";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Function to handle the search
  useEffect(() => {
    if (searchQuery) {
      const results = productData.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.price.toString().includes(searchQuery)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  const handleBack = () => {
    router.back();
  };

  const defaultProducts = productData.slice(0, 4);

  return (
    <div className="container mx-auto p-4 lg:p-16 mt-20 lg:mt-24">
      {/* Search Bar */}
      <div className="flex items-center justify-center mb-8 space-x-2">
        <button
          onClick={handleBack}
          className="text-white bg-gray-800 rounded-md px-4 py-2.5"
        >
          <FiArrowLeft className="text-xl" />
        </button>
        <div className="flex items-center w-full max-w-xl bg-gray-800 rounded-md">
          <input
            type="text"
            className="text-white bg-gray-800 border-none px-4 py-2 w-full rounded-md focus:outline-none"
            style={{ fontFamily: "Inter" }}
            placeholder="Search..."
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-white px-2 py-2 rounded-r-md"
            >
              <FaTimesCircle className="text-lg" />
            </button>
          )}
        </div>
      </div>

      {/* Show filtered products */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-gray-900 rounded-xl transition duration-300 relative border border-gray-500"
            >
              <Image
                width={250}
                height={230}
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-sm text-gray-400 truncate">
                  {product.title}
                </h3>
                <p className="text-base text-blue-600">${product.price}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-4">
            រកមិនឃើញផលិតផលទេ
          </p>
        )}
      </div>

      {/* Display additional products when no search results are found */}
      {filteredProducts.length === 0 && (
        <div className="mt-12">
          <h2 className="text-xl text-white mb-6">អ្នកអាចនឹងពេញចិត្ត៖</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {defaultProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-gray-900 rounded-xl transition duration-300 relative border border-gray-500"
              >
                <Image
                  width={250}
                  height={230}
                  src={product.image}
                  alt={product.title}
                  className="w-full lg:h-80 h-40 object-cover lg:rounded-t-xl rounded-t-xl bg-gray-700"
                />
                <div className="p-4">
                  <h3 className="text-sm text-gray-400 truncate">
                    {product.title}
                  </h3>
                  <p className="text-base text-blue-600">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
