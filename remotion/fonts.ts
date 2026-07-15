// Load brand fonts through @remotion/google-fonts so they are guaranteed to be
// available during headless rendering (system fonts are not reliable there).
import { loadFont as loadCormorant } from "@remotion/google-fonts/Cormorant";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

// Each loadFont() call returns the resolved CSS font-family name.
const cormorant = loadCormorant("normal", { weights: ["500", "600", "700"] });
const dmSans = loadDMSans("normal", { weights: ["400", "500", "700"] });
const jetBrains = loadJetBrains("normal", { weights: ["400", "500", "700"] });

// Serif for headlines, sans for body, mono for labels/tickers.
export const serif = `${cormorant.fontFamily}, "Cormorant Garamond", Georgia, serif`;
export const sans = `${dmSans.fontFamily}, "DM Sans", system-ui, sans-serif`;
export const mono = `${jetBrains.fontFamily}, "JetBrains Mono", ui-monospace, monospace`;
