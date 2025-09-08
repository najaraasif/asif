'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Scene3D from './Scene3D'
import Avatar3D from './Avatar3D'
import { personalInfo } from '@/lib/data'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [typewriterText, setTypewriterText] = useState('')
  const [typewriterIndex, setTypewriterIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const typewriterTexts = useMemo(() => [
    "Software Developer", 
    "Web Developer", 
    "App Developer", 
    "Backend Developer"
  ], [])

  // Typewriter effect
  useEffect(() => {
    const typeWriter = () => {
      const currentText = typewriterTexts[typewriterIndex]
      
      if (isDeleting) {
        setTypewriterText(currentText.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
      } else {
        setTypewriterText(currentText.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setTypewriterIndex((prev) => (prev + 1) % typewriterTexts.length)
      }
    }

    const typingSpeed = isDeleting ? 50 : 100
    const timeoutId = setTimeout(typeWriter, typingSpeed)
    
    return () => clearTimeout(timeoutId)
  }, [charIndex, isDeleting, typewriterIndex, typewriterTexts])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 marble-texture"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-luxury-blue/40"></div>
      
      {/* 3D Scene Container - Optimized for mobile */}
      <div className={`absolute inset-0 w-full h-full ${
        isMobile ? 'opacity-70' : 'opacity-100'
      }`}>
        <Scene3D 
          camera={{ 
            position: isMobile ? [0, 0, 6] : [0, 0, 5], 
            fov: isMobile ? 60 : 75 
          }}
          controls={false}
        >
          <Avatar3D 
            position={[0, 0, 0]} 
            scale={isMobile ? 0.7 : 1} 
          />
        </Scene3D>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <motion.span 
            className="block text-white mb-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hello, I'm
          </motion.span>
          <motion.span 
            className="block bg-gradient-to-r from-luxury-gold via-yellow-400 to-luxury-gold bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              scale: isVisible ? 1 : 0.8 
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {personalInfo.name}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-2">
            <span id="typewriter-text">{typewriterText}</span>
            <span className="animate-pulse">|</span>
          </p>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-luxury-gold font-semibold mb-6 sm:mb-8"
            animate={{ 
              textShadow: isVisible ? '0 0 20px rgba(212, 175, 55, 0.5)' : 'none'
            }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {personalInfo.subtitle}
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
            {personalInfo.bio}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={scrollToAbout}
              className="luxury-button text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Explore My Work
            </motion.button>
            <motion.button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass-effect border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg w-full sm:w-auto touch-target"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderColor: '#FFD700'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Let's Connect
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 max-w-2xl mx-auto">
            {[
              { value: personalInfo.projectsCompleted + '+', label: 'Projects' },
              { value: personalInfo.yearsOfExperience + '+', label: 'Years' },
              { value: personalInfo.clientSatisfaction + '%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  textShadow: '0 0 20px rgba(212, 175, 55, 0.6)'
                }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-gold mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.button
          onClick={scrollToAbout}
          className="text-luxury-gold hover:text-yellow-400 transition-colors duration-300 touch-target"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to next section"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  )
}