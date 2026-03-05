'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'

interface Still {
  src: string
  w: number
  h: number
  depth: number
  posClass: string
  rotation: string
  size: string
  filmId: string
  filmTitle: string
}

const STILLS: Still[] = [
  // Film 1 — This Is My Moment.. (Udupi & Gokarna)
  { src: '/film_grabs/grab-01.png',   w: 3600, h: 2338, depth: 2.2, posClass: 'top-[4%]    left-[0%]',   rotation: '-1.8deg', size: 'w-[290px] h-[188px]', filmId: 'film-1', filmTitle: 'This Is My Moment..' },
  { src: '/film_grabs/grab-05.png',   w: 3600, h: 2338, depth: 1.8, posClass: 'top-[33%]   left-[-1%]',  rotation: '-1.2deg', size: 'w-[250px] h-[162px]', filmId: 'film-1', filmTitle: 'This Is My Moment..' },
  { src: '/film_grabs/grab-03.png',   w: 3600, h: 2338, depth: 2.8, posClass: 'bottom-[5%] left-[13%]',  rotation: '-0.9deg', size: 'w-[230px] h-[149px]', filmId: 'film-1', filmTitle: 'This Is My Moment..' },
  // Film 2 — Theyyam – A God Awakens (Kannur, Kerala)
  { src: '/film_grabs/theyyam-1.jpg', w: 3840, h: 2160, depth: 5.2, posClass: 'top-[1%]    right-[2%]',  rotation:  '2.0deg', size: 'w-[210px] h-[136px]', filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens' },
  { src: '/film_grabs/theyyam-2.jpg', w: 3840, h: 2160, depth: 6.2, posClass: 'top-[36%]   right-[0%]',  rotation:  '1.4deg', size: 'w-[195px] h-[127px]', filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens' },
  { src: '/film_grabs/theyyam-3.jpg', w: 3840, h: 2160, depth: 4.4, posClass: 'bottom-[7%] right-[12%]', rotation:  '1.1deg', size: 'w-[200px] h-[130px]', filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens' },
  // Film 3 — The Soul of Varanasi
  { src: '/film_grabs/varanasi-1.png', w: 2145, h: 1688, depth: 3.8, posClass: 'top-[60%]   left-[1%]',  rotation: '-1.6deg', size: 'w-[270px] h-[175px]', filmId: 'film-3', filmTitle: 'The Soul of Varanasi' },
  { src: '/film_grabs/varanasi-2.jpg', w: 3840, h: 2160, depth: 3.2, posClass: 'top-[63%]   right-[1%]', rotation:  '1.2deg', size: 'w-[240px] h-[156px]', filmId: 'film-3', filmTitle: 'The Soul of Varanasi' },
]

function scrollToFilm(filmId: string) {
  document.getElementById(filmId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HeroBanner() {
  return (
    <section className="snap-section relative overflow-hidden bg-[#0B0B0B]">

      <Floating sensitivity={-1} easingFactor={0.04} className="overflow-hidden">
        {STILLS.map((still, i) => (
          <FloatingElement key={i} depth={still.depth} className={still.posClass}>

            {/* Outer: entry opacity + rotation + hover state propagation + click */}
            <motion.div
              className="cursor-pointer"
              style={{ rotate: still.rotation }}
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover="hovered"
              onClick={() => scrollToFilm(still.filmId)}
              variants={{
                hidden: { opacity: 0 },
                visible: (i: number) => ({
                  opacity: 1,
                  transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                }),
                hovered: { opacity: 1 },
              }}
            >
              {/* Inner: scale + shadow animation */}
              <motion.div
                className={`floating-still overflow-hidden relative ${still.size}`}
                custom={i}
                variants={{
                  hidden: { scale: 0.96, boxShadow: '0 12px 48px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.4)' },
                  visible: (i: number) => ({
                    scale: 1,
                    boxShadow: '0 12px 48px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.4)',
                    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  }),
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

                {/* Film title label — slides up on hover */}
                <motion.div
                  className="absolute bottom-0 inset-x-0"
                  style={{
                    padding: '32px 10px 8px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  }}
                  variants={{
                    hidden:  { opacity: 0, y: 6 },
                    visible: { opacity: 0, y: 6 },
                    hovered: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <p
                    className="font-body text-center text-[#F2F2F2]"
                    style={{ fontSize: '7px', letterSpacing: '0.28em', textTransform: 'uppercase' }}
                  >
                    {still.filmTitle}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

          </FloatingElement>
        ))}
      </Floating>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 68% 68% at 50% 50%, transparent 28%, rgba(11,11,11,0.45) 65%, rgba(11,11,11,0.82) 100%)',
        }}
      />

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center pointer-events-none">

        <motion.h1
          className="font-heading text-[#F2F2F2]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(56px, 9.5vw, 130px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            marginBottom: '28px',
          }}
        >
          Theja Mitta
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '36px', height: '1px', background: '#9A9A9A', opacity: 0.4, marginBottom: '26px' }}
        />

        <motion.p
          className="font-heading text-[#9A9A9A]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(15px, 1.6vw, 21px)',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.7,
            maxWidth: '460px',
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
        transition={{ duration: 1, delay: 2.4 }}
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
