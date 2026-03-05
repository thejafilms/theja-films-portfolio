'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, stagger, useAnimate } from 'motion/react'
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'

interface Still {
  src: string
  w: number
  h: number
  depth: number
  posClass: string
  rotation: string
  size: string // tailwind w-/h- classes for the element
}

const STILLS: Still[] = [
  { src: '/film_grabs/grab-01.png', w: 3600, h: 2338, depth: 2.2, posClass: 'top-[4%]   left-[0%]',   rotation: '-1.8deg', size: 'w-[290px] h-[188px]' },
  { src: '/film_grabs/grab-06.png', w: 3600, h: 2338, depth: 5.2, posClass: 'top-[1%]   right-[2%]',  rotation:  '2.0deg', size: 'w-[210px] h-[136px]' },
  { src: '/film_grabs/grab-03.png', w: 3600, h: 2338, depth: 1.8, posClass: 'top-[33%]  left-[-1%]',  rotation: '-1.2deg', size: 'w-[250px] h-[162px]' },
  { src: '/film_grabs/grab-07.png', w: 3600, h: 2338, depth: 6.2, posClass: 'top-[36%]  right-[0%]',  rotation:  '1.4deg', size: 'w-[195px] h-[127px]' },
  { src: '/film_grabs/grab-05.png', w: 3600, h: 2338, depth: 3.8, posClass: 'top-[60%]  left-[1%]',   rotation: '-1.6deg', size: 'w-[270px] h-[175px]' },
  { src: '/film_grabs/grab-08.png', w: 3600, h: 2338, depth: 3.2, posClass: 'top-[63%]  right-[1%]',  rotation:  '1.2deg', size: 'w-[240px] h-[156px]' },
  { src: '/film_grabs/grab-02.png', w: 3600, h: 2338, depth: 2.8, posClass: 'bottom-[5%] left-[13%]', rotation: '-0.9deg', size: 'w-[230px] h-[149px]' },
  { src: '/film_grabs/grab-04.png', w: 3600, h: 2338, depth: 4.4, posClass: 'bottom-[7%] right-[12%]',rotation:  '1.1deg', size: 'w-[200px] h-[130px]' },
]

export function HeroBanner() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    // Stagger film stills in first, then reveal text
    animate(
      '.film-still',
      { opacity: [0, 1], scale: [0.96, 1] },
      { duration: 0.7, delay: stagger(0.1), ease: [0.16, 1, 0.3, 1] },
    )
  }, [animate])

  return (
    <section
      ref={scope}
      className="snap-section relative overflow-hidden bg-[#0B0B0B]"
    >
      <Floating sensitivity={-1} easingFactor={0.04} className="overflow-hidden">

        {STILLS.map((still, i) => (
          <FloatingElement
            key={i}
            depth={still.depth}
            className={still.posClass}
          >
            <div
              className={`film-still floating-still overflow-hidden ${still.size}`}
              style={{
                opacity: 0,
                transform: `rotate(${still.rotation})`,
                boxShadow: '0 12px 48px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.4)',
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
            </div>
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
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">

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
