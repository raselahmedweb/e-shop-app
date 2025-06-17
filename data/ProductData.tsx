export const products = [
  {
    id: 1,
    title: "Men's Slim Fit T-Shirt",
    description: "100% cotton, breathable and comfortable for everyday wear.",
    gender: "male", // now renamed from "for"
    price: 100,
    salePrice: 85,
    image: [
      "https://example.com/images/mens-shirt-1.jpg",
      "https://example.com/images/mens-shirt-2.jpg",
    ],
    categoryId: 1,
    stock: 50,
    totalSold: 120,
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "white", "gray"],
    deliveryCharge: 25, // optional: default is 25 if not set
    flash: false,
    featured: true,
    isAvailable: true,
    brand: "Zara",
    material: "Cotton",
    rating: 4.6,
    tags: ["casual", "summer", "tshirt"],
    createdAt: Date.now(),
  },
  {
    id: 2,
    title: "Women's Elegant Handbag",
    description: "Stylish leather handbag with spacious compartments.",
    gender: "female",
    price: 250,
    salePrice: 199,
    image: [
      "https://example.com/images/handbag1.jpg",
      "https://example.com/images/handbag2.jpg",
    ],
    categoryId: 3,
    stock: 30,
    totalSold: 60,
    sizes: [], // not applicable
    colors: ["red", "black"],
    deliveryCharge: 30,
    flash: true,
    featured: true,
    isAvailable: true,
    brand: "Michael Kors",
    material: "Genuine Leather",
    rating: 4.8,
    tags: ["luxury", "leather", "bag"],
    createdAt: Date.now(),
  },
];

export const categories = [
  {
    id: 1,
    name: "Clothing",
    slug: "clothing",
    imageUrl: [
      "https://example.com/images/cat-clothing1.jpg",
      "https://example.com/images/cat-clothing2.jpg",
    ],
    description: "Trendy and comfortable clothes for all genders.",
    parentCategory: null,
    createdAt: Date.now(),
  },
  {
    id: 2,
    name: "Shoes",
    slug: "shoes",
    imageUrl: ["https://example.com/images/cat-shoes1.jpg"],
    description: "Footwear for sports, formal, and casual wear.",
    parentCategory: null,
    createdAt: Date.now(),
  },
  {
    id: 3,
    name: "Bags",
    slug: "bags",
    imageUrl: ["https://example.com/images/cat-bags1.jpg"],
    description: "Bags for every occasion: school, office, or party.",
    parentCategory: null,
    createdAt: Date.now(),
  },
];

export const users = [
  {
    uid: 1,
    name: "Rasel Ahmed",
    email: "itrasel75@gmail.com",
    photo: "https://example.com/avatars/rasel.jpg",
    provider: "google",
    phone: "+966500000000",
    role: "customer", // customer, admin, seller
    createdAt: Date.now(),
    address: {
      city: "Jeddah",
      country: "Saudi Arabia",
      zip: "21442",
      street: "King Abdulaziz Road",
    },
    wishlist: [2],
    cart: [],
  },
];



export const reviews = [
  {
    reviewId: 1,
    productId: 1,
    message: "Very comfortable and fits well!",
    star: 5,
    reviewerId: 1,
    createdAt: Date.now(),
  },
  {
    reviewId: 2,
    productId: 2,
    message: "Stylish and premium feel. Love it!",
    star: 4,
    reviewerId: 1,
    createdAt: Date.now(),
  },
];