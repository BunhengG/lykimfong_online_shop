import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const SearchButton = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detect device width to check if it's a mobile device
  useEffect(() => {
    const checkDeviceWidth = () => {
      setIsMobile(window.innerWidth <= 768); // Change 768px to the threshold you want
    };

    checkDeviceWidth();
    window.addEventListener("resize", checkDeviceWidth); 

    return () => {
      window.removeEventListener("resize", checkDeviceWidth); 
    };
  }, []);

  return (
    <button
      className=" cursor-text text-white bg-gray-800 border border-gray-600 rounded-md px-4 py-3 lg:w-1/4 w-[56px] max-w-xl flex items-center justify-start"
      style={{ fontFamily: "Inter" }}
      onClick={() => router.push("/search")}
    >
      {isMobile ? (
        <FaSearch className="text-lg" />
      ) : (
        <span>Search...</span>
      )}
    </button>
  );
};

export default SearchButton;
