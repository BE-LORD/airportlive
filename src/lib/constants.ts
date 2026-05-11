export const BUSINESS = {
  name: "V3 Tour & Travels",
  brand: "Airport Live",
  connectedBrand: "Airport Live",
  tagline: "Premium Airport Transfers",
  primaryService:
    "Premium airport transfers across Ludhiana, Chandigarh, and Delhi NCR. Professional chauffeurs, Toyota Innova Crysta comfort, fixed fares, 24/7 WhatsApp booking.",
  phone: "9888000510",
  phoneFull: "+919888000510",
  whatsapp: "9888000510",
  email: "book@airportlive.in",
  domain: "airportlive.in",
  websiteDisplay: "airportlive.in",
  website: "https://airportlive.in",
  address: "Ludhiana, Punjab, India",
  experience: "20+",
  fleet: "100+",
  serviceArea: [
    "Ludhiana",
    "Chandigarh",
    "Delhi NCR",
    "Amritsar",
    "Jalandhar",
    "Patiala",
  ],
  coreRoutes: [
    "Ludhiana → Delhi Airport",
    "Chandigarh → Delhi Airport",
    "Delhi Airport → Punjab",
    "Ludhiana → Chandigarh Airport",
    "Amritsar → Delhi Airport",
  ],
};

export const ROUTES = [
  {
    id: 1,
    from: "Ludhiana",
    to: "Delhi Airport",
    time: "5h 30m",
    desc: "Premium Non-Stop Express",
  },
  {
    id: 2,
    from: "Chandigarh",
    to: "Delhi Airport",
    time: "4h 00m",
    desc: "Corporate Priority Route",
  },
  {
    id: 3,
    from: "Delhi",
    to: "Punjab",
    time: "Express",
    desc: "Safe Arrivals Home",
  },
];

export const FLEET = [
  {
    id: "innova-crysta",
    name: "Innova Crysta",
    tagline: "The Corporate Standard",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    features: ["Captain Seats", "Quiet Cabin", "Ample Luggage"],
  },
  {
    id: "sedan",
    name: "Premium Sedan",
    tagline: "Executive Comfort",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2070&auto=format&fit=crop",
    features: ["Leather Interior", "Climate Control", "Smooth Ride"],
  },
  {
    id: "tempo-traveller",
    name: "Tempo Traveller",
    tagline: "Group Travel Redefined",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2070&auto=format&fit=crop",
    features: ["12–16 Seats", "Push-Back Chairs", "Entertainment System"],
  },
];
