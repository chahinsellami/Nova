"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  collection?: string;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link href={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden aspect-3/4 bg-neutral-950 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            loading="lazy"
            className="object-cover transition-all duration-700 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[11px] font-light tracking-[0.1em] uppercase text-white/80 group-hover:text-white transition-colors duration-500">
              {product.name}
            </h3>
            {product.collection && (
              <p className="text-[10px] text-white/25 mt-1.5 tracking-[0.1em]">
                {product.collection}
              </p>
            )}
          </div>
          <span className="text-[11px] font-light text-white/40">
            {product.price}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
