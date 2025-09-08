'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Scene3D from './Scene3D'
import Project3D from './Project3D'
import { projects } from '@/lib/data'

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }


  useEffect(() => {
    if (isMobile) return
    
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isMobile])

  const getProjectPosition = (index: number): [number, number, number] => {
    const angle = (index * 2 * Math.PI) / projects.length
    const radius = 4
    return [
      Math.sin(angle) * radius,
      0,
      Math.cos(angle) * radius - 2
    ]
  }

  const getProjectRotation = (index: number): [number, number, number] => {
    const angle = (index * 2 * Math.PI) / projects.length
    return [0, -angle, 0]
  }

  const currentProject = projects[activeProject]

  return (
    <motion.section 
      ref={sectionRef}
      id="projects" 
      className="relative min-h-screen py-12 sm:py-16 lg:py-20 section-padding"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >

      <div className="absolute inset-0 marble-texture opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
  
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
              Featured Projects
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            A showcase of my finest work - from innovative web applications to cutting-edge mobile solutions
          </motion.p>
        </motion.div>

  
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-20"
          variants={itemVariants}
        >
    
          <motion.div 
            className="space-y-6 sm:space-y-8"
            variants={itemVariants}
          >
            <motion.div 
              className="glass-effect rounded-2xl p-6 sm:p-8 luxury-card"
              whileHover={{ 
                scale: isMobile ? 1 : 1.02,
                boxShadow: '0 25px 50px rgba(212, 175, 55, 0.2)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div 
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="px-3 py-1 bg-luxury-gold text-black text-sm font-semibold rounded-full">
                  {currentProject.category.toUpperCase()}
                </span>
                {currentProject.featured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full">
                    FEATURED
                  </span>
                )}
              </motion.div>
              
              <motion.h3 
                className="text-2xl sm:text-3xl font-bold text-luxury-gold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentProject.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentProject.description}
              </motion.p>

        
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-luxury-blue/50 text-luxury-gold text-sm rounded-full border border-luxury-gold/30 touch-target"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

        
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {currentProject.liveUrl && (
                  <motion.a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxury-button px-6 py-3 text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Live
                  </motion.a>
                )}
                {currentProject.githubUrl && (
                  <motion.a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-effect border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all duration-300 px-6 py-3 rounded-lg text-center touch-target"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Code
                  </motion.a>
                )}
              </motion.div>
            </motion.div>

      
            <motion.div 
              className="flex justify-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 touch-target ${
                    index === activeProject 
                      ? 'bg-luxury-gold scale-125' 
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </motion.div>
          </motion.div>

    
          {!isMobile && (
            <motion.div 
              className="relative h-96 lg:h-[600px]"
              variants={itemVariants}
            >
              <Scene3D 
                camera={{ position: [0, 0, 6], fov: 60 }}
                controls={false}
              >
                {projects.map((project, index) => (
                  <Project3D
                    key={project.id}
                    project={project}
                    position={getProjectPosition(index)}
                    rotation={getProjectRotation(index)}
                    isActive={index === activeProject}
                    onClick={() => setActiveProject(index)}
                  />
                ))}
              </Scene3D>
              
        
              <motion.div 
                className="absolute bottom-4 left-4 glass-effect rounded-lg p-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm text-gray-300">
                  Click on projects to explore • Auto-rotating gallery
                </p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>


      </div>
    </motion.section>
  )
}