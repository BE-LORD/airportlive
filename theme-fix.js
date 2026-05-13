const fs = require('fs');
const path = require('path');

/**
 * MIDNIGHT & PLATINUM — INTELLIGENT THEME FIX
 * 
 * The previous script was too simple. This one uses ordered, 
 * context-aware replacements to create proper dark-mode contrast.
 * 
 * COLOR SYSTEM:
 *   Background Primary:   #0A0A0A  (Obsidian — hero, footer, gallery, fleet)
 *   Background Secondary:  #111111  (Onyx — alternate sections like booking, FAQ)
 *   Background Tertiary:   #1A1A1A  (Charcoal — cards, elevated surfaces)
 *   Background Surface:    #222222  (Slate — inputs, hover states)
 *   
 *   Text Primary:          #F5F5F5  (Near-white)
 *   Text Secondary:        #A0A0A0  (Silver muted)
 *   Text Accent:           #E5E4E2  (Platinum)
 *   
 *   Accent Glow:           #C0C0C0  (Silver)
 *   
 *   Border Primary:        rgba(255,255,255,0.08)  (Subtle white)
 *   Border Hover:          rgba(255,255,255,0.15)  (Brighter on hover)
 *   Border Accent:         rgba(229,228,226,0.25)  (Platinum tint)
 */

