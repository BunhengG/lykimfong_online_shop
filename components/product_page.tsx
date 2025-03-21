"use client";

import { Product } from "@/models/product_model";
import productData from "@/data/product_data.json";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

const ProductPage = () => {
  const products: Product[] = productData;
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

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

  // func translate categories
  const translateCategory = (category: string) => {
    const translations: { [key: string]: string } = {
      adapter: "ខ្សែរសាក",
      charger: "ដុំសាក",
      chargerSet: "ឈុតដុំសាក",
      earphone: "កាសត្រចៀក",
      case: "សំបកទូរស័ព្ទ",
      all: "ទាំងអស់",
    };

    return translations[category] || category;
  };

  return (
    <div className="container mx-auto p-6 mt-16">
      {/* Title and Dropdown Filter Category */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white my-6">
          | បញ្ជីទាំងអស់
        </h2>
        <select
          className="text-white bg-gray-800 border border-gray-600 rounded-md px-4 py-1"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {translateCategory(category)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-900 rounded-3xl shadow-lg hover:shadow-xl transition duration-300 relative border border-gray-500 cursor-pointer"
          >
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(product.id.toString());
              }}
              className="p-3 absolute top-0 right-0 text-2xl bg-white/20 hover:bg-white/50 rounded-tr-3xl rounded-bl-4xl"
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
              className="w-full h-72 object-cover rounded-t-3xl"
              onClick={() => router.push(`/product/${product.id}`)}
            />
            <div className="p-4">
              <h3
                className="lg:text-xl text-lg text-gray-500 font-semibold lg:my-4 my-4"
                style={{ fontFamily: "Inter" }}
              >
                {product.title}
              </h3>
              <div className="flex gap-2">
                <p className="text-gray-400 text-lg">ពណ៌៖ </p>
                <p className="text-lg font-bold text-gray-300">
                  {product.color}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="text-gray-400 text-lg">តម្លៃ៖</p>
                <p
                  className="text-lg font-bold text-blue-600 bg-blue-500/20 border-b-4 border-blue-400/20 px-2 rounded-sm"
                  style={{ fontFamily: "Inter" }}
                >
                  ${product.price}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
