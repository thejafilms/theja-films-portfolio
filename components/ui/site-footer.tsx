'use client'

const LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/thejafilms/' },
  { label: 'YouTube',   href: 'https://www.youtube.com/@ThejaMitta'   },
  { label: 'Vimeo',     href: 'https://vimeo.com/thejamitta'          },
]

export function SiteFooter() {
  return (
    <footer
      className="flex items-center justify-between flex-wrap gap-3 px-6 py-4 sm:px-10"
      style={{
        background: '#0B0B0B',
        borderTop:  '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Left — copyright */}
      <p
        className="font-body"
        style={{
          fontSize:      '11px',
          letterSpacing: '0.12em',
          color:         'rgba(154,154,154,0.6)',
          textTransform: 'uppercase',
          margin:        0,
        }}
      >
        © 2026 Theja Mitta
      </p>

      {/* Right — social links */}
      <nav
        style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '32px',
        }}
      >
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body"
            style={{
              fontSize:      '11px',
              letterSpacing: '0.12em',
              color:         'rgba(154,154,154,0.5)',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition:    'color 0.25s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(242,242,242,0.9)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(154,154,154,0.5)')}
          >
            {label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
