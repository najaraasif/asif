'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigation } from '@/lib/data'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
    
      const sections = navigation.map(item => item.href.substring(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])




  const scrollToSection = (href: string) => {
    const id = href.startsWith('#') ? href.substring(1) : href
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // Delay closing the menu slightly so scroll works smoothly
      setTimeout(() => setIsMobileMenuOpen(false), 300)
      setActiveSection(id)
    }
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect border-b border-luxury-gold/20 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
    
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => scrollToSection('#home')}
              className="text-luxury-gold font-bold text-xl sm:text-2xl hover:text-yellow-400 transition-colors duration-300 touch-target"
              aria-label="Go to home section"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                MA
              </motion.span>
            </button>
          </motion.div>

    
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group touch-target ${
                    activeSection === item.href.substring(1)
                      ? 'text-luxury-gold'
                      : 'text-white hover:text-luxury-gold'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.name}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-luxury-gold"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: activeSection === item.href.substring(1) ? '100%' : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full"
                    style={{ display: activeSection === item.href.substring(1) ? 'none' : 'block' }}
                  />
                </motion.button>
              ))}
            </div>
          </div>

    
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold touch-target z-50"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
          
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    animate={{
                      d: isMobileMenuOpen 
                        ? "M6 18L18 6M6 6l12 12" 
                        : "M4 6h16M4 12h16M4 18h16"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-effect border-t border-luxury-gold/20 overflow-hidden z-50 relative"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 touch-target ${
                    activeSection === item.href.substring(1)
                      ? 'text-luxury-gold bg-luxury-gold/10 border border-luxury-gold/20'
                      : 'text-white hover:text-luxury-gold hover:bg-white/5'
                  }`}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="flex items-center"
                    layout
                  >
                    {item.name}
                    {activeSection === item.href.substring(1) && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2 h-2 bg-luxury-gold rounded-full"
                      />
                    )}
                  </motion.span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}