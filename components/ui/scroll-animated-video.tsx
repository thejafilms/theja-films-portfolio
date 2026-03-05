'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface ScrollAnimatedVideoProps {
  vimeoId: string
  title: string
  location: string
  description: string
  year?: string
  category?: string
  lazy?: boolean
  className?: string
}

export function ScrollAnimatedVideo({
  vimeoId,
  title,
  location,
  description,
  year,
  category,
  lazy = false,
  className,
}: ScrollAnimatedVideoProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(!lazy)
  const [isMuted, setIsMuted] = useState(true)

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setDetailsVisible(false), 3500)
  }, [])

  const showDetails = useCallback(() => {
    setDetailsVisible(true)
    scheduleHide()
  }, [scheduleHide])

  const mutedSrc = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0&dnt=1`
  const unmutedSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=0&byline=0&title=0&dnt=1&controls=0&autopause=0`
  const activeSrc = isLoaded ? (isMuted ? mutedSrc : unmutedSrc) : ''

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.6

        if (inView) {
          if (lazy && !isLoaded) setIsLoaded(true)
          setExpanded(true)
          const t = setTimeout(() => {
            setOverlayVisible(true)
            showDetails()
          }, 1100)
          return () => clearTimeout(t)
        } else if (entry.intersectionRatio < 0.1) {
          setExpanded(false)
          setOverlayVisible(false)
          setDetailsVisible(false)
          if (hideTimer.current) clearTimeout(hideTimer.current)
        }
      },
      { threshold: [0, 0.1, 0.6, 1.0] },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [lazy, isLoaded, showDetails])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !overlayVisible) return
    const onMove = () => showDetails()
    section.addEventListener('mousemove', onMove)
    return () => section.removeEventListener('mousemove', onMove)
  }, [overlayVisible, showDetails])

  useEffect(() => {
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current) }
  }, [])

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
        {activeSrc ? (
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
        ) : null}

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
          opacity: detailsVisible ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />

      {/* ── Top bar: category/year + mute toggle ────── */}
      <div
        className="absolute top-0 left-0 right-0 px-10 pt-10 flex items-start justify-between z-10"
        style={{
          opacity: overlayVisible ? 1 : 0,
          transition: 'opacity 0.9s ease 0.2s',
        }}
      >
        {/* Category + Year */}
        {(category || year) && (
          <p
            className="font-body text-[#9A9A9A]"
            style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            {[category, year].filter(Boolean).join(' • ')}
          </p>
        )}

        {/* Mute toggle */}
        <button
          onClick={() => {
            const unmuting = isMuted // currently muted → about to unmute
            setIsMuted(m => !m)
            if (unmuting) {
              // hide details immediately so video takes focus
              setDetailsVisible(false)
              if (hideTimer.current) clearTimeout(hideTimer.current)
            }
          }}
          className="ml-auto flex items-center gap-2 group"
          style={{
            background: 'rgba(11,11,11,0.55)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '2px',
            padding: '6px 10px',
            cursor: 'pointer',
            backdropFilter: 'blur(6px)',
          }}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            /* Speaker off */
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9A9A9A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            /* Speaker on */
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F2F2F2"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
          <span
            className="font-body"
            style={{
              fontSize: '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: isMuted ? '#9A9A9A' : '#F2F2F2',
            }}
          >
            {isMuted ? 'Sound off' : 'Sound on'}
          </span>
        </button>
      </div>

      {/* ── Film detail overlay ──────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 px-16 pb-14 z-10"
        style={{
          opacity: detailsVisible ? 1 : 0,
          transform: detailsVisible ? 'translateY(0)' : 'translateY(16px)',
          transition:
            'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: detailsVisible ? 'auto' : 'none',
        }}
      >
        <p
          className="font-body text-[#9A9A9A]"
          style={{
            fontSize: '10px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            marginBottom: '10px',
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
          }}
        >
          {title}
        </h2>

        <p
          className="font-body text-[#9A9A9A]"
          style={{
            fontSize: '14px',
            lineHeight: 1.75,
            maxWidth: '420px',
            fontWeight: 300,
            marginBottom: '18px',
          }}
        >
          {description}
        </p>

        {/* Credits */}
        <p
          className="font-body"
          style={{
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: '#5A5A5A',
          }}
        >
          Director · Cinematographer · Editor · Producer — Theja Mitta
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
