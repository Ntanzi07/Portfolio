import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <Hero />
      <About />
      <div className="relative z-20 -mt-[100vh] bg-white dark:bg-black">
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}
