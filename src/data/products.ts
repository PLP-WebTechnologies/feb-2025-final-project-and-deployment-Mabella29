
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 249.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Experience crystal-clear sound with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    featured: true,
    rating: 4.8
  },
  {
    id: 2,
    name: "Slim Fit Denim Jacket",
    price: 89.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Classic denim jacket with a modern slim fit. Features premium stitching, adjustable cuffs, and multiple pockets for functionality and style.",
    rating: 4.5
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    price: 199.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Stay connected with our latest smartwatch. Features health tracking, notifications, water resistance, and a stunning always-on display.",
    featured: true,
    rating: 4.7
  },
  {
    id: 4,
    name: "Minimalist Ceramic Vase",
    price: 39.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Add elegance to your home with our handcrafted ceramic vase. Perfect for fresh or dried flowers with its timeless minimalist design.",
    rating: 4.3
  },
  {
    id: 5,
    name: "Leather Messenger Bag",
    price: 129.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Crafted from premium full-grain leather, this messenger bag features multiple compartments, adjustable strap, and fits laptops up to 15 inches.",
    featured: true,
    rating: 4.9
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    price: 49.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Charge your devices without the hassle of cables. Compatible with all Qi-enabled devices with fast charging technology.",
    rating: 4.2
  },
  {
    id: 7,
    name: "Cotton Crewneck Sweater",
    price: 59.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Stay warm with our soft cotton sweater. Features ribbed cuffs and hem for a comfortable fit in all casual occasions.",
    rating: 4.4
  },
  {
    id: 8,
    name: "Modern Desk Lamp",
    price: 79.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Adjustable desk lamp with three brightness levels and color temperature settings. Features USB charging port and modern design.",
    rating: 4.6
  },
  {
    id: 9,
    name: "Polarized Sunglasses",
    price: 119.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Premium polarized sunglasses with UV400 protection. Lightweight yet durable frame with classic design that suits any face shape.",
    featured: true,
    rating: 4.7
  },
  {
    id: 10,
    name: "Smart Home Speaker",
    price: 149.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Voice-controlled smart speaker with premium sound quality. Control your smart home devices, play music, and get information with simple voice commands.",
    rating: 4.5
  },
  {
    id: 11,
    name: "Canvas Backpack",
    price: 69.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Durable canvas backpack with leather details. Features padded laptop sleeve, multiple pockets, and comfortable straps for everyday use.",
    rating: 4.3
  },
  {
    id: 12,
    name: "Aromatherapy Diffuser",
    price: 45.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1608571423539-e951a50e493e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Ultrasonic aromatherapy diffuser with 7 changing LED light colors. Features auto shut-off and multiple mist modes for relaxation.",
    rating: 4.4
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};
