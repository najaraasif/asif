'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'


function LoadingSpinner() {
  return (
    <motion.div 
      className="flex items-center justify-center h-96"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        <motion.div 
          className="w-16 h-16 border-4 border-luxury-gold/20 rounded-full"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div 
          className="absolute top-0 left-0 w-16 h-16 border-4 border-luxury-gold border-t-transparent rounded-full"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}


function ParticleSystem() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4 && isMobile) {
      return
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    canvas.id = 'particle-canvas'
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '1'
    canvas.style.opacity = isMobile ? '0.15' : '0.25'

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

    
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
      maxLife: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3)
        this.vy = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3)
        this.size = Math.random() * (isMobile ? 1 : 1.5) + 0.5
        this.opacity = Math.random() * 0.4 + 0.1
        this.life = 0
        this.maxLife = Math.random() * (isMobile ? 150 : 250) + 100
        this.color = Math.random() > 0.7 ? '#FFD700' : '#D4AF37'
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life++

        
        const lifeFactor = 1 - this.life / this.maxLife
        this.opacity = lifeFactor * 0.5

        
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        if (!ctx || this.opacity <= 0) return
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
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
    const maxParticles = isMobile ? 15 : 30
    let animationId: number
    let lastTime = 0
    const targetFPS = isMobile ? 30 : 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      if (!ctx) return
      
      if (currentTime - lastTime >= frameInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        
        if (particles.length < maxParticles && Math.random() > 0.95) {
          particles.push(new Particle())
        }

        
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i]
          particle.update()
          particle.draw()

          if (particle.isDead()) {
            particles.splice(i, 1)
          }
        }
        
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('resize', checkMobile)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (particleContainer && canvas) {
        particleContainer.removeChild(canvas)
      }
    }
  }, [isMobile])

  return null
}

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    
    if (typeof window !== 'undefined' && typeof require !== 'undefined') {
      try {
        require('smoothscroll-polyfill').polyfill()
      } catch (e) {
        console.log('Smoothscroll polyfill not available')
      }
    }

    
    if (!isMobile) {
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
        opacity: 0;
      `
      document.body.appendChild(cursor)

      const moveCursor = (e: MouseEvent) => {
        cursor.style.left = e.clientX - 10 + 'px'
        cursor.style.top = e.clientY - 10 + 'px'
        cursor.style.opacity = '1'
      }

      const scaleCursor = () => {
        cursor.style.transform = 'scale(1.5)'
      }

      const resetCursor = () => {
        cursor.style.transform = 'scale(1)'
      }
      
      const hideCursor = () => {
        cursor.style.opacity = '0'
      }

      document.addEventListener('mousemove', moveCursor, { passive: true })
      document.addEventListener('mousedown', scaleCursor, { passive: true })
      document.addEventListener('mouseup', resetCursor, { passive: true })
      document.addEventListener('mouseleave', hideCursor, { passive: true })

      
      const addHoverEffects = () => {
        const interactiveElements = document.querySelectorAll('button, a, .luxury-card, .touch-target')
        interactiveElements.forEach(el => {
          el.addEventListener('mouseenter', scaleCursor, { passive: true })
          el.addEventListener('mouseleave', resetCursor, { passive: true })
        })
      }
      
      
      const timeoutId = setTimeout(addHoverEffects, 1000)
      
      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('mousemove', moveCursor)
        document.removeEventListener('mousedown', scaleCursor)
        document.removeEventListener('mouseup', resetCursor)
        document.removeEventListener('mouseleave', hideCursor)
        if (document.body.contains(cursor)) {
          document.body.removeChild(cursor)
        }
        window.removeEventListener('resize', checkMobile)
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  return (
    <motion.main 
      className="relative overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >

      <ParticleSystem />
      

      <Navigation />
      

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
        </Suspense>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <AboutSection />
        </Suspense>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectsSection />
        </Suspense>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ContactSection />
        </Suspense>
      </motion.div>
      

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Footer />
      </motion.div>
    </motion.main>
  )
}