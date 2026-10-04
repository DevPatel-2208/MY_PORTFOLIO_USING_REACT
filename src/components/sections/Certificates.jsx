import { useState } from 'react'
import { FiExternalLink, FiCalendar, FiAward, FiEye } from 'react-icons/fi'
import { certificates } from '../../data/certificates'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import TiltCard from '../ui/TiltCard'

function CertificatePreview({ cert }) {
  if (cert.image.endsWith('.pdf')) {
    return (
      <>
        <iframe
          src={cert.image}
          title={`${cert.title} preview`}
          className="hidden md:block w-full h-[420px] rounded-xl border border-border"
          loading="lazy"
        />
        <img
          src={cert.imageMobile}
          alt={cert.title}
          className="md:hidden w-full rounded-xl border border-border"
          loading="lazy"
        />
      </>
    )
  }
  return (
    <img
      src={cert.image}
      alt={cert.title}
      className="w-full rounded-xl border border-border"
      loading="lazy"
      decoding="async"
    />
  )
}

export default function Certificates() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="certificates" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          description="Continuous learning from industry leaders in web development, frontend engineering, and artificial intelligence."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, i) => (
            <Reveal key={cert.id} delay={(i % 3) * 0.06} amount={0.15} className="h-full">
              <TiltCard className="h-full" max={11} scale={1.02}>
                <article
                  className="group relative h-full rounded-3xl glass transition-[box-shadow,border-color,background-color] duration-500 hover:border-primary/40 hover:shadow-glow hover:bg-surface-2/70 flex flex-col cursor-pointer [transform-style:preserve-3d]"
                  onClick={() => setSelected(cert)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelected(cert)
                    }
                  }}
                  role="button"
                  aria-label={`View ${cert.title} certificate`}
                >
                  {/* Glow border on hover */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                    style={{ boxShadow: 'inset 0 0 0 1px var(--c-primary), 0 0 36px -12px var(--c-primary)' }}
                    aria-hidden="true"
                  />

                  {/* Preview thumb — lifted forward in 3D on hover */}
                  <div className="relative h-44 overflow-hidden rounded-t-3xl bg-surface-2/50 shrink-0 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(34px)]">
                    {cert.image.endsWith('.pdf') ? (
                      <div className="absolute inset-0 grid place-items-center p-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/12 text-primary border border-primary/25 text-xs font-semibold">
                          <FiEye className="w-4 h-4" aria-hidden="true" />
                          PDF Certificate
                        </div>
                      </div>
                    ) : (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--c-base)]/80 to-transparent" aria-hidden="true" />
                    <div className="absolute top-3 right-3 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(54px)]">
                      <Badge tone={cert.tags.includes('Artificial Intelligence') ? 'accent' : 'primary'}>
                        {cert.tags[0]}
                      </Badge>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5 [transform-style:preserve-3d]">
                    <h3 className="text-base font-bold text-content leading-snug transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(26px)]">{cert.title}</h3>

                    <div className="mt-2.5 space-y-1 text-xs text-muted transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(18px)]">
                      <p className="flex items-center gap-1.5">
                        <FiAward className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                        <span className="truncate">{cert.issuer}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <FiCalendar className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                        {cert.date}
                      </p>
                    </div>

                    <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(14px)]">{cert.description}</p>

                    <div className="mt-auto pt-4 flex items-center justify-between gap-3 transition-transform duration-500 ease-out [transform:translateZ(0)] group-hover:[transform:translateZ(28px)]">
                      <span className="text-xs font-semibold text-primary group-hover:underline underline-offset-4">
                        View Credential
                      </span>
                      <FiExternalLink className="w-4 h-4 text-muted group-hover:text-primary transition-colors" aria-hidden="true" />
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} maxWidth="max-w-3xl">
        {selected && (
          <div className="p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {selected.tags.map((tag) => (
                <Badge key={tag} tone={tag === 'Artificial Intelligence' ? 'accent' : 'primary'}>
                  {tag}
                </Badge>
              ))}
            </div>

            <CertificatePreview cert={selected} />

            <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl glass p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Issued by</p>
                <p className="font-semibold text-content">{selected.issuer}</p>
              </div>
              <div className="rounded-2xl glass p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Issue Date</p>
                <p className="font-semibold text-content">{selected.date}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Skills Gained</p>
              <div className="flex flex-wrap gap-2">
                {selected.skills.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/12 text-primary border border-primary/25">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {selected.verify && (
                <Button href={selected.verify} external>
                  <FiExternalLink className="w-4 h-4" aria-hidden="true" />
                  Verify Online
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
