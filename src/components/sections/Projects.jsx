import { memo, useCallback, useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGithub,
  FiExternalLink,
  FiSearch,
  FiChevronDown,
  FiFolder,
  FiCheck,
  FiZap,
  FiAlertTriangle,
  FiCpu,
} from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { projects, projectFilters } from '../../data/projects'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import TiltCard from '../ui/TiltCard'

function ProjectImages({ images, title }) {
  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={`${title} banner`}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      loop
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="w-full h-full project-swiper"
      aria-label={`${title} image gallery`}
    >
      {images.map((src) => (
        <SwiperSlide key={src}>
          <img
            src={src}
            alt={`${title} screenshot`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const ProjectCard = memo(function ProjectCard({ project, index, onOpenCase }) {
  return (
    <Reveal delay={index * 0.05} amount={0.15} className="h-full">
      <TiltCard className="h-full" depth={48}>
        <article
          data-cursor="plus"
          className="group relative h-full rounded-3xl glass overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-glow hover:border-primary/40 hover:bg-surface-2/70 flex flex-col"
        >
          {/* Glow border on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px var(--c-primary), 0 0 36px -12px var(--c-primary)' }}
            aria-hidden="true"
          />

          {/* Banner */}
          <div data-cursor="view" className="relative h-48 sm:h-56 overflow-hidden shrink-0">
            <ProjectImages images={project.images} title={project.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-base)]/90 via-transparent to-transparent" aria-hidden="true" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {project.featured && <Badge tone="accent">★ Featured</Badge>}
              {project.status && <Badge tone="muted" className="!bg-black/40 !text-white !border-white/20 backdrop-blur-md">{project.status}</Badge>}
            </div>

            {project.tags.length > 0 && (
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 sm:gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/20 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-content leading-snug">{project.title}</h3>
              <FiFolder className="w-5 h-5 text-primary shrink-0 mt-1" aria-hidden="true" />
            </div>

            <p className="mt-2.5 text-sm text-muted leading-relaxed line-clamp-3">{project.summary}</p>

            {/* Tech */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
              {project.tech.slice(0, 5).map((t) => (
                <span
                  key={t}
                  data-cursor="badge"
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-surface-2 text-muted border border-border"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 5 && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-medium text-primary">
                  +{project.tech.length - 5} more
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 gap-2.5">
              <Button
                href={project.github}
                external
                variant="outline"
                size="sm"
                className="w-full min-w-0"
              >
                <FiGithub className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="truncate">Code</span>
              </Button>
              {project.live ? (
                <Button
                  href={project.live}
                  external
                  size="sm"
                  className="w-full min-w-0"
                >
                  <FiExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">Live</span>
                </Button>
              ) : (
                <Button
                  onClick={() => onOpenCase(project)}
                  variant="outlinePrimary"
                  size="sm"
                  aria-label={`Open case study for ${project.title}`}
                  className="w-full min-w-0"
                >
                  <FiChevronDown className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                  <span className="truncate">Case Study</span>
                </Button>
              )}
              {project.live && (
                <Button
                  onClick={() => onOpenCase(project)}
                  variant="outlinePrimary"
                  size="sm"
                  aria-label={`Open case study for ${project.title}`}
                  className="w-full min-w-0 col-span-2"
                >
                  <FiChevronDown className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                  <span className="truncate">Case Study</span>
                </Button>
              )}
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  )
})

const caseToneStyles = {
  accent: { badge: 'bg-emerald-500/12 text-emerald-500', check: 'bg-emerald-500/12 text-emerald-500' },
  warning: { badge: 'bg-amber-500/12 text-amber-500', check: 'bg-amber-500/12 text-amber-500' },
  primary: { badge: 'bg-primary/12 text-primary', check: 'bg-primary/12 text-primary' },
}

function CaseStudySection({ title, items, icon: Icon, tone }) {
  const toneStyles = caseToneStyles[tone] || caseToneStyles.primary

  return (
    <section className="rounded-[20px] border border-modal-border bg-modal-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_44px_-20px_rgba(2,6,23,0.32)] sm:p-7">
      <h4 className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-modal-content sm:text-xl">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${toneStyles.badge}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        {title}
      </h4>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 case-study-copy text-[15px] font-medium leading-[1.8] sm:text-base">
            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${toneStyles.check}`}>
              <FiCheck className="h-3 w-3" aria-hidden="true" />
            </span>
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function CaseStudyModal({ project, onClose }) {
  if (!project) return null

  return (
    <Modal
      open={!!project}
      onClose={onClose}
      title={project.title}
      maxWidth="max-w-[1100px]"
      className="case-study-dialog"
      footer={
        <div className={`grid gap-3 ${project.live ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
          <Button href={project.github} external size="lg" className="w-full">
            <FiGithub className="h-4 w-4 shrink-0" aria-hidden="true" />
            View Source Code
          </Button>
          {project.live && (
            <Button href={project.live} external variant="outlinePrimary" size="lg" className="w-full">
              <FiExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              Live Demo
            </Button>
          )}
        </div>
      }
      headerContent={
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} tone="primary" className="!border-modal-border !bg-modal-card !text-primary">{tag}</Badge>
          ))}
        </div>
      }
    >
      <div className="min-h-full bg-modal-bg p-5 pb-8 sm:p-8 sm:pb-12">
        <div className="space-y-6">
          <section className="rounded-[20px] border border-modal-border bg-modal-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7">
            <h4 className="mb-4 text-lg font-extrabold tracking-tight text-modal-content sm:text-xl">Overview</h4>
            <p className="case-study-copy text-[15px] font-medium leading-[1.8] sm:text-base">{project.description}</p>
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <CaseStudySection title="Key Features" items={project.features} icon={FiZap} tone="accent" />
            <CaseStudySection title="Challenges" items={project.challenges} icon={FiAlertTriangle} tone="warning" />
          </div>

          <section className="rounded-[20px] border border-modal-border bg-modal-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7">
            <h4 className="mb-4 flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-modal-content sm:text-xl">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                <FiCpu className="h-4 w-4" aria-hidden="true" />
              </span>
              Solutions
            </h4>
            <ul className="space-y-3">
              {project.solutions.map((item) => (
                <li key={item} className="flex items-start gap-3 case-study-copy text-[15px] font-medium leading-[1.8] sm:text-base">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/12 text-primary">
                    <FiCheck className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[20px] border border-modal-border bg-modal-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-modal-content">Tech Stack</h4>
            <div className="flex flex-wrap gap-2.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-modal-border bg-modal-bg px-3.5 py-2 text-sm font-semibold text-modal-content transition-colors duration-200 hover:border-primary/40 hover:text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Modal>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const gridRef = useRef(null)
  const closeCaseStudy = useCallback(() => setSelected(null), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesCategory = activeFilter === 'all' || p.category === activeFilter
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [activeFilter, query])

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          description="Real-world applications built with modern technologies, clean architecture, and production-ready features."
        />

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
          {/* Filters */}
          <div
            className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:overflow-visible"
            aria-label="Project categories"
          >
            {projectFilters.map((f) => {
              const isActive = activeFilter === f.value
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveFilter(f.value)
                    scrollToGrid()
                  }}
                  className={`relative shrink-0 sm:shrink px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                    isActive ? 'text-white' : 'text-muted hover:text-content glass'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-gradient-accent shadow-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech..."
              aria-label="Search projects"
              className="w-full pl-10 pr-4 py-2.5 rounded-full glass text-sm text-content placeholder:text-muted outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence initial={false}>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} index={i} onOpenCase={setSelected} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted text-lg">No projects match your search.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setQuery('')
                setActiveFilter('all')
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      <CaseStudyModal project={selected} onClose={closeCaseStudy} />
    </section>
  )
}
