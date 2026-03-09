import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import cocktailsImg from "@/assets/cocktails.jpg";
import foodImg from "@/assets/food-platter.jpg";
import heroImg from "@/assets/hero-lounge.jpg";

type Category = "all" | "cocktails" | "whiskey" | "wines" | "beers" | "starters" | "mains" | "grills" | "desserts";

interface MenuItem {
  name: string;
  price: string;
  desc: string;
  category: Category;
  img: string;
}

const menuItems: MenuItem[] = [
  { name: "Avenue Sunset", price: "UGX 25,000", desc: "Vodka, passion fruit, orange juice, grenadine", category: "cocktails", img: cocktailsImg },
  { name: "Neon Mojito", price: "UGX 20,000", desc: "Rum, lime, mint, soda water, sugar", category: "cocktails", img: cocktailsImg },
  { name: "Purple Rain", price: "UGX 28,000", desc: "Gin, blue curaçao, cranberry, lemon", category: "cocktails", img: cocktailsImg },
  { name: "Jameson Irish", price: "UGX 15,000", desc: "Single shot, neat or on the rocks", category: "whiskey", img: cocktailsImg },
  { name: "Jack Daniels", price: "UGX 18,000", desc: "Tennessee whiskey, smooth and classic", category: "whiskey", img: cocktailsImg },
  { name: "Sauvignon Blanc", price: "UGX 120,000", desc: "Full bottle, crisp and refreshing", category: "wines", img: cocktailsImg },
  { name: "Tusker Lager", price: "UGX 7,000", desc: "East Africa's favorite cold beer", category: "beers", img: cocktailsImg },
  { name: "Bell Lager", price: "UGX 6,000", desc: "Uganda's iconic beer, ice cold", category: "beers", img: cocktailsImg },
  { name: "Spring Rolls", price: "UGX 15,000", desc: "Crispy vegetable spring rolls with sweet chili", category: "starters", img: foodImg },
  { name: "Chicken Wings", price: "UGX 20,000", desc: "Spicy buffalo wings with blue cheese dip", category: "starters", img: foodImg },
  { name: "Grilled Tilapia", price: "UGX 35,000", desc: "Whole tilapia, lemon butter, vegetables", category: "mains", img: foodImg },
  { name: "Avenue Steak", price: "UGX 45,000", desc: "Prime beef steak, pepper sauce, fries", category: "grills", img: foodImg },
  { name: "BBQ Ribs", price: "UGX 40,000", desc: "Slow-cooked pork ribs, smoky BBQ glaze", category: "grills", img: foodImg },
  { name: "Chocolate Lava Cake", price: "UGX 18,000", desc: "Warm chocolate cake with vanilla ice cream", category: "desserts", img: foodImg },
];

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "cocktails", label: "Cocktails" },
  { value: "whiskey", label: "Whiskey" },
  { value: "wines", label: "Wines" },
  { value: "beers", label: "Beers" },
  { value: "starters", label: "Starters" },
  { value: "mains", label: "Main Dishes" },
  { value: "grills", label: "Grills" },
  { value: "desserts", label: "Desserts" },
];

const MenuPage = () => {
  const [active, setActive] = useState<Category>("all");
  const filtered = active === "all" ? menuItems : menuItems.filter((i) => i.category === active);

  return (
    <div className="pt-20">
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Menu" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground">Our Menu</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeader subtitle="Drinks & Food" title="Crafted for Your Pleasure" />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item) => (
                <div key={item.name} className="glass-card overflow-hidden group">
                  <div className="h-40 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display font-semibold text-foreground">{item.name}</h3>
                      <span className="text-secondary font-semibold text-sm whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
