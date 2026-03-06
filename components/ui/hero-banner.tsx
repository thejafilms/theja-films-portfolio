'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'

/* ──────────────────────────────────────────────────────────────────────────
   ANIMATION — "Images emerge from Theja Mitta"
   ──────────────────────────────────────────────────────────────────────────

   LAYER A  bg-clip h1  (visible from t=0, no JS required)
     CSS  background-clip: text  fills the letter shapes with a 4×3 grid of
     film stills.  Rendered immediately — zero flash, zero JS measurement.
     At BURST_DELAY this layer fades out (opacity 1 → 0, ease-in).

   LAYER B  floating images  (invisible until BURST_DELAY)
     Each still starts with an x/y offset that places its centre at the
     banner's text-centre (≈ 50 vw, 44 vh).  At BURST_DELAY the images
     fade in and burst to their corner positions.  scale 0.15 → 1 so each
     image appears to grow out of the letters.  Pure vw/vh offsets — no
     calc() — so Framer Motion can interpolate them cleanly.

   LAYER C  white h1  (absolutely stacked over Layer A)
     Fades opacity 0 → 1 starting 100 ms after Layer A begins fading.
     Same position/font as Layer A — seamless cross-fade, no jump.

   RESULT: the viewer sees letter-shaped image fragments, then watches them
   escape the text while solid white letters materialise — one continuous
   cinematic motion.
   ────────────────────────────────────────────────────────────────────────── */

interface Still {
  src: string; w: number; h: number; depth: number
  posClass: string; rotation: string; size: string
  filmId: string; filmTitle: string
  /* Pure vw / vh — Framer Motion interpolates these to 0 cleanly.
     Values are the offset needed to bring the image centre to ≈(50vw,44vh). */
  initialX: string; initialY: string
}

