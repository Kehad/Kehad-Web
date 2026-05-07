"use client";

import React, { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import emailjs from '@emailjs/browser';
import MenuSection from "../../components/home/MenuSection";
import Footer from "../../components/home/Footer";
import ContactSection from "../../components/home/ContactSection";

// const articles: any[] = [
//   {
//     title: "Building a High-Performance 3D Portfolio in Next.js",
//     date: "April 2024",
//     readTime: "8 min read",
//     tag: "TECHNICAL",
//     description: "A deep dive into how I leveraged React Three Fiber, WebGL optimization, and modern Next.js 13 App Router architecture to craft this exact portfolio.",
//     slug: "building-3d-portfolio-nextjs",
//     featured: true
//   },
//   {
//     title: "Mastering Framer Motion for Cinematic Interfaces",
//     date: "March 2024",
//     readTime: "5 min read",
//     tag: "DESIGN",
//     description: "Stop building static websites. Here is my practical guide on injecting life into your UI components using layout animations, scroll tracking, and spring physics.",
//     slug: "mastering-motion-interfaces"
//   },
//   {
//     title: "The Subtle Art of Glassmorphism & Dark Mode",
//     date: "February 2024",
//     readTime: "6 min read",
//     tag: "DESIGN",
//     description: "How to properly combine backdrop-blur, semi-transparent borders, and deep color palettes to achieve an ultra-modern 'glass' aesthetic without sacrificing accessibility.",
//     slug: "art-of-glassmorphism-darkmode"
//   },
//   {
//     title: "Why TypeScript is Essential for Large Scale React Apps",
//     date: "January 2024",
//     readTime: "10 min read",
//     tag: "TECHNICAL",
//     description: "Type safety isn't just about catching errors early; it's about developer experience, documentation, and building a maintainable codebase that scales with your team.",
//     slug: "typescript-essential-react"
//   },
//   {
//     title: "Optimizing Web Vitals: A Case Study on Performance",
//     date: "December 2023",
//     readTime: "12 min read",
//     tag: "TECHNICAL",
//     description: "How we reduced LCP by 40% and improved CLS to near zero for a high-traffic e-commerce platform using modern image optimization and code splitting.",
//     slug: "optimizing-web-vitals"
//   },
//   {
//     title: "Designing for the Future: Minimalist UI Trends in 2024",
//     date: "November 2023",
//     readTime: "4 min read",
//     tag: "DESIGN",
//     description: "Exploring the shift towards hyper-minimalism, brutalist typography, and the resurgence of tactile UI elements in the upcoming year.",
//     slug: "minimalist-ui-trends-2024"
//   }
// ];

const articles: any[] = []

const categories = ["ALL", "TECHNICAL", "DESIGN", "CASE STUDIES"];

export default function BlogIndex() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const newsletterForm = useRef<HTMLFormElement>(null);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === "ALL" || article.tag === selectedTag;
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const featuredArticle = useMemo(() => {
    // Only show featured if we're not searching/filtering or if the featured article matches
    if (searchQuery === "" && selectedTag === "ALL") {
      return articles.find(a => a.featured) || articles[0];
    }
    return null;
  }, [searchQuery, selectedTag]);

  const listArticles = useMemo(() => {
    if (featuredArticle) {
      return filteredArticles.filter(a => a.slug !== featuredArticle.slug);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle]);

  return (
    <div className="min-h-screen  text-white overflow-x-hidden font-sans flex flex-col">
      
      {/* Navigation */}
      

      <main className="flex-grow pt-32 pb-24 max-w-[1000px] mx-auto px-6 w-full flex flex-col gap-8 md:gap-16">
        
        {/* Header & Search */}
        <header className="flex flex-col gap-8">
          {/* Back Button */}
          <Link to="/" className="w-fit flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold group mb-2 md:mb-4">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Home
          </Link>
          <div className="flex flex-col gap-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[0.9]"
            >
              Terminal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Thoughts.</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl leading-relaxed"
            >
              Curated insights on frontend engineering, 3D web experiences, and the intersection of code and design.
            </motion.p>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mt-4"
          >
            {/* Search Input */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <input 
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
              />
            </div>

            {/* Filter Tags */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTag(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest whitespace-nowrap transition-all border ${
                    selectedTag === cat 
                    ? "bg-blue-500 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {articles.length === 0 ? (
            /* System Empty State (Coming Soon) */
            <motion.div 
              key="system-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-32 text-center gap-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                <div className="relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Writing in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Progress.</span></h3>
                <p className="text-gray-400 max-w-md mx-auto text-lg font-medium leading-relaxed">
                  I'm currently crafting some deep dives into 3D web development and frontend architecture. Check back soon for the first batch of articles.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black text-blue-400 tracking-[0.3em] uppercase animate-pulse">
                Stay Tuned
              </div>
            </motion.div>
          ) : filteredArticles.length > 0 ? (
            <motion.div 
              key={`${selectedTag}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-12 md:gap-20"
            >
              {/* Featured Article - Only show when no active search/filter or it matches */}
              {featuredArticle && (
                <Link to={`/blog/${featuredArticle.slug}`}>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full relative rounded-[2rem] bg-gray-900 border border-white/10 overflow-hidden shadow-2xl group hover:border-blue-500/50 transition-all duration-500 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-600/5 pointer-events-none" />
                    <div className="p-8 md:p-16 flex flex-col gap-8 relative z-10">
                      <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase">
                        <span className="text-blue-400 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          Featured
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                        <span className="text-gray-500">{featuredArticle.readTime}</span>
                      </div>
                      <div className="flex flex-col gap-4">
                        <h2 className="text-4xl md:text-6xl font-black text-white group-hover:text-blue-300 transition-colors leading-tight tracking-tight">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-xl text-gray-400 leading-relaxed font-medium max-w-3xl">
                          {featuredArticle.description}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-3 text-sm font-black text-blue-400 tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                        READ FULL POST 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )}

              {/* Article List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {listArticles.map((article, idx) => (
                  <Link key={article.slug} to={`/blog/${article.slug}`}>
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group flex flex-col gap-6 p-2 rounded-3xl transition-all cursor-pointer h-full"
                    >
                      <div className="flex items-center justify-between text-xs font-bold tracking-widest uppercase">
                        <span className="text-cyan-400">{article.tag}</span>
                        <span className="text-gray-500">{article.date}</span>
                      </div>
                      
                      <div className="flex flex-col gap-4 flex-grow">
                        <h3 className="text-2xl md:text-3xl font-black text-gray-100 group-hover:text-blue-400 transition-colors leading-tight tracking-tight">
                          {article.title}
                        </h3>
                        <p className="text-base text-gray-400 leading-relaxed font-medium line-clamp-3">
                          {article.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs font-black text-white/40 group-hover:text-white transition-colors tracking-widest">
                        CONTINUE READING &rarr;
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Filter Empty State (No Matches) */
            <motion.div 
              key="filter-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-20 text-center gap-6"
            >
              <div className="p-8 rounded-full bg-white/5 border border-white/5 text-gray-500">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">No articles found</h3>
                <p className="text-gray-400 max-w-xs mx-auto font-medium">
                  We couldn't find any articles matching your search or filters. Try a different query or reset filters.
                </p>
              </div>
              <button 
                onClick={() => {setSearchQuery(""); setSelectedTag("ALL");}}
                className="mt-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xs tracking-widest uppercase hover:bg-white/10 transition-all active:scale-95"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Newsletter Section */}
        <section className="mt-12 md:mt-24 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 to-indigo-900/20 border border-white/10 p-8 md:p-20 text-center flex flex-col items-center gap-8">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col gap-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Stay in the <span className="text-blue-400">Loop.</span></h2>
            <p className="text-lg text-gray-300 max-w-xl font-medium">
              Join 1,000+ developers receiving monthly insights on high-performance web development and creative coding.
            </p>
          </div>

          <form 
            ref={newsletterForm}
            className="w-full max-w-md flex flex-col sm:flex-row gap-3 relative z-10" 
            onSubmit={(e) => {
              e.preventDefault();
              if (!newsletterForm.current) return;
              
              setSubscribeStatus('loading');
              
              const serviceId = import.meta.env.VITE_EMAILJS_NEWSLETTER_SERVICE_ID || 'YOUR_SERVICE_ID';
              const templateId = import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
              const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

              emailjs
                .sendForm(serviceId, templateId, newsletterForm.current, {
                  publicKey: publicKey,
                })
                .then(
                  () => {
                    setSubscribeStatus('success');
                    newsletterForm.current?.reset();
                    setTimeout(() => setSubscribeStatus('idle'), 5000);
                  },
                  (error) => {
                    console.error('FAILED...', error.text);
                    setSubscribeStatus('error');
                    setTimeout(() => setSubscribeStatus('idle'), 5000);
                  }
                );
            }}
          >
            <input 
              type="email" 
              name="user_email"
              placeholder="your@email.com"
              className="flex-grow bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all backdrop-blur-md"
              required
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
            />
            <button 
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className={`px-8 py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95 flex items-center justify-center gap-2
                ${subscribeStatus === 'success' ? 'bg-green-500 hover:bg-green-400' : 
                  subscribeStatus === 'error' ? 'bg-red-600 hover:bg-red-500 text-white' :
                  'bg-blue-600 hover:bg-blue-500 text-white'}
              `}
            >
              {subscribeStatus === 'loading' ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : subscribeStatus === 'success' ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17L4 12"/></svg>
                  Subscribed
                </>
              ) : subscribeStatus === 'error' ? (
                "Error"
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
          <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">No spam. Only high-quality content.</p>
        </section>

      </main>

      {/* <ContactSection /> */}
      <Footer />

      {/* Decorative background glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      
      <MenuSection isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}
