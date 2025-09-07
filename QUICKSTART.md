# 🚀 Quick Start Guide

## Prerequisites Installation

Since Node.js and npm are required to run this project, please follow these steps:

### 1. Install Node.js

**Windows:**
1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Restart your command prompt/PowerShell

**Verify Installation:**
```bash
node --version
npm --version
```

### 2. Install Dependencies and Run

Once Node.js is installed, open PowerShell in this directory and run:

```bash
# Install all project dependencies
npm install

# Start the development server
npm run dev
```

The portfolio will be available at `http://localhost:3000`

### 3. Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 🎨 Customization Guide

### Update Personal Information

Edit `src/lib/data.ts`:

```typescript
export const personalInfo = {
  name: "Mohammad Aasif Najar",           // Your name
  title: "Web, App & Backend Developer", // Your title
  email: "aasif@example.com",            // Your email
  phone: "+91 XXXXX XXXXX",              // Your phone
  location: "Kashmir, India",            // Your location
  // ... update other fields
}
```

### Add Your Projects

In `src/lib/data.ts`, update the projects array:

```typescript
export const projects: Project[] = [
  {
    id: "your-project",
    title: "Your Project Name",
    description: "Project description...",
    image: "/projects/your-project.jpg",  // Add image to public/projects/
    technologies: ["React", "Node.js"],   // Technologies used
    liveUrl: "https://your-project.com",  // Live demo URL
    githubUrl: "https://github.com/...",  // GitHub repository
    featured: true,                       // Featured project?
    category: "web"                       // web, mobile, backend, fullstack
  }
]
```

### Update Social Links

```typescript
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "🐙"
  },
  // ... add more social links
]
```

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # React components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── ...
│   ├── lib/               # Data and utilities
│   │   ├── data.ts        # Portfolio content
│   │   └── utils.ts       # Helper functions
│   ├── styles/           # Global styles
│   │   └── globals.css
│   └── types/            # TypeScript types
│       └── index.ts
├── public/              # Static assets
│   ├── projects/       # Project images
│   ├── fonts/         # Custom fonts
│   └── images/        # Other images
└── package.json       # Dependencies and scripts
```

## 🎯 Key Features

✅ **Ultra-Luxurious 3D Design** - Marble textures, gold accents, cinematic effects  
✅ **Interactive 3D Elements** - Floating avatar, rotating project gallery, 3D forms  
✅ **Responsive Design** - Mobile-first approach with touch-optimized interactions  
✅ **Performance Optimized** - Lazy loading, efficient 3D rendering, fast load times  
✅ **Accessibility Ready** - ARIA labels, keyboard navigation, screen reader support  
✅ **SEO Optimized** - Meta tags, structured data, semantic HTML  

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Mobile Optimization

The portfolio includes:
- Touch-friendly 3D interactions
- Fallback forms for complex 3D elements
- Optimized performance for mobile devices
- Responsive layouts for all screen sizes

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- Railway
- Digital Ocean

## 🎨 Color Scheme

- **Primary Gold**: #D4AF37
- **Dark Background**: #0A0A0A
- **Luxury Blue**: #1a1a2e
- **Text**: #ffffff
- **Accent**: Various gold gradients

## 📞 Support

If you need help customizing this portfolio:

1. Check the documentation in this file
2. Review the code comments
3. Refer to the component files for examples
4. Contact: aasif@example.com

---

**Enjoy your new ultra-luxurious 3D portfolio! ✨**