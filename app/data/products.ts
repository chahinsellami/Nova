import { Product } from "@/app/components/ProductCard";

export const mensProducts: Product[] = [
  {
    id: "kyoto-black-hoodie",
    name: "Kyoto Black Hoodie",
    price: "$185",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    category: "mens",
    collection: "FW26",
  },
  {
    id: "tokyo-cargo-pants",
    name: "Tokyo Cargo Pants",
    price: "$220",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    category: "mens",
    collection: "FW26",
  },
  {
    id: "osaka-bomber-jacket",
    name: "Osaka Bomber Jacket",
    price: "$340",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    category: "mens",
    collection: "FW26",
  },
  {
    id: "nara-knit-sweater",
    name: "Nara Knit Sweater",
    price: "$165",
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80",
    category: "mens",
    collection: "FW26",
  },
  {
    id: "sapporo-wool-coat",
    name: "Sapporo Wool Coat",
    price: "$450",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
    category: "mens",
    collection: "FW26",
  },
  {
    id: "hiroshima-tee",
    name: "Hiroshima Essential Tee",
    price: "$75",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    category: "mens",
    collection: "SS26",
  },
];

export const womensProducts: Product[] = [
  {
    id: "sakura-silk-dress",
    name: "Sakura Silk Dress",
    price: "$295",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    category: "womens",
    collection: "FW26",
  },
  {
    id: "shibuya-trench-coat",
    name: "Shibuya Trench Coat",
    price: "$380",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    category: "womens",
    collection: "FW26",
  },
  {
    id: "ginza-cashmere-knit",
    name: "Ginza Cashmere Knit",
    price: "$245",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    category: "womens",
    collection: "FW26",
  },
  {
    id: "harajuku-wide-pants",
    name: "Harajuku Wide Pants",
    price: "$195",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    category: "womens",
    collection: "FW26",
  },
  {
    id: "aoyama-blazer",
    name: "Aoyama Blazer",
    price: "$320",
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80",
    category: "womens",
    collection: "FW26",
  },
  {
    id: "omotesando-silk-top",
    name: "Omotesando Silk Top",
    price: "$155",
    image:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80",
    category: "womens",
    collection: "SS26",
  },
];

export const featuredProducts: Product[] = [
  mensProducts[0],
  womensProducts[0],
  mensProducts[2],
  womensProducts[4],
  mensProducts[4],
];
