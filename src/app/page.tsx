'use client'

import React, { Suspense, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

// Loading component for 3D scenes
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-luxury-gold/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

// Particle system component
function ParticleSystem() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.id = 'particle-canvas'
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '1'
    canvas.style.opacity = '0.3'

    const particleContainer = document.getElementById('particle-container')
    if (particleContainer) {
      particleContainer.appendChild(canvas)
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.5 + 0.2
        this.life = 0
        this.maxLife = Math.random() * 300 + 200
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life++

        // Fade out as particle ages
        this.opacity = (1 - this.life / this.maxLife) * 0.7

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = '#D4AF37'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      isDead() {
        return this.life >= this.maxLife
      }
    }

    const particles: Particle[] = []
    const maxParticles = 50

    const animate = () => {
      if (!ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add new particles
      if (particles.length < maxParticles) {
        particles.push(new Particle())
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        particle.update()
        particle.draw()

        if (particle.isDead()) {
          particles.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (particleContainer && canvas) {
        particleContainer.removeChild(canvas)
      }
    }
  }, [])

  return null
}

export default function HomePage() {
  useEffect(() => {
    // Smooth scrolling polyfill for older browsers
    if (typeof window !== 'undefined' && typeof require !== 'undefined') {
      try {
        require('smoothscroll-polyfill').polyfill()
      } catch (e) {
        console.log('Smoothscroll polyfill not available')
      }
    }

    // Add custom cursor effect
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: screen;
      transition: transform 0.1s ease;
    `
    document.body.appendChild(cursor)

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 10 + 'px'
      cursor.style.top = e.clientY - 10 + 'px'
    }

    const scaleCursor = () => {
      cursor.style.transform = 'scale(1.5)'
    }

    const resetCursor = () => {
      cursor.style.transform = 'scale(1)'
    }

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mousedown', scaleCursor)
    document.addEventListener('mouseup', resetCursor)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .luxury-card')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', scaleCursor)
      el.addEventListener('mouseleave', resetCursor)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mousedown', scaleCursor)
      document.removeEventListener('mouseup', resetCursor)
      document.body.removeChild(cursor)
    }
  }, [])

  return (
    <main className="relative overflow-x-hidden">
      {/* Particle System */}
      <ParticleSystem />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ProjectsSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <ContactSection />
      </Suspense>
      
      {/* Footer */}
      <Footer />
      
      {/* Loading Overlay for Initial Load */}
      <div 
        id="loading-overlay" 
        className="fixed inset-0 bg-luxury-dark z-50 flex items-center justify-center transition-opacity duration-1000"
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-luxury-gold/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-24 h-24 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-luxury-gold text-xl font-semibold mb-2">
            Loading Experience
          </h2>
          <p className="text-gray-400">
            Preparing luxury portfolio...
          </p>
        </div>
      </div>
    </main>
  )
}