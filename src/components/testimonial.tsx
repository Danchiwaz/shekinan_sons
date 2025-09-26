import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'
import TestimonialCard from './testimonialCard';
import { apiFetch } from '../lib/utils';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

type Testimonial = {
    name: string ;
    since: string;
    quote:string;
    imgSrc: string;
    stars?: number;
};
const Testimonials: React.FC = () => {
    const [items, setItems] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async ()=>{
            try {
                const data = await apiFetch('/testimonials')
                const approved = data.filter((t: any) => t.approved)
                setItems(approved)
            } finally { setLoading(false) }
        })()
    }, [])

    return (
        <section className='py-16 bg-white bg-fixed-hero angle-top'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-12'>
                    <h2 className='heading-font text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
                        What People Are Saying
                    </h2>
                    <p className='text-gray-600 max-w-2xl mx-auto'>Hear from members of our church family</p>
                </div>
                {loading ? (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {Array.from({length:3}).map((_,i)=>(<div key={i} className='rounded-2xl h-40 bg-gray-100 animate-pulse'/>))}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {items.map((t, i)=>(
                            <TestimonialCard key={i} {...t} />
                        ))}
                    </div>
                )}
                <ShareTestimony />
            </div>
        </section>
    )
}

function ShareTestimony(){
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [quote, setQuote] = useState('')
    const [submitting, setSubmitting] = useState(false)
    return (
        <div className='text-center mt-10'>
            <button onClick={()=>setOpen(true)} className='btn-primary-gradient text-white font-semibold py-3 px-8 rounded-full'>Share Your Testimony</button>
            {open && createPortal(
                <div className='fixed inset-0 z-[9999]'>
                    <div className='absolute inset-0 bg-black/60' onClick={()=>!submitting && setOpen(false)} />
                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-2xl max-h-[85vh] overflow-auto bg-white rounded-2xl shadow-2xl'>
                        <div className='p-6'>
                            <div className='flex items-start justify-between mb-2'>
                                <div>
                                    <h3 className='heading-font text-2xl font-bold text-gray-900'>Share Your Testimony</h3>
                                    <p className='text-sm text-gray-500 mt-1'>Your story will be reviewed before it appears.</p>
                                </div>
                                <button aria-label='Close' onClick={()=>!submitting && setOpen(false)} className='p-2 rounded-lg hover:bg-gray-100'>
                                    <X size={18} />
                                </button>
                            </div>
                            <form onSubmit={async (e)=>{
                                e.preventDefault();
                                if (quote.length > 500) { return; }
                                setSubmitting(true)
                                try {
                                    await apiFetch('/testimonials', { method: 'POST', body: JSON.stringify({ name, quote, approved: false }) })
                                    toast.success('Thank you! Your testimony was submitted for review.')
                                    setOpen(false); setName(''); setQuote('')
                                } catch (err:any) {
                                    toast.error(err.message || 'Submission failed')
                                } finally { setSubmitting(false) }
                            }} className='space-y-3'>
                            <div>
                                <label className='block text-sm font-medium text-gray-800 mb-1'>Full name</label>
                                <input required value={name} onChange={e=>setName(e.target.value)} placeholder='e.g., Mary Wanjiru' className='w-full px-4 py-2 rounded-lg border border-[#D4AF37] bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent' />
                            </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Your testimony</label>
                                <textarea required value={quote} onChange={e=>setQuote(e.target.value)} maxLength={500} placeholder='Share how God has worked in your life…' rows={5} className='w-full px-4 py-2 rounded-lg border border-[#D4AF37] bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent' />
                                    <div className='text-xs text-gray-500 mt-1'>{quote.length}/500</div>
                                </div>
                                <div className='flex items-center justify-end gap-2 pt-2'>
                                    <button type='button' onClick={()=>!submitting && setOpen(false)} className='px-4 py-2 rounded-lg text-sm text-gray-700 bg-gray-100 hover:bg-gray-200'>Cancel</button>
                                    <button type='submit' disabled={submitting || !name || !quote} className='px-4 py-2 rounded-lg text-sm text-white btn-primary-gradient disabled:opacity-60'>
                                        {submitting ? 'Submitting…' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}

export default Testimonials;
