import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import SectionHeader from "@/components/SectionHeader";
import { supabase } from "@/integrations/supabase/client";
import djImg from "@/assets/dj-event.jpg";
import cocktailsImg from "@/assets/cocktails.jpg";
import vipImg from "@/assets/vip-lounge.jpg";
import heroImg from "@/assets/hero-lounge.jpg";

interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string | null;
  event_type: string;
  image_url: string | null;
}

const fallbackEvents: EventItem[] = [
  { id: "1", title: "Afro Beats Friday", date: "2026-03-13T21:00:00Z", description: "The biggest Afrobeats party in Mbale! Top DJs spinning the hottest tracks all night long.", event_type: "party", image_url: null },
  { id: "2", title: "Ladies Night", date: "2026-03-11T19:00:00Z", description: "Ladies drink free cocktails till 10 PM. Live acoustic performances and chill vibes.", event_type: "ladies_night", image_url: null },
  { id: "3", title: "VIP Sunday Brunch", date: "2026-03-15T11:00:00Z", description: "Premium brunch with bottomless mimosas, live jazz, and our finest dishes.", event_type: "brunch", image_url: null },
  { id: "4", title: "Neon Glow Party", date: "2026-03-22T22:00:00Z", description: "UV lights, neon body paint, and electrifying beats. Dress in white and glow all night!", event_type: "special", image_url: null },
];

const typeImg = (type: string) => {
  if (type === "brunch") return vipImg;
  if (type === "ladies_night") return cocktailsImg;
  return djImg;
};

const Events = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (!error && data && data.length > 0) {
        setEvents(data);
      } else {
        setEvents(fallbackEvents);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
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

          {loading ? (
            <div className="text-center text-muted-foreground py-20">Loading events...</div>
          ) : (
            <div className="space-y-6">
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card overflow-hidden flex flex-col md:flex-row group"
                >
                  <div className="md:w-72 h-48 md:h-auto overflow-hidden shrink-0">
                    <img
                      src={event.image_url || typeImg(event.event_type)}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          event.event_type === "special" ? "bg-primary/20 text-primary" : "bg-muted text-foreground"
                        }`}>
                          {event.event_type.replace("_", " ")}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-foreground mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-primary" />
                        {format(new Date(event.date), "EEEE, MMM d yyyy · h:mm a")}
                      </span>
                      <Link to="/reservations" className="ml-auto text-secondary font-semibold hover:underline">Book Now</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
