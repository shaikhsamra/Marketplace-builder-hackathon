"use client";

import { Dispatch, SetStateAction } from "react";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  setSelectedSize: Dispatch<SetStateAction<string | null>>;
}

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }: SizeSelectorProps) => {
  // Debugging: log the selected size when a button is clicked
  const handleClick = (size: string) => {
    console.log("Selected size:", size);  // Add this line to log size
    setSelectedSize(size);
  };

  return (
    sizes && sizes.length > 0 && (
      <div>
        <h3 className="font-semibold font-integral">Choose Size:</h3>
        <div className="flex gap-2 mt-3">
          {sizes.map((size, index) => (
            <button
              key={index}
              className={`px-6 md:px-12 py-2 border rounded-full md:text-[16px] text-[10px] font-satoshi transition-all duration-300 ${
                selectedSize === size ? "bg-black text-white" : "bg-[#F0EEED] text-black"
              }`}
              onClick={() => handleClick(size)}  // Call handleClick on button click
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    )
  );
};

export default SizeSelector;
