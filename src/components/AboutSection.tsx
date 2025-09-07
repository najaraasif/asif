'use client'

import { useEffect, useState, useRef } from 'react'
import Scene3D from './Scene3D'
import FloatingCard3D from './FloatingCard3D'
import { achievements, personalInfo } from '@/lib/data'

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen py-20 section-padding"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 marble-texture opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-luxury-gold via-yellow-400 to-luxury-gold bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Crafting digital experiences with precision, passion, and cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="glass-effect rounded-2xl p-8 luxury-card">
              <h3 className="text-2xl font-bold text-luxury-gold mb-4">
                My Journey
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                With over {personalInfo.yearsOfExperience} years in the industry, I've had the privilege of working 
                with startups, enterprises, and everything in between. My expertise spans across 
                full-stack development, with a particular passion for creating seamless user experiences 
                and robust backend architectures.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I believe in the power of clean code, scalable solutions, and continuous learning. 
                Every project is an opportunity to push boundaries and deliver exceptional results 
                that exceed expectations.
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-8 luxury-card">
              <h3 className="text-2xl font-bold text-luxury-gold mb-4">
                What Drives Me
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I'm passionate about transforming complex problems into elegant solutions. 
                Whether it's building a responsive web application, developing a mobile app, 
                or architecting a scalable backend, I approach each challenge with creativity, 
                attention to detail, and a commitment to excellence.
              </p>
            </div>
          </div>

          {/* 3D Achievements Cards */}
          <div className={`relative h-96 lg:h-[600px] transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <Scene3D 
              camera={{ position: [0, 0, 8], fov: 60 }}
              controls={false}
            >
              {achievements.map((achievement, index) => {
                const positions: [number, number, number][] = [
                  [-2, 1, 0],
                  [2, 1, 0],
                  [-2, -1.5, 0],
                  [2, -1.5, 0],
                ]
                return (
                  <FloatingCard3D
                    key={achievement.title}
                    achievement={achievement}
                    position={positions[index] || [0, 0, 0]}
                    index={index}
                  />
                )
              })}
            </Scene3D>
          </div>
        </div>

        {/* Skills Preview */}
        <div className={`mt-20 text-center transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h3 className="text-3xl font-bold text-luxury-gold mb-8">
            Core Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'AWS', 'React Native'].map((tech) => (
              <span
                key={tech}
                className="glass-effect px-6 py-3 rounded-full text-white font-medium hover:text-luxury-gold transition-colors duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Parallax Elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-luxury-gold rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-3/4 right-10 w-3 h-3 bg-luxury-gold rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-luxury-gold rounded-full animate-pulse opacity-80 delay-500"></div>
    </section>
  )
}