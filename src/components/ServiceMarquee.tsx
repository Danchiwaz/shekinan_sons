const ServiceMarquee = () => {
  const items = [
    'Wed · 6:00pm–8:30pm · Rebornhall behind Rubis petrol station, Kutus',
    'Friday · 7:00pm–8:30pm · Rebornhall behind Rubis petrol station, Kutus',
    'Monthly Event · 2:00pm–7:00pm · Manet Gardens, Kutus',
  ]

  return (
    <div className="relative z-40 mt-6">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl border-2 border-yellow-500/50 bg-black/80 backdrop-blur ring-1 ring-yellow-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-yellow-600/40 to-transparent">
            <i className="fas fa-bell text-yellow-400" aria-hidden />
            <span className="uppercase tracking-wider text-xs text-yellow-200 font-semibold">Service Times</span>
          </div>

          <div className="marquee">
            <div className="marquee-inner">
              <div className="marquee-track">
                {items.map((t, i) => (
                  <span key={`a-${i}`} className="marquee-item">
                    <i className="fas fa-clock text-yellow-400" aria-hidden /> {t}
                  </span>
                ))}
              </div>
              <div className="marquee-track" aria-hidden>
                {items.map((t, i) => (
                  <span key={`b-${i}`} className="marquee-item">
                    <i className="fas fa-map-marker-alt text-yellow-400" aria-hidden /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceMarquee


