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
import corporateImg from "@/assets/venue-3.jpg";
import lifestyleImg from "@/assets/venue-5.jpg";

interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string | null;
  event_type: string;
  image_url: string | null;
}

const fallbackEvents: EventItem[] = [
  { id: "1", title: "Hyper Wednesday", date: "2026-03-12T20:00:00Z", description: "Live band night! Feel the energy as top local bands perform your favourite hits. Great vibes, cold drinks, and unforgettable performances every Wednesday.", event_type: "live_band", image_url: null },
  { id: "2", title: "Corporate Thursdays", date: "2026-03-13T19:00:00Z", description: "Unwind after work with the best of Kikadde and oldies. Classic throwback tunes, smooth vibes, and a sophisticated crowd. The perfect midweek escape.", event_type: "corporate", image_url: corporateImg },
  { id: "3", title: "Swift Fridays", date: "2026-03-14T21:00:00Z", description: "Guest DJ takeover every Friday. The hottest DJs in East Africa bring fire mixes to keep you dancing all night long.", event_type: "party", image_url: null },
  { id: "4", title: "Lifestyle Saturday", date: "2026-03-15T21:00:00Z", description: "The ultimate Saturday experience featuring a guest DJ, premium bottle service, and the best crowd in Mbale. Dress to impress!", event_type: "party", image_url: lifestyleImg },
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
                      <Link to="/reservations" className="ml-auto text-primary font-semibold hover:underline">Book Now</Link>
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
