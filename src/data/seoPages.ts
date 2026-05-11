import { Plane, Car, Users, Briefcase, MapPin, Shield, Clock } from 'lucide-react';

export interface SeoPageData {
  slug: string;
  title: string;
  metaDesc: string;
  h1: string;
  subhead: string;
  type: 'service' | 'route' | 'fleet';
  icon: any;
  content: {
    overview: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    popularRoutes?: string[];
  };
  faqs: { q: string; a: string }[];
}

export const SEO_PAGES: Record<string, SeoPageData> = {
  'outstation-taxi': {
    slug: 'outstation-taxi',
    title: 'Outstation Taxi Service in Punjab | V3 Tour & Travels',
    metaDesc: 'Book premium outstation taxi services across Punjab, Haryana, Himachal, and Delhi. Innova Crysta and sedans for safe, comfortable long-distance travel.',
    h1: 'Premium Outstation Taxi',
    subhead: 'Comfortable, safe, and reliable long-distance travel across North India with our premium fleet and experienced drivers.',
    type: 'service',
    icon: Car,
    content: {
      overview: 'Planning a trip to Shimla, Manali, Dharamshala, or Jaipur? Our outstation taxi service is designed for maximum comfort on long journeys. We charge transparent per-km rates with zero hidden fees. Your chauffeur acts as a local guide and ensures a smooth, safe ride.',
      feature1Title: 'Transparent Per-KM Billing',
      feature1Desc: 'We provide clear estimates before your trip begins. No surprise charges at the end of your journey.',
      feature2Title: 'Hill-Station Experts',
      feature2Desc: 'Our drivers are highly experienced in navigating the steep and winding roads of Himachal Pradesh and Uttarakhand.',
      feature3Title: 'Multi-Day Packages',
      feature3Desc: 'Keep the vehicle with you for the entire duration of your trip with our flexible multi-day outstation packages.',
      popularRoutes: ['Ludhiana to Shimla', 'Chandigarh to Manali', 'Jalandhar to Dharamshala', 'Amritsar to Dalhousie']
    },
    faqs: [
      { q: 'How is the outstation fare calculated?', a: 'Fare is calculated based on a minimum of 250km per day plus driver allowance and state toll taxes.' },
      { q: 'Do I need to pay for driver accommodation?', a: 'No, our driver allowance covers their food and accommodation. You do not need to arrange anything.' },
      { q: 'Can I book a one-way outstation taxi?', a: 'Yes, we offer dedicated one-way drops for popular routes.' }
    ]
  },
  'corporate-travel': {
    slug: 'corporate-travel',
    title: 'Corporate Travel & Executive Car Rentals | V3 Tour & Travels',
    metaDesc: 'Premium corporate car rentals and executive travel solutions in Punjab. Impeccably maintained sedans and Innova Crystas with professional chauffeurs.',
    h1: 'Corporate Travel Solutions',
    subhead: 'Executive transport services designed for business professionals, VIP guests, and corporate events across Punjab and Delhi NCR.',
    type: 'service',
    icon: Briefcase,
    content: {
      overview: 'First impressions matter. Our corporate travel service provides impeccably clean vehicles and professionally groomed chauffeurs for your business needs. From receiving VIP clients at Delhi IGI to monthly corporate leasing, we handle it all with the utmost professionalism.',
      feature1Title: 'Executive Fleet',
      feature1Desc: 'Travel in premium sedans and Innova Crystas that are deep-cleaned daily and always smell fresh.',
      feature2Title: 'Priority Dispatch',
      feature2Desc: 'Corporate accounts receive priority booking, ensuring a vehicle is always available when you need it.',
      feature3Title: 'Monthly Billing Available',
      feature3Desc: 'For regular corporate clients, we offer streamlined invoicing and monthly billing cycles.',
    },
    faqs: [
      { q: 'Do you offer airport meet-and-greet?', a: 'Yes, our chauffeurs will wait at the arrivals gate with a custom name board for your clients.' },
      { q: 'Are your vehicles Wi-Fi enabled?', a: 'Select premium vehicles can be equipped with Wi-Fi upon request during booking.' },
      { q: 'Can we book multiple cars for an event?', a: 'Absolutely. We regularly handle transportation logistics for corporate conferences and events.' }
    ]
  },
  'family-tours': {
    slug: 'family-tours',
    title: 'Family Tour Packages & Taxi Service | V3 Tour & Travels',
    metaDesc: 'Safe, spacious, and comfortable taxi services for family tours. Book an Innova Crysta or Tempo Traveller for your next family vacation.',
    h1: 'Family Tour Services',
    subhead: 'Creating beautiful memories with safe, spacious, and comfortable travel solutions for your entire family.',
    type: 'service',
    icon: Users,
    content: {
      overview: 'Traveling with family requires extra care, space for luggage, and a focus on safety. We provide spacious Innova Crystas and XL6 SUVs perfect for family getaways. Our drivers are courteous, drive safely, and know the best family-friendly restaurants along the highways.',
      feature1Title: 'Spacious & Comfortable',
      feature1Desc: 'Ample legroom and luggage capacity ensure everyone travels without feeling cramped.',
      feature2Title: 'Safety First',
      feature2Desc: 'Strict adherence to speed limits. All vehicles are equipped with first-aid kits and airbags.',
      feature3Title: 'Flexible Itineraries',
      feature3Desc: 'Stop when you want, eat where you want. The itinerary is completely controlled by you.',
    },
    faqs: [
      { q: 'Are child seats available?', a: 'We can arrange child safety seats upon request with advance notice.' },
      { q: 'Which vehicle is best for a family of 6?', a: 'The Toyota Innova Crysta is the perfect choice for a family of 6, offering great comfort and decent luggage space.' },
      { q: 'Do drivers help with luggage?', a: 'Yes, our chauffeurs will gladly assist with loading and unloading all your luggage.' }
    ]
  },
  'tempo-traveller-booking': {
    slug: 'tempo-traveller-booking',
    title: 'Tempo Traveller Booking in Punjab | V3 Tour & Travels',
    metaDesc: 'Book luxury 12-seater to 16-seater Tempo Travellers in Punjab for group tours, weddings, and events. AC, pushback seats, and premium interiors.',
    h1: 'Luxury Tempo Traveller',
    subhead: 'The ultimate group travel solution. Spacious 12 to 16-seater luxury Tempo Travellers for weddings, tours, and corporate events.',
    type: 'fleet',
    icon: Users,
    content: {
      overview: 'When traveling in a large group, a Tempo Traveller is the most economical and fun way to travel together. Our luxury Tempo Travellers feature premium pushback seats, individual AC vents, ambient lighting, and top-tier music systems. Perfect for hill station tours, weddings, or pilgrimage trips.',
      feature1Title: 'Premium Interiors',
      feature1Desc: 'Reclining push-back seats, LED TVs, and premium sound systems for an entertaining journey.',
      feature2Title: 'Massive Luggage Space',
      feature2Desc: 'Dedicated rear luggage compartments and roof carriers to handle large bags for the whole group.',
      feature3Title: 'Experienced Heavy-Vehicle Drivers',
      feature3Desc: 'Our Tempo Traveller drivers have specialized licenses and years of experience safely handling larger vehicles.',
    },
    faqs: [
      { q: 'What seating capacities are available?', a: 'We offer 12-seater, 14-seater, and 16-seater luxury Tempo Travellers.' },
      { q: 'Are Tempo Travellers allowed in hill stations?', a: 'Yes, our Tempo Travellers have all India permits and our drivers are experts on hill routes.' },
      { q: 'How early should I book?', a: 'For wedding seasons or long weekends, we recommend booking at least 2-3 weeks in advance.' }
    ]
  },
  'innova-crysta-taxi': {
    slug: 'innova-crysta-taxi',
    title: 'Innova Crysta Taxi Booking | Premium Cab Service',
    metaDesc: 'Book a Toyota Innova Crysta for airport transfers and outstation trips. The most trusted premium SUV for comfort, safety, and reliability.',
    h1: 'Innova Crysta Premium Taxi',
    subhead: 'The gold standard of Indian travel. Book our top-condition Toyota Innova Crystas for unmatched comfort and safety.',
    type: 'fleet',
    icon: Car,
    content: {
      overview: 'The Toyota Innova Crysta is our most requested vehicle for a reason. It offers the perfect balance of luxury, space, and safety. Whether you are heading to Delhi IGI Airport with 4 large suitcases or taking a 5-day tour to Rajasthan, the Innova Crysta ensures you arrive completely relaxed.',
      feature1Title: 'Captain Seats',
      feature1Desc: 'Available in 6-seater and 7-seater configurations with ultra-comfortable middle-row captain seats.',
      feature2Title: 'Superior Suspension',
      feature2Desc: 'Glides over bumps and rough roads, making it the best choice for long outstation journeys.',
      feature3Title: 'Excellent AC Cooling',
      feature3Desc: 'Rear AC vents ensure passengers in the 2nd and 3rd rows stay cool during peak Indian summers.',
    },
    faqs: [
      { q: 'How much luggage fits in an Innova Crysta?', a: 'With the 3rd row folded, it can easily fit 4-5 large suitcases. With all rows up, it fits 2 medium bags.' },
      { q: 'Is it suitable for senior citizens?', a: 'Yes, the high seating position and easy ingress/egress make it highly recommended for elderly passengers.' },
      { q: 'Are all your Innovas the new Crysta model?', a: 'Yes, our fleet consists primarily of the newer Toyota Innova Crysta models, kept in pristine condition.' }
    ]
  },
  'delhi-airport-taxi': {
    slug: 'delhi-airport-taxi',
    title: 'Delhi Airport (IGI) Taxi Service | V3 Tour & Travels',
    metaDesc: 'Reliable taxi service to and from Delhi Indira Gandhi International Airport (IGI). Pickups from Punjab, Chandigarh, and Haryana. 24/7 flight tracking.',
    h1: 'Delhi IGI Airport Taxi',
    subhead: 'Seamless, punctual, and safe airport transfers to India\'s busiest airport. We cover T1, T2, and T3.',
    type: 'route',
    icon: Plane,
    content: {
      overview: 'Delhi IGI Airport is the primary international gateway for North India. Navigating traffic to reach on time can be stressful. We remove that stress completely. Our drivers know the best routes, track your flight timings, and ensure you are dropped right at your departure gate with plenty of time to spare.',
      feature1Title: 'All Terminals Covered',
      feature1Desc: 'We provide drop and pickup services across Terminal 1, Terminal 2, and Terminal 3.',
      feature2Title: 'Meet & Greet Pickup',
      feature2Desc: 'For international arrivals, our driver will wait with a placard right outside the exit gate.',
      feature3Title: 'Zero Late-Night Surcharge',
      feature3Desc: 'Most international flights depart at night. We operate 24/7 without charging extra for odd hours.',
      popularRoutes: ['Ludhiana to Delhi Airport', 'Chandigarh to Delhi Airport', 'Jalandhar to Delhi Airport', 'Amritsar to Delhi Airport']
    },
    faqs: [
      { q: 'Where will the driver wait at Terminal 3?', a: 'Our driver will meet you at the designated taxi parking area or directly at the arrivals pillar, coordinating via WhatsApp.' },
      { q: 'What if my flight is delayed?', a: 'We track your flight status in real-time. If you are delayed, the driver waits. No extra waiting charges for flight delays.' },
      { q: 'Do I have to pay Delhi state tax?', a: 'Our quoted fare is inclusive of state taxes and toll taxes. There are no hidden fees.' }
    ]
  },
  'chandigarh-airport-taxi': {
    slug: 'chandigarh-airport-taxi',
    title: 'Chandigarh Airport Taxi Service | V3 Tour & Travels',
    metaDesc: 'Fast and reliable taxi drops and pickups for Shaheed Bhagat Singh International Airport, Chandigarh. Serving all major Punjab cities.',
    h1: 'Chandigarh Airport Taxi',
    subhead: 'Your dependable travel partner for Shaheed Bhagat Singh International Airport (IXC).',
    type: 'route',
    icon: Plane,
    content: {
      overview: 'Chandigarh Airport (IXC) serves as a crucial hub for domestic and limited international flights for Punjab and Haryana. Whether you are flying to Mumbai, Bangalore, or Dubai, our airport taxi service ensures a smooth ride from your home straight to the terminal building.',
      feature1Title: 'Punctual Drops',
      feature1Desc: 'We plan our departure from your city factoring in highway traffic to ensure you reach 2 hours before departure.',
      feature2Title: 'Clean & Sanitized Cabs',
      feature2Desc: 'Start your journey fresh in an impeccably clean vehicle.',
      feature3Title: 'Luggage Assistance',
      feature3Desc: 'Our chauffeurs will help load and unload your luggage right onto the airport trolleys.',
      popularRoutes: ['Ludhiana to Chandigarh Airport', 'Jalandhar to Chandigarh Airport', 'Patiala to Chandigarh Airport']
    },
    faqs: [
      { q: 'How long does it take from Ludhiana to Chandigarh Airport?', a: 'It typically takes around 2 to 2.5 hours via the highway, depending on traffic.' },
      { q: 'Can I book a cab from Chandigarh Airport to my city?', a: 'Yes, we provide pre-booked pickup services. The driver will be ready when you land.' },
      { q: 'Are parking charges included?', a: 'Airport entry/parking charges (if applicable for pickups) will be clearly communicated during booking.' }
    ]
  },
  'amritsar-airport-taxi': {
    slug: 'amritsar-airport-taxi',
    title: 'Amritsar Airport Taxi Service | V3 Tour & Travels',
    metaDesc: 'Book premium cabs to Sri Guru Ram Dass Jee International Airport, Amritsar (ATQ). Trusted by NRIs and families across Punjab.',
    h1: 'Amritsar Airport Taxi',
    subhead: 'Comfortable and safe transfers to Sri Guru Ram Dass Jee International Airport (ATQ).',
    type: 'route',
    icon: Plane,
    content: {
      overview: 'Amritsar Airport (ATQ) is a major hub for NRI families traveling to and from the UK, Canada, and Australia. We specialize in providing spacious vehicles like the Innova Crysta and Tempo Traveller that can easily accommodate large families and their heavy international luggage.',
      feature1Title: 'NRI Friendly',
      feature1Desc: 'We understand the specific needs of NRI travelers, providing spacious cars for extra luggage.',
      feature2Title: 'Golden Temple Visits',
      feature2Desc: 'We can combine your airport pickup with a visit to the Darbar Sahib (Golden Temple) before heading to your city.',
      feature3Title: 'Safe Night Travel',
      feature3Desc: 'Many international flights land late. Our experienced drivers ensure a highly safe and secure journey back home at night.',
      popularRoutes: ['Jalandhar to Amritsar Airport', 'Ludhiana to Amritsar Airport', 'Chandigarh to Amritsar Airport']
    },
    faqs: [
      { q: 'Can you fit 6 large suitcases?', a: 'Yes, if you have excess luggage, we recommend booking an XL6, Innova with a roof carrier, or a Tempo Traveller.' },
      { q: 'Is it safe to travel from Amritsar to Ludhiana at 2 AM?', a: 'Absolutely. We have been doing these routes for 20+ years. Our drivers are verified and highly experienced in night driving.' },
      { q: 'Do you offer currency exchange stops?', a: 'Yes, upon request, our driver can guide you to reliable currency exchange points.' }
    ]
  },
  'ludhiana-to-delhi-airport-taxi': {
    slug: 'ludhiana-to-delhi-airport-taxi',
    title: 'Ludhiana to Delhi Airport Taxi | One Way Cab',
    metaDesc: 'Direct one-way taxi from Ludhiana to Delhi IGI Airport. Innova Crysta and Sedans available 24/7. Fixed fares, no hidden charges.',
    h1: 'Ludhiana to Delhi Airport',
    subhead: 'Our most popular and highly optimized route. Travel from the heart of Punjab directly to Delhi IGI Terminal 3 in absolute comfort.',
    type: 'route',
    icon: MapPin,
    content: {
      overview: 'The 300+ kilometer journey from Ludhiana to Delhi IGI Airport requires a reliable vehicle and a driver who knows the NH44 highway inside out. This is our flagship route. We execute dozens of Ludhiana-Delhi airport transfers every week, ensuring 100% punctuality and safety.',
      feature1Title: 'Fastest Highway Route',
      feature1Desc: 'We take the most optimized routes via NH44 to bypass heavy city traffic where possible.',
      feature2Title: 'Clean Highway Stops',
      feature2Desc: 'Our drivers know the best, most hygienic dhabas and rest stops for food and restrooms.',
      feature3Title: 'One-Way Fares',
      feature3Desc: 'You only pay for the drop. We offer competitive one-way pricing for Ludhiana to Delhi IGI.',
    },
    faqs: [
      { q: 'What is the travel time from Ludhiana to Delhi IGI?', a: 'It usually takes between 5.5 to 6.5 hours depending on traffic and the time of day.' },
      { q: 'When should I leave Ludhiana for an international flight?', a: 'We recommend leaving Ludhiana at least 10 hours before your flight departure time to account for travel, rest stops, and 3-hour airport check-in.' },
      { q: 'Is the toll tax included in the fare?', a: 'Yes, our quoted fare for Ludhiana to Delhi airport includes all highway tolls.' }
    ]
  },
  'jalandhar-to-delhi-airport-taxi': {
    slug: 'jalandhar-to-delhi-airport-taxi',
    title: 'Jalandhar to Delhi Airport Taxi | One Way Drop',
    metaDesc: 'Safe and comfortable taxi from Jalandhar to Delhi IGI Airport. Perfect for NRI families with heavy luggage. Innova Crysta available.',
    h1: 'Jalandhar to Delhi Airport',
    subhead: 'Trusted airport transfers from Jalandhar to Delhi IGI. Specialized in handling NRI travel with extra luggage space.',
    type: 'route',
    icon: MapPin,
    content: {
      overview: 'Jalandhar has a massive NRI population, and we have proudly served these families for decades. The journey from Jalandhar to Delhi Airport is roughly 380 km. We provide spacious Innova Crystas equipped with secure roof carriers to handle the heavy baggage that typically accompanies international travel.',
      feature1Title: 'Luggage Optimized',
      feature1Desc: 'Vehicles equipped with secure roof carriers to safely transport international-sized suitcases.',
      feature2Title: 'Comfortable Long Drive',
      feature2Desc: 'Premium suspension in our vehicles ensures you don\'t feel tired after the 7-hour journey.',
      feature3Title: 'Experienced Night Drivers',
      feature3Desc: 'Drivers specifically trained to handle overnight highway driving safely and smoothly.',
    },
    faqs: [
      { q: 'How much time does it take from Jalandhar to Delhi IGI?', a: 'Expect a travel time of 6.5 to 7.5 hours under normal highway conditions.' },
      { q: 'Can you pick us up from multiple locations in Jalandhar?', a: 'Yes, we can arrange multi-point pickups within the city before hitting the highway.' },
      { q: 'What if we have 8 large bags?', a: 'We highly recommend booking our Innova Crysta with a roof carrier, or an XL6/Tempo Traveller depending on passenger count.' }
    ]
  },
  'patiala-to-delhi-airport-taxi': {
    slug: 'patiala-to-delhi-airport-taxi',
    title: 'Patiala to Delhi Airport Taxi | Premium Cab Service',
    metaDesc: 'Book a reliable taxi from Patiala to Delhi IGI Airport. Punctual, safe, and comfortable one-way drops in premium sedans and Innovas.',
    h1: 'Patiala to Delhi Airport',
    subhead: 'Direct, comfortable, and highly punctual taxi drops from the Royal City of Patiala to Delhi IGI Airport.',
    type: 'route',
    icon: MapPin,
    content: {
      overview: 'Traveling from Patiala to Delhi Airport is approximately a 250 km journey. We provide a smooth, direct ride via the national highway, ensuring you reach your terminal relaxed and on time. Whether you need a swift premium sedan for a solo business trip or an Innova for the family, we have the perfect car.',
      feature1Title: 'Swift & Direct',
      feature1Desc: 'Our drivers utilize the best routes connecting Patiala to the main NH44 highway for a faster journey.',
      feature2Title: 'Fixed One-Way Pricing',
      feature2Desc: 'Clear, transparent pricing for one-way drops to any terminal at IGI Airport.',
      feature3Title: '24/7 Availability',
      feature3Desc: 'Whether you need to leave Patiala at 2 AM or 2 PM, our cars are available.',
    },
    faqs: [
      { q: 'What is the standard travel time from Patiala to IGI?', a: 'The journey typically takes around 4.5 to 5.5 hours.' },
      { q: 'Do you drop off at Terminal 3 directly?', a: 'Yes, we drop you off right at the departures gate of Terminal 1, 2, or 3 as required.' },
      { q: 'How far in advance should I book?', a: 'We recommend booking 24 hours in advance to ensure your preferred vehicle type is available.' }
    ]
  }
};
