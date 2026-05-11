export interface Route {
  id: string;
  from: string;
  to: string;
  distance: string;
  time: string;
  description: string;
}

export const routes: Route[] = [
  {
    id: "ludhiana-chandigarh-airport",
    from: "Ludhiana",
    to: "Chandigarh Airport (IXC)",
    distance: "~110 km",
    time: "~2 hrs",
    description: "Direct airport transfer with flight tracking support.",
  },
  {
    id: "ludhiana-delhi-airport",
    from: "Ludhiana",
    to: "Delhi Airport / IGI",
    distance: "~310 km",
    time: "~5.5 hrs",
    description: "Long-haul comfort for international and domestic flights.",
  },
  {
    id: "ludhiana-delhi-ncr",
    from: "Ludhiana",
    to: "Delhi NCR",
    distance: "~300 km",
    time: "~5.5 hrs",
    description: "Door-to-door service across the National Capital Region.",
  },
  {
    id: "chandigarh-delhi-airport",
    from: "Chandigarh",
    to: "Delhi Airport / IGI",
    distance: "~250 km",
    time: "~4.5 hrs",
    description: "Capital-to-capital route with premium vehicle options.",
  },
  {
    id: "ludhiana-amritsar-airport",
    from: "Ludhiana",
    to: "Amritsar Airport (ATQ)",
    distance: "~140 km",
    time: "~2.5 hrs",
    description: "Sri Guru Ram Dass Jee International Airport transfers.",
  },
  {
    id: "custom-punjab",
    from: "Anywhere",
    to: "In Punjab",
    distance: "Custom",
    time: "On request",
    description:
      "Wedding parties, corporate events, family trips — tell us your plan.",
  },
];
