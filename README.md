# RPG Portfolio - Epic Developer Portfolio

A jaw-dropping, production-ready portfolio website designed as a 2D RPG adventure. Built with Next.js, Tailwind CSS, and Supabase.

## Features

### Core Functionality
- **Multi-language Support**: English, French, and Arabic (with RTL support)
- **Dark/Light Themes**: Smooth theme transitions with user preference persistence
- **Pixel-Perfect Design**: Retro RPG aesthetic with crisp pixel art rendering
- **Animated Elements**: Framer Motion animations throughout
- **Sound System**: Optional background music and SFX with user consent
- **XP & Achievements**: Gamified interactions that reward exploration
- **Fully Responsive**: Mobile-first design with desktop enhancements

### Sections
1. **Hero/Hub** - Animated introduction with call-to-action buttons
2. **About** - Backstory and quick stats
3. **Projects** - Filterable portfolio with detailed modals
4. **Skills** - RPG-style stat bars showing proficiency levels
5. **Experience** - Timeline of work history
6. **Resume** - Downloadable CV with quick stats
7. **Contact** - Form submission with social links
8. **Testimonials** - Client and colleague recommendations

### Technical Highlights
- Next.js 13 with App Router
- TypeScript for type safety
- Supabase for database and real-time features
- next-intl for internationalization
- Framer Motion for smooth animations
- Tailwind CSS with custom pixel-art utilities
- Keyboard navigation support
- Full accessibility (ARIA labels, semantic HTML)
- SEO optimized with proper meta tags

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (database is pre-configured)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd rpg-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Environment variables are already configured in `.env`

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

## Customization

### Adding Your Content

#### Projects
Edit the database through Supabase Studio or add migration scripts:
- Navigate to the `projects` table
- Add your projects with title, description, tech stack, and links

#### Skills
Update the `skills` table with your proficiency levels (0-100)

#### Experience
Add your work history to the `experience` table

#### Testimonials
Insert client testimonials in the `testimonials` table

### Updating Translations
Edit the JSON files in `/messages`:
- `en.json` - English
- `fr.json` - French
- `ar.json` - Arabic

### Adding Sound Effects
Place MP3 files in `/public/sounds/`:
- `click.mp3` - Button click sound
- `bgm.mp3` - Background music (optional)

### Customizing Theme
Update colors in `tailwind.config.ts` and `app/globals.css`

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Environment variables are auto-configured
4. Deploy!

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables

## Accessibility

- Keyboard navigation (Arrow keys to navigate sections)
- Screen reader friendly
- High contrast mode support
- `prefers-reduced-motion` respected
- Semantic HTML throughout

## Performance

- Lighthouse scores target: 80+ across all metrics
- Lazy loading for images and heavy components
- Code splitting and tree shaking
- Optimized bundle size

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Built with passion, pixels, and plenty of coffee.

---

**Level 99 Developer** 🎮
