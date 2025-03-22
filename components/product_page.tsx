"use client";

import { Product } from "@/models/product_model";
import productData from "@/data/product_data.json";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import SearchButton from "./Search_Button";

const ProductPage = () => {
  const products: Product[] = productData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;

  // Extract unique categories from products
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Load favorites from localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, []);

  // NOTE: Toggle favorite status
  const handleFavoriteClick = (id: string) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(id)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== id);
    } else {
      updatedFavorites.push(id);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // func translate categories
  const translateCategory = (category: string) => {
    const translations: { [key: string]: string } = {
      adapter: "ខ្សែរសាក",
      charger: "ដុំសាក",
      chargerSet: "ឈុតដុំសាក",
      earphone: "កាសត្រចៀក",
      airpods: "Airpods",
      case: "ស្រោមទូរស័ព្ទ",
      screenProtector: "កញ្ចក់ការពារអេក្រង់",
      stand: "ជើងទម្រ",
      Lens: "Lens",
      all: "មើលទាំងអស់",
    };

    return translations[category] || category;
  };

  return (
    <div className="container mx-auto lg:p-16 p-4 mt-16">
      {/* Search and Dropdown Filter Category */}
      <div className="flex justify-between items-center gap-6 py-4">
        <SearchButton />
        <select
          className="text-white bg-gray-800 border border-gray-600 rounded-md px-4 py-2 w-1/3"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {translateCategory(category)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {currentProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-900 lg:rounded-3xl rounded-xl transition duration-300 relative border border-gray-500 cursor-pointer"
          >
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(product.id.toString());
              }}
              className="lg:p-3 p-1 absolute top-0 right-0 text-2xl bg-gray-800 hover:bg-gray-800/50 lg:rounded-tr-3xl rounded-tr-xl lg:rounded-bl-4xl rounded-bl-2xl"
            >
              {favorites.includes(product.id.toString()) ? (
                <FaHeart className="text-rose-600 cursor-pointer" />
              ) : (
                <FiHeart className="text-white cursor-pointer" />
              )}
            </button>

            <Image
              width={250}
              height={230}
              src={product.image}
              alt={product.title}
              className="w-full lg:h-80 h-40 object-cover lg:rounded-t-3xl rounded-t-xl bg-gray-700"
              onClick={() => router.push(`/product/${product.id}`)}
            />
            <div className="lg:p-4 p-2">
              <h3
                className=" lg:text-xl text-sm text-gray-400 font-semibold lg:my-4 my-4"
                style={{ fontFamily: "Inter" }}
              >
                {product.title}
              </h3>
              <div className="flex gap-2 mb-2">
                <p className="text-gray-400 lg:text-base text-sm">ពណ៌៖ </p>
                <p className="lg:text-base text-sm font-bold text-gray-300 truncate w-full">
                  {product.color}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="text-gray-400 lg:text-base text-sm">តម្លៃ៖</p>
                <p
                  className="lg:text-base text-sm lg:font-bold text-blue-600 bg-blue-500/20 border-b-4 border-blue-400/20 px-2 rounded-sm"
                  style={{ fontFamily: "Inter" }}
                >
                  ${product.price}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div
        className="flex justify-center mt-20 space-x-2"
        style={{ fontFamily: "Inter" }}
      >
        {/* First Page Button (<<) */}
        <button
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gray-700 text-white cursor-pointer"
          }`}
          onClick={() => currentPage > 1 && setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>

        {/* Previous Button (<) */}
        <button
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gray-700 text-white cursor-pointer"
          }`}
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-white cursor-pointer"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button (>) */}
        <button
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gray-700 text-white cursor-pointer"
          }`}
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>

        {/* Last Page Button (>>) */}
        <button
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gray-700 text-white cursor-pointer"
          }`}
          onClick={() => currentPage < totalPages && setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
