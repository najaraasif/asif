'use client'

import { personalInfo, socialLinks } from '@/lib/data'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-16 section-padding">

      <div className="absolute inset-0 marble-texture opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
    
          <div className="text-center md:text-left">
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold text-luxury-gold hover:text-yellow-400 transition-colors duration-300 mb-4 block"
            >
              Mohammad Aasif Najar
            </button>
            <p className="text-gray-400 text-sm mb-4">
              {personalInfo.title}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">
              Crafting exceptional digital experiences with precision, passion, and cutting-edge technology.
            </p>
          </div>

    
          <div className="text-center">
            <h3 className="text-lg font-semibold text-luxury-gold mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const element = document.querySelector(`#${link.toLowerCase()}`)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="block text-gray-400 hover:text-luxury-gold transition-colors duration-300 text-sm mx-auto"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

    
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-luxury-gold mb-4">
              Connect
            </h3>
            <div className="flex justify-center md:justify-end gap-4 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-luxury-blue/30 rounded-full flex items-center justify-center hover:bg-luxury-gold/20 transition-all duration-300 group"
                  aria-label={`Visit ${social.name}`}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-xs">
              {personalInfo.location}
            </p>
          </div>
        </div>

  
        <div className="h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent mb-8"></div>

  
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p className="mb-4 md:mb-0">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="hover:text-luxury-gold transition-colors duration-300">
              Privacy Policy
            </button>
            <button className="hover:text-luxury-gold transition-colors duration-300">
              Terms of Service
            </button>
          </div>
        </div>

  
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-luxury-gold hover:bg-yellow-600 text-black rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>


      <div className="absolute bottom-0 left-1/4 w-1 h-1 bg-luxury-gold rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-0 right-1/3 w-2 h-2 bg-luxury-gold rounded-full animate-pulse opacity-40 delay-1000"></div>
    </footer>
  )
}