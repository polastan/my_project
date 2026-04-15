import { useState } from "react";
import { motion } from "framer-motion";
import { useGetMenu, useGetMenuCategories } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Menu() {
  const { data: menuItems, isLoading: menuLoading } = useGetMenu();
  const { data: categories, isLoading: categoriesLoading } = useGetMenuCategories();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const currentCategory = activeCategory || (categories?.[0] ?? null);
  const displayedItems = menuItems?.filter(item => item.category === currentCategory) || [];

  return (
    <section id="menu" className="py-32 relative bg-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary tracking-[0.3em] text-sm uppercase mb-4 block"
          >
            Гастрономическое путешествие
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-white"
          >
            Наше <span className="italic text-primary">Меню</span>
          </motion.h2>
        </div>

        {categoriesLoading || menuLoading ? (
          <div className="space-y-12 max-w-4xl mx-auto">
            <div className="flex justify-center gap-8 mb-12">
              <Skeleton className="w-24 h-6 rounded-none bg-white/5" />
              <Skeleton className="w-24 h-6 rounded-none bg-white/5" />
              <Skeleton className="w-24 h-6 rounded-none bg-white/5" />
            </div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex justify-between items-start border-b border-white/5 pb-8">
                <div className="space-y-4 flex-1 pr-8">
                  <Skeleton className="w-48 h-6 bg-white/5 rounded-none" />
                  <Skeleton className="w-full h-4 bg-white/5 rounded-none" />
                </div>
                <Skeleton className="w-16 h-6 bg-white/5 rounded-none" />
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-sm uppercase tracking-widest transition-colors pb-2 border-b border-transparent ${
                      currentCategory === category ? "text-primary border-primary" : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-12">
              {displayedItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative flex flex-col sm:flex-row justify-between items-start border-b border-white/5 pb-8 hover:border-primary/50 transition-colors"
                >
                  <div className="flex-1 pr-0 sm:pr-8 mb-4 sm:mb-0">
                    <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="font-sans text-xl text-primary font-medium tracking-wide">
                    {item.price} ₽
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
