"use client"

import { motion } from "motion/react"

export default function HeroSection() {
  return (
    <div className="relative h-[50vh] flex items-center" id="hero">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")',
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="container mx-auto px-4 z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Us</h1>
          <p className="text-xl text-white/90 max-w-2xl">Empowering innovation through technology and collaboration.</p>
        </motion.div>
      </div>
    </div>
  )
}
