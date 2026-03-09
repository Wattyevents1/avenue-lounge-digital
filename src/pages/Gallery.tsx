import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import heroImg from "@/assets/hero-lounge.jpg";
import cocktailsImg from "@/assets/cocktails.jpg";
import djImg from "@/assets/dj-event.jpg";
import vipImg from "@/assets/vip-lounge.jpg";
import foodImg from "@/assets/food-platter.jpg";

const images = [
  { src: heroImg, alt: "Lounge interior", span: "col-span-2 row-span-2" },
  { src: cocktailsImg, alt: "Cocktails", span: "" },
  { src: djImg, alt: "DJ Night", span: "" },
  { src: vipImg, alt: "VIP Lounge", span: "col-span-2" },
  { src: foodImg, alt: "Food", span: "" },
  { src: djImg, alt: "Party vibes", span: "" },
  { src: cocktailsImg, alt: "Premium drinks", span: "" },
];

const Gallery = () => (
  <div className="pt-20">
    <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
      <img src={heroImg} alt="Gallery" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground">Gallery</h1>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeader subtitle="Moments" title="Life at Da Avenue" description="Explore the energy, the vibes, and the unforgettable moments." />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`overflow-hidden rounded-xl group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Gallery;
