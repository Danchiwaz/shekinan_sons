import { motion } from 'framer-motion'
import visionBearerLocal from '../assets/IMG_9896 (2).jpg'

const Hero = () => {
  const visionBearerUrl = (import.meta as any).env?.VITE_VISION_BEARER_URL || visionBearerLocal
  return (
    <section id="home" className="relative hero text-white py-24 md:py-36 angle-bottom overflow-hidden">
        <div className="container mx-auto px-4">
            <div className="particles">
                {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} style={{ left: `${(i * 7) % 100}%`, bottom: `${(i * 13) % 100}%`, animationDuration: `${16 + i}s`, animationDelay: `${i * 0.6}s` }} />
                ))}
            </div>
            <div className="grid md:grid-cols-2 items-center gap-10 md:gap-14">
                <motion.div className="mx-auto md:mx-0 max-w-3xl text-center md:text-left" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
                    <motion.div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm tracking-wide mb-5 soft-glow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                        Welcome to Shekinah
                    </motion.div>
                    <motion.h1 className="heading-font text-5xl md:text-7xl font-bold mb-6 leading-tight" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        Where Jesus is the Center of Everything
                    </motion.h1>
                    <motion.p className="text-lg md:text-2xl mb-10 md:mb-12 max-w-2xl md:max-w-none mx-auto md:mx-0 text-white/90" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                        A place of worship, fellowship, and spiritual growth
                    </motion.p>
                    <motion.div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                        <a href="#contact" className="btn-primary-gradient text-white font-semibold py-3.5 px-10 rounded-full transition duration-300">Join Our Services</a>
                        <a href="#sermons" className="bg-transparent hover:bg-white/90 hover:text-gray-900 border-2 border-white/80 text-white font-semibold py-3.5 px-10 rounded-full transition duration-300">Watch Online</a>
                    </motion.div>
                </motion.div>

                <motion.div className="relative mx-auto md:mx-0 w-80 h-80 sm:w-96 sm:h-96 md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem] xl:w-[34rem] xl:h-[34rem] soft-glow" initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }} aria-label="Vision bearer">
					<motion.div className="absolute inset-0 rounded-full p-[10px]" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #111111 50%, #d1d5db 100%)' }} animate={{ rotate: [0, 4, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
                    <motion.div className="absolute inset-[10px] rounded-full overflow-hidden shadow-2xl bg-white/10 backdrop-blur-md" animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} whileHover={{ scale: 1.015 }}>
                        <img src={visionBearerUrl} alt="Vision bearer" className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" onError={(e)=>{ e.currentTarget.src = '/man.jpg' }} />
                        <div className="absolute -bottom-3 -left-3 w-24 h-24 rounded-full blur-2xl opacity-40" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(17,17,17,0.5) 50%, rgba(209,213,219,0.35) 100%)' }} />
                        <div className="absolute -top-4 -right-2 w-16 h-16 rounded-full blur-xl opacity-50" style={{ background: 'radial-gradient(circle, rgba(209,213,219,0.5) 0%, rgba(17,17,17,0.4) 60%, rgba(212,175,55,0.3) 100%)' }} />
                    </motion.div>

					{/* Vision Bearer label bubble */}
                    <motion.div className="absolute right-0 top-2 md:top-6 lg:top-8 translate-x-[110%] sm:translate-x-[115%] md:translate-x-[125%] lg:translate-x-[135%] xl:translate-x-[145%]" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.4 }} whileHover={{ scale: 1.03 }}>
						<div className="relative p-[2px] rounded-3xl" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #111111 50%, #d1d5db 100%)' }}>
							<div className="rounded-3xl bg-white/95 text-gray-900 backdrop-blur px-5 py-3.5 md:px-6 md:py-4 lg:px-7 lg:py-5 shadow-2xl border border-white/60">
								<span className="block text-xs md:text-sm lg:text-base uppercase tracking-wider brand-text-gradient font-semibold leading-none">Vision Bearer</span>
								<span className="block text-base md:text-lg lg:text-xl font-bold leading-tight">Joseph Mash</span>
								<span className="sr-only">Vision bearer portrait on the left</span>
							</div>
							<div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 bg-white/95 rotate-45 border-b border-r border-white/60" />
						</div>
					</motion.div>
                </motion.div>
            </div>
        </div>
    </section>
    
  );
};

export default Hero;
