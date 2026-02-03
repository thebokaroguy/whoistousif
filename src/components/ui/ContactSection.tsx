"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Send, Upload, Phone, Mail } from "lucide-react";

export default function ContactSection() {
    return (
        <section className="absolute bottom-0 left-0 w-full min-h-screen z-30 flex items-center justify-center bg-transparent pointer-events-none">
            {/* Gradient Overlay to fade out the 3D scene */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 md:px-20 py-20 pointer-events-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-sm font-mono text-cyan-400 tracking-[0.3em] mb-4">
                                // COMMUNICATION_CHANNEL
                            </h2>
                            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-6">
                                Let's Build <br /> The Future.
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                Have a visionary project? I'm ready to engineer the impossible.
                                Connect with me for collaborations, freelance, or robotic consultations.
                            </p>
                        </div>

                        <div className="pt-2">
                            <a
                                href="/assets/resume.pdf"
                                download="Tousif_Resume.pdf"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 border border-cyan-500/50 rounded-full text-cyan-400 font-mono text-sm tracking-wider hover:bg-cyan-500/20 hover:scale-105 transition-all group"
                            >
                                <Upload className="rotate-180" size={18} />
                                ACCESS_PERSONNEL_FILE (RESUME)
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-wrap gap-4">
                            {[
                                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/tousifraza/", color: "hover:text-cyan-400" },
                                { icon: Github, label: "GitHub", href: "https://github.com/thebokaroguy/", color: "hover:text-purple-400" },
                                { icon: Instagram, label: "Instagram", href: "https://instagram.com/thebokaroguy", color: "hover:text-pink-400" },
                                { icon: Phone, label: "WhatsApp", href: "https://wa.me/+918102308736", color: "hover:text-green-400" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-4 bg-white/5 border border-white/10 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10 ${social.color}`}
                                    aria-label={social.label}
                                >
                                    <social.icon size={24} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Premium Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-cyan-400 uppercase">Input_Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-cyan-400 uppercase">Input_Contact</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 000 000 0000"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-cyan-400 uppercase">Data_Packet (Query)</label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe your project parameters..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-cyan-400 uppercase">Upload_Schematics</label>
                                <div className="relative group cursor-pointer">
                                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    <div className="w-full bg-black/40 border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center gap-2 group-hover:border-cyan-500/50 transition-colors">
                                        <Upload size={24} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                        <span className="text-sm text-gray-500 group-hover:text-gray-300">Drop files or click to upload</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)]"
                            >
                                <Send size={20} />
                                INITIATE TRANSMISSION
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Footer Copyright */}
                <div className="mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-sm font-mono">
                    <p>© 2026 TROBOTIX ENGINEERING. ALL SYSTEMS NOMINAL.</p>
                </div>
            </div>
        </section>
    );
}
