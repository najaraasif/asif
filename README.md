# Mohammad Aasif Najar - Portfolio

A stunning, ultra-luxurious 3D portfolio website showcasing the work of Mohammad Aasif Najar, a seasoned web and app developer with over a decade of experience. Built with cutting-edge web technologies and immersive 3D elements.

Check the live demo here: [najaraasif.dev](https://aasifnportfolio.netlify.app/)
## ✨ Features

### 🎨 Ultra-Luxurious Design
- **High-end aesthetic**: Black marble textures, brushed gold accents, deep midnight-blue lighting
- **Glass morphism effects**: Translucent panels with backdrop blur
- **Custom animations**: Floating elements, cinematic transitions, and soft-focus spotlighting
- **Luxury color palette**: Gold (#D4AF37), Dark (#0A0A0A), Blue (#1a1a2e)

### 🌟 3D Interactive Elements
- **3D Avatar**: Elegantly illuminated rotating avatar with particle effects
- **Floating Cards**: Interactive 3D achievement cards with flip animations
- **Project Gallery**: Rotating 3D carousel with hover effects
- **3D Contact Form**: Glass panels with lighting effects and tactile interactions

### 📱 Responsive & Accessible
- **Mobile-first design**: Optimized for all screen sizes
- **Accessibility features**: ARIA labels, keyboard navigation, screen reader support
- **Performance optimized**: Lazy loading, efficient 3D rendering, graceful fallbacks

### 🚀 Modern Tech Stack
- **Next.js 14**: App router, TypeScript, server components
- **Three.js & React Three Fiber**: 3D graphics and animations
- **Tailwind CSS**: Utility-first styling with custom luxury theme
- **Framer Motion**: Smooth page transitions and micro-interactions

## 🛠️ Technologies Used

- **Frontend**: Next.js, React, TypeScript
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Styling**: Tailwind CSS, Custom CSS
- **Animation**: Framer Motion, GSAP
- **Build Tools**: PostCSS, Autoprefixer

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- Modern web browser with WebGL support

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/aasifnajar/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the portfolio

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout with global styles
│   └── page.tsx           # Main homepage
├── components/            # React components
│   ├── Navigation.tsx     # Responsive navigation
│   ├── HeroSection.tsx    # Hero with 3D avatar
│   ├── AboutSection.tsx   # About with floating cards
│   ├── ProjectsSection.tsx # 3D project gallery
│   ├── ContactSection.tsx # Contact with 3D form
│   ├── Footer.tsx         # Footer component
│   ├── Scene3D.tsx        # 3D scene wrapper
│   ├── Avatar3D.tsx       # 3D avatar component
│   ├── FloatingCard3D.tsx # 3D achievement cards
│   ├── Project3D.tsx      # 3D project displays
│   └── ContactForm3D.tsx  # 3D contact form
├── lib/                   # Utilities and data
│   ├── data.ts           # Portfolio data and content
│   └── utils.ts          # Helper functions
├── styles/               # Global styles
│   └── globals.css       # Tailwind and custom styles
└── types/                # TypeScript definitions
    └── index.ts          # Type definitions
```

## 🎨 Customization

### Personal Information
Update your details in `src/lib/data.ts`:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  // ... other details
}
```

### Projects
Add your projects to the `projects` array in `src/lib/data.ts`:

```typescript
export const projects: Project[] = [
  {
    id: "project-1",
    title: "Your Project",
    description: "Project description",
    // ... other project details
  }
]
```

### Styling
Customize the luxury theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'luxury-gold': '#D4AF37',
      'luxury-dark': '#0A0A0A',
      // ... other colors
    }
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform

## 📊 Performance Optimization

- **3D Scene Optimization**: LOD (Level of Detail) for 3D models
- **Lazy Loading**: Components load as they enter viewport
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic by Next.js app router
- **Caching**: Optimized caching strategies

## 🔧 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

**Note**: WebGL support required for 3D features. Graceful fallbacks provided for older browsers.

## 📱 Mobile Considerations

- **Touch-friendly**: Optimized touch interactions for 3D elements
- **Performance**: Reduced 3D complexity on mobile devices
- **Fallbacks**: Traditional forms for complex 3D interactions
- **Responsive**: Fluid layouts across all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohammad Aasif Najar**
- Portfolio: [aasifnajar.dev](https://aasifnportfolio.netlify.app/)
- GitHub: [@aasifnajar](https://github.com/najaraasif)
- LinkedIn: [aasifnajar](https://www.linkedin.com/in/mohammad-aasif-najar-a31615146/)
- Email: najaraasif944@gmail.com

## 🙏 Acknowledgments

- **Three.js Community** for excellent 3D web graphics
- **React Three Fiber** for React 3D integration
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for utility-first styling
- **Vercel** for hosting and deployment

## 📈 Future Enhancements

- [ ] WebXR/VR support for immersive experience
- [ ] Advanced particle systems
- [ ] Real-time collaboration features
- [ ] CMS integration for dynamic content
- [ ] Advanced analytics and tracking
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Blog integration
- [ ] Case study pages with detailed project walkthroughs

---

**Made with ❤️ and cutting-edge technology**#
