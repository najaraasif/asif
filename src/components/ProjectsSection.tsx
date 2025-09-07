'use client'

import { useState, useEffect, useRef } from 'react'
import Scene3D from './Scene3D'
import Project3D from './Project3D'
import { projects } from '@/lib/data'

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)
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

  // Auto-rotate projects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative min-h-screen py-20 section-padding"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 marble-texture opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-luxury-gold via-yellow-400 to-luxury-gold bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my finest work - from innovative web applications to cutting-edge mobile solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Project Details */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="glass-effect rounded-2xl p-8 luxury-card">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-luxury-gold text-black text-sm font-semibold rounded-full">
                  {currentProject.category.toUpperCase()}
                </span>
                {currentProject.featured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full">
                    FEATURED
                  </span>
                )}
              </div>
              
              <h3 className="text-3xl font-bold text-luxury-gold mb-4">
                {currentProject.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                {currentProject.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-luxury-blue/50 text-luxury-gold text-sm rounded-full border border-luxury-gold/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxury-button px-6 py-3"
                  >
                    View Live
                  </a>
                )}
                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-effect border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all duration-300 px-6 py-3 rounded-lg"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>

            {/* Project Navigation */}
            <div className="flex justify-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeProject 
                      ? 'bg-luxury-gold scale-125' 
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* 3D Gallery */}
          <div className={`relative h-96 lg:h-[600px] transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
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
            
            {/* 3D Scene Instructions */}
            <div className="absolute bottom-4 left-4 glass-effect rounded-lg p-3">
              <p className="text-sm text-gray-300">
                Click on projects to explore • Auto-rotating gallery
              </p>
            </div>
          </div>
        </div>

        {/* All Projects Grid */}
        <div className={`mt-20 transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h3 className="text-3xl font-bold text-center text-luxury-gold mb-8">
            All Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(index)}
                className="glass-effect rounded-xl p-6 luxury-card cursor-pointer group"
              >
                <div className="aspect-video bg-luxury-blue/30 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-4xl">{project.category === 'web' ? '🌐' : project.category === 'mobile' ? '📱' : '⚙️'}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-luxury-gold transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-luxury-gold/20 text-luxury-gold text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-luxury-gold/20 text-luxury-gold text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}