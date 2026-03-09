import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import SectionHeader from "@/components/SectionHeader";
import heroImg from "@/assets/hero-lounge.jpg";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm";

  return (
    <div className="pt-20">
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Contact" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground">Contact Us</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeader subtitle="Get in Touch" title="We'd Love to Hear From You" />

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              {[
                { icon: MapPin, title: "Location", info: "Church Road, Opp NRM Offices, Mbale City, Uganda" },
                { icon: Phone, title: "Phone", info: "+256 756 091 987" },
                { icon: Mail, title: "Email", info: "daavenuelounge1@gmail.com" },
              ].map(({ icon: Icon, title, info }) => (
                <div key={title} className="glass-card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{info}</p>
                  </div>
                </div>
              ))}

              <a
                href="https://wa.me/256756091987"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 flex items-center gap-4 border-green-500/30 hover:border-green-500/50 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="text-green-500" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">Chat with us directly</p>
                </div>
              </a>

              {/* Map */}
              <div className="rounded-xl overflow-hidden h-64 border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7!2d34.1840471!3d1.0680811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1778b700026727c3%3A0x3013abe5dd2fe11b!2sDa%20Avenue%20Lounge!5e0!3m2!1sen!2sug!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Da Avenue Lounge Location"
                />
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass-card p-6 sm:p-8 space-y-5 h-fit"
            >
              <h3 className="text-xl font-display font-bold text-foreground mb-2">Send a Message</h3>
              <input className={inputClass} placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className={inputClass} type="email" placeholder="Your Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <textarea className={`${inputClass} min-h-[150px]`} placeholder="Your Message *" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button type="submit" className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