const STILLS: Still[] = [
  // ── Left column — 9 images, films interleaved top-to-bottom ────────────
  { // i=0  top-[1%]   left-[0%]   TIM  centre≈9vw,11vh
    src: '/film_grabs/tim-1.png',    w: 3600, h: 2338, depth: 2.2,
    posClass: 'top-[1%]   left-[0%]',  rotation: '-1.8deg', size: 'w-[260px] h-[169px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '41vw',  initialY: '33vh',
  },
  { // i=1  top-[12%]  left-[1%]   THY  centre≈7vw,19vh
    src: '/film_grabs/thy-1.jpg',    w: 3840, h: 2160, depth: 6.5,
    posClass: 'top-[12%]  left-[1%]',  rotation: '-2.1deg', size: 'w-[185px] h-[104px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '43vw',  initialY: '25vh',
  },
  { // i=2  top-[23%]  left-[-1%]  SOV  centre≈7vw,30vh
    src: '/film_grabs/sov-1.png',    w: 3600, h: 2338, depth: 1.8,
    posClass: 'top-[23%]  left-[-1%]', rotation: '-1.2deg', size: 'w-[230px] h-[149px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '43vw',  initialY: '14vh',
  },
  { // i=3  top-[35%]  left-[0%]   TIM  centre≈7vw,42vh
    src: '/film_grabs/tim-2.png',    w: 3600, h: 2338, depth: 4.2,
    posClass: 'top-[35%]  left-[0%]',  rotation: '-1.0deg', size: 'w-[200px] h-[130px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '43vw',  initialY: '2vh',
  },
  { // i=4  top-[47%]  left-[1%]   THY  centre≈9vw,55vh
    src: '/film_grabs/thy-2.jpg',    w: 3840, h: 2160, depth: 3.8,
    posClass: 'top-[47%]  left-[1%]',  rotation: '-1.5deg', size: 'w-[245px] h-[138px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '41vw',  initialY: '-11vh',
  },
  { // i=5  top-[58%]  left-[-1%]  SOV  centre≈6vw,65vh
    src: '/film_grabs/sov-2.png',    w: 3600, h: 2338, depth: 5.0,
    posClass: 'top-[58%]  left-[-1%]', rotation: '-0.8deg', size: 'w-[195px] h-[127px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '44vw',  initialY: '-21vh',
  },
  { // i=6  top-[70%]  left-[0%]   TIM  centre≈7vw,78vh
    src: '/film_grabs/tim-3.png',    w: 3600, h: 2338, depth: 2.6,
    posClass: 'top-[70%]  left-[0%]',  rotation: '-1.3deg', size: 'w-[215px] h-[139px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '43vw',  initialY: '-34vh',
  },
  { // i=7  top-[81%]  left-[2%]   THY  centre≈8vw,88vh
    src: '/film_grabs/thy-3.jpg',    w: 3840, h: 2160, depth: 4.8,
    posClass: 'top-[81%]  left-[2%]',  rotation: '-2.0deg', size: 'w-[180px] h-[101px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '42vw',  initialY: '-44vh',
  },
  { // i=8  top-[91%]  left-[14%]  SOV  centre≈20vw,97vh
    src: '/film_grabs/sov-3.png',    w: 3600, h: 2338, depth: 3.2,
    posClass: 'top-[91%]  left-[14%]', rotation: '-0.7deg', size: 'w-[185px] h-[120px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '30vw',  initialY: '-53vh',
  },
  // ── Right column — 9 images, films interleaved top-to-bottom ───────────
  { // i=9  top-[1%]   right-[2%]  SOV  centre≈91vw,9vh
    src: '/film_grabs/sov-4.png',    w: 3600, h: 2338, depth: 3.5,
    posClass: 'top-[1%]   right-[2%]', rotation: '1.8deg',  size: 'w-[190px] h-[123px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '-41vw', initialY: '35vh',
  },
  { // i=10 top-[12%]  right-[1%]  TIM  centre≈92vw,20vh
    src: '/film_grabs/tim-4.png',    w: 3600, h: 2338, depth: 5.0,
    posClass: 'top-[12%]  right-[1%]', rotation: '1.6deg',  size: 'w-[210px] h-[136px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '-42vw', initialY: '24vh',
  },
  { // i=11 top-[23%]  right-[0%]  THY  centre≈93vw,30vh
    src: '/film_grabs/thy-4.jpg',    w: 3840, h: 2160, depth: 7.0,
    posClass: 'top-[23%]  right-[0%]', rotation: '2.2deg',  size: 'w-[195px] h-[110px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '-43vw', initialY: '14vh',
  },
  { // i=12 top-[35%]  right-[14%] SOV  centre≈80vw,43vh
    src: '/film_grabs/sov-5.png',    w: 2145, h: 1688, depth: 4.0,
    posClass: 'top-[35%]  right-[14%]',rotation: '1.0deg',  size: 'w-[165px] h-[130px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '-30vw', initialY: '1vh',
  },
  { // i=13 top-[47%]  right-[0%]  TIM  centre≈92vw,55vh
    src: '/film_grabs/tim-5.png',    w: 3600, h: 2338, depth: 2.8,
    posClass: 'top-[47%]  right-[0%]', rotation: '1.4deg',  size: 'w-[240px] h-[156px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '-42vw', initialY: '-11vh',
  },
  { // i=14 top-[59%]  right-[1%]  THY  centre≈92vw,66vh
    src: '/film_grabs/thy-5.jpg',    w: 3840, h: 2160, depth: 5.5,
    posClass: 'top-[59%]  right-[1%]', rotation: '2.0deg',  size: 'w-[205px] h-[115px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '-42vw', initialY: '-22vh',
  },
  { // i=15 top-[71%]  right-[0%]  SOV  centre≈93vw,78vh
    src: '/film_grabs/sov-6.png',    w: 3024, h: 1964, depth: 3.0,
    posClass: 'top-[71%]  right-[0%]', rotation: '1.1deg',  size: 'w-[185px] h-[120px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
    initialX: '-43vw', initialY: '-34vh',
  },
  { // i=16 top-[82%]  right-[2%]  TIM  centre≈90vw,88vh
    src: '/film_grabs/tim-6.png',    w: 3600, h: 2338, depth: 6.0,
    posClass: 'top-[82%]  right-[2%]', rotation: '1.8deg',  size: 'w-[175px] h-[114px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
    initialX: '-40vw', initialY: '-44vh',
  },
  { // i=17 top-[91%]  right-[14%] THY  centre≈79vw,97vh
    src: '/film_grabs/thy-6.jpg',    w: 3840, h: 2160, depth: 4.5,
    posClass: 'top-[91%]  right-[14%]',rotation: '2.4deg',  size: 'w-[195px] h-[110px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
    initialX: '-29vw', initialY: '-53vh',
  },
]

