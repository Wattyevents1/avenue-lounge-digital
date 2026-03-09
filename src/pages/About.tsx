import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import heroImg from "@/assets/hero-lounge.jpg";
import vipImg from "@/assets/vip-lounge.jpg";

const About = () => (
  <div className="pt-20">
    {/* Hero Banner */}
    <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
      <img src={heroImg} alt="Da Avenue Lounge" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground">About Us</h1>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionHeader subtitle="Our Story" title="Where Mbale Comes Alive" center={false} />
            <p className="text-muted-foreground mb-4">
              Da Avenue Lounge was born from a vision to bring world-class nightlife to Mbale City. Nestled on Church Road, opposite the NRM Offices, we've created a space where great food, premium drinks, and electrifying entertainment converge.
            </p>
            <p className="text-muted-foreground mb-4">
              From intimate dinner dates to wild weekend parties, our lounge offers an experience for every occasion. Our team of passionate mixologists, chefs, and entertainers work together to ensure every visit is memorable.
            </p>
            <p className="text-muted-foreground">
              Whether you're savoring our signature cocktails at the bar, enjoying a gourmet meal in the restaurant, or dancing the night away in our club section — Da Avenue Lounge is where unforgettable memories are made.
            </p>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            src={vipImg}
            alt="VIP area"
            className="rounded-xl w-full h-96 object-cover"
          />
        </div>
      </div>
    </section>

    <section className="section-padding bg-card/50">
      <div className="container mx-auto text-center">
        <SectionHeader subtitle="Our Mission" title="Elevating Nightlife in Eastern Uganda" />
        <div className="grid sm:grid-cols-3 gap-8 mt-8">
          {[
            { num: "01", title: "Premium Quality", desc: "Only the finest spirits, freshest ingredients, and best entertainment." },
            { num: "02", title: "Unforgettable Vibes", desc: "Curated playlists, live DJs, and an atmosphere that pulses with energy." },
            { num: "03", title: "Community First", desc: "A gathering place for Mbale's vibrant community and visitors alike." },
          ].map((item) => (
            <motion.div key={item.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
              <span className="text-4xl font-display font-bold gold-text">{item.num}</span>
              <h3 className="text-lg font-display font-semibold text-foreground mt-4 mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
