import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";
import { Product } from "@/app/types/types";
import { urlFor } from "@/sanity/lib/image";
import HoverButton from "./hoverButton";

const ProductCard: React.FC<Product> = ({
  name,
  price,
  image,
  discountPercent,
  rating = 0,
  slug
}) => {
  const numericPrice = price || 0; // Default to 0 if price is undefined
  const numericOldPrice =
    discountPercent && price
      ? (price * (100 + discountPercent)) / 100
      : null; // Calculate old price only if valid
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const priceReduction = discountPercent ? `-${discountPercent}%` : "";

  return (
    <div className="p-4 rounded-lg text-start max-w-screen-2xl mx-auto">
      {/* Product Image */}
      <Link href={`/product/${slug || ""}`}>
        {/* Check slug and image to avoid issues with undefined */}
        <div className="relative group cursor-pointer rounded-lg md:w-[300px] md:h-[300px] w-[160px] h-[160px]">
          <Image
            src={image ? urlFor(image).url() : "/placeholder-image.jpg"} // Provide fallback image if missing
            alt={name}
            fill
            className="object-cover rounded-lg"
          />
          <HoverButton/>
        </div>

      {/* Product Details */}
      <h3 className="font-bold md:text-[20px] text-sm mt-2">{name}</h3>

      {/* Price Details */}
      <div className="flex items-start justify-start space-x-2 mt-2">
        <span className="text-black font-bold md:text-[24px] text-xl">
          ${numericPrice.toFixed(0)}
        </span>
        {numericOldPrice && numericOldPrice > numericPrice && (
          <>
            <span className="text-gray-400 md:text-[24px] text-xl font-bold line-through">
              ${numericOldPrice.toFixed(0)}
            </span>
            <span className="text-red-500 border-2 rounded-full bg-red-200 px-2 text-sm md:mt-2 mt-1">
              {priceReduction}
            </span>
          </>
        )}
      </div>

      {/* Rating Stars */}
      <div className="flex items-start justify-start space-x-1 text-yellow-400 text-md pt-2">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} />
        ))}
        {hasHalfStar && <FaStarHalf />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <FaRegStar key={index + fullStars + (hasHalfStar ? 1 : 0)} />
        ))}
        <p className="text-gray-500 text-sm pl-2 font-semibold">{rating}/5</p>
      </div>
        </Link>
    </div>
  );
};

export default ProductCard;
