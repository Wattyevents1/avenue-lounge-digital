import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-lounge.jpg";
import cocktailsImg from "@/assets/cocktails.jpg";
import djImg from "@/assets/dj-event.jpg";
import vipImg from "@/assets/vip-lounge.jpg";
import foodImg from "@/assets/food-platter.jpg";

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
}

const fallbackImages: GalleryItem[] = [
  { id: "1", image_url: heroImg, caption: "Lounge interior" },
  { id: "2", image_url: cocktailsImg, caption: "Cocktails" },
  { id: "3", image_url: djImg, caption: "DJ Night" },
  { id: "4", image_url: vipImg, caption: "VIP Lounge" },
  { id: "5", image_url: foodImg, caption: "Food" },
  { id: "6", image_url: djImg, caption: "Party vibes" },
  { id: "7", image_url: cocktailsImg, caption: "Premium drinks" },
];

const spanPattern = [
  "col-span-2 row-span-2",
  "",
  "",
  "col-span-2",
  "",
  "",
  "",
];

const Gallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setImages(data);
      } else {
        setImages(fallbackImages);
      }
      setLoading(false);
    };
    fetchGallery();
  }, []);

  return (
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

          {loading ? (
            <div className="text-center text-muted-foreground py-20">Loading gallery...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`overflow-hidden rounded-xl group ${spanPattern[i % spanPattern.length]}`}
                >
                  <img
                    src={img.image_url}
                    alt={img.caption || "Gallery photo"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
