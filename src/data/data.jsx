import React from 'react';

// --- 1. PRODUCTS DATA ---
export const products = [
  {
    id: 1,
    name: 'Vedic Havan Cups',
    category: 'Ritual',
    price: '₹250',
    description: 'Filled with organic herbs and guggal for a purifying aroma. Perfect for daily purification rituals.',
    image: 'https://images.unsplash.com/photo-1602166668798-da5c062086c0?auto=format&fit=crop&q=80&w=800', 
    isNew: true,
  },
  {
    id: 2,
    name: 'Gau Maya Logs (1kg)',
    category: 'Eco-Fuel',
    price: '₹120',
    description: 'Long-burning cow dung logs. A 100% natural, eco-friendly substitute for wood.',
    image: 'https://images.unsplash.com/photo-1574360773634-192a99d45136?auto=format&fit=crop&q=80&w=800',
    isNew: false,
  },
  {
    id: 3,
    name: 'Panchgavya Diya',
    category: 'Ritual',
    price: '₹300',
    description: 'Pack of 12 handmade diyas that burn completely into ash, leaving no carbon footprint.',
    image: 'https://images.unsplash.com/photo-1542825832-6804569502b7?auto=format&fit=crop&q=80&w=800',
    isNew: true,
  },
  {
    id: 4,
    name: 'Organic Manure Cake',
    category: 'Gardening',
    price: '₹80',
    description: 'Nutrient-rich dried cakes for home gardening and farming. Excellent for soil health.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    isNew: false,
  },
  {
    id: 5,
    name: 'Desi Ghee (500ml)',
    category: 'Wellness',
    price: '₹950',
    description: 'A2 Cultured Ghee made using the traditional Bilona method. Pure and golden.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800',
    isNew: false,
  },
  {
    id: 6,
    name: 'Dhoop Cones (Sandalwood)',
    category: 'Ritual',
    price: '₹150',
    description: 'Charcoal-free cones that spread positive energy and a soothing sandalwood fragrance.',
    image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=800',
    isNew: false,
  },
  {
    id: 7,
    name: 'Sacred Vibhuti',
    category: 'Ritual',
    price: '₹50',
    description: 'Pure sacred ash made from indigenous cow dung, used for tilak and spiritual protection.',
    image: 'https://images.unsplash.com/photo-1598449356475-b9f71db7d847?auto=format&fit=crop&q=80&w=800',
    isNew: false,
  },
  {
    id: 8,
    name: 'Incense Sticks (Rose)',
    category: 'Ritual',
    price: '₹180',
    description: 'Hand-rolled incense sticks made from temple flowers and cow dung.',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800',
    isNew: true,
  }
];

// --- 2. FEATURES DATA ---
export const features = [
  {
    name: '100% Indigenous Cow Dung',
    description: 'Sourced strictly from Desi cows. No chemicals, just pure nature.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    name: 'Vedic Preparation',
    description: 'Crafted following ancient scriptures for maximum spiritual benefit.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: 'Eco-Friendly & Sustainable',
    description: 'Zero waste. Our products return to the earth as natural manure.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// --- 3. TESTIMONIALS DATA ---
export const testimonials = [
  {
    id: 1,
    name: 'Rajesh Gupta',
    role: 'Bangalore',
    text: 'I have never felt such purity in Havan cups before. The aroma instantly calms my mind.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Meera Iyer',
    role: 'Chennai',
    text: 'Knowing that my purchase supports old cows makes me feel good. Excellent quality.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 3,
    name: 'Amit Verma',
    role: 'Delhi',
    text: 'The logs burn for a long time and there is no black smoke. Perfect for my daily rituals.',
    image: 'https://randomuser.me/api/portraits/men/86.jpg',
  },
];