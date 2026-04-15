import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <img 
          src="/images/hero.png" 
          alt="Интерьер ресторана Noir" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
      
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-primary tracking-[0.3em] text-sm uppercase mb-6 block"
        >
          Москва
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-8xl text-white mb-8 leading-tight font-bold"
        >
          Вкус <br />
          <span className="italic font-light text-primary">Неизведанного.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto mb-12 font-light"
        >
          Эксклюзивный закрытый ресторан, где кулинарное искусство встречается с изысканной элегантностью.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={() => document.getElementById("reservations")?.scrollIntoView({ behavior: "smooth" })}
          className="border border-primary text-primary px-10 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-black transition-all duration-300"
        >
          Забронировать стол
        </motion.button>
      </div>
    </section>
  );
}
