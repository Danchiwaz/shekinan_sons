import type React from 'react';
import { useState } from 'react'
import { apiFetch } from '../lib/utils'
import toast from 'react-hot-toast'

const NewsletterSection: React.FC =() =>{
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setMessage(null)
        setLoading(true)
        try {
            await apiFetch('/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
            toast.success('Subscribed successfully!')
            setMessage('Subscribed successfully!')
            setEmail('')
        } catch (err: any) {
            toast.error(err.message || 'Failed to subscribe')
            setMessage(err.message || 'Failed to subscribe')
        } finally {
            setLoading(false)
        }
    };
    return(
        <section id='newsletter' className='py-16 bg-white'>
            <div className='container mx-auto px-4'>
                <div className='max-w-4xl mx-auto rounded-2xl border border-gray-100 bg-gray-50 p-8 md:p-12 shadow-sm'>
                    <div className='text-center mb-8'>
                        <h2 className='heading-font text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
                            Stay Connected
                        </h2>
                        <p className='text-gray-600'>
                            Subscribe to our newsletter for weekly updates , events reminders and spiritual encouragement.
                            </p>
                        
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                        <input
                            type='email'
                            placeholder='your email address'
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className='flex-grow px-4 py-3 rounded-lg border border-[#D4AF37] bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent'
                            />
                        <button
                            type='submit'
                            disabled={loading}
                            className='btn-primary-gradient text-white font-semibold py-3 px-8 rounded-lg transition duration-300 disabled:opacity-60'>
                        {loading ? 'Subscribing...' : 'Subscribe'}
                        </button> 
                        
                    </form>
                    {message && (
                        <p className={`text-center text-sm mt-4 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </p>
                    )}
                    <p className='text-center text-sm text-gray-500 mt-4'>
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                </div>
            </div>
        </section>
    )
}
export default NewsletterSection;