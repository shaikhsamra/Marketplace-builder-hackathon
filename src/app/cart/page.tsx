// app/cart/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CartItem {
  _id?: string; // if available
  id?: number; // fallback ID if needed
  name: string;
  price: number;
  quantity: number;
  image?: string; // optional image if available
  // Include other fields as needed (like size, color, etc.)
}

const Cart = () => {
  // Initialize with an empty array; later we’ll add any stored items.
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const deliveryFee = 15;
  const discountPercentage = 20;
  const router = useRouter()

  // When the component mounts, read the cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart).map((item: any) => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
      }));
      setCartItems(parsedCart);
    }
  }, []);

  const updateQuantity = (index: number, increment: boolean) => {
    const updatedItems = cartItems.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          quantity: increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
        };
      }
      
      return item;
    });
    
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const removeItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = (subtotal * discountPercentage) / 100;
  const total = subtotal - discount + deliveryFee;

  const goToCheckoutPage = () => {
    router.push("/checkout");
  };


  const handleStripeCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      }
    } catch (error) {
      console.error("Checkout Error:", error);
    }
  };
  

  return (
    <div className="p-6 lg:p-12 bg-gray-50 min-h-screen max-w-screen-2xl m-auto">
      <h1 className="text-3xl font-bold mb-6">YOUR CART</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
        
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-20 h-20 rounded"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  {/* Display additional details if available */}
                  <p className="font-bold">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <button
                  onClick={() => updateQuantity(index, false)}
                  className="w-8 h-8 border rounded text-xl"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, true)}
                  className="w-8 h-8 border rounded text-xl"
                >
                  +
                </button>
                {/* Remove Icon */}
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
          

        </div>

        {/* Right Section: Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">${subtotal}</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Discount</span>
            <span>-${discount}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total}</span>
          </div>
          {/* Promo Code Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              Apply
            </button>
          </div>
          {/* Checkout Button */}
          
          <button onClick={goToCheckoutPage} className="mt-4 w-full bg-black text-white py-3 rounded">
        Go to Checkout
      </button>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
