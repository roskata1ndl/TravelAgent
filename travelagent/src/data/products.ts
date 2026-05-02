export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  shortDescription: string;
  images: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  tags: string[];
  specs?: Record<string, string>;
  highlights?: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Carry-On Pro',
    slug: 'carry-on-pro',
    price: 395,
    category: 'Luggage',
    description: 'The carry-on built for modern travelers. Crafted from durable polycarbonate with a reinforced aluminum frame, featuring 360° spinner wheels and an expandable main compartment. Perfect for short trips without compromising on style.',
    shortDescription: 'Premium polycarbonate carry-on with aluminum frame',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Carry-On+Pro', 'https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Side+View', 'https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Open+View'],
    colors: [
      { name: 'Midnight Black', hex: '#1a1a2e' },
      { name: 'Slate Gray', hex: '#4a5568' },
      { name: 'Navy Blue', hex: '#1e3a5f' }
    ],
    sizes: ['Carry-On', 'Checked-Medium', 'Checked-Large'],
    rating: 4.8,
    reviewCount: 2847,
    inStock: true,
    featured: true,
    bestSeller: true,
    tags: ['luggage', 'carry-on', 'travel', 'premium'],
    specs: {
      'Dimensions': '22" x 14" x 9"',
      'Weight': '7.8 lbs',
      'Material': 'Polycarbonate/Aluminum',
      'Warranty': 'Lifetime'
    },
    highlights: ['360° spinner wheels', 'TSA-approved lock', 'Expandable compartment', 'Garment sleeve']
  },
  {
    id: '2',
    name: 'Weekender Backpack',
    slug: 'weekender-backpack',
    price: 245,
    category: 'Backpacks',
    description: 'A thoughtfully designed backpack for weekend getaways and daily commutes. Features a separate laptop compartment, waterproof construction, and ergonomic shoulder straps for all-day comfort.',
    shortDescription: 'Waterproof backpack with laptop compartment',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Weekender+Backpack', 'https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Back+View', 'https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Interior'],
    colors: [
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Olive Green', hex: '#556b2f' },
      { name: 'Navy', hex: '#1e3a5f' }
    ],
    rating: 4.7,
    reviewCount: 1893,
    inStock: true,
    featured: true,
    tags: ['backpack', 'laptop', 'waterproof', 'travel'],
    specs: {
      'Capacity': '30L',
      'Dimensions': '20" x 13" x 8"',
      'Weight': '2.4 lbs',
      'Material': 'Ballistic Nylon'
    },
    highlights: ['Separate laptop sleeve', 'Waterproof YKK zippers', 'Ergonomic straps', 'Luggage strap']
  },
  {
    id: '3',
    name: 'Packing Cubes Set',
    slug: 'packing-cubes-set',
    price: 89,
    category: 'Organizers',
    description: 'Transform the way you pack with our premium packing cube system. Set includes 4 different-sized cubes in coordinating colors, featuring dual-zipper access and breathable mesh panels.',
    shortDescription: '4-piece premium packing organization system',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Packing+Cubes', 'https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Cubes+Set'],
    colors: [
      { name: 'Classic Set', hex: '#4a5568' },
      { name: 'Pastel Set', hex: '#a8d5e5' }
    ],
    rating: 4.6,
    reviewCount: 3241,
    inStock: true,
    featured: true,
    bestSeller: true,
    tags: ['organizers', 'packing', 'travel-accessories'],
    specs: {
      'Set Includes': '4 cubes (small, medium, large, x-large)',
      'Material': 'Recycled ripstop nylon',
      'Weight': '0.9 lbs total'
    },
    highlights: ['Dual-zipper design', 'Mesh visibility panels', 'Compression zipper', 'Machine washable']
  },
  {
    id: '4',
    name: 'Travel Toiletry Kit',
    slug: 'travel-toiletry-kit',
    price: 65,
    category: 'Travel Essentials',
    description: 'A compact, hangable toiletry bag with multiple compartments for organized packing. Water-resistant interior makes cleanup a breeze after messy flights.',
    shortDescription: 'Compact hanging toiletry organizer',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Toiletry+Kit'],
    colors: [
      { name: 'Black', hex: '#1a1a2e' },
      { name: 'Gray', hex: '#6b7280' }
    ],
    rating: 4.5,
    reviewCount: 1204,
    inStock: true,
    tags: ['toiletry', 'organizer', 'travel-accessories'],
    specs: {
      'Dimensions': '12" x 8" x 4"',
      'Material': 'Water-resistant nylon',
      'Weight': '0.6 lbs'
    },
    highlights: ['Hangable hook', 'TSA-compliant', 'Hanging loops', 'Water-resistant interior']
  },
  {
    id: '5',
    name: 'Universal Travel Adapter',
    slug: 'universal-travel-adapter',
    price: 75,
    category: 'Tech Accessories',
    description: 'Charge all your devices anywhere in the world with this all-in-one travel adapter. Features 4 USB ports, USB-C fast charging, and surge protection.',
    shortDescription: 'All-in-one international adapter with fast charging',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Travel+Adapter'],
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#1a1a2e' }
    ],
    rating: 4.4,
    reviewCount: 892,
    inStock: true,
    tags: ['adapter', 'charging', 'tech-accessories'],
    specs: {
      'Compatibility': '150+ countries',
      'Ports': '2 USB-A, 2 USB-C',
      'Max Output': '35W',
      'Safety': 'Surge protection'
    },
    highlights: ['Works in 150+ countries', '35W fast charging', 'Surge protection', 'Compact design']
  },
  {
    id: '6',
    name: 'Travel Neck Pillow',
    slug: 'travel-neck-pillow',
    price: 55,
    originalPrice: 75,
    category: 'Travel Essentials',
    description: 'Ergonomic memory foam neck pillow with adjustable support. Comes with removable, machine-washable cover and compact travel pouch.',
    shortDescription: 'Memory foam neck pillow with travel pouch',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Neck+Pillow'],
    colors: [
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Navy', hex: '#1e3a5f' }
    ],
    rating: 4.3,
    reviewCount: 2156,
    inStock: true,
    bestSeller: true,
    tags: ['pillow', 'comfort', 'travel-accessories', 'sleep'],
    specs: {
      'Material': 'Memory foam',
      'Cover': 'Removable, washable',
      'Weight': '0.7 lbs'
    },
    highlights: ['Memory foam core', 'Adjustable clasp', 'Removable cover', 'Travel pouch included']
  },
  {
    id: '7',
    name: 'Front-Loader Duffel',
    slug: 'front-loader-duffel',
    price: 195,
    category: 'Luggage',
    description: 'A versatile duffel that converts from carry-on to checked bag. Full-zip opening for easy packing, with padded shoulder strap and multiple carrying options.',
    shortDescription: 'Convertible duffel with full-zip opening',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Duffel+Bag'],
    colors: [
      { name: 'Black', hex: '#1a1a2e' },
      { name: 'Tan', hex: '#d2b48c' }
    ],
    sizes: ['40L', '60L', '80L'],
    rating: 4.6,
    reviewCount: 743,
    inStock: true,
    tags: ['duffel', 'luggage', 'travel'],
    specs: {
      'Capacity': '40L / 60L / 80L',
      'Weight': '2.1 lbs',
      'Material': 'Ballistic nylon'
    },
    highlights: ['Full-zip opening', 'Padded shoulder strap', 'Multiple carry options', 'Shoe compartment']
  },
  {
    id: '8',
    name: 'Noise-Canceling Earbuds',
    slug: 'noise-canceling-earbuds',
    price: 149,
    category: 'Tech Accessories',
    description: 'Premium wireless earbuds with active noise cancellation, designed for travelers. Long battery life, compact charging case, and crystal-clear calls.',
    shortDescription: 'Wireless ANC earbuds for travelers',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Earbuds'],
    colors: [
      { name: 'Black', hex: '#1a1a2e' },
      { name: 'White', hex: '#ffffff' }
    ],
    rating: 4.5,
    reviewCount: 1567,
    inStock: true,
    tags: ['earbuds', 'audio', 'tech-accessories', 'anc'],
    specs: {
      'Battery': '8h + 24h case',
      'Noise Cancellation': 'Active (ANC)',
      'Water Resistance': 'IPX4',
      'Bluetooth': '5.3'
    },
    highlights: ['Active noise cancellation', '32hr total battery', 'Transparency mode', 'IPX4 water resistant']
  },
  {
    id: '9',
    name: ' RFID Blocking Passport Holder',
    slug: 'rfid-passport-holder',
    price: 45,
    category: 'Organizers',
    description: 'Sleek passport holder with RFID blocking technology. Multiple card slots, travel document pocket, and premium leather construction.',
    shortDescription: 'RFID-protected passport and card holder',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Passport+Holder'],
    colors: [
      { name: 'Black', hex: '#1a1a2e' },
      { name: 'Brown', hex: '#8b4513' }
    ],
    rating: 4.4,
    reviewCount: 892,
    inStock: true,
    tags: ['passport', 'rfid', 'organizer', 'security'],
    specs: {
      'Material': 'Full-grain leather',
      'RFID Blocking': 'Yes',
      'Slots': '6 card + passport + document'
    },
    highlights: ['RFID blocking', 'Premium leather', 'Travel card slots', 'Document pocket']
  },
  {
    id: '10',
    name: 'Compact Travel Wallet',
    slug: 'compact-travel-wallet',
    price: 35,
    category: 'Organizers',
    description: 'A slim, organized travel wallet that keeps all your essentials in one place. Features RFID protection, coin pocket, and passport-sized design.',
    shortDescription: 'Slim travel wallet with RFID protection',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Travel+Wallet'],
    colors: [
      { name: 'Black', hex: '#1a1a2e' },
      { name: 'Navy', hex: '#1e3a5f' }
    ],
    rating: 4.3,
    reviewCount: 567,
    inStock: true,
    tags: ['wallet', 'rfid', 'organizer'],
    specs: {
      'Material': 'Faux leather',
      'RFID Blocking': 'Yes',
      'Dimensions': '5.5" x 4"'
    },
    highlights: ['RFID blocking', 'Coin pocket', 'Travel card slots', 'Slim profile']
  },
  {
    id: '11',
    name: 'Luggage Scale',
    slug: 'luggage-scale',
    price: 29,
    category: 'Travel Essentials',
    description: 'Never overpack or face airline fees again. This digital luggage scale features an easy-grip handle and large, clear display.',
    shortDescription: 'Digital luggage scale with large display',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Luggage+Scale'],
    colors: [
      { name: 'Silver', hex: '#c0c0c0' },
      { name: 'Black', hex: '#1a1a2e' }
    ],
    rating: 4.2,
    reviewCount: 1243,
    inStock: true,
    tags: ['luggage-scale', 'travel-accessories', 'essential'],
    specs: {
      'Capacity': '110 lbs / 50 kg',
      'Display': 'Digital LCD',
      'Units': 'lb / kg / oz / g'
    },
    highlights: ['110 lb capacity', 'Tare function', 'Auto-off', 'Built-in tape measure']
  },
  {
    id: '12',
    name: 'Collapsible Water Bottle',
    slug: 'collapsible-water-bottle',
    price: 38,
    category: 'Travel Essentials',
    description: 'Stay hydrated without the bulk. This silicone water bottle collapses flat for easy packing and is BPA-free with a leak-proof lid.',
    shortDescription: 'BPA-free collapsible water bottle',
    images: ['https://placehold.co/1200x1200/e8ecf0/1a1a2e?text=Water+Bottle'],
    colors: [
      { name: 'Blue', hex: '#4a90d9' },
      { name: 'Green', hex: '#6b8e23' },
      { name: 'Gray', hex: '#6b7280' }
    ],
    rating: 4.1,
    reviewCount: 743,
    inStock: true,
    tags: ['water-bottle', 'eco-friendly', 'travel-accessories'],
    specs: {
      'Capacity': '750ml',
      'Material': 'Food-grade silicone',
      'BPA Free': 'Yes',
      'Collapsed Height': '3"'
    },
    highlights: ['Collapses flat', 'BPA-free silicone', 'Leak-proof lid', 'Dishwasher safe']
  }
];

