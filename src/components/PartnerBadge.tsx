import { useCallback } from 'react'
import toast from 'react-hot-toast'

export default function PartnerBadge() {
  const copy = useCallback(() => {
    const details = 'Partner with us\nPaybill: 247247\nAccount No: 0796481049'
    navigator.clipboard.writeText(details).then(
      () => toast.success('Giving details copied'),
      () => toast.error('Failed to copy')
    )
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button onClick={copy} className="group relative">
        <div className="absolute -inset-1 rounded-2xl blur opacity-60 group-hover:opacity-90 transition" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #ec4899 100%)' }} />
        <div className="relative p-[2px] rounded-2xl" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #ec4899 100%)' }}>
          <div className="rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-2xl border border-white/60 text-left">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #ec4899 100%)' }}>❤</span>
              <span className="heading-font font-bold text-gray-900">Partner with us</span>
            </div>
            <div className="mt-1 text-xs md:text-sm text-gray-700">
              Paybill <span className="font-semibold">247247</span> · Acc No <span className="font-semibold">0796481049</span>
            </div>
            <div className="mt-1 text-[10px] text-gray-500">Click to copy details</div>
          </div>
        </div>
      </button>
    </div>
  )
}


