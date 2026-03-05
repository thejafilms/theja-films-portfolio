import { HeroBanner } from '@/components/ui/hero-banner'
import { ScrollAnimatedVideo } from '@/components/ui/scroll-animated-video'
import { SiteFooter } from '@/components/ui/site-footer'

/* ── Film data ─────────────────────────────────────────
   Vimeo video IDs:
     1169827135 → This Is My Moment..   (Udupi & Gokarna)
     1102712882 → Theyyam – A God Awakens  (Kannur, Kerala)
     1075800012 → The Soul of Varanasi   (Varanasi)
──────────────────────────────────────────────────────── */
const FILMS = [
  {
    id: 'film-1',
    vimeoId: '1169827135',
    title: 'This Is My Moment..',
    location: 'Udupi & Gokarna, India',
    description:
      'A cinematic portrait by the sea. An exploration of stillness, memory, and the feeling of coming back to where you belong.',
    year: '2025',
    category: 'Personal',
    lazy: false,
    thumbnail: '/thumbnails/film-1.jpg',
  },
  {
    id: 'film-2',
    vimeoId: '1102712882',
    title: 'Theyyam – A God Awakens',
    location: 'Kannur, Kerala, India',
    description:
      'An ancient ritualistic performance from North Kerala where performers channel the energy of deities — filmed during late-night ceremonies and temple festivals in Kannur.',
    year: '2025',
    category: 'Personal',
    lazy: true,
    thumbnail: '/thumbnails/film-2.jpg',
  },
  {
    id: 'film-3',
    vimeoId: '1075800012',
    title: 'The Soul of Varanasi',
    location: 'Varanasi, India',
    description:
      '"Flames rise. The river flows. Life moves on." A personal journey through Dev Diwali — where death is embraced with faith, and every step holds deep reverence.',
    year: '2025',
    category: 'Personal',
    lazy: true,
    thumbnail: '/thumbnails/film-3.jpg',
  },
]

export default function HomePage() {
  return (
    <>
      <main className="snap-container">

        {/* ════════════════════════════════════════════════
            SECTION 1 — HERO BANNER
        ════════════════════════════════════════════════ */}
        <HeroBanner />

        {/* ════════════════════════════════════════════════
            SECTIONS 2–4 — FILM SHOWCASE
        ════════════════════════════════════════════════ */}
        {FILMS.map((film) => (
          <ScrollAnimatedVideo
            key={film.id}
            id={film.id}
            vimeoId={film.vimeoId}
            title={film.title}
            location={film.location}
            description={film.description}
            year={film.year}
            category={film.category}
            lazy={film.lazy}
            thumbnail={film.thumbnail}
          />
        ))}

      </main>

      {/* Footer lives outside the snap container so it's always reachable */}
      <SiteFooter />
    </>
  )
}
