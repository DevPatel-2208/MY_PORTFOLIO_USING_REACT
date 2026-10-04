import { useEffect, useRef, useState } from 'react'
import { FiCode, FiServer, FiDatabase, FiCloud, FiShield, FiCpu, FiVolume2, FiVolumeX } from 'react-icons/fi'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import AboutTerminal from './AboutTerminal'

const highlights = [
  { icon: FiServer, label: 'MERN Stack', desc: 'End-to-end development' },
  { icon: FiDatabase, label: 'RESTful APIs', desc: 'Secure & documented' },
  { icon: FiCloud, label: 'Cloud Deployment', desc: 'Vercel, Render, Netlify' },
  { icon: FiShield, label: 'JWT Auth', desc: 'Role-based access control' },
  { icon: FiCpu, label: 'RAG & LLMs', desc: 'AI-powered features' },
  { icon: FiCode, label: 'Clean Code', desc: 'Modular & maintainable' },
]

export default function About() {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  /* Guaranteed autoplay: muted is forced via property (React's `muted`
     attribute alone is unreliable), playback is attempted on mount,
     again once data can play, and again when the tab becomes visible —
     so PAGE LOAD → VIDEO LOADS → VIDEO PLAYS with no click needed. */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined
    video.muted = true
    video.defaultMuted = true
    video.volume = 1
    const tryPlay = () => {
      if (video.paused) {
        const play = video.play()
        if (play && typeof play.catch === 'function') play.catch(() => {})
      }
    }
    tryPlay()
    video.addEventListener('canplay', tryPlay)
    document.addEventListener('visibilitychange', tryPlay)
    return () => {
      video.removeEventListener('canplay', tryPlay)
      document.removeEventListener('visibilitychange', tryPlay)
    }
  }, [])

  /* Toggle sound: unmuting requires a user gesture, so this runs on click. */
  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    video.defaultMuted = next
    if (!next) {
      video.volume = 1
      const play = video.play()
      if (play && typeof play.catch === 'function') play.catch(() => {})
    }
    setMuted(next)
  }

  return (
    <section id="about" className="relative py-20 md:py-28 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Who I Am"
          title="About Me"
          description="A Full Stack MERN Developer and MCA student building scalable, secure, AI-powered web applications."
        />

        <div className="about-layout">
          {/* Left stack: profile video card with the terminal below it.
              `display: contents` on mobile/tablet keeps the grid
              reading order (media → content → terminal); a flex column on
              desktop keeps image + terminal as one component. */}
          <div className="about-left">
            <Reveal direction="left" className="about-media">
              <div className="relative group w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
                <div
                  className="absolute inset-0 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'var(--glow-a)', filter: 'blur(60px)' }}
                  aria-hidden="true"
                />
                <div className="gradient-border-card rounded-3xl p-1.5 glass">
                  <div className="about-video-wrap rounded-3xl">
                    <video
                      ref={videoRef}
                      className="about-video"
                      src="/My_Intro.mp4"
                      autoPlay
                      muted={muted}
                      loop
                      playsInline
                      preload="auto"
                      disablePictureInPicture
                      aria-label="Dev Patel introduction video"
                    />
                    <button
                      type="button"
                      onClick={toggleSound}
                      aria-label={muted ? 'Unmute video' : 'Mute video'}
                      aria-pressed={!muted}
                      className="about-video-sound"
                    >
                      {muted ? (
                        <FiVolumeX className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      ) : (
                        <FiVolume2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      )}
                      <span className="hidden sm:inline">{muted ? 'Sound off' : 'Sound on'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Terminal card — attached below the video on desktop;
                flows after the text content on mobile/tablet. */}
            <Reveal direction="up" delay={0.1} className="about-terminal">
              <AboutTerminal />
            </Reveal>
          </div>

          {/* ── Right column: text content + skill cards (no terminal here) ── */}
          <Reveal direction="right" className="about-content">
            <h3 className="text-2xl md:text-3xl font-bold mb-5 text-gradient-heading">
              Full Stack MERN Developer &amp; MCA Student
            </h3>
            <div className="space-y-4 text-muted leading-relaxed text-justify hyphens-auto [text-justify:inter-word]">
              <p>
                I'm a <strong className="text-content font-semibold">Full Stack MERN Developer</strong> and
                current <strong className="text-content font-semibold">MCA student at Sardar Patel University</strong>{' '}
                with a deep passion for building scalable web applications. My journey into software
                development began during my BCA, where I discovered the power of the MERN Stack —{' '}
                <strong className="text-content font-semibold">MongoDB, Express.js, React, and Node.js</strong> —
                and haven't looked back since.
              </p>
              <p>
                I specialize in designing and developing{' '}
                <strong className="text-content font-semibold">RESTful APIs</strong>, implementing secure{' '}
                <strong className="text-content font-semibold">JWT authentication</strong>, integrating
                AI-powered features using <strong className="text-content font-semibold">RAG architectures</strong>,
                and building real-time applications with{' '}
                <strong className="text-content font-semibold">Socket.IO</strong>. My tech arsenal includes
                Cloudinary for media management, Redis for caching, and payment gateways for production-ready
                e-commerce solutions.
              </p>
              <p>
                What drives me is the challenge of solving real-world problems through clean, maintainable
                code and scalable architecture. I recently completed a{' '}
                <strong className="text-content font-semibold">Research &amp; Development internship</strong> at
                Sardar Patel University where I built an AI-powered Admission Assistant Chatbot using the
                MERN Stack. I'm currently seeking{' '}
                <strong className="text-content font-semibold">internship opportunities</strong> where I can
                contribute to impactful projects and grow as a professional software engineer.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
              {highlights.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.05} amount={0.3}>
                  <div className="group h-full rounded-2xl glass p-4 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow">
                    <div className="mx-auto mb-2.5 w-10 h-10 rounded-xl bg-primary/12 grid place-items-center text-primary transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="text-sm font-bold text-content">{item.label}</div>
                    <div className="text-[11px] text-muted mt-0.5">{item.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
