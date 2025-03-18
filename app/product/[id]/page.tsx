"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Product } from "@/models/product_model";
import productData from "@/data/product_data.json";
import Image from "next/image";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const product: Product | undefined = productData.find(
    (p) => p.id.toString() === params.id
  );

  // Initialize selectedImage state unconditionally
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  const handleImageClick = (image: string) => {
    setIsImageLoaded(false);
    setSelectedImage(image);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Scroll
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

  return (
    <div className="bg-black container mx-auto lg:p-6 py-2 mt-16">
      <div className="flex justify-between items-center w-full my-8 text-white px-4">
        <div>
          <h2 className="text-2xl font-bold ">| ព័ត៌មានផលិតផល</h2>
        </div>
        <div className="text-center lg:hidden block">
          <button
            onClick={handleBack}
            className="p-2 bg-rose-500/20 text-rose-500 rounded-md hover:text-white transition duration-300"
          >
            ត្រឡប់ក្រោយ
          </button>
        </div>
      </div>

      <div className="mx-auto lg:p-8 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side */}
          <div className="flex flex-col items-center justify-center space-y-6">
            {selectedImage && (
              <div className="relative w-full h-2/3 overflow-hidden flex items-center justify-center">
                <Image
                  key={selectedImage}
                  width={480}
                  height={400}
                  src={selectedImage}
                  alt={product.title}
                  className={`border border-white p-0.5 rounded-2xl object-contain transition-opacity duration-700 ease-in-out ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoadingComplete={handleImageLoad}
                  placeholder="blur"
                  blurDataURL={selectedImage}
                />
              </div>
            )}

            {/* Horizontal Scroll */}
            <div className="relative lg:mt-2 w-full">
              {/* Left Scroll Button - Hidden on Mobile */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 hidden sm:block">
                <button
                  onClick={() => scroll("left")}
                  className=" bg-white/20 pb-1 text-white w-10 h-10 rounded-full hover:bg-rose-500/25 transition-all duration-300 transform hover:scale-110"
                >
                  &#8592;
                </button>
              </div>

              {/* Scrollable */}
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

              {/* Right Scroll Button - Hidden on Mobile */}
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

          {/* Right Side */}
          <div className="space-y-6">
            {/* Product Title and Price */}
            <div className="text-center lg:text-left">
              <h2
                className="lg:text-4xl text-lg font-bold text-gray-300"
                style={{ fontFamily: "Inter" }}
              >
                {product.title}
              </h2>
              <p className="text-lg text-gray-300 mt-3">ពណ៌៖ {product.color}</p>
              <p className="text-2xl font-semibold bg-rose-500/20 text-rose-500 mt-3 py-2 lg:pl-2">
                តម្លៃ៖ ${product.price}
              </p>
            </div>

            {/* Product Details */}
            <div className="bg-gray-950 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-300 mb-6">
                ផ្សេងទៀត
              </h3>
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
        </div>

        {/* Previous Page Button */}
        <div className="mt-6 text-center hidden sm:block">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-rose-500/20 text-rose-500 hover:text-white rounded-lg transition duration-300"
          >
            ត្រឡប់ក្រោយ
          </button>
        </div>
      </div>
    </div>
  );
}