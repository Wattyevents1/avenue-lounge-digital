import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-lounge.jpg";
import cocktailsImg from "@/assets/cocktails.jpg";
import foodImg from "@/assets/food-platter.jpg";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string | null;
  category: string;
  image_url: string | null;
  is_available: boolean;
}

const fallbackItems: MenuItem[] = [
  { id: "1", name: "Avenue Sunset", price: 25000, description: "Vodka, passion fruit, orange juice, grenadine", category: "cocktails", image_url: null, is_available: true },
  { id: "2", name: "Neon Mojito", price: 20000, description: "Rum, lime, mint, soda water, sugar", category: "cocktails", image_url: null, is_available: true },
  { id: "3", name: "Jameson Irish", price: 15000, description: "Single shot, neat or on the rocks", category: "whiskey", image_url: null, is_available: true },
  { id: "4", name: "Tusker Lager", price: 7000, description: "East Africa's favorite cold beer", category: "beers", image_url: null, is_available: true },
  { id: "5", name: "Spring Rolls", price: 15000, description: "Crispy vegetable spring rolls with sweet chili", category: "starters", image_url: null, is_available: true },
  { id: "6", name: "Avenue Steak", price: 45000, description: "Prime beef steak, pepper sauce, fries", category: "grills", image_url: null, is_available: true },
];

const categoryImg = (cat: string) => {
  if (["starters", "mains", "grills", "desserts"].includes(cat)) return foodImg;
  return cocktailsImg;
};

const formatPrice = (price: number) => `UGX ${price.toLocaleString()}`;

const MenuPage = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("all");

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_available", true)
        .order("category")
        .order("name");
      
      if (!error && data && data.length > 0) {
        setItems(data);
      } else {
        setItems(fallbackItems);
      }
      setLoading(false);
    };
    fetchMenu();
  }, []);

  const categories = ["all", ...Array.from(new Set(items.map((i) => i.category)))];
  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

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

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground py-20">Loading menu...</div>
          ) : (
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
                  <div key={item.id} className="glass-card overflow-hidden group">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={item.image_url || categoryImg(item.category)}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-display font-semibold text-foreground">{item.name}</h3>
                        <span className="text-primary font-semibold text-sm whitespace-nowrap">{formatPrice(item.price)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
