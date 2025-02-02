// import React, { createContext, useContext, useState } from "react";
// import { Product } from "@/app/types/types";

// interface CartItem extends Product {
//   selectedImage: string | null;
//   selectedSize: string | null;
//   selectedColor: string | null;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (product: CartItem) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const addToCart = (product: CartItem) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