// Ordered replacements — ORDER MATTERS (longer/more-specific patterns first)
const replacements = [
  // ═══ BORDERS (must come before generic color swaps) ═══
  ['border-[#DEDBD2]', 'border-white/10'],
  ['border border-[#DEDBD2]', 'border border-white/10'],
  ['border-white/10/30', 'border-white/20'],  // fix any double-replacements
  ['border-[#343434]', 'border-white/8'],
  
  // ═══ SPECIFIC BG PATTERNS (order: most specific first) ═══
  // Cards on "light" sections — give them a visible elevated bg
  ['bg-[#141414] p-6', 'bg-[#1A1A1A] p-6'],  // Testimonial/Booking cards
  ['bg-[#141414] rounded-full flex', 'bg-[#1A1A1A] rounded-full flex'], // Booking step icons
  ['bg-[#141414] text-[#F5F5F5]', 'bg-[#1A1A1A] text-[#F5F5F5]'], // Buttons
  ['bg-white', 'bg-[#1A1A1A]'],  // Any remaining bg-white
  
  // Section backgrounds — create ALTERNATION
  // "Light" sections need #111111 (slightly visible against #0A0A0A hero/fleet)
  // The script already set #0A0A0A for old light sections. Fix those:
  // Services, WhyChooseUs, Testimonials were #F8F7F3 → now #0A0A0A → should be #111111
  // BookingFlow, FAQ were #EFEEE8 → now #141414 → should be #111111
  
  // ═══ HOVER STATES ═══
  ['hover:bg-[#141414]', 'hover:bg-[#222222]'],
  ['hover:bg-white/10', 'hover:bg-white/8'],
  
  // ═══ SCROLL EFFECTS — fix orb colors for platinum theme ═══
  ['rgba(209,209,209', 'rgba(200,200,220'],  // Cooler platinum orbs
  ['rgba(229,228,226', 'rgba(200,200,220'],  // Cooler platinum borders
  
  // ═══ SECTION-LEVEL FIXES ═══
  // Footer bg
  ['bg-[#F5F5F5]', 'bg-[#0A0A0A]'],  // was #101010 → became #F5F5F5 (wrong!)
  
  // ═══ FIX "green" WhatsApp still being green ═══
  // (this shouldn't have changed, just double-check)
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  for (const [oldStr, newStr] of replacements) {
    if (content.includes(oldStr)) {
      content = content.split(oldStr).join(newStr);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${path.relative(process.cwd(), filePath)}`);
  }
}

function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (/\.(tsx?|css)$/.test(full)) {
      processFile(full);
    }
  }
}

walk(path.join(process.cwd(), 'src'));
console.log('\nPhase 1 complete. Now fixing section backgrounds...');

// ═══ PHASE 2: Fix specific section files for proper alternation ═══
const sectionFixes = {
  // These sections were "light" (#F8F7F3) → must be #111111 for contrast
  'src/components/sections/Services.tsx': { '#0A0A0A': '#111111', target: 'bg-[#0A0A0A] relative overflow-hidden' },
  'src/components/sections/WhyChooseUs.tsx': { '#0A0A0A': '#111111', target: 'bg-[#0A0A0A] overflow-hidden' },
  'src/components/sections/Testimonials.tsx': { '#0A0A0A': '#111111', target: 'bg-[#0A0A0A]' },
  // BookingFlow and FAQ were "cream" (#EFEEE8) → should be #111111
  'src/components/sections/BookingFlow.tsx': { '#141414': '#111111', target: 'bg-[#141414]' },
  'src/components/sections/FAQ.tsx': { search: 'bg-[#141414]', replace: 'bg-[#111111]' },
};

for (const [file, fix] of Object.entries(sectionFixes)) {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');
  
  if (fix.search) {
    content = content.split(fix.search).join(fix.replace);
  } else if (fix.target) {
    const oldBg = fix.target;
    const newBg = oldBg.replace(Object.keys(fix)[0], Object.values(fix)[0]);
    content = content.split(oldBg).join(newBg);
  }
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Section fixed: ${file}`);
}

// ═══ PHASE 3: Fix SectionBlend colors ═══
const blendPath = path.join(process.cwd(), 'src/components/effects/SectionBlend.tsx');
if (fs.existsSync(blendPath)) {
  let content = fs.readFileSync(blendPath, 'utf8');
  content = content.replace("light: '#0A0A0A'", "light: '#111111'");
  content = content.replace("dark: '#0A0A0A'", "dark: '#0A0A0A'");  // keep
  content = content.replace("cream: '#141414'", "cream: '#111111'");
  fs.writeFileSync(blendPath, content, 'utf8');
  console.log('SectionBlend fixed');
}

// ═══ PHASE 4: Fix page.tsx main bg ═══  
const pagePath = path.join(process.cwd(), 'src/app/page.tsx');
if (fs.existsSync(pagePath)) {
  let content = fs.readFileSync(pagePath, 'utf8');
  content = content.replace('bg-[#0A0A0A] min-h-screen', 'bg-[#0A0A0A] min-h-screen');
  fs.writeFileSync(pagePath, content, 'utf8');
  console.log('Page bg confirmed');
}

// ═══ PHASE 5: Fix globals.css tokens ═══
const cssPath = path.join(process.cwd(), 'src/app/globals.css');
if (fs.existsSync(cssPath)) {
  let content = fs.readFileSync(cssPath, 'utf8');
  
  // Fix the Sona design tokens for dark mode
  content = content.replace("--color-sona-cream: #F6F1E7", "--color-sona-cream: #111111");
  content = content.replace("--color-sona-cream-dark: #EDE6D6", "--color-sona-cream-dark: #0F0F0F");
  content = content.replace("--color-sona-cream-soft: #F8F3EA", "--color-sona-cream-soft: #141414");
  content = content.replace("--color-sona-cream-warm: #F1E6D2", "--color-sona-cream-warm: #121212");
  content = content.replace("--color-sona-card: #FDFAF3", "--color-sona-card: #1A1A1A");
  
  content = content.replace("--color-sona-gold: #D1D1D1", "--color-sona-gold: #E5E4E2");
  content = content.replace("--color-sona-gold-bright: #FFFFFF", "--color-sona-gold-bright: #FFFFFF");
  content = content.replace("--color-sona-text: #1A1208", "--color-sona-text: #F5F5F5");
  content = content.replace("--color-sona-text-secondary: #5C4733", "--color-sona-text-secondary: #A0A0A0");
  content = content.replace("--color-sona-text-muted: #A08B72", "--color-sona-text-muted: #777777");
  content = content.replace("--color-sona-text-gold: #D1D1D1", "--color-sona-text-gold: #E5E4E2");
  
  content = content.replace("--color-background: var(--color-sona-cream)", "--color-background: #0A0A0A");
  content = content.replace("--color-foreground: var(--color-sona-text)", "--color-foreground: #F5F5F5");
  
  fs.writeFileSync(cssPath, content, 'utf8');
  console.log('Globals CSS tokens fixed');
}

console.log('\n✅ Midnight & Platinum theme fix complete!');
console.log('Section alternation: #0A0A0A (dark) ↔ #111111 (slightly lighter)');
console.log('Cards: #1A1A1A | Borders: white/10 | Text: #F5F5F5/#A0A0A0');
