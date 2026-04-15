export function Contact() {
  return (
    <footer id="contact" className="bg-black py-20 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          <div>
            <h3 className="font-serif text-2xl text-white mb-6">NOIR</h3>
            <p className="text-muted-foreground text-sm font-light mb-4">
              Эксклюзивный опыт изысканной кухни.
            </p>
          </div>

          <div>
            <h4 className="text-primary text-xs uppercase tracking-widest font-bold mb-6">Адрес</h4>
            <p className="text-muted-foreground text-sm font-light mb-2">ул. Тверская, 3</p>
            <p className="text-muted-foreground text-sm font-light mb-2">Москва, Россия</p>
            <p className="text-muted-foreground text-sm font-light mb-4">125009</p>
            <a href="#" className="text-white text-sm border-b border-primary/30 hover:border-primary pb-1 transition-colors">Построить маршрут</a>
          </div>

          <div>
            <h4 className="text-primary text-xs uppercase tracking-widest font-bold mb-6">Контакты</h4>
            <p className="text-muted-foreground text-sm font-light mb-2">+7 (495) 123-45-67</p>
            <p className="text-muted-foreground text-sm font-light mb-6">reservations@noir.ru</p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="text-muted-foreground hover:text-white transition-colors text-sm">Instagram</a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors text-sm">Telegram</a>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground font-light">
          <p>&copy; {new Date().getFullYear()} NOIR Restaurant. Все права защищены.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
