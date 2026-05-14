import { Plane, Car, Users, Briefcase, MapPin, Shield, Star, Clock, type LucideIcon } from 'lucide-react';

export interface RouteDetail {
  slug: string;
  title: string;
  metaDesc: string;
  h1: string;
  subhead: string;
  distance: string;
  travelTime: string;
  priority: 'High' | 'Medium' | 'Low';
  vehicleOptions: string[];
  painPoints: string[];
  content: {
    hero: string;
    overview: string;
    luxuryExperience: string;
    safetyCommitment: string;
    nriService: string;
    routeSpecificAdvice: string;
  };
  faqs: { q: string; a: string }[];
}

export const PSEO_ROUTES: Record<string, RouteDetail> = {
  'ludhiana-to-delhi-airport-taxi': {
    slug: 'ludhiana-to-delhi-airport-taxi',
    title: 'Ludhiana to Delhi Airport Taxi | Fixed Fare Premium Cab',
    metaDesc: 'Luxury taxi from Ludhiana to Delhi IGI Airport (T3/T2/T1). Toyota Innova Crysta, professional chauffeurs, 24/7 service. Book on WhatsApp for fixed fares.',
    h1: 'Ludhiana to Delhi Airport Taxi Service',
    subhead: 'Experience the gold standard in airport transfers. Reliable, safe, and premium rides from Ludhiana to Delhi IGI Airport.',
    distance: '310 KM',
    travelTime: '5.5 - 6 Hours',
    priority: 'High',
    vehicleOptions: ['Toyota Innova Crysta', 'Maruti XL6', 'Premium Sedan', 'Tempo Traveller'],
    painPoints: [
      'Early morning flight stress',
      'Heavy NRI luggage management',
      'Highway safety at night',
      'Hidden toll & parking charges'
    ],
    content: {
      hero: 'The journey from Ludhiana to Delhi Airport is the lifeline of Punjab\'s international travel. We ensure it\'s perfect.',
      overview: 'Traveling to Delhi IGI Airport from Ludhiana is a 310-kilometer journey that requires absolute reliability. Whether you have a 3 AM flight or a 3 PM departure, our dispatch team works 24/7 to ensure your chauffeur is at your doorstep exactly 15 minutes before the scheduled time. We specialize in the Ludhiana-Delhi corridor, navigating the NH44 highway with the precision that only 20+ years of experience can provide.',
      luxuryExperience: 'Our fleet is primarily composed of the Toyota Innova Crysta, the undisputed king of Indian highways. Each vehicle is deep-cleaned, equipped with high-speed charging, and driven by a professional chauffeur who understands the value of silence and comfort during a long drive.',
      safetyCommitment: 'Safety is non-negotiable. Every Ludhiana to Delhi trip is monitored by our central hub. Our drivers are trained to avoid aggressive driving and stick to safe speed limits, ensuring you arrive at the airport relaxed, not exhausted.',
      nriService: 'For our NRI clients returning home or heading back to Canada, UK, or Australia, we offer extra-spacious luggage solutions. We understand the value of family and heritage, and we treat your journey with the respect it deserves.',
      routeSpecificAdvice: 'Pro Tip: For international departures from T3, we recommend leaving Ludhiana at least 10 hours before your flight. This accounts for potential highway congestion at Panipat or Murthal and gives you a stress-free buffer.'
    },
    faqs: [
      { q: 'Is the toll tax included in the Ludhiana to Delhi fare?', a: 'Yes, all our quotes are "All-Inclusive." This includes state taxes, toll taxes, and parking fees. No hidden costs.' },
      { q: 'What happens if my flight from Delhi is delayed?', a: 'We track your flight in real-time. If you have booked a pickup from Delhi Airport to Ludhiana, your driver will be waiting at the arrivals pillar even if your flight is 4 hours late.' },
      { q: 'Can we stop for food at Murthal?', a: 'Absolutely. Our chauffeurs know the best and cleanest dhabas like Amrik Sukhdev or Haveli for a comfortable break.' }
    ]
  },
  'chandigarh-to-delhi-airport-taxi': {
    slug: 'chandigarh-to-delhi-airport-taxi',
    title: 'Chandigarh to Delhi Airport Taxi | Professional Chauffeur Cab',
    metaDesc: 'Premium taxi from Chandigarh/Mohali to Delhi Airport. Safe, punctual, and comfortable rides in Innova Crysta. Book your 24/7 airport transfer now.',
    h1: 'Chandigarh to Delhi Airport Taxi',
    subhead: 'The preferred choice for corporate executives and families traveling from the Tri-city to Delhi IGI Airport.',
    distance: '250 KM',
    travelTime: '4 - 4.5 Hours',
    priority: 'High',
    vehicleOptions: ['Toyota Innova Crysta', 'Premium Sedan', 'XL6 SUV'],
    painPoints: [
      'Traffic at Delhi border',
      'Last-minute flight changes',
      'Punctual corporate pickups',
      'Night-time security'
    ],
    content: {
      hero: 'Connecting the Tri-city to the Global Gateway with unmatched elegance and punctuality.',
      overview: 'The Chandigarh to Delhi Airport route is one of our busiest corporate corridors. We serve clients from Sector 17, IT Park, Mohali, and Panchkula, providing seamless door-to-terminal transfers. Our drivers are well-versed with the Himalayan Expressway and the Delhi-Chandigarh highway, ensuring a smooth transition from the City Beautiful to the bustling IGI Airport.',
      luxuryExperience: 'For our corporate travelers, we offer Premium Sedans and Innova Crystas equipped with leather interiors and climate control. Your travel time can be your work time, as our drivers ensure a quiet, vibration-free cabin environment.',
      safetyCommitment: 'We maintain a 100% safety record on the Chandigarh-Delhi route. Our vehicles undergo a 25-point safety check before every airport drop to eliminate any chance of breakdown.',
      nriService: 'Families visiting Chandigarh from abroad trust V3 for our transparent pricing and large-vehicle availability. We manage everything from child seats to multiple-stop pickups.',
      routeSpecificAdvice: 'Avoid the peak hour traffic at the Singhu Border by planning your departure either early in the morning (before 6 AM) or late at night.'
    },
    faqs: [
      { q: 'Do you provide pickup from Delhi Airport to Chandigarh?', a: 'Yes, we provide round-the-clock pickup services from T1, T2, and T3 of Delhi Airport back to Chandigarh/Mohali.' },
      { q: 'Are your drivers English speaking?', a: 'Most of our chauffeurs on the Chandigarh-Delhi route are familiar with basic English to assist international and corporate clients.' },
      { q: 'Can I book a one-way cab?', a: 'Yes, one-way drops are our specialty. You only pay for the distance traveled.' }
    ]
  },
  'jalandhar-to-delhi-airport-taxi': {
    slug: 'jalandhar-to-delhi-airport-taxi',
    title: 'Jalandhar to Delhi Airport Taxi | NRI Priority Service',
    metaDesc: 'Book a reliable taxi from Jalandhar to Delhi IGI Airport. Extra luggage space, clean vehicles, and experienced drivers for NRI families.',
    h1: 'Jalandhar to Delhi Airport Taxi',
    subhead: 'Safe and comfortable long-distance airport transfers designed for Jalandhar\'s international travelers.',
    distance: '380 KM',
    travelTime: '6.5 - 7.5 Hours',
    priority: 'High',
    vehicleOptions: ['Toyota Innova Crysta', 'Tempo Traveller', 'XL6'],
    painPoints: [
      'Extremely long travel duration',
      'Managing massive international luggage',
      'Need for hygienic rest stops',
      'Family safety on the highway'
    ],
    content: {
      hero: 'Your trusted bridge between Jalandhar and the world.',
      overview: 'Traveling from Jalandhar to Delhi Airport is a significant journey of nearly 380 kilometers. It requires a vehicle that doesn\'t compromise on legroom or suspension. V3 Tour & Travels has been the first choice for Jalandhar families for over two decades, particularly during the NRI season when reliability and luggage space are the top priorities.',
      luxuryExperience: 'On this long route, the comfort of an Innova Crysta is unmatched. With captain seats and rear AC control, the 7-hour journey feels like a breeze. We also offer Tempo Travellers for larger joint families traveling together.',
      safetyCommitment: 'Long-distance highway driving requires focus. Our drivers are given mandatory rest before a Jalandhar-Delhi assignment, ensuring they are alert and fresh for your safety.',
      nriService: 'We understand that NRI families often carry 6-10 large suitcases. Our vehicles come with heavy-duty roof carriers and ample trunk space to ensure nothing is left behind.',
      routeSpecificAdvice: 'We recommend leaving Jalandhar at least 11-12 hours before your flight departure. The stretch between Ludhiana and Ambala can occasionally have unexpected diversions.'
    },
    faqs: [
      { q: 'Do you offer a pickup service from IGI to Jalandhar?', a: 'Yes, we specialize in Delhi Airport to Jalandhar pickups with "Signboard" service at the arrivals.' },
      { q: 'How do I pay for the ride?', a: 'You can pay via UPI, Bank Transfer, or Cash. We offer flexible payment options for international travelers.' },
      { q: 'Can we get a vehicle with a roof carrier?', a: 'Yes, please mention your luggage requirement during the WhatsApp booking, and we will dispatch a vehicle with a carrier.' }
    ]
  },
  'amritsar-to-delhi-airport-taxi': {
    slug: 'amritsar-to-delhi-airport-taxi',
    title: 'Amritsar to Delhi Airport Taxi | Safe 24/7 Highway Travel',
    metaDesc: 'Book a premium taxi from Amritsar to Delhi IGI Airport. Experienced drivers, clean SUVs, and fixed all-inclusive fares. Trusted by families for 20+ years.',
    h1: 'Amritsar to Delhi Airport Taxi Service',
    subhead: 'The ultimate long-distance airport transfer. Travel from the Holy City of Amritsar to Delhi IGI in total peace of mind.',
    distance: '460 KM',
    travelTime: '8 - 9 Hours',
    priority: 'High',
    vehicleOptions: ['Toyota Innova Crysta', 'Tempo Traveller', 'Premium Sedan'],
    painPoints: [
      'Very long travel fatigue',
      'Need for multiple hygienic breaks',
      'High toll and state tax management',
      'Security during overnight travel'
    ],
    content: {
      hero: 'Bridging the 460km distance between Amritsar and Delhi with safety and luxury.',
      overview: 'The journey from Amritsar to Delhi IGI Airport is one of the longest and most demanding routes in North India. It spans over 450 kilometers and requires a vehicle that is built for the marathon. At V3 Tour & Travels, we ensure that our Amritsar-Delhi fleet consists only of our newest and best-maintained vehicles, ensuring a breakdown-free and comfortable experience.',
      luxuryExperience: 'For an 8-hour journey, space is not a luxury—it is a necessity. Our Innova Crystas provide the best-in-class suspension and reclining seats, allowing you to sleep through the journey and arrive at the airport fresh for your flight.',
      safetyCommitment: 'We use a dual-driver system for extremely long routes or ensure our drivers have 12 hours of rest before an Amritsar-Delhi trip. Safety is our heritage.',
      nriService: 'Serving the global Punjabi diaspora is our specialty. We provide the patience and professionalism that NRI families expect when traveling with heavy luggage and elders.',
      routeSpecificAdvice: 'Given the length of the trip, we recommend starting at least 13-14 hours before your international flight. The highway traffic near Murthal and Panipat can be unpredictable during peak hours.'
    },
    faqs: [
      { q: 'What is the fare from Amritsar to Delhi Airport?', a: 'Our fares are fixed and competitive. Please WhatsApp us for an all-inclusive quote covering all state taxes and tolls.' },
      { q: 'Can we stop at the Golden Temple before leaving?', a: 'Yes, we provide flexible city pickups and can include a stop at the Darbar Sahib before heading to the highway.' },
      { q: 'Is it safe for a family to travel at night?', a: 'Absolutely. Our drivers are highway experts and we track every trip via GPS for added security.' }
    ]
  },
  'patiala-to-delhi-airport-taxi': {
    slug: 'patiala-to-delhi-airport-taxi',
    title: 'Patiala to Delhi Airport Taxi | Fixed Fare Premium Cab',
    metaDesc: 'Premium taxi service from Patiala to Delhi IGI Airport. Reliable, punctual, and safe transfers in Innova Crysta and Sedans. No hidden charges.',
    h1: 'Patiala to Delhi Airport Taxi',
    subhead: 'Direct and comfortable airport transfers from the Royal City of Patiala to Delhi IGI Airport.',
    distance: '250 KM',
    travelTime: '4.5 - 5.5 Hours',
    priority: 'High',
    vehicleOptions: ['Toyota Innova Crysta', 'Premium Sedan', 'XL6 SUV'],
    painPoints: [
      'Punctuality for early flights',
      'Managing luggage in smaller cars',
      'Highway toll stops',
      'Finding reliable drivers'
    ],
    content: {
      hero: 'Seamless travel from Patiala to the Global Gateway.',
      overview: 'Patiala travelers demand punctuality and a professional demeanor. Our service connects the Royal City to Delhi IGI Airport with a focus on a "Zero-Delay" policy. We understand the specific routes through Haryana that save time and ensure a smoother ride compared to standard taxi services.',
      luxuryExperience: 'Our premium sedans are perfect for business travelers, while our Innova Crystas are the choice for families heading out on vacation. Every car is equipped with water bottles and charging ports.',
      safetyCommitment: 'We conduct regular background checks on our chauffeurs and maintain our vehicles at authorized service centers only.',
      nriService: 'Patiala has a strong connection with the UK and Canada. We provide the reliability needed for these critical international departures.',
      routeSpecificAdvice: 'The route via Ambala can sometimes be busy; our drivers are trained to use the best alternate link roads to keep your journey on schedule.'
    },
    faqs: [
      { q: 'How long does it take from Patiala to Delhi T3?', a: 'Typically 5 hours, but we recommend leaving 9 hours before your flight.' },
      { q: 'Do you offer one-way drops?', a: 'Yes, we have fixed one-way rates for Patiala to Delhi Airport.' },
      { q: 'Is the driver allowance included?', a: 'Yes, our quotes are comprehensive and include the driver allowance.' }
    ]
  }
};
