import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import SectionHeader from "@/components/SectionHeader";
import vipImg from "@/assets/vip-lounge.jpg";

const Reservations = () => {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", guests: "", type: "regular", request: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.guests) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Reservation submitted! We'll confirm via WhatsApp shortly.");
    setForm({ name: "", phone: "", email: "", date: "", guests: "", type: "regular", request: "" });
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm";

  return (
    <div className="pt-20">
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
        <img src={vipImg} alt="Reservations" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground">Reservations</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-2xl">
          <SectionHeader subtitle="Book Now" title="Reserve Your Spot" description="Fill out the form below and we'll confirm your reservation." />

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input className={inputClass} placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className={inputClass} placeholder="Phone Number *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <input className={inputClass} type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <div className="grid sm:grid-cols-2 gap-5">
              <input className={inputClass} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <input className={inputClass} type="number" placeholder="Number of Guests *" min="1" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
            </div>
            <select className={inputClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="regular">Regular Table</option>
              <option value="vip">VIP Booth</option>
              <option value="birthday">Birthday Package</option>
              <option value="corporate">Corporate Event</option>
            </select>
            <textarea className={`${inputClass} min-h-[100px]`} placeholder="Special Requests (optional)" value={form.request} onChange={(e) => setForm({ ...form, request: e.target.value })} />
            <button type="submit" className="w-full py-3.5 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-opacity">
              Submit Reservation
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Reservations;
