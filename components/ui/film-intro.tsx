'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ── All film stills — interleaved across the 3 films for variety ─────── */
const FRAMES = [
  '/film_grabs/grab-01.png',
  '/film_grabs/theyyam-1.jpg',
  '/film_grabs/grab-02.png',
  '/film_grabs/varanasi-1.png',
  '/film_grabs/grab-03.png',
  '/film_grabs/theyyam-2.jpg',
  '/film_grabs/grab-04.png',
  '/film_grabs/varanasi-2.jpg',
  '/film_grabs/grab-05.png',
  '/film_grabs/theyyam-3.jpg',
  '/film_grabs/grab-06.png',
  '/film_grabs/varanasi-3.png',
  '/film_grabs/grab-07.png',
  '/film_grabs/theyyam-4.jpg',
  '/film_grabs/grab-08.png',
  '/film_grabs/theyyam-5.jpg',
  '/film_grabs/moment-1.png',
]

type Phase = 'flipping' | 'flash' | 'reveal' | 'exit'

export function FilmIntro({ onComplete }: { onComplete: () => void }) {
  const [phase,    setPhase]    = useState<Phase>('flipping')
  const [frameIdx, setFrameIdx] = useState(0)

  const ids     = useRef<ReturnType<typeof setTimeout>[]>([])
  const stopped = useRef(false)

  const cancelAll = useCallback(() => {
    stopped.current = true
    ids.current.forEach(clearTimeout)
    ids.current = []
  }, [])

  const skip = useCallback(() => {
    cancelAll()
    onComplete()
  }, [cancelAll, onComplete])

  /* ── Main timeline ────────────────────────────────────────────────────── */
  useEffect(() => {
    ids.current = []
    stopped.current = false

    FRAMES.forEach(src => { const img = new Image(); img.src = src })

    let speed = 150
    let frame = 0

    const tick = () => {
      if (stopped.current) return
      frame = (frame + 1) % FRAMES.length
      setFrameIdx(frame)
      ids.current.push(setTimeout(tick, speed))
    }
    ids.current.push(setTimeout(tick, speed))

    // Acceleration schedule
    ids.current.push(setTimeout(() => { speed = 70  },  700))
    ids.current.push(setTimeout(() => { speed = 40  }, 1300))
    ids.current.push(setTimeout(() => { speed = 22  }, 1900))

    // 2450ms → white flash
    ids.current.push(setTimeout(() => {
      stopped.current = true
      setPhase('flash')

      // 330ms later → logo reveal on black
      ids.current.push(setTimeout(() => {
        setPhase('reveal')

        // 970ms later → overlay fades out
        ids.current.push(setTimeout(() => {
          setPhase('exit')

          // 700ms later → main site mounts
          ids.current.push(setTimeout(() => onComplete(), 700))
        }, 970))
      }, 330))
    }, 2450))

    return cancelAll
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFlipping = phase === 'flipping'
  const isFlash    = phase === 'flash'
  const isReveal   = phase === 'reveal'
  const isExit     = phase === 'exit'

  return (
    <div
      onClick={skip}
      style={{
        position:   'fixed',
        inset:      0,
        zIndex:     99998,
        background: '#000',
        overflow:   'hidden',
        cursor:     'pointer',
        opacity:    isExit ? 0 : 1,
        transition: isExit ? 'opacity 0.65s ease' : 'none',
      }}
    >

      {/* ── 1. Cycling frame ────────────────────────────────────────────── */}
      {isFlipping && (
        <img
          src={FRAMES[frameIdx]}
          alt=""
          style={{
            position:  'absolute',
            inset:     0,
            width:     '100%',
            height:    '100%',
            objectFit: 'cover',
            filter:    'saturate(0.18) brightness(0.55) contrast(1.2)',
          }}
        />
      )}

      {/* ── 2. CRT scan lines ───────────────────────────────────────────── */}
      {isFlipping && (
        <div style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          background:    'repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0px, rgba(0,0,0,0.07) 1px, transparent 1px, transparent 4px)',
        }} />
      )}

      {/* ── 3. Radial vignette ──────────────────────────────────────────── */}
      {isFlipping && (
        <div style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          background:    'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.82) 100%)',
        }} />
      )}

      {/* ── 4. Letterbox bars ───────────────────────────────────────────── */}
      {isFlipping && <>
        <div style={{ position: 'absolute', top: 0,    left: 0, right: 0, height: '6%', background: '#000', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6%', background: '#000', pointerEvents: 'none' }} />
      </>}

      {/* ── 5. White flash overlay ──────────────────────────────────────── */}
      <div style={{
        position:      'absolute',
        inset:         0,
        pointerEvents: 'none',
        background:    '#fff',
        opacity:       isFlash ? 1 : 0,
        transition:    isFlash ? 'none' : 'opacity 0.48s ease',
      }} />

      {/* ── 6. Logo reveal ──────────────────────────────────────────────── */}
      {(isReveal || isExit) && (
        <div
          style={{
            position:       'absolute',
            inset:          0,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            pointerEvents:  'none',
            gap:            0,
          }}
        >
          <p
            className="font-heading"
            style={{
              fontSize:      'clamp(44px, 8vw, 116px)',
              fontWeight:    400,
              letterSpacing: '-0.02em',
              color:         '#F2F2F2',
              margin:        0,
              lineHeight:    1,
              animation:     'introLogo 0.65s cubic-bezier(0.16,1,0.3,1) both',
            }}
          >
            THEJA MITTA
          </p>
          <div
            style={{
              width:      '40px',
              height:     '1px',
              marginTop:  '18px',
              background: 'rgba(242,242,242,0.28)',
              animation:  'introRule 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both',
              transformOrigin: 'left center',
            }}
          />
        </div>
      )}

      {/* ── 7. Skip hint ────────────────────────────────────────────────── */}
      {isFlipping && (
        <p
          className="font-body"
          style={{
            position:      'absolute',
            bottom:        'calc(max(20px, env(safe-area-inset-bottom, 0px)) + 10px)',
            right:         '24px',
            fontSize:      '9px',
            letterSpacing: '0.22em',
            color:         'rgba(154,154,154,0.4)',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            margin:        0,
          }}
        >
          Tap to skip
        </p>
      )}

      <style>{`
        @keyframes introLogo {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes introRule {
          from { opacity: 0; transform: scaleX(0); }
          to   { opacity: 1; transform: scaleX(1); }
        }
      `}</style>
    </div>
  )
}
