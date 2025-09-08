import { Project, Skill, Achievement, SocialLink } from '@/types';

export const personalInfo = {
  name: "Mohammad Aasif Najar",
  title: "Web, App & Backend Developer",
  subtitle: "Since 2017",
  location: "Kashmir, India",
  email: "Najaraasif944@gmail.com", // Replace with actual email
  phone: "+91 7889595508", // Replace with actual phone
  bio: "A seasoned full-stack developer with 7+ years of experience crafting exceptional digital experiences. Specializing in modern web technologies, mobile applications, and scalable backend solutions.",
  yearsOfExperience: 10,
  projectsCompleted: 120,
  clientSatisfaction: 95,
};

export const achievements: Achievement[] = [
  {
    title: "Projects Completed",
    value: "120+",
    description: "Successfully delivered projects across various industries",
    icon: "🚀"
  },
  {
    title: "Client Satisfaction",
    value: "95%",
    description: "Maintaining high client satisfaction rates",
    icon: "⭐"
  },
  {
    title: "Years Experience",
    value: "7+",
    description: "A decade of professional development experience",
    icon: "💎"
  },
  {
    title: "Technologies Mastered",
    value: "25+",
    description: "Proficient in modern development stack",
    icon: "🛠️"
  }
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "frontend", icon: "⚛️" },
  { name: "Next.js", level: 90, category: "frontend", icon: "▲" },
  { name: "TypeScript", level: 88, category: "frontend", icon: "📘" },
  { name: "Vue.js", level: 85, category: "frontend", icon: "💚" },
  { name: "Angular", level: 80, category: "frontend", icon: "🅰️" },
  
  // Backend
  { name: "Node.js", level: 92, category: "backend", icon: "💚" },
  { name: "Python", level: 88, category: "backend", icon: "🐍" },
  { name: "Express.js", level: 90, category: "backend", icon: "🚂" },
  { name: "Django", level: 85, category: "backend", icon: "🎸" },
  { name: "PHP", level: 82, category: "backend", icon: "🐘" },
  
  // Mobile
  { name: "React Native", level: 88, category: "mobile", icon: "📱" },
  { name: "Flutter", level: 85, category: "mobile", icon: "🦋" },
  { name: "Swift", level: 75, category: "mobile", icon: "🍎" },
  
  // Database
  { name: "MongoDB", level: 90, category: "database", icon: "🍃" },
  { name: "PostgreSQL", level: 88, category: "database", icon: "🐘" },
  { name: "MySQL", level: 85, category: "database", icon: "🗄️" },
  { name: "Redis", level: 82, category: "database", icon: "📊" },
  
  // Tools
  { name: "Git", level: 95, category: "tools", icon: "🌿" },
  { name: "Docker", level: 88, category: "tools", icon: "🐳" },
  { name: "AWS", level: 85, category: "tools", icon: "☁️" },
  { name: "Firebase", level: 90, category: "tools", icon: "🔥" },
];

export const projects: Project[] = [
  {
    id: "biteque",
    title: "BiteQue",
    description: "A comprehensive food delivery platform with real-time tracking, payment integration, and restaurant management system.",
    image: "/projects/biteque.jpg", // You'll need to add actual images
    technologies: ["React Native", "Node.js", "MongoDB", "Socket.io", "Stripe"],
    liveUrl: "https://biteque.app",
    githubUrl: "https://github.com/aasif/biteque",
    featured: true,
    category: "fullstack"
  },
  {
    id: "edufrugal",
    title: "EduFrugal",
    description: "An innovative educational platform connecting students with affordable learning resources and tutoring services.",
    image: "/projects/edufrugal.jpg",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "WebRTC"],
    liveUrl: "https://edufrugal.com",
    githubUrl: "https://github.com/aasif/edufrugal",
    featured: true,
    category: "web"
  },
  {
    id: "portfolio",
    title: "3D Portfolio Website",
    description: "This ultra-luxurious 3D portfolio showcasing advanced web technologies and immersive user experiences.",
    image: "/projects/portfolio.jpg",
    technologies: ["Next.js", "Three.js", "React Three Fiber", "GSAP", "Tailwind CSS"],
    liveUrl: "https://aasifnajar.dev",
    githubUrl: "https://github.com/aasif/portfolio",
    featured: true,
    category: "web"
  }
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/najaraasif", // Replace with actual URLs
    icon: "🐙"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mohammad-aasif-najar-a31615146/",
    icon: "💼"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/Aasifjamal99",
    icon: "🐦"
  },
  {
    name: "Email",
    url: "mailto:najaraaif944@gmail.com",
    icon: "📧"
  }
];

export const navigation = [
  { name: 'Home', href: '#home', current: true },
  { name: 'About', href: '#about', current: false },
  { name: 'Projects', href: '#projects', current: false },
  { name: 'Contact', href: '#contact', current: false },
];