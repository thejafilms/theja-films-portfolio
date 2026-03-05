import Image from 'next/image'
import {
  ParallaxFloating,
  FloatingElement,
} from '@/components/ui/parallax-floating'
import { ScrollAnimatedVideo } from '@/components/ui/scroll-animated-video'

/* ── Hero floating film stills ─────────────────────────
   All grabs are 3600×2338 cinematic frames from "This Is My Moment".
   Positions keep the center clear for the name/tagline.
   depth: 0.2 (subtle) → 0.65 (strong parallax)
──────────────────────────────────────────────────────── */
const STILLS = [
  // [src,                          w,    h,    depth, position + size classes,                    rotation]
  ['/film_grabs/grab-01.png', 3600, 2338, 0.22, 'top-[4%]   left-[0%]   w-[290px] h-[188px]',  '-1.8deg'],
  ['/film_grabs/grab-06.png', 3600, 2338, 0.52, 'top-[1%]   right-[2%]  w-[210px] h-[136px]',   '2.0deg'],
  ['/film_grabs/grab-03.png', 3600, 2338, 0.18, 'top-[33%]  left-[-1%]  w-[250px] h-[162px]',  '-1.2deg'],
  ['/film_grabs/grab-07.png', 3600, 2338, 0.62, 'top-[36%]  right-[0%]  w-[195px] h-[127px]',   '1.4deg'],
  ['/film_grabs/grab-05.png', 3600, 2338, 0.38, 'top-[60%]  left-[1%]   w-[270px] h-[175px]',  '-1.6deg'],
  ['/film_grabs/grab-08.png', 3600, 2338, 0.32, 'top-[63%]  right-[1%]  w-[240px] h-[156px]',   '1.2deg'],
  ['/film_grabs/grab-02.png', 3600, 2338, 0.28, 'bottom-[5%] left-[13%] w-[230px] h-[149px]',  '-0.9deg'],
  ['/film_grabs/grab-04.png', 3600, 2338, 0.44, 'bottom-[7%] right-[12%] w-[200px] h-[130px]',  '1.1deg'],
] as const

/* ── Film data ─────────────────────────────────────────
   Vimeo video IDs:
     1169827135 → This Is My Moment..   (Udupi & Gokarna)
     1102712882 → Theyyam – A God Awakens  (Kannur, Kerala)
     1075800012 → The Soul of Varanasi   (Varanasi)
──────────────────────────────────────────────────────── */
const FILMS = [
  {
    vimeoId: '1169827135',
    title: 'This Is My Moment..',
    location: 'Udupi & Gokarna, India',
    description:
      'A cinematic portrait by the sea. An exploration of stillness, memory, and the feeling of coming back to where you belong.',
    year: '2025',
    category: 'Personal',
    lazy: false,
  },
  {
    vimeoId: '1102712882',
    title: 'Theyyam – A God Awakens',
    location: 'Kannur, Kerala, India',
    description:
      'An ancient ritualistic performance from North Kerala where performers channel the energy of deities — filmed during late-night ceremonies and temple festivals in Kannur.',
    year: '2025',
    category: 'Personal',
    lazy: true,
  },
  {
    vimeoId: '1075800012',
    title: 'The Soul of Varanasi',
    location: 'Varanasi, India',
    description:
      '"Flames rise. The river flows. Life moves on." A personal journey through Dev Diwali — where death is embraced with faith, and every step holds deep reverence.',
    year: '2025',
    category: 'Personal',
    lazy: true,
  },
]

export default function HomePage() {
  return (
    <main className="snap-container">

      {/* ════════════════════════════════════════════════
          SECTION 1 — HERO BANNER
      ════════════════════════════════════════════════ */}
      <section className="snap-section relative overflow-hidden bg-[#0B0B0B]">
        <ParallaxFloating className="w-full h-full">

          {/* ── Floating film stills ─────────────────── */}
          {STILLS.map(([src, w, h, depth, posClass, rotation], i) => (
            <FloatingElement
              key={i}
              depth={depth as number}
              className={posClass as string}
            >
              <div
                className="floating-still overflow-hidden"
                style={{
                  transform: `rotate(${rotation})`,
                  boxShadow: '0 8px 40px rgba(0,0,0,0.75), 0 2px 8px rgba(0,0,0,0.5)',
                }}
              >
                <Image
                  src={src as string}
                  width={w as number}
                  height={h as number}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.6) brightness(0.7)' }}
                  priority={i < 4}
                />
              </div>
            </FloatingElement>
          ))}

          {/* ── Radial vignette ─────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none z-[5]"
            style={{
              background:
                'radial-gradient(ellipse 68% 68% at 50% 50%, transparent 28%, rgba(11,11,11,0.5) 65%, rgba(11,11,11,0.88) 100%)',
            }}
          />

          {/* ── Center text ─────────────────────────── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
            <p
              className="font-body text-[#9A9A9A]"
              style={{
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: '28px',
              }}
            >
              Cinematic Filmmaker
            </p>

            <h1
              className="font-heading text-[#F2F2F2]"
              style={{
                fontSize: 'clamp(56px, 9.5vw, 130px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                marginBottom: '30px',
              }}
            >
              Theja Mitta
            </h1>

            <div
              style={{ width: '36px', height: '1px', background: '#9A9A9A', opacity: 0.35, marginBottom: '28px' }}
            />

            <p
              className="font-heading text-[#9A9A9A]"
              style={{
                fontSize: 'clamp(15px, 1.6vw, 21px)',
                fontStyle: 'italic',
                fontWeight: 400,
                lineHeight: 1.65,
                maxWidth: '440px',
              }}
            >
              Cinematic stories of people, places, and moments.
            </p>
          </div>

          {/* ── Scroll cue ──────────────────────────── */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
            style={{ opacity: 0.4 }}
          >
            <div
              style={{
                width: '1px',
                height: '52px',
                background: 'linear-gradient(to bottom, #9A9A9A, transparent)',
                animation: 'scrollPulse 2.2s ease-in-out infinite',
              }}
            />
            <span
              className="font-body text-[#9A9A9A]"
              style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase' }}
            >
              Scroll
            </span>
          </div>

        </ParallaxFloating>

        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.35; transform: scaleY(1); }
            50%       { opacity: 1;   transform: scaleY(1.15); }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          SECTIONS 2–4 — FILM SHOWCASE
      ════════════════════════════════════════════════ */}
      {FILMS.map((film) => (
        <ScrollAnimatedVideo
          key={film.title}
          vimeoId={film.vimeoId}
          title={film.title}
          location={film.location}
          description={film.description}
          year={film.year}
          category={film.category}
          lazy={film.lazy}
        />
      ))}

    </main>
  )
}
