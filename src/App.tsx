import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';
import FlowArt, { FlowSection } from './components/ui/story-scroll';

function App() {
  return (
    <div className="min-h-screen bg-offwhite text-primary">
      <Navbar />
      <FlowArt aria-label="Adzril Ilham Ramadhan Portfolio Story">
        <FlowSection id="about" aria-label="01 — About Me" style={{ backgroundColor: '#E8E8E8', color: '#0F172A' }}>
          <Hero />
        </FlowSection>

        <FlowSection id="expertise" aria-label="02 — Area of Expertise" style={{ backgroundColor: '#1351AA', color: '#E8E8E8' }}>
          <Expertise />
        </FlowSection>

        <FlowSection id="skills" aria-label="03 — Tech Stack & Workflow" style={{ backgroundColor: '#E8E8E8', color: '#1351AA' }}>
          <Skills />
        </FlowSection>

        <FlowSection id="projects" aria-label="04 — Featured Projects" style={{ backgroundColor: '#1351AA', color: '#E8E8E8' }}>
          <Projects />
        </FlowSection>

        <FlowSection id="experience" aria-label="05 — Education & Experience" style={{ backgroundColor: '#E8E8E8', color: '#0F172A' }}>
          <Experience />
        </FlowSection>

        <FlowSection id="contact" aria-label="06 — Let's Connect" style={{ backgroundColor: '#1351AA', color: '#E8E8E8' }}>
          <Footer />
        </FlowSection>
      </FlowArt>
    </div>
  );
}

export default App;
