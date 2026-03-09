import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "@/components/SectionHeader";
import djImg from "@/assets/dj-event.jpg";
import cocktailsImg from "@/assets/cocktails.jpg";
import vipImg from "@/assets/vip-lounge.jpg";
import heroImg from "@/assets/hero-lounge.jpg";

const events = [
  {
    title: "Afro Beats Friday",
    date: "Every Friday",
    time: "9 PM – 4 AM",
    desc: "The biggest Afrobeats party in Mbale! Top DJs spinning the hottest tracks all night long.",
    img: djImg,
    tag: "Weekly",
  },
  {
    title: "Ladies Night",
    date: "Every Wednesday",
    time: "7 PM – Midnight",
    desc: "Ladies drink free cocktails till 10 PM. Live acoustic performances and chill vibes.",
    img: cocktailsImg,
    tag: "Weekly",
  },
  {
    title: "VIP Sunday Brunch",
    date: "Every Sunday",
    time: "11 AM – 3 PM",
    desc: "Premium brunch with bottomless mimosas, live jazz, and our finest dishes.",
    img: vipImg,
    tag: "Weekly",
  },
  {
    title: "Neon Glow Party",
    date: "March 22, 2026",
    time: "10 PM – Late",
    desc: "UV lights, neon body paint, and electrifying beats. Dress in white and glow all night!",
    img: djImg,
    tag: "Special",
  },
  {
    title: "Easter Weekend Bash",
    date: "April 4–5, 2026",
    time: "8 PM – Late",
    desc: "Two nights of non-stop entertainment with guest DJs, fire shows, and VIP packages.",
    img: heroImg,
    tag: "Special",
  },
];

const Events = () => (
  <div className="pt-20">
    <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
      <img src={djImg} alt="Events" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground">Events</h1>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeader subtitle="What's Happening" title="Upcoming Nights" description="Join us for electrifying events every week. Book your spot early!" />

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card overflow-hidden flex flex-col md:flex-row group"
            >
              <div className="md:w-72 h-48 md:h-auto overflow-hidden shrink-0">
                <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      event.tag === "Special" ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
                    }`}>
                      {event.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{event.desc}</p>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {event.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {event.time}</span>
                  <Link to="/reservations" className="ml-auto text-secondary font-semibold hover:underline">Book Now</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Events;
