// components/AddToCartButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/app/types/types"; // adjust the import path as needed

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const router = useRouter();

  const handleAddToCart = () => {
    // Retrieve any existing cart items from localStorage
    const storedCart = localStorage.getItem("cartItems");
    const cartItems = storedCart ? JSON.parse(storedCart) : [];

    // Map product to match CartItem interface:
    // If your product image is stored under 'image', but your cart expects 'img', do this:
    const productForCart = {
      ...product,
      img: product.image, // set the 'img' property based on product.image
    };

    // Add the new product to the cart
    cartItems.push(productForCart);

    // Save updated cart items
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Navigate to the cart page
    router.push("/cart");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-6 bg-black text-white py-3 px-16 md:px-[150px] rounded-full font-satoshi"
    >
      Add to Cart
    </button>
  );
}
