export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "airport-transfers",
    title: "Airport Transfers",
    description:
      "On-time pickups and drops to Chandigarh, Delhi, and Amritsar airports with flight tracking.",
    features: [
      "Flight tracking included",
      "Meet & greet at arrivals",
      "Luggage assistance",
      "24/7 availability",
    ],
  },
  {
    id: "intercity-rides",
    title: "Intercity Rides",
    description:
      "Comfortable long-distance travel across Punjab, Haryana, Himachal, and Delhi NCR.",
    features: [
      "Premium vehicles only",
      "Professional chauffeurs",
      "AC always on",
      "Flexible stops",
    ],
  },
  {
    id: "corporate-travel",
    title: "Corporate Travel",
    description:
      "Reliable transportation for executives, teams, and business events with invoicing support.",
    features: [
      "GST invoices available",
      "Dedicated account manager",
      "Multiple vehicle coordination",
      "Priority booking",
    ],
  },
  {
    id: "wedding-family",
    title: "Wedding & Family Travel",
    description:
      "Multiple vehicles, decorated cars, and coordinated logistics for your special occasions.",
    features: [
      "Fleet coordination",
      "Decorated vehicles on request",
      "Guest pickup scheduling",
      "Route planning assistance",
    ],
  },
];
