import { motion } from 'framer-motion'

const About = () => {
  return (
    <>
      <section id="about" className="py-20 md:py-28 bg-white bg-fixed-church">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img src="/church.jpg" alt="church gathering" className="rounded-lg shadow-xl w-full h-auto" />
            </div>

            <div className="md:w-1/2 bg-white/70 backdrop-blur rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8">
              <h2 className="heading-font text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-6">Our Mission & Vision</h2>
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="font-bold text-gray-800">Vision</h3>
                  <p className="text-gray-600">To raise mature sons of God that are able to manifest the tangible presence of God in every place.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Mission</h3>
                  <p className="text-gray-600">To ensure people come to the knowledge of truth through the teaching of the word of God.</p>
                </div>
              </div>

              <div className="flex items-center justify-center mt-4">
                <div className="relative w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-full p-6 bg-gradient-to-br from-blue-50 to-white shadow-2xl ring-1 ring-gray-100 drop-shadow-[0_0_20px_rgba(37,99,235,0.15)]">
                  <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="50%" stopColor="#111111" />
                        <stop offset="100%" stopColor="#d1d5db" />
                      </linearGradient>
                      <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="50%" stopColor="#111111" />
                        <stop offset="100%" stopColor="#d1d5db" />
                      </linearGradient>
                    </defs>

                    {/* Center */}
                    <g>
                      <motion.circle cx="150" cy="150" r="40" fill="url(#centerGrad)" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
                      <text x="150" y="146" textAnchor="middle" className="fill-white" style={{ fontWeight: 800, fontSize: 12, letterSpacing: 0.3 }}>
                        <tspan x="150" dy="0">Our Core</tspan>
                        <tspan x="150" dy="16">Values</tspan>
                      </text>
                    </g>

                    {/* Rotating ring */}
                    <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 24, ease: 'linear' }} style={{ transformOrigin: '150px 150px' }}>
                      <circle cx="150" cy="150" r="110" fill="none" stroke="url(#ringGrad)" strokeWidth="2.5" strokeDasharray="12 10" />
                      {[0,1,2,3,4,5,6,7].map((i)=>{
                        const angle = (i * 45) * Math.PI / 180;
                        const x = 150 + 110 * Math.cos(angle);
                        const y = 150 + 110 * Math.sin(angle);
                        return (
                          <circle key={i} cx={x} cy={y} r="2.5" fill="#D4AF37" />
                        )
                      })}
                    </motion.g>

                    {/* Value nodes - dynamic text sizing */}
                    {[
                      { label: 'Love', x: 230, y: 150 },
                      { label: 'Patience', x: 150, y: 70 },
                      { label: 'Commitment', x: 70, y: 150 },
                      { label: 'Sacrifice', x: 150, y: 230 },
                    ].map((v, i)=>{
                      const len = v.label.length
                      const fontSize = Math.max(7, 16 - len)
                      const isLong = len > 8
                      const textProps = isLong ? { lengthAdjust: 'spacingAndGlyphs' as const, textLength: 36 } : {}
                      return (
                        <g key={i}>
                          <circle cx={v.x} cy={v.y} r="22" fill="#111111" stroke="#D4AF37" strokeWidth="2" />
                          <text x={v.x} y={v.y} textAnchor="middle" dominantBaseline="middle" className="fill-white" style={{ fontWeight: 700, fontSize, letterSpacing: isLong ? -0.2 : 0 }} {...textProps}>
                            {v.label}
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About


