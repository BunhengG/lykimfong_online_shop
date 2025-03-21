"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Product } from "@/models/product_model";
import productData from "@/data/product_data.json";
import Image from "next/image";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const product: Product | undefined = productData.find(
    (p) => p.id.toString() === params.id
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      if (direction === "right") {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!product) {
    return (
      <div className="text-center text-red-800 text-xl">Product not found.</div>
    );
  }

  const relatedProducts = productData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-gray-950 container mx-auto lg:p-6 py-2 mt-16">
      <div className="flex justify-between items-center w-full my-8 text-white px-4">
        <div>
          <h2 className="text-2xl font-bold">| ព័ត៌មានផលិតផល</h2>
        </div>
        <div className="text-center">
          <button
            onClick={handleBack}
            className="p-2 bg-blue-500/20 text-blue-500 rounded-md hover:text-white transition duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FiArrowLeft />
              ត្រឡប់ក្រោយ
            </div>
          </button>
        </div>
      </div>

      <div className="mx-auto lg:p-8 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center justify-center space-y-6">
            {selectedImage && (
              <div className="relative w-full h-2/3 overflow-hidden flex items-center justify-center">
                <InnerImageZoom
                  width={480}
                  height={400}
                  src={selectedImage}
                  zoomSrc={selectedImage}
                  zoomType="hover"
                  zoomScale={1.5}
                  fullscreenOnMobile={true}
                  className="border border-white p-0.5 rounded-2xl object-contain bg-gray-950"
                />
              </div>
            )}
            <div className="relative lg:mt-2 w-full">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 hidden sm:block">
                <button
                  onClick={() => scroll("left")}
                  className="bg-white/20 pb-1 text-white w-10 h-10 rounded-full hover:bg-rose-500/25 transition-all duration-300 transform hover:scale-110"
                >
                  &#8592;
                </button>
              </div>
              <div
                ref={scrollContainerRef}
                className="flex space-x-4 overflow-x-auto py-2 px-1 scrollbar-hide snap-x snap-mandatory scroll-smooth mx-auto w-full sm:max-w-[90%] md:max-w-[80%] max-w-full"
              >
                {product.images?.map((img, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center relative group cursor-pointer flex-shrink-0 w-28 h-28 bg-gray-900 border border-white rounded-lg transform transition-all duration-300 hover:scale-105 snap-center"
                    onClick={() => handleImageClick(img)}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} image ${index + 1}`}
                      className="rounded-lg object-cover transition-transform transform group-hover:scale-105"
                      width={110}
                      height={110}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 hidden sm:block">
                <button
                  onClick={() => scroll("right")}
                  className="bg-white/20 pb-1 text-white w-10 h-10 rounded-full hover:bg-rose-500/25 transition-all duration-300 transform hover:scale-110"
                >
                  &#8594;
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2
                className="lg:text-4xl text-lg font-bold text-gray-300"
                style={{ fontFamily: "Inter" }}
              >
                {product.title}
              </h2>
              <p className="text-lg text-gray-300 mt-3">ពណ៌៖ {product.color}</p>
              <p className="text-2xl font-semibold bg-blue-500/20 text-blue-500 mt-3 py-2 lg:pl-2">
                តម្លៃ៖ ${product.price}
              </p>
            </div>
            <ul className="space-y-4 text-lg text-gray-400">
              {product.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-rose-800 mr-4">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-white mb-4">
            | ផលិតផលទាក់ទង
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((related, index) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900 rounded-3xl transition duration-300 border border-gray-500 overflow-hidden"
              >
                <Image
                  src={related.image}
                  alt={related.title}
                  width={350}
                  height={250}
                  className="w-full h-96 object-cover rounded-t-3xl"
                />
                <div className="p-4 py-8">
                  <h3
                    className="text-lg font-semibold text-gray-300 mb-2"
                    style={{ fontFamily: "Inter" }}
                  >
                    {related.title}
                  </h3>
                  <p className="text-gray-400 text-base">
                    ពណ៌: {related.color}
                  </p>
                  <div className="flex gap-4">
                    <p className="text-gray-400 text-lg">តម្លៃ៖</p>
                    <p className="text-base font-bold text-blue-600 bg-blue-500/20 border-b-4 border-blue-400/20 px-2 rounded-sm">
                      $ {related.price}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push(`/product/${related.id}`)}
                    className="mt-4 w-full bg-blue-500/20 text-blue-500 hover:text-white border border-blue-600 hover:bg-blue-500 lg:py-3 lg:px-4 py-2 rounded-4xl cursor-pointer transition-all"
                  >
                    ចូលមើល
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