export const categories = [
  { name: 'All', slug: 'all', count: products.length },
  { name: 'Luggage', slug: 'luggage', count: products.filter(p => p.category === 'Luggage').length },
  { name: 'Backpacks', slug: 'backpacks', count: products.filter(p => p.category === 'Backpacks').length },
  { name: 'Organizers', slug: 'organizers', count: products.filter(p => p.category === 'Organizers').length },
  { name: 'Tech Accessories', slug: 'tech-accessories', count: products.filter(p => p.category === 'Tech Accessories').length },
  { name: 'Travel Essentials', slug: 'travel-essentials', count: products.filter(p => p.category === 'Travel Essentials').length }
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Frequent Flyer',
    avatar: 'https://placehold.co/100x100/e8ecf0/1a1a2e?text=SC',
    rating: 5,
    text: 'The quality is unreal. I have used my Weekender Backpack for over 50 flights and it still looks brand new. Worth every penny.'
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    role: 'Travel Photographer',
    avatar: 'https://placehold.co/100x100/e8ecf0/1a1a2e?text=MT',
    rating: 5,
    text: 'Finally, a travel brand that understands what modern travelers need. The carry-on is perfection.'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Digital Nomad',
    avatar: 'https://placehold.co/100x100/e8ecf0/1a1a2e?text=ER',
    rating: 5,
    text: 'The packing cubes changed my life. No more digging through suitcases. Everything has its place.'
  },
  {
    id: '4',
    name: 'James Wu',
    role: 'Business Traveler',
    avatar: 'https://placehold.co/100x100/e8ecf0/1a1a2e?text=JW',
    rating: 5,
    text: 'Three years with Travel Agent gear. The durability and thoughtful design make these worth the investment.'
  }
];

