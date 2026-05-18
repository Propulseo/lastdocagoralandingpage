# MIGRATION-REPORT.md — DocAgora Landing Page

## 1. Recap

Static HTML template (Medcity) migrated to a Next.js 16 App Router application with TypeScript strict mode, next-intl i18n (en/fr/pt), and pixel-perfect visual parity. The original template's Bootstrap 5 CSS, jQuery plugins (Slick carousel, etc.), and all static assets are preserved in `public/assets/`.

## 2. Architecture

```
docagora-landing/
├── public/assets/          # Original CSS, JS, images, fonts (untouched)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (passthrough)
│   │   ├── globals.css             # Minimal global styles
│   │   └── [locale]/
│   │       ├── layout.tsx          # Locale layout (CSS, fonts, header, footer, jQuery)
│   │       ├── page.tsx            # Home (12 section components)
│   │       ├── about/page.tsx
│   │       ├── specialties/page.tsx
│   │       ├── faq/page.tsx
│   │       └── contact/page.tsx
│   ├── components/
│   │   ├── home/                   # 12 home section components
│   │   ├── layout/                 # HeaderTopbar, Navbar, Footer, ScrollToTop
│   │   └── shared/                 # Preloader
│   ├── i18n/
│   │   ├── config.ts               # Locale definitions (en, fr, pt)
│   │   ├── routing.ts              # next-intl routing config
│   │   ├── request.ts              # Server-side request config
│   │   ├── navigation.ts           # createNavigation exports (Link, redirect, etc.)
│   │   └── locales/
│   │       ├── en.json             # Full English translations (~290 lines)
│   │       ├── fr.json             # Placeholder (copy of en.json — to be translated)
│   │       └── pt.json             # Placeholder (copy of en.json — to be translated)
│   ├── lib/
│   │   └── jquery-loader.tsx       # Client-side jQuery + plugin sequential loader
│   └── proxy.ts                    # next-intl middleware (Next.js 16 proxy pattern)
├── next.config.ts
├── tsconfig.json
└── package.json
```

## 3. Components

### Home Page (12 sections, order matches original template)
| # | Component | File | Type | Description |
|---|-----------|------|------|-------------|
| 1 | HeroSlider | `src/components/home/HeroSlider.tsx` | Client | Slick carousel, 2 slides |
| 2 | ContactInfoBoxes | `src/components/home/ContactInfoBoxes.tsx` | Client | Emergency/Booking/Available boxes |
| 3 | AboutSection | `src/components/home/AboutSection.tsx` | Client | About text + video banner |
| 4 | SpecialtiesCarousel | `src/components/home/SpecialtiesCarousel.tsx` | Client | 16 specialties, Slick carousel |
| 5 | NotesSection | `src/components/home/NotesSection.tsx` | Client | Stats bar |
| 6 | FeaturesGrid | `src/components/home/FeaturesGrid.tsx` | Client | 8 feature cards with overlay |
| 7 | TeamCarousel | `src/components/home/TeamCarousel.tsx` | Client | 6 professional cards, Slick |
| 8 | WorkProcess | `src/components/home/WorkProcess.tsx` | Client | 5 steps + CTA banner |
| 9 | Testimonials | `src/components/home/Testimonials.tsx` | Client | Testimonial slider with nav |
| 10 | CitiesGallery | `src/components/home/CitiesGallery.tsx` | Client | 6 Portuguese cities |
| 11 | ContactForm | `src/components/home/ContactForm.tsx` | Client | Search form + sidebar |
| 12 | FAQHighlights | `src/components/home/FAQHighlights.tsx` | Client | 3 FAQ preview cards |

### Layout Components
| Component | File | Type |
|-----------|------|------|
| HeaderTopbar | `src/components/layout/HeaderTopbar.tsx` | Client |
| Navbar | `src/components/layout/Navbar.tsx` | Client |
| Footer | `src/components/layout/Footer.tsx` | Client |
| ScrollToTop | `src/components/layout/ScrollToTop.tsx` | Client |
| Preloader | `src/components/shared/Preloader.tsx` | Client |
| JQueryLoader | `src/lib/jquery-loader.tsx` | Client |

