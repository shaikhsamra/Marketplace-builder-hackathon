import React from "react";
import ProductCard from "@/components/home-page/productCard";
import { Product } from "@/app/types/types";

interface ProductListProps {
  title: string;
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, products }) => {
  return (
    <div className="mb-12 max-w-screen-2xl mx-auto">
      <h2 className="text-3xl lg:text-5xl font-bold text-center">{title}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-6">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
