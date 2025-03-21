"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"
import Image from "next/image"

const slides = [
  {
    id: 1,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20at%2010.14.42%E2%80%AFAM.jpg-DBSpMUKv9TER3sINmHHneW2zx9DLgE.jpeg",
    title: "Welcome to Star Hacs",
    description: "Empowering young minds for a brighter future",
  },
  {
    id: 2,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20at%2010.14.42%E2%80%AFAM.jpg-DBSpMUKv9TER3sINmHHneW2zx9DLgE.jpeg",
    title: "Innovative Learning",
    description: "Discover our cutting-edge educational programs",
  },
  {
    id: 3,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-04%20at%2010.14.42%E2%80%AFAM.jpg-DBSpMUKv9TER3sINmHHneW2zx9DLgE.jpeg",
    title: "Join Our Community",
    description: "Experience a nurturing environment for growth",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  React.useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000) // Change slide every 5 seconds
    return () => clearInterval(intervalId)
  }, [nextSlide])

  return (
    <div className="relative h-[400px] md:h-[600px] overflow-hidden mb-30">
      <AnimatePresence initial={false} custom={currentSlide}>
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`title-${slide.id}`}
                  className="mb-4 text-4xl font-bold"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {slide.title}
                </motion.h2>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${slide.id}`}
                  className="mb-8 text-xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {slide.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white hover:bg-white/40"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white hover:bg-white/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

