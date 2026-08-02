import { lazy, Suspense, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import BackgroundFX from './components/layout/BackgroundFX'
import ScrollProgress from './components/layout/ScrollProgress'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import Cursor from './components/cursor/Cursor'
import Preloader from './components/layout/Preloader'
import SEO from './components/seo/SEO'

const Hero = lazy(() => import('./components/sections/Hero'))
const About = lazy(() => import('./components/sections/About'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Education = lazy(() => import('./components/sections/Education'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Services = lazy(() => import('./components/sections/Services'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Certificates = lazy(() => import('./components/sections/Certificates'))
const Achievements = lazy(() => import('./components/sections/Achievements'))
const Contact = lazy(() => import('./components/sections/Contact'))
const ResultModal = lazy(() => import('./components/sections/ResultModal'))

function LazySection({ children }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24" role="status" aria-label="Loading section">
          <span className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

function App() {
  const [showResults, setShowResults] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const finishLoad = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <Preloader onDone={finishLoad} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative min-h-screen"
      >
        <SEO />
        <Cursor />
        <BackgroundFX />
        <ScrollProgress />
        <Navbar />

        <main>
          <LazySection>
            <Hero />
          </LazySection>
          <LazySection>
            <About />
          </LazySection>
          <LazySection>
            <Experience />
          </LazySection>
          <LazySection>
            <Education onShowResults={() => setShowResults(true)} />
          </LazySection>
          <LazySection>
            <Skills />
          </LazySection>
          <LazySection>
            <Services />
          </LazySection>
          <LazySection>
            <Projects />
          </LazySection>
          <LazySection>
            <Certificates />
          </LazySection>
          <LazySection>
            <Achievements />
          </LazySection>
          <LazySection>
            <Contact />
          </LazySection>
        </main>

        <Footer />
        <ScrollToTop />
        <Suspense fallback={null}>
          <ResultModal show={showResults} onClose={() => setShowResults(false)} />
        </Suspense>
      </motion.div>
    </>
  )
}

export default App
