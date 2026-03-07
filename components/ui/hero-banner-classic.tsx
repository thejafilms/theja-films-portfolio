'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'

/* ── Classic hero — six large editorial stills, two-wing layout ────────── */

interface Still {
  src: string; w: number; h: number
  depth: number; posClass: string; rotation: string; size: string
  filmId: string; filmTitle: string
}

const STILLS: Still[] = [
  // Left wing
  {
    src: '/film_grabs/tim-1.png', w: 3600, h: 2338, depth: 1.2,
    posClass: 'top-[4%]  left-[0%]',  rotation: '-1.2deg', size: 'w-[340px] h-[221px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
  },
  {
    src: '/film_grabs/thy-2.jpg', w: 3840, h: 2160, depth: 1.7,
    posClass: 'top-[33%] left-[5%]',  rotation: '-0.7deg', size: 'w-[295px] h-[166px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
  },
  {
    src: '/film_grabs/sov-2.png', w: 3600, h: 2338, depth: 1.4,
    posClass: 'top-[63%] left-[-1%]', rotation: '-1.4deg', size: 'w-[315px] h-[204px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
  },
  // Right wing
  {
    src: '/film_grabs/sov-5.png', w: 2145, h: 1688, depth: 1.6,
    posClass: 'top-[7%]  right-[0%]', rotation: '1.3deg',  size: 'w-[315px] h-[248px]',
    filmId: 'film-3', filmTitle: 'The Soul of Varanasi',
  },
  {
    src: '/film_grabs/tim-5.png', w: 3600, h: 2338, depth: 1.2,
    posClass: 'top-[36%] right-[2%]', rotation: '0.8deg',  size: 'w-[345px] h-[224px]',
    filmId: 'film-1', filmTitle: 'This Is My Moment..',
  },
  {
    src: '/film_grabs/thy-4.jpg', w: 3840, h: 2160, depth: 2.0,
    posClass: 'top-[66%] right-[-1%]',rotation: '1.5deg',  size: 'w-[290px] h-[163px]',
    filmId: 'film-2', filmTitle: 'Theyyam – A God Awakens',
  },
]

function scrollToFilm(filmId: string) {
  document.getElementById(filmId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const LOGO_STYLE = {
  fontSize:      '15px',
  fontWeight:    700,
  letterSpacing: '0.08em',
  lineHeight:    1.0,
  margin:        0,
  textTransform: 'uppercase' as const,
}

const EASE = [0.16, 1, 0.3, 1] as const

export function HeroBannerClassic() {
  return (
    <section className="snap-section relative overflow-hidden bg-[#0B0B0B]">

      <div className="hidden sm:block">
        <Floating sensitivity={-1} easingFactor={0.03} className="overflow-hidden">
          {STILLS.map((still, i) => (
            <FloatingElement key={i} depth={still.depth} className={still.posClass}>
              <motion.div
                className="cursor-pointer"
                style={{ rotate: still.rotation }}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                transition={{ delay: 0.5 + i * 0.22, duration: 1.5, ease: EASE }}
                whileHover="hovered"
                onClick={() => scrollToFilm(still.filmId)}
              >
                <motion.div
                  className={`overflow-hidden relative ${still.size}`}
                  style={{
                    boxShadow: '0 24px 64px rgba(0,0,0,0.78), 0 6px 20px rgba(0,0,0,0.5)',
                    border:    '1px solid rgba(255,255,255,0.04)',
                  }}
                  variants={{
                    hovered: {
                      scale: 1.04,
                      boxShadow: '0 36px 88px rgba(0,0,0,0.92), 0 8px 28px rgba(0,0,0,0.65)',
                      transition: { duration: 0.5, ease: EASE },
                    },
                  }}
                >
                  <Image
                    src={still.src} width={still.w} height={still.h} alt=""
                    className="w-full h-full object-cover"
                    style={{ filter: 'saturate(0.70) brightness(0.83) contrast(1.06)' }}
                    priority={i < 3}
                  />
                  <motion.div
                    className="absolute bottom-0 inset-x-0"
                    style={{ padding: '44px 12px 10px', background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)' }}
                    initial={{ opacity: 0, y: 6 }}
                    variants={{ hovered: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } }}
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

      {/* Edge vignette */}
      <div className="absolute inset-0 pointer-events-none z-[5]"
        style={{ background: 'radial-gradient(ellipse 62% 62% at 50% 50%, transparent 22%, rgba(11,11,11,0.42) 62%, rgba(11,11,11,0.85) 100%)' }}
      />

      {/* Logo */}
      <div className="absolute top-0 left-0 right-0 flex justify-center z-10 pt-8">
        <motion.button
          className="font-dm cursor-pointer bg-transparent border-0 p-0"
          style={{ ...LOGO_STYLE, color: 'rgba(242,242,242,0.88)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          onClick={() => { window.location.href = '/' }}
        >
          Theja Mitta
        </motion.button>
      </div>

      {/* Caption */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center pointer-events-none">
        <motion.p
          className="font-heading text-[#9A9A9A]"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.0, ease: EASE }}
          style={{ fontSize: 'clamp(13px, 3.5vw, 21px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.7, width: '100%', maxWidth: '480px' }}
        >
          <span style={{ display: 'block' }}>Raw emotion, real people, honest places —</span>
          <span style={{ display: 'block' }}>stories that stay long after the frame fades.</span>
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 3.0, duration: 1 }}
      >
        <div style={{ width: '1px', height: '52px', background: 'linear-gradient(to bottom, #9A9A9A, transparent)', animation: 'scrollPulse 2.2s ease-in-out infinite' }} />
        <span className="font-body text-[#9A9A9A]" style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Scroll</span>
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
