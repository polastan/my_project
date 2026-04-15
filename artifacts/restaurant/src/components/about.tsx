import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-32 relative bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 border border-primary/30 translate-x-4 translate-y-4 z-0" />
              <img 
                src="/images/about.png" 
                alt="Шеф-повар готовит блюдо" 
                className="absolute inset-0 w-full h-full object-cover z-10 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-xl"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Симфония в <span className="text-primary italic">Тени.</span>
            </h2>
            <div className="h-px w-24 bg-primary mb-8" />
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed font-light">
              Спрятанный в самом сердце Москвы, Noir — это убежище для всех чувств. Мы убеждены, что изысканная кухня — это искусство повествования, где каждый ингредиент хранит секрет, готовый быть раскрытым.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed font-light mb-10">
              Наш шеф-повар создаёт постоянно меняющееся дегустационное меню, бросая вызов ожиданиям: сочетание модернистских техник с древними кулинарными традициями. Здесь янтарный свет свечей танцует на золотых тарелках, а время замирает.
            </p>
            <img src="/images/menu-deco.png" alt="Декоративный элемент" className="w-24 h-24 object-cover rounded-full border border-primary/20 opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
