import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-display font-bold gold-text mb-4">Da Avenue Lounge</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Mbale's ultimate nightlife destination. Premium bar, restaurant, and nightclub experience.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["Menu", "Events", "Gallery", "Reservations"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary shrink-0" />
              <span>Church Road, Opp NRM Offices, Mbale City, Uganda</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-primary" />
              <span>+256 700 000 000</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-primary" />
              <span>info@daavenuelounge.com</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
          <div className="flex gap-3">
            {[
              { icon: Instagram, label: "Instagram", href: "#" },
              { icon: Facebook, label: "Facebook", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
            <a
              href="https://wa.me/256700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-green-500 hover:bg-green-500/10 transition-colors"
            >
              <Phone size={18} />
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Open: Mon–Sun, 4 PM – Late
          </p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Da Avenue Lounge. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
