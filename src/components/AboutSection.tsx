'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Scene3D from './Scene3D'
import FloatingCard3D from './FloatingCard3D'
import { achievements, personalInfo } from '@/lib/data'

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
  
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkMobile)
    }
  }, [])


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: 'backOut'
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen py-12 sm:py-16 lg:py-20 section-padding"
    >

      <div className="absolute inset-0 marble-texture opacity-50"></div>
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
  
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            whileInView={{ 
              backgroundPosition: ['0%', '100%'],
              transition: { duration: 2, ease: 'linear' }
            }}
          >
            <span className="bg-gradient-to-r from-luxury-gold via-yellow-400 to-luxury-gold bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            Crafting digital experiences with precision, passion, and cutting-edge technology
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
    
          <motion.div 
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            variants={itemVariants}
          >
            <motion.div 
              className="glass-effect rounded-2xl p-6 sm:p-8 luxury-card"
              whileHover={{ 
                scale: isMobile ? 1 : 1.02,
                boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl font-bold text-luxury-gold mb-3 sm:mb-4"
                whileInView={{ 
                  textShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
                }}
                transition={{ duration: 0.5 }}
              >
                My Journey
              </motion.h3>
              <motion.p 
                className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                With over {personalInfo.yearsOfExperience} years in the industry, I've had the privilege of working 
                with startups, enterprises, and everything in between. My expertise spans across 
                full-stack development, with a particular passion for creating seamless user experiences 
                and robust backend architectures.
              </motion.p>
              <motion.p 
                className="text-gray-300 leading-relaxed text-sm sm:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                I believe in the power of clean code, scalable solutions, and continuous learning. 
                Every project is an opportunity to push boundaries and deliver exceptional results 
                that exceed expectations.
              </motion.p>
            </motion.div>

            <motion.div 
              className="glass-effect rounded-2xl p-6 sm:p-8 luxury-card"
              whileHover={{ 
                scale: isMobile ? 1 : 1.02,
                boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl font-bold text-luxury-gold mb-3 sm:mb-4"
                whileInView={{ 
                  textShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
                }}
                transition={{ duration: 0.5 }}
              >
                What Drives Me
              </motion.h3>
              <motion.p 
                className="text-gray-300 leading-relaxed text-sm sm:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                I'm passionate about transforming complex problems into elegant solutions. 
                Whether it's building a responsive web application, developing a mobile app, 
                or architecting a scalable backend, I approach each challenge with creativity, 
                attention to detail, and a commitment to excellence.
              </motion.p>
            </motion.div>
            
      
            <motion.div 
              className="md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4"
              variants={containerVariants}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="glass-effect rounded-xl p-4 text-center luxury-card"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <div className="text-lg font-bold text-luxury-gold mb-1">
                    {achievement.value}
                  </div>
                  <div className="text-xs text-gray-400">
                    {achievement.title}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

    
          {!isMobile && (
            <motion.div 
              className="relative h-96 lg:h-[600px]"
              variants={cardVariants}
            >
              <Scene3D 
                camera={{ position: [0, 0, 8], fov: 60 }}
                controls={false}
              >
                {achievements.map((achievement, index) => {
                  const positions: [number, number, number][] = [
                    [-1, 1.5, 0],
                    [1, 1.5, 0],
                    [-1, -0.5, 0],
                    [1, -0.5, 0],
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
            </motion.div>
          )}
        </div>

  
        <motion.div 
          className="mt-16 sm:mt-20 text-center"
          variants={itemVariants}
        >
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold text-luxury-gold mb-6 sm:mb-8"
            whileInView={{ 
              textShadow: '0 0 30px rgba(212, 175, 55, 0.6)'
            }}
            transition={{ duration: 0.5 }}
          >
            Core Technologies
          </motion.h3>
          <motion.div 
            className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto px-4"
            variants={containerVariants}
          >
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'AWS', 'React Native'].map((tech, index) => (
              <motion.span
                key={tech}
                className="glass-effect px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white font-medium hover:text-luxury-gold transition-colors duration-300 cursor-default text-sm sm:text-base touch-target"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: 'backOut'
                    }
                  }
                }}
                whileHover={{ 
                  scale: isMobile ? 1 : 1.1,
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  textShadow: '0 0 10px rgba(212, 175, 55, 0.8)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>


      <motion.div 
        className="absolute top-1/4 left-4 sm:left-10 w-2 h-2 bg-luxury-gold rounded-full opacity-60"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-3/4 right-4 sm:right-10 w-3 h-3 bg-luxury-gold rounded-full opacity-40"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-1 h-1 bg-luxury-gold rounded-full opacity-80"
        animate={{ 
          scale: [1, 2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </section>
  )
}