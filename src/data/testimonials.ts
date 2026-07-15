/* PLACEHOLDER — replace with real verified testimonials before launch */
/* Do not show "Verified" badges unless testimonials are truly verified. */

export interface Testimonial {
  id: string;
  quote: string;
  firstName: string;
  city: string;
  tripType: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "The Innova was spotless, the driver was on time, and the whole experience felt effortless. Will definitely book again.",
    firstName: "Rajeev",
    city: "Ludhiana",
    tripType: "Airport transfer to Delhi",
  },
  {
    id: "t2",
    quote:
      "I book for my parents every time they fly. The team is reliable, polite, and always communicates clearly.",
    firstName: "Priya",
    city: "Chandigarh",
    tripType: "Family airport pickup",
  },
  {
    id: "t3",
    quote:
      "Used them for a corporate event with 5 cars. Everything was coordinated perfectly. No stress, no confusion.",
    firstName: "Gurpreet",
    city: "Mohali",
    tripType: "Corporate fleet booking",
  },
  {
    id: "t4",
    quote:
      "For our wedding, they handled guest pickups from three different cities. Professional from start to finish.",
    firstName: "Anita",
    city: "Ludhiana",
    tripType: "Wedding guest transport",
  },
];
