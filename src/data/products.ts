export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  { id: 1, name: "Scented Candle Set", price: 34.99, image: "/products/candle.jpg", category: "Home" },
  { id: 2, name: "Silk Sleep Mask", price: 24.99, image: "/products/mask.jpg", category: "Wellness" },
  { id: 3, name: "Artisan Chocolate Box", price: 42.00, image: "/products/chocolate.jpg", category: "Food" },
  { id: 4, name: "Ceramic Mug Duo", price: 28.50, image: "/products/mug.jpg", category: "Home" },
  { id: 5, name: "Linen Tote Bag", price: 39.00, image: "/products/tote.jpg", category: "Accessories" },
  { id: 6, name: "Essential Oil Diffuser", price: 55.00, image: "/products/diffuser.jpg", category: "Wellness" },
  { id: 7, name: "Handmade Soap Set", price: 22.00, image: "/products/soap.jpg", category: "Bath" },
  { id: 8, name: "Succulent Planter", price: 32.00, image: "/products/planter.jpg", category: "Home" },
];
