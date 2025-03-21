"use client";

import React from "react";

import { useEffect, useState } from "react";
import { Product } from "@/models/product_model";
import productData from "@/data/product_data.json";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const HomePage = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filteredProducts = productData
      .sort(
        (a: Product, b: Product) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 3);

    setNewProducts(filteredProducts);
  }, []);

  return (
    <div className="bg-gray-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: `url("./cover.jpg")` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto h-full flex justify-center items-center text-center text-white relative z-10">
          <div>
            <h1 className="text-white text-3xl md:text-6xl lg:font-bold font-medium lg:leading-tight mb-4">
              សូមស្វាគមន៍មកកាន់ហាងលីគីមហ្វុង
            </h1>
            <p className="text-white text-base md:text-2xl mb-6 px-6">
              ស្វែងរកផលិតផលលើគេហទំព័រយើងដែលអ្នកពេញចិត្ត
            </p>
            <Link
              href="/productList"
              className=" bg-blue-500/20 text-white hover:text-white border border-blue-600 hover:bg-blue-500 py-2 px-8 rounded-4xl"
            >
              ចូលមើលទំនិញ
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Product Showcase Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-gray-950"
      >
        <div className="container mx-auto text-center">
          <h2 className="lg:text-3xl text-2xl lg:font-semibold font-semibold text-white lg:mb-8">
            ផលិតផលថ្មី
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
            {newProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 rounded-3xl transition duration-300 relative border border-gray-500"
              >
                <Image
                  width={350}
                  height={330}
                  src={product.image}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-t-3xl"
                />
                <div className="p-4 py-8">
                  <h3
                    className="text-white text-xl font-semibold mb-2 truncate w-full"
                    style={{ fontFamily: "Inter" }}
                  >
                    {product.title}
                  </h3>
                  <p className="text-gray-400 mb-8">{product.details[0]}</p>
                  <button
                    onClick={() => {
                      window.location.href = "/productList";
                    }}
                    className="w-full bg-blue-500/20 text-blue-500 hover:text-white border border-blue-600 hover:bg-blue-500 py-3 px-4 rounded-4xl"
                  >
                    ចូលមើលបន្ថែម
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-8 bg-gray-900"
      >
        <div className="container mx-auto text-center">
          <h2 className="lg:text-3xl text-2xl font-semibold text-white mb-4">
            អំពីហាងយើងខ្ញុំ
          </h2>
          <div className="flex justify-center">
            <Image
              width={250}
              height={230}
              src="/lykimfong_logo.jpg"
              alt="About Us"
              className="w-40 h-40 object-cover rounded-lg mb-4 hover:shadow-2xl"
            />
          </div>
          <p className="text-base md:text-xl text-gray-400 lg:px-12 px-4 py-4 lg:leading-8 mb-2">
            នៅហាង លី គីមហ្វុង
            យើងផ្តល់ជូននូវផលិតផលជាច្រើនប្រភេទដែលមានគុណភាពខ្ពស់ក្នុងតម្លៃសមរម្យ
            និងអាចជឿទុកចិត្តបាន។ ដើម្បីធ្វើឱ្យអតិថិជនកាន់តែមានភាពងាយស្រួល
            និងទំនើប ពួកយើងបានបង្កើតនៅគេហទំព័រមួយនេះឡើង
            ដើម្បីអោយអតិថិជនអាចជ្រើសរើសផលិតផលបានដោយមានភាពងាយស្រួល និងរហ័ស។
          </p>
          <p className="text-sm md:text-base text-gray-400 px-4">
            យើងពេញចិត្តក្នុងការផ្តល់ជូនអតិថិជនរបស់យើងនូវផលិតផលមានគុណភាពល្អ
            និងទទួលមតិផ្សេងៗពីអតិថិជន។
          </p>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12 bg-gray-900 text-center"
      >
        <h2 className="text-xl text-gray-300 font-semibold mb-6">
          ទំនាក់ទំនងផ្សេងៗ
        </h2>
        <div className="flex justify-center gap-4 items-center">
          <Link href="#">
            <Image
              width={250}
              height={230}
              src="/fb.png"
              alt="Facebook Contact"
              className="w-10 h-10 object-cover"
            />
          </Link>
          <Link href="#">
            <Image
              width={250}
              height={230}
              src="/telegram.png"
              alt="Telegram Contact"
              className="w-10 h-10 object-cover"
            />
          </Link>
          <Link href="#">
            <Image
              width={250}
              height={230}
              src="/messenger.png"
              alt="Telegram Contact"
              className="w-10 h-10 object-cover"
            />
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
