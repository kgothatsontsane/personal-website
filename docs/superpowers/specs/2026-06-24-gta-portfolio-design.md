# GTA V / Intelligence Agency Developer Portfolio

## Stack
- **Framework**: Vite + React 18
- **Animation**: Framer Motion (scroll reveals, stagger, count-up, 3D tilt)
- **Styling**: Custom CSS with CSS variables (no Tailwind)
- **Fonts**: Bebas Neue (headings), JetBrains Mono (code/data), Inter (body)

## Color Palette
```
--bg:      #0a0a0f    (near-black)
--bg-card: #12121e    (card background)
--fg:      #ffffff    (text)
--muted:   #777       (secondary text)
--accent:  #ffcc00    (gold — CTAs, highlights, borders, glows)
--red:     #e60000    (classification stamps, errors)
```

## Sections

### 1. Hero — The Loading Screen
- Full 100vh viewport
- On load: GTA V style loading sequence
  - Gold spinner (bottom right) + "Loading game assets..." (bottom left)
  - Terminal-style loading messages scroll up
  - On complete: "PRESS ANY KEY TO CONTINUE" prompt
  - On key/click: screen glitch transition → name reveal
- Name: massive Bebas Neue, gold underline sweep
- Subtitle: "Full-Stack Developer · South Africa · 47 Missions"
- Right panel: editorial portrait slot (moody, GTA V loading screen style)
- Gold horizontal line scan across top/bottom

### 2. About — Agent Profile
- Character bio card layout (GTA V character select style)
- Portrait + clearance badge overlay
- Bio written as field agent report
- Stats: LOCATION, SPECIALTY, STATUS, CLEARANCE LEVEL

### 3. Projects — Classified Mission Dossiers
- 2-column grid of dossier cards
- Each card:
  - Gold tape seal (top right)
  - "TOP SECRET" badge
  - Mission numbering: `/// MISSION_001`
  - CLEARANCE LEVEL tag
  - Operation codename + role + budget
  - Gold left-border brief description
  - Equipment tags (tech stack pills)
  - "MISSION COMPLETE" status indicator
  - "VIEW BRIEF →" CTA
- Hover: subtle lift + gold border glow
- Click: expand full case file

### 4. Stats — Specializations
- GTA V style stat bars
- Skills as agent competencies
- Gold bar fills left-to-right on scroll
- Rating labels: NOVICE → OPERATIVE → SPECIALIST → ELITE
- Animated count-up on enter viewport

### 5. Timeline — Service Record
- Vertical timeline (gold dotted line)
- Each entry: gold dot marker, company, role, dates, brief summary
- CLASSIFIED redactions on gap periods
- Staggered scroll reveal

### 6. Contact — Secure Channel
- Terminal prompt style: `agent@portfol.io:~$`
- Contact form styled as encrypted message input
- Social links as agency directory entries
- Gold blinking cursor

### 7. Nav
- Fixed top nav, GTA phone-menu style
- Gold active indicator
- Section-aware highlight (IntersectionObserver)
- Smooth scroll to sections

### Global Effects
- Noise/grain texture overlay (fixed, subtle)
- CRT scanlines (subtle, optional)
- Custom cursor (player blip style, optional)
- All scroll reveals use Framer Motion staggered variants

## Data
All portfolio data lives in a single `data.js` file:
- `personalInfo` — name, title, location, bio, portrait
- `missions` — array of project objects
- `specializations` — skill name + level array
- `serviceRecord` — array of experience entries
- `socials` — array of contact links

This makes it trivially editable by the user without touching component code.
