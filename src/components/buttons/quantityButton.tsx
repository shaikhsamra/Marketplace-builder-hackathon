"use client";

import { useState } from "react";
import { TiMinus, TiPlus } from "react-icons/ti";

const QuantityButton = () => {
  const [count, setCount] = useState(0);

  return (
    <button
      className="flex md:gap-10 gap-4 items-center mt-6 bg-[#F0EEED] text-black  py-3 px-8 rounded-full font-satoshi"
    >
      <TiMinus
        onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
        className="cursor-pointer"
      />
      {count}
      <TiPlus
        onClick={() => setCount((prev) => prev + 1)}
        className="cursor-pointer"
      />
    </button>
  );
};

export default QuantityButton;
