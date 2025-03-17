"use client";

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
      <div className="text-center text-red-500 text-xl">Product not found.</div>
    );
  }

  return (
    <div className="bg-gray-100">
      <div className="relative bg-cover bg-center h-52">
        <div className="absolute inset-0 bg-black flex justify-center items-end">
          <h1 className="text-white text-3xl font-semibold py-6">ផលិតផល</h1>
        </div>
      </div>

      <h2 className="lg:text-2xl text-xl font-bold mt-6 text-rose-500 px-6">
        | ព័ត៌មានផលិតផល
      </h2>

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side */}
          <div className="flex flex-col items-center justify-center space-y-6">
            {selectedImage && (
              <div className="relative w-full h-2/3 overflow-hidden flex justify-center bg-white p-2 shadow-xl rounded-2xl">
                <Image
                  key={selectedImage}
                  width={480}
                  height={400}
                  src={selectedImage}
                  alt={product.title}
                  className={`rounded-xl object-contain transition-opacity duration-700 ease-in-out ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoadingComplete={handleImageLoad}
                  placeholder="blur"
                  blurDataURL={selectedImage}
                />
              </div>
            )}

            {/* Horizontal Scroll */}
            <div className="relative mt-2 w-full">
              {/* Left Scroll Button - Hidden on Mobile */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 hidden sm:block">
                <button
                  onClick={() => scroll("left")}
                  className=" bg-black/50 pb-1 text-white w-10 h-10 rounded-full shadow-lg hover:bg-rose-400 transition-all duration-300 transform hover:scale-110"
                >
                  &#8592;
                </button>
              </div>

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="flex space-x-4 overflow-x-auto py-2 px-1 scrollbar-hide snap-x snap-mandatory scroll-smooth mx-auto w-full sm:max-w-[90%] md:max-w-[80%] max-w-full"
              >
                {product.images?.map((img, index) => (
                  <div
                    key={index}
                    className="flex justify-center items-center relative group cursor-pointer flex-shrink-0 w-28 h-28 bg-white px-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-md snap-center"
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
                  className="bg-black/50 pb-1 text-white w-10 h-10 rounded-full shadow-lg hover:bg-rose-400 transition-all duration-300 transform hover:scale-110"
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
              <h2 className="lg:text-4xl text-lg font-bold text-rose-600">
                {product.title}
              </h2>
              <p className="text-lg text-gray-600 mt-3">ពណ៌៖ {product.color}</p>
              <p className="text-2xl font-semibold text-rose-400 mt-3">
                តម្លៃ៖ ${product.price}
              </p>
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                ផ្សេងទៀត
              </h3>
              <ul className="space-y-4 text-lg text-gray-700">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-rose-500 mr-4">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Previous Page Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-400 transition duration-300"
          >
            ត្រឡប់ក្រោយ
          </button>
        </div>
      </div>
    </div>
  );
}