function scrollToFilm(filmId: string) {
  document.getElementById(filmId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ── background-clip tile grid (3 cols × 6 rows = 18 cells) ──────────────
   Each image fills exactly one 33.33%×16.67% cell of the heading element.
   The cells are clipped to letter shapes by  background-clip: text.       */
const COL_POS = ['0%', '50%', '100%']
const ROW_POS = ['0%', '20%', '40%', '60%', '80%', '100%']

const tileBgImage    = STILLS.map(s => `url(${s.src})`).join(', ')
const tileBgSize     = STILLS.map(() => '33.33% 16.67%').join(', ')
const tileBgPosition = STILLS.map((_, i) => `${COL_POS[i % 3]} ${ROW_POS[Math.floor(i / 3)]}`).join(', ')
const tileBgRepeat   = STILLS.map(() => 'no-repeat').join(', ')

const H1_STYLE = {
  fontSize:      'clamp(44px, 9.5vw, 130px)',
  fontWeight:    400,
  letterSpacing: '-0.03em',
  lineHeight:    1.0,
  margin:        0,
} as const

/* ── Timing ─────────────────────────────────────────────────────────────── */
const BURST_DELAY = 1.2                              // hold "images in text" for 1.2 s
const BURST_EASE  = [0.16, 1, 0.3, 1] as const      // spring-like — fast exit, gentle settle
const REVEAL_EASE = [0.4, 0, 0.2, 1] as const       // smooth white text materialise

export function HeroBanner() {
  return (
    <section className="snap-section relative overflow-hidden bg-[#0B0B0B]">

      {/* ── LAYER B  Floating images ──────────────────────────────────────────
          All invisible at t=0.  Each starts with initialX/Y that puts its
          centre at the heading text-centre (≈50vw, 44vh).  At BURST_DELAY
          they fade in and burst outward — scale 0.15→1 so they appear to
          grow from the letter shapes.  Staggered by 70 ms per image.
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="hidden sm:block">
      <Floating sensitivity={-1} easingFactor={0.04} className="overflow-hidden">
        {STILLS.map((still, i) => (
          <FloatingElement key={i} depth={still.depth} className={still.posClass}>
            <motion.div
              className="cursor-pointer"
              style={{ rotate: still.rotation }}
              initial={{ x: still.initialX, y: still.initialY, scale: 0.15, opacity: 0 }}
              animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              transition={{
                /* Opacity leads by 50 ms so images are slightly visible before moving */
                opacity: { delay: BURST_DELAY - 0.05 + i * 0.04, duration: 0.35, ease: 'easeOut' },
                x:       { delay: BURST_DELAY + i * 0.07, duration: 1.4, ease: BURST_EASE },
                y:       { delay: BURST_DELAY + i * 0.07, duration: 1.4, ease: BURST_EASE },
                scale:   { delay: BURST_DELAY + i * 0.07, duration: 1.4, ease: BURST_EASE },
              }}
              whileHover="hovered"
              onClick={() => scrollToFilm(still.filmId)}
            >
              <motion.div
                className={`overflow-hidden relative ${still.size}`}
                style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.4)' }}
                variants={{
                  hovered: {
                    scale: 1.06,
                    boxShadow: '0 22px 64px rgba(0,0,0,0.88), 0 4px 18px rgba(0,0,0,0.6)',
                    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <Image
                  src={still.src}
                  width={still.w}
                  height={still.h}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.8) brightness(0.88)' }}
                  priority={i < 4}
                />
                <motion.div
                  className="absolute bottom-0 inset-x-0"
                  style={{
                    padding: '32px 10px 8px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  variants={{
                    hovered: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <p className="font-body text-center text-[#F2F2F2]"
                    style={{ fontSize: '7px', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
                    {still.filmTitle}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </FloatingElement>
        ))}
      </Floating>
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 68% 68% at 50% 50%, transparent 28%, rgba(11,11,11,0.45) 65%, rgba(11,11,11,0.82) 100%)',
        }}
      />

      {/* ── z-10  Centre text ─────────────────────────────────────────────────

          The heading wrapper holds two <h1> layers stacked at identical
          position.  Layer A (bg-clip) is in normal flow and sizes the
          wrapper.  Layer B (white) is position:absolute over it.

          At BURST_DELAY, Layer A fades out (ease-in) while Layer B fades in
          (ease-out) with a 100 ms offset — the text smoothly morphs from
          "image mosaic" to "solid white" with no layer-swap artefact.
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center pointer-events-none">

        <div style={{ position: 'relative', marginBottom: '28px' }}>

          {/* LAYER A — letter-shaped image mosaic ─────────────────────────
              Rendered from frame 1 by pure CSS.  No JS needed.
              background-clip: text clips the 3×6 tile grid to letter shapes.
              brightness(1.6) ensures the tiles are legible against dark bg. */}
          <motion.h1
            className="font-heading"
            style={{
              ...H1_STYLE,
              backgroundImage:      tileBgImage,
              backgroundSize:       tileBgSize,
              backgroundPosition:   tileBgPosition,
              backgroundRepeat:     tileBgRepeat,
              WebkitBackgroundClip: 'text',
              backgroundClip:       'text',
              color:                'transparent',
              WebkitTextFillColor:  'transparent',
              filter:               'brightness(1.6) saturate(1.2)',
            }}
            animate={{ opacity: 0 }}
            transition={{ delay: BURST_DELAY, duration: 0.45, ease: 'easeIn' }}
          >
            Theja Mitta
          </motion.h1>

          {/* LAYER C — solid white text ────────────────────────────────────
              Absolutely overlaid on Layer A.  Fades in 100 ms after A starts
              fading out — the cross-fade is smooth because the two layers
              share identical font/size/position. */}
          <motion.h1
            className="font-heading"
            style={{
              ...H1_STYLE,
              position: 'absolute',
              top: 0, left: 0, right: 0,
              color: '#F2F2F2',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: BURST_DELAY + 0.1, duration: 0.65, ease: REVEAL_EASE }}
          >
            Theja Mitta
          </motion.h1>

        </div>

        {/* Separator — camera-light draw effect */}
        <div style={{ position: 'relative', width: '36px', height: '1px', marginBottom: '26px', overflow: 'visible' }}>
          {/* The line: draws left-to-right at linear pace */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.6, duration: 0.5, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#9A9A9A',
              opacity: 0.45,
              transformOrigin: 'left center',
            }}
          />
          {/* Traveling light — top: -7px centers the 14px glow on the 1px line.
              Only x is animated so there is no CSS transform conflict.          */}
          <motion.div
            initial={{ x: -6, opacity: 0 }}
            animate={{ x: 40, opacity: [0, 1, 1, 0] }}
            transition={{
              delay: 2.6,
              duration: 0.5,
              ease: 'linear',
              opacity: { times: [0, 0.06, 0.78, 1] },
            }}
            style={{
              position: 'absolute',
              top: '-7px',
              left: 0,
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.55) 35%, rgba(255,255,255,0.12) 65%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        <motion.p
          className="font-heading text-[#9A9A9A]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize:   'clamp(13px, 3.5vw, 21px)',
            fontStyle:  'italic',
            fontWeight: 400,
            lineHeight: 1.7,
            maxWidth:   '460px',
          }}
        >
          Raw emotion, real people, honest places — stories that stay with you long after the frame fades.
        </motion.p>

      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <div style={{
          width: '1px', height: '52px',
          background: 'linear-gradient(to bottom, #9A9A9A, transparent)',
          animation: 'scrollPulse 2.2s ease-in-out infinite',
        }} />
        <span className="font-body text-[#9A9A9A]"
          style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          Scroll
        </span>
      </motion.div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  )
}
