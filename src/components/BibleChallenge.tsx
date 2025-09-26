import { useEffect, useMemo, useRef, useState } from 'react'

type Question = {
  prompt: string
  options: string[]
  correctIndex: number
}

export default function BibleChallenge() {
  const [open, setOpen] = useState(false)
  const questions = useMemo<Question[]>(() => [
    { prompt: 'Who built the ark?', options: ['Moses', 'Noah', 'Abraham', 'David'], correctIndex: 1 },
    { prompt: 'Where was Jesus born?', options: ['Nazareth', 'Bethlehem', 'Jerusalem', 'Capernaum'], correctIndex: 1 },
    { prompt: 'How many days did God take to create the world?', options: ['3', '6', '7', '40'], correctIndex: 1 },
    { prompt: 'Who was thrown into the lions’ den?', options: ['Daniel', 'Joseph', 'Jonah', 'Elijah'], correctIndex: 0 },
    { prompt: 'What is the first book of the Bible?', options: ['Psalms', 'Matthew', 'Genesis', 'Exodus'], correctIndex: 2 },
  ], [])

  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [celebrate, setCelebrate] = useState(false)

  const allAnswered = Object.keys(answers).length === questions.length

  const submit = () => {
    const correct = questions.reduce((acc, q, i) => acc + ((answers[i] ?? -1) === q.correctIndex ? 1 : 0), 0)
    setScore(correct)
    setSubmitted(true)
    if (correct / questions.length >= 0.8) {
      triggerConfetti()
    }
  }

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setCelebrate(false)
  }

  // Simple confetti using canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const triggerConfetti = () => {
    setCelebrate(true)
    setTimeout(() => setCelebrate(false), 3000)
  }

  useEffect(() => {
    if (!celebrate) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const { innerWidth: w, innerHeight: h } = window
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    ctx.scale(dpr, dpr)

    type Particle = { x: number; y: number; r: number; vx: number; vy: number; color: string; rot: number; vr: number }
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#ec4899']
    const parts: Particle[] = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * w,
      y: -20 - Math.random() * h * 0.5,
      r: 3 + Math.random() * 4,
      vx: -1 + Math.random() * 2,
      vy: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vr: -0.1 + Math.random() * 0.2,
    }))

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      parts.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr
        if (p.y > h + 10) {
          p.y = -10
          p.x = Math.random() * w
        }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2)
        ctx.restore()
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [celebrate])

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(true); reset() }}
        className="fixed bottom-6 right-6 z-40 btn-primary-gradient text-white font-semibold py-3 px-5 rounded-full shadow-lg"
        aria-label="Open Bible Challenge"
      >
        Bible Challenge
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 right-0 left-0 md:left-auto md:bottom-auto md:right-6 md:top-24 md:w-[480px] w-full bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <div>
                <div className="heading-font text-xl font-bold text-gray-900">Bible Challenge</div>
                <div className="text-xs text-gray-500">Answer 5 questions</div>
              </div>
              <button aria-label="Close" onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">✕</button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-auto">
              {!submitted ? (
                <div className="space-y-5">
                  {questions.map((q, qi) => (
                    <div key={qi} className="border rounded-xl p-4">
                      <div className="font-semibold text-gray-900 mb-3">{qi + 1}. {q.prompt}</div>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, oi) => {
                          const selected = answers[qi] === oi
                          return (
                            <label key={oi} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer border ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                              <input
                                type="radio"
                                name={`q-${qi}`}
                                checked={selected}
                                onChange={() => setAnswers(a => ({ ...a, [qi]: oi }))}
                              />
                              <span className="text-gray-800">{opt}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-end">
                    <button disabled={!allAnswered} onClick={submit} className="btn-primary-gradient text-white font-semibold py-2.5 px-6 rounded-full disabled:opacity-60">Submit</button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="heading-font text-2xl font-bold text-gray-900">Your Score: {score}/{questions.length}</div>
                  <div className="mt-2 text-gray-600">{score / questions.length >= 0.8 ? 'Amazing! 🎉' : 'Great try! Keep learning.'}</div>
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button onClick={reset} className="px-4 py-2 rounded-lg text-sm text-gray-700 bg-gray-100 hover:bg-gray-200">Try Again</button>
                    <button onClick={() => setOpen(false)} className="btn-primary-gradient text-white font-semibold py-2 px-5 rounded-lg">Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {celebrate && (
            <canvas ref={canvasRef} className="fixed inset-0 z-40 pointer-events-none" />
          )}
        </div>
      )}
    </>
  )
}


