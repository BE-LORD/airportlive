const fs = require('fs');
const path = require('path');

const replacements = {
  // Backgrounds
  '#F8F7F3': '#0A0A0A', // Light cream -> Obsidian
  '#EFEEE8': '#141414', // Warm cream -> Deep Slate
  '#171717': '#0A0A0A', // Dark charcoal -> Obsidian
  
  // Text
  '#101010': '#F5F5F5', // Dark text -> Platinum text
  '#6F6B63': '#A3A3A3', // Muted text -> Light muted
  
  // Accents (Gold -> Platinum/Silver)
  '#B88A44': '#E5E4E2', // Primary Gold -> Platinum
  'rgba(184,138,68': 'rgba(229,228,226', // Gold RGB
  '#C8780A': '#D1D1D1', // Darker Gold -> Darker Platinum
  'rgba(200,120,10': 'rgba(209,209,209', // Darker Gold RGB
  '#F0B429': '#FFFFFF', // Bright Gold -> White
  '#F5D485': '#F0F0F0', // Light Gold -> Light Gray
  
  // Specific component background fixes for Dark Mode
  'bg-white p-6 md:p-8': 'bg-[#141414] p-6 md:p-8', // Testimonials cards
  'bg-white rounded-full flex': 'bg-[#141414] rounded-full flex', // Booking steps
  'bg-white text-[#101010]': 'bg-[#141414] text-[#F5F5F5]', // Buttons
  'text-white md:text-[#101010]': 'text-white', // Hero text
  'bg-black/75 md:bg-[#F8F7F3]': 'bg-black/75 md:bg-[#0A0A0A]', // Hero overlay
  'bg-white/90 md:bg-transparent': 'bg-[#0A0A0A]/90 md:bg-transparent', // Nav
  'bg-white/80': 'bg-[#0A0A0A]/80' // Nav
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const [oldStr, newStr] of Object.entries(replacements)) {
        const regex = new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        if (regex.test(content)) {
          content = content.replace(regex, newStr);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(process.cwd(), 'src'));
console.log('Theme swap to Midnight & Platinum completed!');
