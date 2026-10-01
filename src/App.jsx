import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Certificates } from './components/sections/Certificates';
import { Achievements } from './components/sections/Achievements';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div className="relative min-h-screen flex flex-col selection:bg-primary/30 selection:text-text-main">
      <Navbar />
      
      <main className="flex-1 w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;