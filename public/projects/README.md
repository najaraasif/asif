# Project Images

This directory contains images for the portfolio projects. Add your project screenshots and images here.

## Required Images

- `biteque.jpg` - Screenshot of BiteQue application
- `edufrugal.jpg` - Screenshot of EduFrugal platform  
- `portfolio.jpg` - Screenshot of this portfolio website

## Image Guidelines

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 1920x1080 or 16:9 aspect ratio
- **Quality**: High resolution for best display
- **Optimization**: Compress images for web performance

## Usage

Images are referenced in `src/lib/data.ts` in the projects array:

```typescript
{
  id: "project-name",
  title: "Project Title",
  image: "/projects/project-image.jpg",
  // ... other properties
}
```