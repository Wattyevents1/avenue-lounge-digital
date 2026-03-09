import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Wine, Utensils, Crown, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-lounge.jpg";
import cocktailsImg from "@/assets/cocktails.jpg";
import djImg from "@/assets/dj-event.jpg";
import vipImg from "@/assets/vip-lounge.jpg";
import foodImg from "@/assets/food-platter.jpg";
import SectionHeader from "@/components/SectionHeader";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const events = [
  { title: "Afro Beats Friday", date: "Every Friday", img: djImg },
  { title: "Ladies Night", date: "Every Wednesday", img: cocktailsImg },
  { title: "VIP Sunday Brunch", date: "Every Sunday", img: vipImg },
];

const services = [
  { icon: Wine, title: "Premium Bar", desc: "Curated cocktails, whiskeys, vodkas and fine wines" },
  { icon: Utensils, title: "Restaurant", desc: "Gourmet grills, starters, and authentic local cuisine" },
  { icon: Calendar, title: "Events & DJ", desc: "Live DJs, theme nights, and weekend party experiences" },
  { icon: Crown, title: "VIP Lounge", desc: "Exclusive bottle service and private booth reservations" },
];

const Index = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img src={heroImg} alt="Da Avenue Lounge interior" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-4"
        >
          Mbale City, Uganda
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight"
        >
          Welcome to{" "}
          <span className="gold-shimmer text-primary">Da Avenue</span>{" "}
          <span className="gold-text">Lounge</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto"
        >
          Mbale's ultimate nightlife experience — bar, restaurant & nightclub under one roof.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/reservations"
            className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Reserve a Table
          </Link>
          <Link
            to="/menu"
            className="px-8 py-3.5 rounded-lg gold-border text-foreground font-semibold hover:bg-primary/10 transition-colors"
          >
            View Menu
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Services */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeader subtitle="What We Offer" title="The Avenue Experience" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card p-6 text-center group hover:border-primary/30 transition-colors"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:animate-glow">
                <s.icon className="text-primary" size={26} />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Drinks & Food */}
    <section className="section-padding bg-card/50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">Taste</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              Crafted Cocktails & <span className="gold-text">Gourmet Dishes</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              From signature cocktails to sizzling grills, our menu is designed to delight. Explore our full selection of premium spirits, wines, and locally inspired dishes.
            </p>
            <Link to="/menu" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Explore Full Menu <ArrowRight size={18} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src={cocktailsImg}
              alt="Premium cocktails"
              className="rounded-xl w-full h-64 object-cover"
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              src={foodImg}
              alt="Gourmet food"
              className="rounded-xl w-full h-64 object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Upcoming Events */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeader subtitle="What's On" title="Upcoming Events" description="Join us for unforgettable nights of music, dance, and celebration." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-xl"
            >
              <img src={e.img} alt={e.title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs uppercase tracking-wider text-primary font-semibold">{e.date}</span>
                <h3 className="text-xl font-display font-bold text-foreground mt-1">{e.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/events" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View All Events <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>

    {/* VIP Section */}
    <section className="relative overflow-hidden">
      <img src={vipImg} alt="VIP Lounge" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative section-padding">
        <div className="container mx-auto text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Crown className="text-secondary mx-auto mb-4" size={40} />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              The <span className="gold-text">VIP</span> Experience
            </h2>
            <p className="text-muted-foreground mb-8">
              Exclusive booths, premium bottle service, and a dedicated host. Celebrate birthdays, corporate events, or simply enjoy the best seat in the house.
            </p>
            <Link
              to="/reservations"
              className="inline-flex px-8 py-3.5 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Book VIP
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

export default Index;
