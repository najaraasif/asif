'use client'

import { useEffect, useState } from 'react'
import Scene3D from './Scene3D'
import Avatar3D from './Avatar3D'
import { personalInfo } from '@/lib/data'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
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
      
      {/* 3D Scene Container */}
      <div className="absolute inset-0 w-full h-full">
        <Scene3D 
          camera={{ position: [0, 0, 5], fov: 75 }}
          controls={false}
        >
          <Avatar3D position={[0, 0, 0]} scale={1} />
        </Scene3D>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-white mb-2">Hello, I'm</span>
            <span className="block bg-gradient-to-r from-luxury-gold via-yellow-400 to-luxury-gold bg-clip-text text-transparent animate-glow">
              {personalInfo.name}
            </span>
          </h1>

          {/* Subtitle */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-2">
              {personalInfo.title}
            </p>
            <p className="text-lg sm:text-xl text-luxury-gold font-semibold mb-8">
              {personalInfo.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={scrollToAbout}
                className="luxury-button text-lg px-8 py-4 w-full sm:w-auto"
              >
                Explore My Work
              </button>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-effect border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all duration-300 px-8 py-4 rounded-lg text-lg w-full sm:w-auto transform hover:scale-105"
              >
                Let's Connect
              </button>
            </div>
          </div>

          {/* Stats Preview */}
          <div className={`transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-luxury-gold mb-2">
                  {personalInfo.projectsCompleted}+
                </div>
                <div className="text-sm sm:text-base text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-luxury-gold mb-2">
                  {personalInfo.yearsOfExperience}+
                </div>
                <div className="text-sm sm:text-base text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-luxury-gold mb-2">
                  {personalInfo.clientSatisfaction}%
                </div>
                <div className="text-sm sm:text-base text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToAbout}
          className="text-luxury-gold hover:text-yellow-400 transition-colors duration-300"
          aria-label="Scroll to next section"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  )
}