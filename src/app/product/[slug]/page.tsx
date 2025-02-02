// app/product/[slug]/page.tsx

import { Product } from "@/app/types/types";
import  client  from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Image from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa";
import { TiMinus, TiPlus } from "react-icons/ti";
import ReviewLinks from "@/app/product/reviewLinks/links";
import AddToCartButton from "@/components/buttons/addToCartButton"; // adjust the path as needed

interface ProductPageProps {
  params: { slug: string };
}

// Fetch a single product by slug
async function getProduct(slug: string): Promise<Product | null> {
  const product = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      price,
      description,
      "image": image.asset->url,
      category,
      discountPercent,
      isNew,
      colors,
      sizes,
      rating,
      "slug": slug.current
    }`,
    { slug }
  );

  if (product) {
    const oldPrice = product.discountPercent
      ? (product.price * (100 + product.discountPercent)) / 100
      : null;

    return {
      ...product,
      oldPrice, // Add the old price to the product data
    };
  }

  return null; // Return null if product not found
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const {
    name,
    price,
    oldPrice,
    description,
    image,
    discountPercent,
    colors,
    sizes,
    rating,
  } = product;

  return (
    <div className="max-w-screen-2xl mx-auto bg-gray-50 px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col-reverse md:flex-row gap-5">
          <div className="w-[160px] h-[130px] mt-2 rounded-2xl">
            {image && (
              <Image
                src={urlFor(image).url()}
                alt={name}
                width={500}
                height={500}
                className="rounded-2xl shadow-md w-[150px] h-[130px]"
              />
            )}
          </div>
          {/* Product Image */}
          <div className="w-full h-auto rounded-full">
            {image && (
              <Image
                src={urlFor(image).url()}
                alt={name}
                width={500}
                height={500}
                className="rounded-lg  w-full h-auto"
              />
            )}
          </div>
        </div>
        {/* Product Details */}
        <div className="flex flex-col gap-6 mt-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-integral">
            {name}
          </h1>

          {/* Rating */}
          <div className="flex items-center text-lg text-yellow-400">
            {[...Array(Math.floor(rating))].map((_, i) => (
              <span key={i}>
                <FaStar />
              </span>
            ))}
            {rating % 1 !== 0 && <span>⭐</span>}
            {[...Array(5 - Math.ceil(rating))].map((_, i) => (
              <FaRegStar key={i} />
            ))}
            <span className="ml-2 text-sm text-gray-500">({rating}/5)</span>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center gap-2 font-bold">
            <p className="text-lg md:text-[35px] text-black">
              ${price.toFixed(0)}
            </p>
            {oldPrice && (
              <div className="flex items-center gap-2 text-gray-400">
                <p className="text-lg md:text-[35px] line-through">
                  ${oldPrice.toFixed(0)}
                </p>
                <p className="text-sm bg-red-200 text-red-400 px-2 rounded-full">
                  -{discountPercent}%
                </p>
              </div>
            )}
          </div>

          <hr />

          {/* Description */}
          <p className="text-md text-gray-700 font-satoshi -mt-2">
            {description}
          </p>

          <hr />

          {/* Category, Colors, Sizes */}
          <div className="space-y-2 -mt-2">
            {colors && colors.length > 0 && (
              <div>
                <h3 className="font-semibold font-integral">
                  Choose Colors:
                </h3>
                <div className="flex gap-2 mt-2">
                  {colors.map((color, index) => (
                    <span
                      key={index}
                      className="w-8 h-8 border-2 border-black rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {sizes && sizes.length > 0 && (
              <div>
                <h3 className="font-semibold font-integral">
                  Choose Size:
                </h3>
                <div className="flex gap-2 mt-3">
                  {sizes.map((size, index) => (
                    <span
                      key={index}
                      className="px-4 md:px-12 py-2 border rounded-full md:text-[16px] text-md font-satoshi"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity Controls (dummy button for now) */}
          <div className="flex gap-5 -mt-4">
            <button className="flex md:gap-10 gap-4 items-center mt-6 bg-black text-white py-3 px-8  rounded-full font-satoshi">
              <TiMinus /> 0 <TiPlus />
            </button>
            {/* Use our client component for Add to Cart */}
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
      <ReviewLinks />
    </div>
  );
}
