import React from "react";
import ProductCard from "@/components/home-page/productCard";
import { Product } from "@/app/types/types";

interface ProductListProps {
  title: string;
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, products }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl md:text-5xl font-bold text-center">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
