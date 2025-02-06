import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";
import { Product } from "@/app/types/types";
import { urlFor } from "@/sanity/lib/image";


const ProductCard: React.FC<Product> = ({
  _id,
  name,
  price,
  image,
  discountPercent,
  rating = 0,
  slug,
  quantity = 1, // Default value if not provided
  oldPrice = 0, // Default value if not provided
  description = "", // Default empty string if not provided
  category = "General", // Default category if not provided
}) => {
  const numericPrice = price || 0; // Default to 0 if price is undefined
  const numericOldPrice =
    discountPercent && price
      ? (price * (100 + discountPercent)) / 100
      : oldPrice; // Use oldPrice from props or default value
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const priceReduction = discountPercent ? `-${discountPercent}%` : "";
  

  const product: Product = {
    _id,
    name,
    price,
    image,
    discountPercent,
    rating,
    slug,
    quantity,
    oldPrice,
    description,
    category,
    isNew: false,
    colors: [],
    sizes: [],
    inventory: 0,
    imageUrl: "",
    selectedColor: null,
    selectedSize: null
  };

  return (
    <div className="p-4 rounded-lg text-start max-w-screen-2xl">
      {/* Product Image */}
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden cursor-pointer rounded-lg md:w-[300px] md:h-[300px] w-[140px] h-[140px]">
          <Image
            src={image ? urlFor(image).url() : "/placeholder-image.jpg"}
            alt={name}
            fill
            className="object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Product Details */}
      <h3 className="font-bold md:text-[20px] text-sm mt-2">{name}</h3>

      {/* Price Details */}
      <div className="flex items-start justify-start space-x-2 mt-2">
        <span className="text-black font-bold md:text-[24px] text-lg">
          ${numericPrice.toFixed(0)}
        </span>
        {numericOldPrice && numericOldPrice > numericPrice && (
          <>
            <span className="text-gray-400 md:text-[24px] text-lg font-bold line-through">
              ${numericOldPrice.toFixed(0)}
            </span>
            <span className="text-red-500 border-2 rounded-full bg-red-200 px-1 text-sm lg:mt-2 mt-1">
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
    </div>
  );
};

export default ProductCard;
