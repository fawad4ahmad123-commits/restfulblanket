import { Product } from "./types";

export const products: Product[] = [
  {
    image: "/products/blanket-1.jpg",
    title: "Nord Classic Weighted Blanket",
    price: "€249",
    originalPrice: "€289",
    rating: 4.9,
    reviewCount: 1284,
    weight: "7 kg",
    dimensions: "150 × 200 cm",
  },
  {
    image: "/products/blanket-2.jpg",
    title: "Nord Premium Blanket",
    price: "€269",
    originalPrice: "€309",
    rating: 4.8,
    reviewCount: 964,
    weight: "9 kg",
    dimensions: "150 × 200 cm",
  },
  {
    image: "/products/blanket-3.jpg",
    title: "Nord Kids Blanket",
    price: "€189",
    originalPrice: "€229",
    rating: 4.9,
    reviewCount: 741,
    weight: "5 kg",
    dimensions: "120 × 180 cm",
  },
  {
    image: "/products/blanket-4.jpg",
    title: "Nord Luxury Blanket",
    price: "€299",
    originalPrice: "€349",
    rating: 5,
    reviewCount: 512,
    weight: "12 kg",
    dimensions: "200 × 220 cm",
  },
];


export const CATEGORIES = [
  "All",
  "Adult",
  "Kids",
  "Duvets",
  "Accessories",
];

export const REVIEWS = [
  {
    id: 1,
    name: "Elin Bergström",
    location: "Stockholm, Sweden",
    rating: 5,
    review:
      "I haven't slept this deeply since I was a child. The Nord Classic feels like a hug that lasts all night — my anxiety mornings are simply gone.",
  },
  {
    id: 2,
    name: "Marcus Holm",
    location: "Gothenburg, Sweden",
    rating: 5,
    review:
      "I haven't slept this deeply since I was a child. The Nord Classic feels like a hug that lasts all night — my anxiety mornings are simply gone.",
  },
  {
    id: 3,
    name: "Sofia Lindqvist",
    location: "Copenhagen, Denmark",
    rating: 5,
    review:
      "We bought the Stilla Kids for our daughter and she now asks for her 'cloud' every night. Bedtime tantrums went from nightly to almost never.",
  },
  {
    id: 4,
    name: "Anna Karlsson",
    location: "Oslo, Norway",
    rating: 5,
    review:
      "The quality is exceptional. I've tried other weighted blankets before but nothing compares to the craftsmanship of RestfulBlanket.",
  },
  {
    id: 5,
    name: "Lars Eriksson",
    location: "Helsinki, Finland",
    rating: 5,
    review:
      "Finally sleeping through the night after years of insomnia. This blanket has genuinely changed my life. Worth every penny.",
  },
];

export const EXPERTS = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "Lead Consultant",
    image: "/images/expert-1.jpg",
    category: "Sleep Therapist",
    tags: ["Weighted Therapy", "Anxiety Relief", "Pediatrics"],
  },
  {
    id: 2,
    name: "Lars Eriksen",
    role: "Senior Consultant",
    image: "/images/expert-2.jpg",
    category: "Ergotherapist",
    tags: ["Sensory Integration", "Chronic Stress", "Adults"],
  },
  {
    id: 3,
    name: "Dr. Anna Lindgren",
    role: "Research Advisor",
    image: "/images/expert-3.jpg",
    category: "Sleep Researcher",
    tags: ["Neuroscience", "Deep Sleep", "Research"],
  },
  {
    id: 4,
    name: "Dr. Sarah Mitchell",
    role: "Lead Consultant",
    image: "/images/expert-4.jpg",
    category: "Sleep Therapist",
    tags: ["Weighted Therapy", "Anxiety Relief", "Pediatrics"],
  },
];