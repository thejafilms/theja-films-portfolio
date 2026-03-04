'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollAnimatedVideoProps {
  /**
   * Either a Vimeo player URL (iframe) or a direct video file URL.
   * Vimeo: https://player.vimeo.com/video/VIDEO_ID?background=1&...
   * Direct: https://example.com/video.mp4
   */
  src: string
  poster?: string
  title: string
  location: string
  description: string
  /** Defer loading until section is near viewport */
  lazy?: boolean
  className?: string
}

function isEmbedUrl(src: string) {
  return src.includes('vimeo.com') || src.includes('youtube.com') || src.includes('youtu.be')
}

export function ScrollAnimatedVideo({
  src,
  poster,
  title,
  location,
  description,
  lazy = false,
  className,
}: ScrollAnimatedVideoProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [activeSrc, setActiveSrc] = useState(lazy ? '' : src)
  const embed = isEmbedUrl(src)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.6

        if (inView) {
          if (lazy && !activeSrc) setActiveSrc(src)
          setExpanded(true)
          const t = setTimeout(() => setOverlayVisible(true), 1100)
          return () => clearTimeout(t)
        } else if (entry.intersectionRatio < 0.1) {
          setExpanded(false)
          setOverlayVisible(false)
        }
      },
      { threshold: [0, 0.1, 0.6, 1.0] },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [src, lazy, activeSrc])

  return (
    <section
      ref={sectionRef}
      className={cn(
        'snap-section relative flex items-center justify-center bg-[#0B0B0B] overflow-hidden',
        className,
      )}
    >
      {/* ── Expanding media container ─────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          width: expanded ? '100%' : '52%',
          height: expanded ? '100%' : '58%',
          transition:
            'width 1.3s cubic-bezier(0.16, 1, 0.3, 1), height 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'width, height',
        }}
      >
        {embed ? (
          /* ── Vimeo / YouTube iframe ─────────────── */
          activeSrc ? (
            <iframe
              src={activeSrc}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              className="absolute inset-0 w-full h-full border-0"
              style={{
                transform: 'scale(1.05)',
                filter: 'brightness(0.65) saturate(0.85)',
              }}
              title={title}
            />
          ) : null
        ) : (
          /* ── HTML5 video ────────────────────────── */
          <video
            src={activeSrc || undefined}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload={lazy ? 'none' : 'auto'}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.65) saturate(0.85)' }}
          />
        )}

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(11,11,11,0.65) 100%)',
          }}
        />
      </div>

      {/* ── Bottom gradient ─────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-72 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(11,11,11,0.98) 0%, rgba(11,11,11,0.4) 60%, transparent 100%)',
          opacity: overlayVisible ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />

      {/* ── Film detail overlay ──────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 px-16 pb-14 z-10"
        style={{
          opacity: overlayVisible ? 1 : 0,
          transform: overlayVisible ? 'translateY(0)' : 'translateY(16px)',
          transition:
            'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <p
          className="font-body text-[#9A9A9A]"
          style={{
            fontSize: '10px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            marginBottom: '10px',
            opacity: overlayVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.1s',
          }}
        >
          {location}
        </p>

        <h2
          className="font-heading text-[#F2F2F2]"
          style={{
            fontSize: 'clamp(38px, 5.5vw, 82px)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.0,
            marginBottom: '14px',
            opacity: overlayVisible ? 1 : 0,
            transform: overlayVisible ? 'translateY(0)' : 'translateY(10px)',
            transition:
              'opacity 0.8s ease 0.18s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.18s',
          }}
        >
          {title}
        </h2>

        <p
          className="font-body text-[#9A9A9A]"
          style={{
            fontSize: '14px',
            lineHeight: 1.75,
            maxWidth: '380px',
            fontWeight: 300,
            opacity: overlayVisible ? 1 : 0,
            transform: overlayVisible ? 'translateY(0)' : 'translateY(6px)',
            transition:
              'opacity 0.8s ease 0.32s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.32s',
          }}
        >
          {description}
        </p>
      </div>

      {/* ── Scroll cue (before expansion) ───────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{
          opacity: expanded ? 0 : 0.45,
          transition: 'opacity 0.5s ease',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #9A9A9A, transparent)',
          }}
        />
        <span
          className="font-body text-[#9A9A9A]"
          style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
