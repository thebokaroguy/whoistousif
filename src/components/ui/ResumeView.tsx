"use client";

import { motion } from "framer-motion";
import { Download, Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from "lucide-react";

export default function ResumeView() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-white text-black p-8 md:p-16 font-sans overflow-y-auto"
        >
            <div className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden rounded-sm">

                {/* Header */}
                <header className="bg-gray-900 text-white p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Tousif Raza</h1>
                        <p className="text-xl text-cyan-400 font-mono">Robotics Engineer & AI Specialist</p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-gray-300">
                        <div className="flex items-center gap-2"><Mail size={16} /> iamtousifraza@gmail.com</div>
                        <div className="flex items-center gap-2"><Phone size={16} /> +91 81023 08736</div>
                        <div className="flex items-center gap-2"><MapPin size={16} /> Jamshedpur | India</div>
                        <div className="flex gap-4 mt-2">
                            <a href="https://linkedin.com/in/tousifraza/" className="hover:text-cyan-400"><Linkedin size={20} /></a>
                            <a href="https://github.com/thebokaroguy/" className="hover:text-cyan-400"><Github size={20} /></a>
                        </div>
                    </div>
                </header>

                <div className="p-10 space-y-8">
                    {/* Summary */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4 uppercase tracking-wider">Professional Summary</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Passionate Robotics and AI Engineer with expertise in VLSI, Embedded Systems, and IoT.
                            Proven track record of mentoring 600+ students and building 1000+ interactive projects.
                            Currently advancing research in AI/ML at BITS Pilani.
                        </p>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4 uppercase tracking-wider">Education</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>M.Tech in AI & ML</span>
                                    <span>2026 (Expected)</span>
                                </div>
                                <div className="text-gray-600">BITS Pilani</div>
                            </div>
                            <div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>B.Tech in Electronics Engineering</span>
                                    <span>2022</span>
                                </div>
                                <div className="text-gray-600">RVS College of Engineering and Technology</div>
                            </div>
                        </div>
                    </section>

                    {/* Experience */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4 uppercase tracking-wider">Experience</h2>
                        <div className="space-y-6">
                            <div className="group">
                                <div className="flex justify-between font-bold text-lg group-hover:text-cyan-700 transition-colors">
                                    <span>AI & Robotics Trainer</span>
                                    <span>2025 - Present</span>
                                </div>
                                <div className="text-gray-600 mb-2">EdTech / Freelance</div>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Mentored over 600 students in advanced robotics and AI concepts.</li>
                                    <li>Designed curriculum for "Sahayika AI" and autonomous drone systems.</li>
                                    <li>Conducted 20+ hands-on workshops across universities.</li>
                                </ul>
                            </div>

                            <div className="group">
                                <div className="flex justify-between font-bold text-lg group-hover:text-cyan-700 transition-colors">
                                    <span>VLSI Design Intern</span>
                                    <span>2024</span>
                                </div>
                                <div className="text-gray-600 mb-2">Semiconductor Industry</div>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Worked on Chip Design and Hardware Verification methodologies.</li>
                                    <li>Optimized power consumption in embedded IoT controllers.</li>
                                </ul>
                            </div>

                            <div className="group">
                                <div className="flex justify-between font-bold text-lg group-hover:text-cyan-700 transition-colors">
                                    <span>IoT Systems Engineer</span>
                                    <span>2023</span>
                                </div>
                                <div className="text-gray-600 mb-2">Environmental Tech</div>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Developed "Smart Bridge" monitoring system using Arduino and LoRa.</li>
                                    <li>Built real-time Water Quality Monitoring hardware.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Projects */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4 uppercase tracking-wider">Key Projects</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-4 bg-gray-50 rounded border border-gray-100 hover:border-cyan-500 transition-colors">
                                <h3 className="font-bold text-lg">Sahayika AI (Raspberry Pi 4)</h3>
                                <p className="text-gray-700 text-sm mt-1">A women's healthcare chatbot on Raspberry Pi 4, featuring full voice interaction and a 3.5" TFT touchscreen.</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded border border-gray-100 hover:border-cyan-500 transition-colors">
                                <h3 className="font-bold text-lg">Portable Eco Bot (ESP32)</h3>
                                <p className="text-gray-700 text-sm mt-1">An environment monitor powered by ESP32. It tracks AQI, gas leaks (MQ135), and climate (DHT11) on a crisp 0.96" OLED display.</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded border border-gray-100 hover:border-cyan-500 transition-colors">
                                <h3 className="font-bold text-lg">PID Control Line Following Robot</h3>
                                <p className="text-gray-700 text-sm mt-1">Autonomous navigation robot implementing PID algorithms for high-precision path tracking and speed control.</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded border border-gray-100 hover:border-cyan-500 transition-colors">
                                <h3 className="font-bold text-lg">Smart Bridge (Arduino UNO)</h3>
                                <p className="text-gray-700 text-sm mt-1">Engineered a bridge with an ultrasonic sensor and Arduino Uno for flood detection and response.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </motion.div>
    );
}
