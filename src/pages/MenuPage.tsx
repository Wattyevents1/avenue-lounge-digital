import { useRef } from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, Coffee, Pizza, IceCream, Sandwich, Croissant } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import heroImg from "@/assets/hero-lounge.jpg";

interface MenuItemData {
  name: string;
  price: string;
  note?: string;
}

interface MenuCategory {
  title: string;
  icon: React.ReactNode;
  items: MenuItemData[];
}

const menuData: MenuCategory[] = [
  {
    title: "Breakfast",
    icon: <Croissant size={22} />,
    items: [
      { name: "Beef Katogo", price: "15,000/-" },
      { name: "Vegetable Katogo", price: "10,000/-" },
      { name: "Avenue Special Breakfast", price: "25,000/-", note: "Toasted bread, sausages, fried potatoes & tea of your choice" },
    ],
  },
  {
    title: "Snacks",
    icon: <Sandwich size={22} />,
    items: [
      { name: "Plain Chapati", price: "3,000/-" },
      { name: "Pair of Beef Samosa", price: "6,000/-" },
      { name: "Pair of Vegetable Samosa", price: "5,000/-" },
      { name: "Ugandan Rolex", price: "10,000/-" },
      { name: "Chicken Rolex", price: "20,000/-" },
    ],
  },
  {
    title: "Main Course",
    icon: <UtensilsCrossed size={22} />,
    items: [
      { name: "Oven Grilled Chicken & Chips", price: "25,000/-" },
      { name: "Pan Fried Goat & Chips", price: "30,000/-" },
      { name: "Liver & Chips", price: "30,000/-" },
      { name: "Whole Tilapia Fish", price: "50,000/-" },
      { name: "Boiled Local Chicken", price: "15,000/-", note: "Served with two of cassava, matooke, kalo or rice" },
      { name: "Boiled Goat", price: "20,000/-", note: "Served with two of cassava, matooke, kalo or rice" },
    ],
  },
  {
    title: "Sandwiches",
    icon: <Sandwich size={22} />,
    items: [
      { name: "Chicken Sandwich", price: "25,000/-" },
      { name: "Vegetable Sandwich", price: "20,000/-" },
    ],
  },
  {
    title: "Pizza",
    icon: <Pizza size={22} />,
    items: [
      { name: "Beef / Chicken Pizza", price: "35,000/-" },
      { name: "Da Avenue Special Pizza", price: "40,000/-" },
    ],
  },
  {
    title: "Deserts",
    icon: <IceCream size={22} />,
    items: [
      { name: "Fruit Platter", price: "15,000/-" },
    ],
  },
  {
    title: "Coffee & Tea",
    icon: <Coffee size={22} />,
    items: [
      { name: "Black Tea", price: "5,000/-" },
      { name: "Black Tea Spiced", price: "7,000/-" },
      { name: "African Tea", price: "8,000/-" },
      { name: "African Tea Spiced", price: "10,000/-" },
      { name: "Dawa Tea", price: "10,000/-" },
      { name: "Black Coffee", price: "10,000/-" },
      { name: "African Coffee", price: "10,000/-" },
      { name: "Juice", price: "10,000/-" },
      { name: "Cocktail Juice", price: "12,000/-" },
    ],
  },
];

const MenuPage = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollTo = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Menu" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground">Our Menu</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeader subtitle="Food & Beverages" title="Crafted for Your Pleasure" />

          {/* Category quick-nav */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 sticky top-20 z-20 bg-background/80 backdrop-blur-md py-3 -mx-4 px-4 rounded-xl">
            {menuData.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => scrollTo(i)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                {cat.icon}
                {cat.title}
              </button>
            ))}
          </div>

          {/* Menu sections */}
          <div className="space-y-14 max-w-3xl mx-auto">
            {menuData.map((category, catIndex) => (
              <motion.div
                key={category.title}
                ref={(el) => { sectionRefs.current[catIndex] = el; }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="scroll-mt-36"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">{category.title}</h2>
                  <div className="flex-1 h-px bg-border ml-2" />
                </div>

                {/* Items */}
                <div className="space-y-1">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: itemIndex * 0.04 }}
                      className="flex justify-between items-baseline gap-4 py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </span>
                          <span className="flex-1 border-b border-dotted border-border/50 min-w-[2rem] translate-y-[-4px]" />
                        </div>
                        {item.note && (
                          <p className="text-xs text-muted-foreground mt-0.5 italic">{item.note}</p>
                        )}
                      </div>
                      <span className="text-primary font-semibold text-sm whitespace-nowrap">{item.price}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
