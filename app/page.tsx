import { IntroGate } from '@/components/ui/intro-gate'
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
    thumbnail: '/thumbnails/beachtjumbnail_2.3.2.jpg',
  },
  {
    id: 'film-2',
    vimeoId: '1102712882',
    title: 'Theyyam – A God Awakens',
    location: 'Kannur, Kerala, India',
    description:
      'In the temples of North Kerala, ancient rituals come alive through Theyyam — a sacred performance where performers embody deities through fire, dance, and devotion. A cinematic glimpse into one of India’s most powerful living traditions.',
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
      'Along the ghats of the Ganges, life unfolds between fire, water, and devotion. A visual portrait capturing the rhythm, spirituality, and human stories that define Varanasi.',
    year: '2025',
    category: 'Personal',
    lazy: true,
    thumbnail: '/thumbnails/film-3.jpg',
  },
]

/* ── Hero STILLS — preloaded here (server component, outside IntroGate) so
   the browser starts fetching during the ~3.5 s film intro animation.
   Using /_next/image optimised URLs (≈60–100 KB each) instead of raw
   multi-megabyte PNGs — these are the same URLs the bg-clip CSS uses.  */
const HERO_STILLS = [
  '/film_grabs/tim-1.png', '/film_grabs/thy-1.jpg', '/film_grabs/sov-1.png',
  '/film_grabs/tim-2.png', '/film_grabs/thy-2.jpg', '/film_grabs/sov-2.png',
  '/film_grabs/tim-3.png', '/film_grabs/thy-3.jpg', '/film_grabs/sov-3.png',
  '/film_grabs/sov-4.png', '/film_grabs/tim-4.png', '/film_grabs/thy-4.jpg',
  '/film_grabs/sov-5.png', '/film_grabs/tim-5.png', '/film_grabs/thy-5.jpg',
  '/film_grabs/sov-6.png', '/film_grabs/tim-6.png', '/film_grabs/thy-6.jpg',
]

export default function HomePage() {
  return (
    <>
      {/* Preload hero banner images — rendered in initial HTML so the
          browser fetches them while the intro plays, not after.       */}
      {HERO_STILLS.map(src => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={`/_next/image?url=${encodeURIComponent(src)}&w=640&q=75`}
        />
      ))}

    <IntroGate>
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
    </IntroGate>
    </>
  )
}
