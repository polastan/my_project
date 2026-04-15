import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="font-serif text-2xl tracking-widest text-primary font-bold cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          NOIR
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("about")} className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">О нас</button>
          <button onClick={() => scrollTo("menu")} className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Меню</button>
          <button onClick={() => scrollTo("reservations")} className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Бронирование</button>
          <button onClick={() => scrollTo("contact")} className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Контакты</button>
        </nav>
      </div>
    </motion.header>
  );
}
