export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  sizes: string[];
  materials: string;
  shipping: string;
  exchange: string;
}

const PRODUCTS: Product[] = [
  {
    id: "red-leather-jacket",
    name: "Red Lether Jacket",
    price: 80,
    image: "/redlether.png",
    description:
      "Premium hand-crafted leather jacket in deep crimson. Features a slim fit silhouette with matte hardware and reinforced stitching.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    materials:
      "100% genuine leather exterior, polyester lining. Matte zinc-alloy hardware.",
    shipping:
      "Free shipping on orders over 150 DT. Standard delivery 3-5 business days.",
    exchange:
      "Returns accepted within 14 days. Items must be unworn with tags attached.",
  },
  {
    id: "black-leather-jacket",
    name: "Black Lether Jacket",
    price: 80,
    image: "/blacklether.png",
    description:
      "Classic black leather jacket with shadow finish. Relaxed fit with asymmetric zip closure and quilted shoulder panels.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    materials:
      "100% genuine leather exterior, cotton-blend lining. Brushed nickel hardware.",
    shipping:
      "Free shipping on orders over 150 DT. Standard delivery 3-5 business days.",
    exchange:
      "Returns accepted within 14 days. Items must be unworn with tags attached.",
  },
  {
    id: "olive-bomber",
    name: "Olive Bomber Jacket",
    price: 95,
    originalPrice: 120,
    image: "",
    description:
      "Military-inspired bomber in matte olive. Oversized fit with ribbed cuffs and elastic waistband.",
    sizes: ["S", "M", "L", "XL"],
    materials: "Nylon shell, polyester fill. Brass YKK zipper.",
    shipping:
      "Free shipping on orders over 150 DT. Standard delivery 3-5 business days.",
    exchange:
      "Returns accepted within 14 days. Items must be unworn with tags attached.",
  },
  {
    id: "navy-trench",
    name: "Navy Trench Coat",
    price: 120,
    image: "",
    description:
      "Tailored trench coat in midnight navy. Double-breasted with storm flap and belted waist.",
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: "Cotton gabardine exterior, viscose lining. Horn buttons.",
    shipping:
      "Free shipping on orders over 150 DT. Standard delivery 3-5 business days.",
    exchange:
      "Returns accepted within 14 days. Items must be unworn with tags attached.",
  },
  {
    id: "camel-suede",
    name: "Camel Suede Jacket",
    price: 110,
    originalPrice: 140,
    image: "",
    description:
      "Soft suede jacket in warm camel tone. Western-inspired with snap buttons and patch pockets.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    materials: "100% goat suede, cotton lining. Antique brass snaps.",
    shipping:
      "Free shipping on orders over 150 DT. Standard delivery 3-5 business days.",
    exchange:
      "Returns accepted within 14 days. Items must be unworn with tags attached.",
  },
  {
    id: "charcoal-puffer",
    name: "Charcoal Puffer",
    price: 90,
    image: "",
    description:
      "Lightweight puffer in matte charcoal. Packable design with stand collar and water-resistant shell.",
    sizes: ["XS", "S", "M", "L", "XL"],
    materials:
      "Recycled nylon shell, synthetic down fill. Matte black hardware.",
    shipping:
      "Free shipping on orders over 150 DT. Standard delivery 3-5 business days.",
    exchange:
      "Returns accepted within 14 days. Items must be unworn with tags attached.",
  },
  {
    id: "ivory-moto",
    name: "Ivory Moto Jacket",
    price: 100,
    image: "",
    description:
      "Biker-cut jacket in off-white ivory. Cropped fit with asymmetric zip and belted hem.",
    sizes: ["XS", "S", "M", "L"],
    materials: "Faux leather exterior, jersey lining. Gunmetal hardware.",
    shipping:
      "Free shipping on orders over 150 DT. Standard delivery 3-5 business days.",
    exchange:
      "Returns accepted within 14 days. Items must be unworn with tags attached.",
  },
  {
    id: "burgundy-blazer",
    name: "Burgundy Blazer",
    price: 85,
    image: "",
    description:
      "Structured blazer in deep burgundy. Slim fit with peak lapels and single button closure.",
    sizes: ["S", "M", "L", "XL"],
    materials: "Wool-blend fabric, Bemberg lining. Corozo nut buttons.",
    shipping:
      "Free shipping on orders over 150 DT. Standard delivery 3-5 business days.",
    exchange:
      "Returns accepted within 14 days. Items must be unworn with tags attached.",
  },
  {
    id: "stone-parka",
    name: "Stone Parka",
    price: 130,
    originalPrice: 160,
    image: "",
    description:
      "Oversized parka in weathered stone. Faux-fur trimmed hood with fishtail hem.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    materials: "Cotton-nylon shell, synthetic insulation. Faux fur trim.",
    shipping:
      "Free shipping on orders over 150 DT. Standard delivery 3-5 business days.",
    exchange:
      "Returns accepted within 14 days. Items must be unworn with tags attached.",
  },
  {
    id: "midnight-denim",
    name: "Midnight Denim Jacket",
    price: 75,
    image: "",
    description:
      "Raw denim jacket in deep indigo wash. Classic trucker silhouette with contrast stitching.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    materials: "14oz raw selvedge denim, 100% cotton. Copper rivets.",
    shipping:
      "Free shipping on orders over 150 DT. Standard delivery 3-5 business days.",
    exchange:
      "Returns accepted within 14 days. Items must be unworn with tags attached.",
  },
];

export default PRODUCTS;

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
