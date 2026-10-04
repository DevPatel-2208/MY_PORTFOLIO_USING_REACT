import { FiFileText } from 'react-icons/fi'
import Modal from '../ui/Modal'

const semesters = [
  { sem: 'Semester 1', image: '/re1.jpeg' },
  { sem: 'Semester 2', image: '/r2.jpeg' },
  { sem: 'Semester 3', image: '/r3.jpeg' },
  { sem: 'Semester 4', image: '/r4.jpeg' },
  { sem: 'Semester 5', image: '/r5.jpeg' },
  { sem: 'Semester 6', image: '/r6.jpeg' },
]

export default function ResultModal({ show, onClose }) {
  return (
    <Modal open={show} onClose={onClose} title="My Official Results" maxWidth="max-w-4xl">
      <div className="p-5 sm:p-8 space-y-7">
        <p className="flex items-center gap-2 text-sm text-muted">
          <FiFileText className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
          Semester-wise mark sheets from Sardar Patel University.
        </p>
        {semesters.map((s, i) => (
          <div key={s.sem}>
            <h4 className="flex items-center justify-center gap-2 rounded-xl bg-gradient-accent text-white text-sm font-bold py-2.5 px-3">
              <FiFileText className="w-4 h-4" aria-hidden="true" />
              {s.sem} Result
            </h4>
            <img
              src={s.image}
              alt={`${s.sem} result`}
              className="w-full rounded-2xl border border-border mt-3 shadow-md"
              loading="lazy"
              decoding="async"
              style={{ contentVisibility: i > 1 ? 'auto' : undefined }}
            />
          </div>
        ))}
      </div>
    </Modal>
  )
}
