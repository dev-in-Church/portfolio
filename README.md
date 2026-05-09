# Emmanuel Ambundo - Full Stack Developer Portfolio

A professional, modern portfolio website built with the PERN stack showcasing full-stack development expertise.

## Overview

This is the professional portfolio of Emmanuel Ambundo, a full-stack developer specializing in:
- **Backend**: Node.js, Express.js, PostgreSQL
- **Frontend**: React, Next.js, Tailwind CSS
- **Additional**: REST APIs, Real-time Applications, System Design

## Features

### 🎬 Netflix-Style Intro
- Cinematic intro animation with UNDO logo (brand name)
- Netflix-inspired design with classic sound effect
- Logo with Netflix typography (broad ends, narrow middle)
- Smooth fade transition to homepage
- One-time display with localStorage persistence

### 📱 Multi-Page Professional Design
- **Home**: Hero section with profile image, PERN tech stack showcase, and featured project carousel
- **Projects**: Complete project portfolio with filtering by technology stack (3-column grid)
- **Contact**: Contact form and direct contact information

### 🎨 Design & UX
- Dark theme optimized for developer aesthetics
- Smooth animations with Framer Motion
- Mobile-responsive design
- Semantic HTML and accessibility best practices
- Custom scrollbar styling
- Performance-optimized images

### 🔧 Tech Stack
- **Frontend**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL
- **Backend**: Express.js, Node.js
- **Deployment**: Vercel

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles and design tokens
│   ├── contact/
│   │   └── page.tsx         # Contact page
│   └── projects/
│       └── page.tsx         # Projects grid page
├── components/
│   ├── navbar.tsx           # Navigation bar
│   ├── contact-form.tsx     # Contact form component
│   └── netflix-intro.tsx    # Netflix-style intro animation
├── lib/
│   ├── projects.ts          # Project data with tech stack
│   └── utils.ts            # Utility functions
├── hooks/
│   └── use-scroll-effects.ts # Custom scroll hooks
└── public/
    ├── emmanuel-ambundo.jpg # Profile image
    └── projects/            # Project images
```

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm

### Installation
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The app will be available at `http://localhost:3000`.

## Project Data Structure

Projects are defined in `lib/projects.ts` with the following structure:

```typescript
interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  tech: string[]           // Tech stack (PostgreSQL, Express, React, Node.js, etc.)
  link?: string            // Live demo URL
  github?: string          // GitHub repository URL
  featured: boolean        # Show in carousel on homepage
  year: number
  metrics?: Array<{
    label: string
    value: string
  }>
}
```

## Customization

### Update Personal Info
1. **Name**: Update in `/app/page.tsx` hero section and `/app/layout.tsx` metadata
2. **Profile Image**: Replace `/public/emmanuel-ambundo.jpg`
3. **Tech Stack**: Modify color scheme in `/app/page.tsx` `techStack` array

### Add/Edit Projects
Edit `lib/projects.ts`:
1. Add new project object to the `projects` array
2. Set `featured: true` to display in homepage carousel
3. Include technologies in the `tech` array for filtering on projects page

### Update Contact Info
In `/app/contact/page.tsx`, update:
- Email address (hello@emmanuelambundo.com)
- GitHub profile URL
- LinkedIn profile URL
- Response time and availability

### Customize Theme
Theme colors are defined as CSS variables in `app/globals.css`:
- `--primary`: Red accent color (#e50914)
- `--background`: Deep black (#0b0b0b)
- `--foreground`: Light text color (#f5f5f5)

## Key Components

### NetflixIntro
Displays the Netflix-style UNDO logo animation on first visit (3.5 seconds).

### Navbar
Sticky navigation with mobile menu support. Links to Home, Projects, and Contact.

### Featured Projects Carousel
Displays featured projects with left/center/right carousel view on homepage with auto-rotation.

### Projects Grid
Filterable 3-column project grid on projects page with tech stack filtering.

### ContactForm
Professional contact form with validation and submission handling.

## Performance Optimizations

- Next.js 16 with Turbopack for fast builds
- Image optimization with Next.js Image component
- Static page generation
- Reduced motion support for accessibility
- Custom scrollbar performance optimization

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Reduced motion media query support

## Deployment

The portfolio is built to deploy on Vercel with zero configuration:

1. Push to GitHub
2. Connect repository to Vercel
3. Vercel automatically builds and deploys on push

## License

© 2024 Emmanuel Ambundo. All rights reserved.

---

Built with modern web technologies and a focus on user experience.
