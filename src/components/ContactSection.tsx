'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Scene3D from './Scene3D'
import ContactForm3D from './ContactForm3D'
import { personalInfo, socialLinks } from '@/lib/data'
import { ContactForm } from '@/types'

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>(
    { type: null, message: '' }
  )
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Mobile detection
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

  // Animation variants
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

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear status when user starts typing
    if (formStatus.type) {
      setFormStatus({ type: null, message: '' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: '' })
    
    // Create FormData for form submission
    const form = e.target as HTMLFormElement
    const formDataObj = new FormData(form)
    formDataObj.append('_next', window.location.href)
    
    try {
      // Use Formspree or similar service
      const response = await fetch(form.action || 'https://formspree.io/f/mwpozrjn', {
        method: 'POST',
        body: formDataObj,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        const data = await response.json()
        if (data.errors) {
          setFormStatus({
            type: 'error',
            message: data.errors.map((error: any) => error.message).join(', ')
          })
        } else {
          setFormStatus({
            type: 'error',
            message: 'Oops! There was a problem sending your message.'
          })
        }
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Oops! An error occurred. Please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen py-12 sm:py-16 lg:py-20 section-padding"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 marble-texture opacity-40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
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
              Let's Connect
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            Ready to bring your ideas to life? Let's discuss your next project and create something extraordinary together.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Information */}
          <motion.div 
            className="space-y-6 sm:space-y-8"
            variants={itemVariants}
          >
            {/* Contact Details */}
            <motion.div 
              className="glass-effect rounded-2xl p-6 sm:p-8 luxury-card"
              whileHover={{ 
                scale: isMobile ? 1 : 1.02,
                boxShadow: '0 25px 50px rgba(212, 175, 55, 0.2)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl font-bold text-luxury-gold mb-4 sm:mb-6"
                whileInView={{ 
                  textShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
                }}
                transition={{ duration: 0.5 }}
              >
                Get In Touch
              </motion.h3>
              
              <div className="space-y-4">
                {[
                  { icon: '📧', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: '📱', label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                  { icon: '📍', label: 'Location', value: personalInfo.location, href: null }
                ].map((contact, index) => (
                  <motion.div 
                    key={contact.label}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-luxury-gold text-xl">{contact.icon}</span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{contact.label}</p>
                      {contact.href ? (
                        <motion.a 
                          href={contact.href}
                          className="text-white hover:text-luxury-gold transition-colors touch-target"
                          whileHover={{ scale: 1.05 }}
                        >
                          {contact.value}
                        </motion.a>
                      ) : (
                        <p className="text-white">{contact.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="glass-effect rounded-2xl p-6 sm:p-8 luxury-card"
              whileHover={{ 
                scale: isMobile ? 1 : 1.02,
                boxShadow: '0 25px 50px rgba(212, 175, 55, 0.2)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl font-bold text-luxury-gold mb-4 sm:mb-6"
                whileInView={{ 
                  textShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
                }}
                transition={{ duration: 0.5 }}
              >
                Follow Me
              </motion.h3>
              
              <motion.div 
                className="grid grid-cols-2 gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-luxury-blue/30 rounded-lg hover:bg-luxury-gold/20 transition-all duration-300 group touch-target"
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          ease: 'backOut'
                        }
                      }
                    }}
                    whileHover={{ 
                      scale: isMobile ? 1 : 1.05,
                      backgroundColor: 'rgba(212, 175, 55, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <span className="text-white group-hover:text-luxury-gold transition-colors">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="glass-effect rounded-2xl p-6 sm:p-8 luxury-card"
              whileHover={{ 
                scale: isMobile ? 1 : 1.02,
                boxShadow: '0 25px 50px rgba(212, 175, 55, 0.2)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.h3 
                className="text-xl sm:text-2xl font-bold text-luxury-gold mb-4 sm:mb-6"
                whileInView={{ 
                  textShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
                }}
                transition={{ duration: 0.5 }}
              >
                Send Message
              </motion.h3>
              
              {/* Form Status Messages */}
              {formStatus.type && (
                <motion.div 
                  className={`mb-6 p-4 rounded-lg ${
                    formStatus.type === 'success' 
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                      : 'bg-red-500/20 border border-red-500/30 text-red-400'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="form-messages"
                >
                  {formStatus.message}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4" action="https://formspree.io/f/mwpozrjn">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label htmlFor="name" className="block text-luxury-gold text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-luxury-blue/30 border border-luxury-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-luxury-gold focus:outline-none transition-colors touch-target"
                    placeholder="Your name"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-luxury-gold text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-luxury-blue/30 border border-luxury-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-luxury-gold focus:outline-none transition-colors touch-target"
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="subject" className="block text-luxury-gold text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-luxury-blue/30 border border-luxury-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-luxury-gold focus:outline-none transition-colors touch-target"
                    placeholder="Project discussion"
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="message" className="block text-luxury-gold text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-luxury-blue/30 border border-luxury-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-luxury-gold focus:outline-none transition-colors resize-none touch-target"
                    placeholder="Tell me about your project..."
                    required
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full luxury-button py-4 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div 
                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* 3D Contact Form - Desktop Only */}
          {!isMobile && (
            <motion.div 
              className="relative h-96 lg:h-[700px]"
              variants={itemVariants}
            >
              <Scene3D 
                camera={{ position: [0, 0, 6], fov: 60 }}
                controls={false}
              >
                <ContactForm3D
                  position={[0, 0, 0]}
                  formData={formData}
                  onFieldFocus={setFocusedField}
                />
              </Scene3D>
              
              {/* 3D Form Instructions */}
              <motion.div 
                className="absolute bottom-4 left-4 glass-effect rounded-lg p-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm text-gray-300">
                  Interactive 3D visualization • Use form on the left
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  )
}