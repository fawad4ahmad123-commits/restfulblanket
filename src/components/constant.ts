import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import { Product } from "./Home/types";

export const navigation = [
  {
    title: "Tyngdedyner",
    href: "/weighted-blankets",
    children: [
      {
        title: "Tyngdetæpper",
        href: "/weighted-blankets/blankets",
      },
      {
        title: "Tilbehør",
        href: "/weighted-blankets/accessories",
      },
      {
        title: "Vælg den rigtige",
        href: "/weighted-blankets/guide",
      },
      {
        title: "Materialer og dokumentation",
        href: "/weighted-blankets/materials",
      },
      {
        title: "For professionelle",
        href: "/weighted-blankets/professionals",
      },
    ],
  },
  {
    title: "Tilbehør",
    href: "/accessories",
  },
  {
    title: "Søvn & Ro",
    href: "/sleep",
  },
  {
    title: "Om Os",
    href: "/about",
    children: [
      {
        title: "Om RestfulBlanket",
        href: "/about/restfulblanket",
      },
    ],
  },
];

export const slides = [
  {
    image: "/home/hero-img.jpg",
    title: "Sleep Better.",
    subtitle: "Live Better.",
    description:
      "Hand-crafted weighted blankets and duvets, shaped by Nordic calm.",
  },
  {
    image: "/home/hero-img-2.jpg",
    title: "Feel Calm.",
    subtitle: "Every Night.",
    description:
      "Designed to reduce stress and help you drift into deeper sleep.",
  },
  {
    image: "/home/hero-img-3.jpg",
    title: "Wake Refreshed.",
    subtitle: "Every Morning.",
    description: "Premium bedding inspired by Scandinavian simplicity.",
  },
];

export const categories = [
  {
    image: "/categories/1.png",
    title: "Tyngdedyner",
    subtitle: "12 Products • 5–12 KG",
  },
  {
    image: "/categories/1.png",
    title: "Tyngdetæppe",
    subtitle: "12 Products • 5–12 KG",
  },
  {
    image: "/categories/1.png",
    title: "Sengesæt",
    subtitle: "12 Products • 5–12 KG",
  },
  {
    image: "/categories/1.png",
    title: "Puder",
    subtitle: "12 Products • 5–12 KG",
  },
  {
    image: "/categories/1.png",
    title: "Tyngdedyner",
    subtitle: "12 Products • 5–12 KG",
  },
  {
    image: "/categories/1.png",
    title: "Tyngdetæppe",
    subtitle: "12 Products • 5–12 KG",
  },
  {
    image: "/categories/1.png",
    title: "Sengesæt",
    subtitle: "12 Products • 5–12 KG",
  },
  {
    image: "/categories/1.png",
    title: "Puder",
    subtitle: "12 Products • 5–12 KG",
  },
];

export const products: Product[] = [
  {
    image: "/product/bestselller.png",
    hoverImage: "/product/detail.png",
    title: "Nord Classic Weighted Blanket",
    price: "€249",
    originalPrice: "€289",
    rating: 4.9,
    reviewCount: 1284,
    weight: "7 kg",
    dimensions: "150 × 200 cm",
  },
  {
    image: "/product/bestselller.png",
    hoverImage: "/product/detail.png",
    title: "Nord Premium Weighted Blanket",
    price: "€269",
    originalPrice: "€309",
    rating: 4.8,
    reviewCount: 964,
    weight: "9 kg",
    dimensions: "150 × 200 cm",
  },
  {
    image: "/product/bestselller.png",
    hoverImage: "/product/detail.png",
    title: "Nord Kids Weighted Blanket",
    price: "€189",
    originalPrice: "€219",
    rating: 4.9,
    reviewCount: 742,
    weight: "4 kg",
    dimensions: "100 × 150 cm",
  },
  {
    image: "/product/bestselller.png",
    hoverImage: "/product/detail.png",
    title: "Nord Luxury Sleep Blanket",
    price: "€299",
    originalPrice: "€349",
    rating: 5.0,
    reviewCount: 1568,
    weight: "11 kg",
    dimensions: "200 × 220 cm",
  },
];

export const shopLinks = [
  "Adult Weighted Blankets",
  "Kids Weighted Blankets",
  "Premium Duvets",
  "Sleep Accessories",
  "Gift Cards",
];

export const supportLinks = [
  "About Us",
  "Help Center",
  "Sleep Trial",
  "Shipping & Returns",
  "Care Guide",
  "Contact",
];

export const socialLinks = [
  { icon: FaInstagram, href: "#", name: "Instagram" },
  { icon: FaFacebookF, href: "#", name: "Facebook" },
  { icon: FaPinterestP, href: "#", name: "Pinterest" },
  { icon: FaLinkedinIn, href: "#", name: "LinkedIn" },
];

export const HERO_SLIDES = [
  {
    image: "/home/hero-img.jpg",
    title: "Sleep Better.",
    subtitle: "Live Better.",
    description:
      "Hand-crafted weighted blankets and duvets, shaped by Nordic calm. Designed in Stockholm to ease anxious nights and gently hold you into deeper rest.",
  },
  {
    image: "/home/hero-img.jpg",
    title: "Feel Calm.",
    subtitle: "Every Night.",
    description:
      "Premium weighted bedding created to reduce stress and help you fall asleep faster.",
  },
  {
    image: "/home/hero-img.jpg",
    title: "Wake Refreshed.",
    subtitle: "Every Morning.",
    description:
      "Experience Scandinavian comfort designed for deeper sleep and brighter mornings.",
  },
];

export const BOTTIM_BANNER_ITEMS = [
  "30-NIGHT SLEEP TRIAL, NO QUESTIONS ASKED",
  "HAND-FINISHED IN SMÅLAND, SWEDEN",
  "OEKO-TEX & CE CERTIFIED",
  "FREE CARBON-NEUTRAL SHIPPING OVER €120",
];
