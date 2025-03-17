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

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-3xl shadow-md bg-white cursor-pointer relative"
          >
            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(product.id.toString());
              }}
              className="p-3 absolute top-0 right-0 text-2xl bg-white/40 rounded-tr-3xl rounded-bl-4xl"
            >
              {/* {favorites.includes(product.id.toString()) ? "❤️" : "🤍"} */}
              {favorites.includes(product.id.toString()) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FiHeart className="text-white" />
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
                className="lg:text-xl text-base text-gray-500 font-semibold lg:my-4 my-4"
                style={{ fontFamily: "Inter" }}
              >
                {product.title}
              </h3>
              <p className="text-gray-500 text-lg">ពណ៌៖ {product.color}</p>
              <div className="flex gap-4">
                <p className="text-lg font-bold">តម្លៃ៖</p>
                <p
                  className="text-lg font-bold text-rose-500"
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