### Sub-pages
| Page | File | Content |
|------|------|---------|
| About | `src/app/[locale]/about/page.tsx` | Page title banner + AboutSection |
| Specialties | `src/app/[locale]/specialties/page.tsx` | Page title banner + SpecialtiesCarousel |
| FAQ | `src/app/[locale]/faq/page.tsx` | Page title banner + FAQHighlights |
| Contact | `src/app/[locale]/contact/page.tsx` | Page title banner + ContactForm |

## 4. Tech Choices

| Choice | Detail |
|--------|--------|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| Language | TypeScript strict (zero `any`, zero `@ts-ignore`) |
| React | 19.2.4 |
| i18n | next-intl 4.11.2 |
| CSS | Original Bootstrap 5 + template CSS from `public/assets/css/` |
| JS Plugins | jQuery 3.5.1, Slick, plugins.js, main.js loaded client-side via script injection |
| Routing | `proxy.ts` with named `proxy()` export (Next.js 16 pattern, replaces deprecated `middleware.ts`) |
| Fonts | Google Fonts (Quicksand + Roboto) via `<link>` |
| Icons | Font Awesome 5.15.3 via CDN + template icon font |

## 5. i18n

- **Locales**: `en` (default), `fr`, `pt`
- **Routing**: Prefix-based (`/en/*`, `/fr/*`, `/pt/*`), auto-redirect from `/` to `/en/`
- **Translation file**: `src/i18n/locales/{locale}.json` — structured by namespace (metadata, topbar, navbar, hero, contactInfo, about, specialties, etc.)
- **Server**: `getTranslations()` for metadata, `setRequestLocale()` for static generation
- **Client**: `useTranslations(namespace)` in all `"use client"` components
- **Status**: `en.json` complete (~290 lines). `fr.json` and `pt.json` are currently copies of en.json (placeholder) — real translations needed.

## 6. Key Diffs from Original HTML

| Area | Original | Next.js |
|------|----------|---------|
| Branding | Medcity | DocAgora |
| Logo | Medcity logos | DocAgora logo complet couleurs.png |
| Emergency | Various phone numbers | 112 (Portugal) |
| Location | Multiple US addresses | Portugal |
| Hours | Mon-Fri 8am-7pm | Removed (platform is 24/7) |
| Departments | Full departments section in header + pages | Removed entirely |
| Footer secondary | Copyright bar at bottom | Removed |
| Footer copyright | Integrated into main footer widget area |
| Logo sizing | Default | Header: +15% with 50px left margin, Footer: +20% |
| Routing | Static `.html` files | Next.js dynamic routes with i18n prefix |
| Content | Generic medical content | DocAgora-specific (verified professionals, multilingual, Portugal focus) |

## 7. Lighthouse

Not yet run. To test:
```bash
npx lighthouse http://localhost:3000/en --output=json --output-path=./lighthouse.json
```

Expected performance may be impacted by:
- jQuery + plugin.js loaded client-side (render-blocking potential)
- Large CSS files from original template
- Unoptimized images from original template (not yet converted to `next/image`)

## 8. Build

```
next build (Turbopack) — SUCCESS
TypeScript: 0 errors
Warnings: 0

Routes:
  ○ /_not-found          (static)
  ƒ /[locale]            (dynamic, SSR)
  ƒ /[locale]/about      (dynamic, SSR)
  ƒ /[locale]/contact    (dynamic, SSR)
  ƒ /[locale]/faq        (dynamic, SSR)
  ƒ /[locale]/specialties (dynamic, SSR)

Proxy (Middleware): active
```

## 9. Blockers

None. Build passes, all routes compile, TypeScript strict mode satisfied.

## 10. TODOs

| Priority | Item |
|----------|------|
| High | Translate `fr.json` — real French translations |
| High | Translate `pt.json` — real Portuguese translations |
| High | Replace placeholder images with real DocAgora assets |
| Medium | Replace team member placeholder data with real professionals |
| Medium | Convert images to `next/image` for optimization |
| Medium | Wire up contact form to backend API |
| Medium | Add real city photos for CitiesGallery |
| Low | Add `generateStaticParams` for SSG if needed |
| Low | Run Lighthouse and optimize scores |
| Low | Remove unused CSS from original template |
| Low | Replace jQuery dependency with React-native interactions long-term |
