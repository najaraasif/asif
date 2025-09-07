'use client'

import { useState, useEffect, useRef } from 'react'
import Scene3D from './Scene3D'
import ContactForm3D from './ContactForm3D'
import { personalInfo, socialLinks } from '@/lib/data'
import { ContactForm } from '@/types'

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen py-20 section-padding"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 marble-texture opacity-40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-luxury-gold via-yellow-400 to-luxury-gold bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's discuss your next project and create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            {/* Contact Details */}
            <div className="glass-effect rounded-2xl p-8 luxury-card">
              <h3 className="text-2xl font-bold text-luxury-gold mb-6">
                Get In Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-luxury-gold text-xl">📧</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{personalInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-luxury-gold text-xl">📱</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">{personalInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-luxury-gold text-xl">📍</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-effect rounded-2xl p-8 luxury-card">
              <h3 className="text-2xl font-bold text-luxury-gold mb-6">
                Follow Me
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-luxury-blue/30 rounded-lg hover:bg-luxury-gold/20 transition-all duration-300 group"
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <span className="text-white group-hover:text-luxury-gold transition-colors">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Traditional Form for Mobile/Accessibility */}
            <div className="lg:hidden glass-effect rounded-2xl p-8 luxury-card">
              <h3 className="text-2xl font-bold text-luxury-gold mb-6">
                Send Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-luxury-gold text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-luxury-blue/30 border border-luxury-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-luxury-gold text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-luxury-blue/30 border border-luxury-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-luxury-gold text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-luxury-blue/30 border border-luxury-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="Project discussion"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-luxury-gold text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-luxury-blue/30 border border-luxury-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-luxury-gold focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full luxury-button py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* 3D Contact Form */}
          <div className={`hidden lg:block relative h-96 lg:h-[700px] transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
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
            <div className="absolute bottom-4 left-4 glass-effect rounded-lg p-3">
              <p className="text-sm text-gray-300">
                Interactive 3D form • Use traditional form on mobile
              </p>
            </div>

            {/* Hidden Form for 3D Interaction */}
            <div className="absolute inset-0 opacity-0">
              <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center px-8 space-y-6">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your name"
                  className="bg-transparent border-none outline-none text-transparent"
                  tabIndex={focusedField === 'name' ? 0 : -1}
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your.email@example.com"
                  className="bg-transparent border-none outline-none text-transparent"
                  tabIndex={focusedField === 'email' ? 0 : -1}
                />
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Project discussion"
                  className="bg-transparent border-none outline-none text-transparent"
                  tabIndex={focusedField === 'subject' ? 0 : -1}
                />
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project..."
                  className="bg-transparent border-none outline-none text-transparent resize-none"
                  rows={3}
                  tabIndex={focusedField === 'message' ? 0 : -1}
                />
                <button
                  type="submit"
                  className="bg-transparent border-none outline-none text-transparent"
                  tabIndex={focusedField === 'submit' ? 0 : -1}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}