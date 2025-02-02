"use client"; // Client Component banane ke liye zaroori hai

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // App Router ke liye useParams()
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { client } from "@/sanity/lib/client";
import { Product } from "../types/types";


const BreadcrumbProduct = () => {
  const { slug } = useParams(); // ✅ Next.js 13+ App Router me ye use karein
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (slug) {
      client
        .fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug })
        .then((data: Product) => setProduct(data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [slug]);

  if (!product) return null;

  return (
    <Breadcrumb className="mb-5 sm:mb-9">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/category/${product.category}`}>{product.category}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{product.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbProduct;
