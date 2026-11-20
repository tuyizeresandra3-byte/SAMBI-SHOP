
const collections = [
  {
    category: "Women",
    items: ["Elegant Floral Dress", "Casual Summer Dress", "Maxi Dress", "Office Dress", "Denim Skirt", "Women's Blouse", "Crop Top", "Classic Jumpsuit"],
    image: "photo-1539109136881-3be0616acf4b",
    price: 18000
  },
  {
    category: "Men",
    items: ["Classic White Shirt", "Casual T-Shirt", "Formal Shirt", "Slim Fit Trousers", "Jeans", "Polo Shirt", "Hoodie", "Casual Jacket"],
    image: "photo-1618354691373-d851c5c3a990",
    price: 15000
  },
  {
    category: "Shoes",
    items: ["Running Sneakers", "Classic Heels", "Leather Sandals", "Sports Shoes", "Casual Loafers", "Flat Shoes", "High Top Sneakers", "Elegant Boots"],
    image: "photo-1542291026-7eec264c27ff",
    price: 25000
  },
  {
    category: "Accessories",
    items: ["Luxury Handbag", "Ladies Shoulder Bag", "Classic Watch", "Fashion Sunglasses", "Leather Wallet", "Gold Necklace", "Fashion Earrings", "Travel Backpack"],
    image: "photo-1584917865442-de89df76afd3",
    price: 12000
  },
  {
    category: "Beauty",
    items: ["Face Moisturizer", "Skin Care Set", "Body Lotion", "Beauty Makeup Kit", "Lip Gloss", "Perfume", "Face Cleanser", "Hair Care Set"],
    image: "photo-1608248543803-ba4f8c70ae0b",
    price: 9000
  },
  {
    category: "Kids",
    items: ["Kids Summer Outfit", "Baby Romper", "Children Sneakers", "Baby Dress", "Boys T-Shirt", "Girls Skirt", "Kids Hoodie", "Baby Shoes"],
    image: "photo-1519238263530-99bdd11df2ea",
    price: 10000
  },
  {
    category: "Home",
    items: ["Decorative Cushion", "Modern Table Lamp", "Soft Blanket", "Kitchen Organizer", "Wall Decoration", "Luxury Bedsheet", "Coffee Mug Set", "Storage Basket"],
    image: "photo-1616486338812-3dadae4b4ace",
    price: 14000
  },
  {
    category: "Electronics",
    items: ["Wireless Headphones", "Smart Watch", "Bluetooth Speaker", "Phone Holder", "USB Charger", "Wireless Mouse", "Power Bank", "LED Desk Lamp"],
    image: "photo-1498049794561-7780e7231661",
    price: 20000
  }
];

const products = collections.flatMap((collection, groupIndex) =>
  collection.items.map((name, index) => {
    const price = collection.price + index * 1500;
    const onSale = index % 3 === 0;

    return {
      id: `${groupIndex}-${index}`,
      name,
      category: collection.category,
      price,
      oldPrice: onSale ? Math.round(price * 1.3) : null,
      image: `https://images.unsplash.com/${collection.image}?auto=format&fit=crop&w=700&q=80`,
      rating: (4 + ((index + groupIndex) % 10) / 10).toFixed(1),
      isSale: onSale,
      description: `Discover our ${name.toLowerCase()}, selected for quality, comfort and style.`,
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"]
    };
  })
);

export default products;
