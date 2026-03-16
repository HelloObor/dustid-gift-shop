import candleImg from "@/assets/products/candle.jpg";
import maskImg from "@/assets/products/mask.jpg";
import chocolateImg from "@/assets/products/chocolate.jpg";
import mugImg from "@/assets/products/mug.jpg";
import toteImg from "@/assets/products/tote.jpg";
import diffuserImg from "@/assets/products/diffuser.jpg";
import soapImg from "@/assets/products/soap.jpg";
import planterImg from "@/assets/products/planter.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export const products: Product[] = [
  { id: 1, name: "Scented Candle Set", price: 34.99, image: candleImg, category: "Home", description: "Three hand-poured soy candles in frosted glass jars. Notes of vanilla, sandalwood, and fresh linen create a warm, inviting atmosphere." },
  { id: 2, name: "Silk Sleep Mask", price: 24.99, image: maskImg, category: "Wellness", description: "100% mulberry silk sleep mask in soft lavender. Adjustable strap for a perfect fit. Gentle on skin and hair." },
  { id: 3, name: "Artisan Chocolate Box", price: 42.00, image: chocolateImg, category: "Food & Drink", description: "A curated selection of 16 handcrafted chocolates from master chocolatiers. Includes dark, milk, and white varieties." },
  { id: 4, name: "Ceramic Mug Duo", price: 28.50, image: mugImg, category: "Home", description: "Set of two handmade ceramic mugs in soft pastel tones. Microwave and dishwasher safe. 350ml capacity each." },
  { id: 5, name: "Linen Tote Bag", price: 39.00, image: toteImg, category: "Accessories", description: "Natural linen tote with reinforced handles. Spacious interior with an inner pocket. Perfect for everyday use." },
  { id: 6, name: "Essential Oil Diffuser", price: 55.00, image: diffuserImg, category: "Wellness", description: "Ceramic and wood ultrasonic diffuser with LED mood lighting. Whisper-quiet operation. Covers up to 30m²." },
  { id: 7, name: "Handmade Soap Set", price: 22.00, image: soapImg, category: "Bath & Body", description: "Five artisan soaps made with natural ingredients and dried flowers. Free from parabens and SLS. Beautifully presented." },
  { id: 8, name: "Succulent Planter", price: 32.00, image: planterImg, category: "Home", description: "Geometric concrete planter with a live succulent. Low maintenance and perfect for desks, shelves, or windowsills." },
];