export const faqData = [
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy on all unused items. If you are not completely satisfied, simply contact us for a full refund or exchange.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes! We ship to over 100 countries worldwide. Shipping rates and delivery times vary by location. Free standard shipping on orders over $150.'
  },
  {
    question: 'Are your products covered by warranty?',
    answer: 'All Travel Agent products come with a minimum 2-year warranty. Luggage items include a lifetime warranty. Register your product for extended coverage.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard domestic orders arrive within 5-7 business days. Express shipping (2-3 days) is available at checkout. International orders typically take 7-14 days.'
  },
  {
    question: 'Can I track my order?',
    answer: 'Absolutely. Once your order ships, you will receive an email with tracking information. You can also log in to your account to view order status.'
  }
];

export const brandStory = {
  mission: 'We believe travel should feel effortless. Our products are designed to help you move through the world with intention, organization, and style.',
  values: [
    { title: 'Intentional Design', description: 'Every detail serves a purpose. No gimmicks, no waste.' },
    { title: 'Built to Last', description: 'Premium materials and construction for years of reliable travel.' },
    { title: 'Considered Simplicity', description: 'Less clutter, more clarity. The right number of features, never more.' },
    { title: 'Responsible Travel', description: 'Sustainable materials and ethical manufacturing are non-negotiable.' }
  ],
  timeline: [
    { year: '2019', event: 'Founded in Brooklyn with a mission to reform travel gear' },
    { year: '2020', event: 'First product line launched: carry-ons and packing cubes' },
    { year: '2022', event: 'Expanded to 50+ countries with international shipping' },
    { year: '2024', event: 'Launched first carbon-neutral product line' },
    { year: '2026', event: 'One million customers served worldwide' }
  ]
};
