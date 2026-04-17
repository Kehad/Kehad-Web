"use client";
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Keyboard3d from '../others/keyboard';

export default function ContactSection() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('sending');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setStatus('success');
          form.current?.reset();
          setTimeout(() => setStatus('idle'), 5000);
        },
        (error) => {
          console.error('FAILED...', error.text);
          setStatus('error');
          setTimeout(() => setStatus('idle'), 5000);
        }
      );
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-32 z-10 relative mb-20">
      <div className="text-center mb-16">
        <h2 className="text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] font-black dark:text-white text-black tracking-tighter leading-none shadow-sm drop-shadow-xl hover:scale-110 hover:text-shadow-[0_1rem_2rem_rgba(0,0,0,0.4)] hover:rotate-4" style={{ textShadow: '0 4px 20px rgba(255,255,255,0.05)' }}>
          Let's Work<br/>Together
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-center">
        {/* Contact Form Card */}
        <div className="flex-1 w-full max-w-2xl bg-[#090b10] bg-opacity-80 backdrop-blur-md border border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
           
           <h3 className="text-3xl font-black text-white mb-2">Contact Form</h3>
           <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed mb-8">
             Please contact me directly at <span className="font-bold text-white">keahnney01@gmail.com</span> or drop your info here.
           </p>

           <form ref={form} className="flex flex-col gap-6 relative z-10" onSubmit={sendEmail}>
              <div className="flex flex-col sm:flex-row gap-6">
                 <div className="flex-1 flex flex-col gap-2">
                   <label className="text-white font-bold text-sm">Full name</label>
                   <input required type="text" name="user_name" placeholder="Your Name" className="bg-[#1b1e28] border border-gray-800 focus:border-blue-500 hover:border-gray-700 transition w-full px-4 py-3.5 rounded-xl text-white font-medium outline-none placeholder-gray-500 cursor-text shadow-inner" />
                 </div>
                 <div className="flex-1 flex flex-col gap-2">
                   <label className="text-white font-bold text-sm">Email Address</label>
                   <input required type="email" name="user_email" placeholder="you@example.com" className="bg-[#1b1e28] border border-gray-800 focus:border-blue-500 hover:border-gray-700 transition w-full px-4 py-3.5 rounded-xl text-white font-medium outline-none placeholder-gray-500 cursor-text shadow-inner" />
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-white font-bold text-sm">Your Message</label>
                 <textarea required name="message" placeholder="Tell me about your project" rows={5} className="bg-[#1b1e28] border border-gray-800 focus:border-blue-500 hover:border-gray-700 transition w-full px-4 py-3.5 rounded-xl text-white font-medium outline-none placeholder-gray-500 cursor-text resize-none shadow-inner"></textarea>
              </div>

              <p className="text-gray-400 font-medium text-xs mt-1">I'll never share your data with anyone else. Pinky promise!</p>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className={`mt-2 w-full font-bold py-4 rounded-xl border transition flex items-center justify-center gap-2 cursor-pointer shadow-lg
                  ${status === 'sending' ? 'bg-gray-700 border-gray-600 text-gray-300' : 
                    status === 'success' ? 'bg-green-600 border-green-500 text-white' : 
                    status === 'error' ? 'bg-red-600 border-red-500 text-white' : 
                    'bg-[#151a23] hover:bg-[#1a202c] text-white border-gray-700'}`
                }
              >
                {status === 'sending' ? 'Sending...' : 
                 status === 'success' ? 'Message Sent Successfully!' : 
                 status === 'error' ? 'Failed to Send' : 
                 'Send Message'}
                
                {status === 'idle' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
                )}
                {status === 'success' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                )}
              </button>
           </form>
        </div>

        {/* Decorative 3D Base Element mimicking the right image */}
        <div className="flex-1 w-full max-w-lg hidden lg:flex items-center justify-center" style={{ perspective: '2000px' }}>
           <Keyboard3d  />
        </div>
      </div>
    </section>
  );
}
