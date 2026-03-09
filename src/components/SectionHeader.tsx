import { motion } from "framer-motion";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeader = ({ subtitle, title, description, center = true }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
    className={`mb-12 ${center ? "text-center" : ""}`}
  >
    {subtitle && (
      <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-2 block">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{description}</p>
    )}
  </motion.div>
);

export default SectionHeader;
