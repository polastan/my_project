import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Menu } from "@/components/menu";
import { Reservation } from "@/components/reservation";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Reservation />
        <Contact />
      </main>
    </div>
  );
}
