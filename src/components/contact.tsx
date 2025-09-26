import React, { useState } from "react";
import { apiFetch } from "../lib/utils";
import toast from 'react-hot-toast'

const ContactSection: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null)
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || ''),
    }
    try {
      await apiFetch('/contacts', { method: 'POST', body: JSON.stringify(payload) })
      toast.success('Message sent! We will get back to you shortly.')
      setMessage('Message sent! We will get back to you shortly.')
      form.reset()
    } catch (err: any) {
      toast.error(err.message || 'Failed to send message')
      setMessage(err.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          {/* Contact Info Section */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="heading-font text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-8">
              We'd love to hear from you! Whether you have questions, prayer requests, or just want to say hello, our team is here to help.
            </p>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt text-blue-600 mt-1 mr-4 text-xl" aria-hidden="true"></i>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Address</h3>
                  <p className="text-gray-600">Kutus, Kirinyaga</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <i className="fas fa-phone-alt text-blue-600 mt-1 mr-4 text-xl" aria-hidden="true"></i>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">0796481049</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <i className="fas fa-envelope text-blue-600 mt-1 mr-4 text-xl" aria-hidden="true"></i>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">shekinahsons@gmail.com</p>
                </div>
              </div>

              {/* Service Times */}
              <div className="flex items-start">
                <i className="fas fa-clock text-blue-600 mt-1 mr-4 text-xl" aria-hidden="true"></i>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Service Times</h3>
                  <p className="text-gray-600">
                    Sunday: 9:00 AM & 11:00 AM<br />
                    Wednesday Bible Study: 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-8">
              {[
                { icon: "fab fa-facebook-f", href: "https://www.facebook.com/shekinahsonsglobal", bg: "bg-[#1877F2]" },
                { icon: "fab fa-instagram", href: "https://www.instagram.com/shekinahsonsglobal?igsh=MWE5MTFyc3l3aDRsOA==", bg: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]" },
                { icon: "fab fa-youtube", href: "https://youtube.com/@shekinahsonsglobal?si=yTbAl7BCwp36y6b8", bg: "bg-[#FF0000]" },
                { icon: "fab fa-tiktok", href: "https://www.tiktok.com/@shekinahsonsglobal?_t=ZM-8z8Py8Ywvgc&_r=1", bg: "bg-black" },
                { icon: "fab fa-spotify", href: "https://open.spotify.com/show/62bFC5Jqy3FZQeOQA3XwRK?si=VKwpFqu1RRurP1uAt3Rx0w", bg: "bg-[#1DB954]" },
                { icon: "fab fa-twitter", href: "https://www.threads.net/@shekinahsonsglobal", bg: "bg-black" },
              ].map(({ icon, href, bg }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  className={`${bg} hover:brightness-110 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300`}
                  aria-label={`Social icon ${icon}`}
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
              {[
                { label: "Your Name", id: "name", type: "text" },
                { label: "Email Address", id: "email", type: "email" },
                { label: "Subject", id: "subject", type: "text" },
              ].map(({ label, id, type }) => (
                <div key={id} className="mb-6">
                  <label htmlFor={id} className="block text-gray-700 font-bold mb-2">{label}</label>
                  <input
                    id={id}
                    type={type}
                    required
                    name={id}
                    className="w-full px-4 py-3 rounded-lg border border-[#D4AF37] bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  />
                </div>
              ))}

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea
                    id="message"
                    rows={5}
                    required
                    name="message"
                    className="w-full px-4 py-3 rounded-lg border border-[#D4AF37] bg-white text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary-gradient text-white font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            {message && (
              <p className={`text-sm mt-3 ${message.includes('sent') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
