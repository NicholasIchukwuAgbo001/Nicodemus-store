import { Product } from '../types';

export const LUXURY_PRODUCTS: Product[] = [
  // ---------------- CLOTHING ----------------
  {
    id: 'nic-cl-01',
    name: 'Atelier Double-Breasted Cashmere Trench',
    brand: 'NICDEMUS Atelier',
    category: 'clothing',
    subcategory: 'Outerwear',
    price: 680,
    originalPrice: 850,
    discountPercent: 20,
    description: 'Sculpted in pure Italian double-faced cashmere with a relaxed drop-shoulder silhouette, storm flap detailing, and a horn-buckle belt. An undisputed staple of modern luxury tailoring.',
    details: [
      '100% Superfine Grade-A Italian Cashmere',
      'Hand-stitched pick lapels and internal silk pocketing',
      'Detachable belted waist with brushed matte hardware',
      'Water-repellent nanotech micro-coating',
      'Made in Florence, Italy'
    ],
    fabricCare: [
      'Specialist dry clean only',
      'Store on wide cedar hanger',
      'Steam gently from 15cm distance'
    ],
    colors: [
      { name: 'Oatmeal Beige', hex: '#D7CEC2' },
      { name: 'Onyx Black', hex: '#181818' },
      { name: 'Camel Tan', hex: '#B89772' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 14,
    rating: 4.9,
    reviewCount: 38,
    isNew: true,
    isTrending: true,
    isBestSeller: true,
    isSpecialOffer: true,
    thumbnail: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Trench', 'Cashmere', 'Outerwear', 'Winter 2026', 'Luxury Tailoring'],
    sku: 'NIC-2026-OW01',
    reviews: [
      {
        id: 'r1',
        author: 'Eleanor Vance',
        rating: 5,
        date: '2026-08-12',
        title: 'Masterpiece of modern outerwear',
        comment: 'The drape of this cashmere coat is ethereal. Sits effortlessly over suits or casual knitwear.',
        verifiedPurchase: true
      },
      {
        id: 'r2',
        author: 'Julian Thorne',
        rating: 5,
        date: '2026-08-04',
        title: 'Incredible tailoring and hand feel',
        comment: 'The craftsmanship matches Savile Row standards. Worth every penny.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'nic-cl-02',
    name: 'Sartorial Oversized Wool-Blend Blazer',
    brand: 'NICDEMUS Tailoring',
    category: 'clothing',
    subcategory: 'Blazers',
    price: 420,
    originalPrice: 480,
    discountPercent: 12,
    description: 'An architectural silhouette featuring structured shoulder pads, a deep peak lapel, and fluid drape crafted from sustainable virgin wool. Redefines contemporary power dressing.',
    details: [
      '85% Virgin Wool, 15% Mulberry Silk',
      'Cupro breathable lining with inner pen pocket',
      'Horn-effect button cuffs',
      'Dual back vents for fluid movement'
    ],
    fabricCare: ['Dry clean only', 'Do not tumble dry'],
    colors: [
      { name: 'Charcoal Grey', hex: '#2C2E33' },
      { name: 'Vanilla Cream', hex: '#F3EFE6' },
      { name: 'Olive Bronze', hex: '#4B4D3C' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 22,
    rating: 4.8,
    reviewCount: 46,
    isTrending: true,
    isBestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Blazer', 'Wool', 'Sartorial', 'Tailored'],
    sku: 'NIC-2026-BL02',
    reviews: [
      {
        id: 'r3',
        author: 'Claire D.',
        rating: 5,
        date: '2026-07-28',
        title: 'Perfect 2026 boxy silhouette',
        comment: 'Looks phenomenal with the wide leg trousers. The shoulders give that chic 90s editorial vibe.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'nic-cl-03',
    name: 'Luxe Mulberry Silk Bias-Cut Slip Dress',
    brand: 'NICDEMUS Evening',
    category: 'clothing',
    subcategory: 'Dresses',
    price: 340,
    description: 'Cut on the bias from 22-momme heavy mulberry silk for a liquid-like drape that contours naturally to the body. Features ultra-fine adjustable straps and French seam finishes.',
    details: [
      '100% Grade 6A Mulberry Silk',
      'Subtle cowl neckline with low back drape',
      'Ankle grazing maxi length with side slit',
      'Ultra soft against sensitive skin'
    ],
    fabricCare: ['Hand wash cold with silk detergent or dry clean', 'Line dry in shade'],
    colors: [
      { name: 'Champagne Gold', hex: '#E5D3B3' },
      { name: 'Midnight Jet', hex: '#111111' },
      { name: 'Emerald Forest', hex: '#1E382B' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 18,
    rating: 5.0,
    reviewCount: 29,
    isNew: true,
    thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Silk', 'Slip Dress', 'Eveningwear', 'Minimalist'],
    sku: 'NIC-2026-DR03',
    reviews: [
      {
        id: 'r4',
        author: 'Sophia Chen',
        rating: 5,
        date: '2026-08-19',
        title: 'Liquid luxury',
        comment: 'The weight of the silk is substantial, not clingy. It shimmers under ambient lighting.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'nic-cl-04',
    name: 'Minimalist Relaxed Poplin Shirt',
    brand: 'NICDEMUS Studio',
    category: 'clothing',
    subcategory: 'Shirts',
    price: 190,
    description: 'Crisp organic cotton poplin tailored with an elongated hem, mother-of-pearl buttons, and clean hidden placket. Essential everyday luxury.',
    details: [
      '100% GOTS Certified Organic Long-Staple Cotton',
      'Point collar with reinforced interlining',
      'Seamless French placket',
      'Pre-shrunk for consistent fit'
    ],
    fabricCare: ['Machine wash 30°C delicate', 'Warm iron while damp'],
    colors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Sky Stripe', hex: '#D6E4F0' },
      { name: 'Espresso', hex: '#3E2F28' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 35,
    rating: 4.7,
    reviewCount: 52,
    isBestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Shirt', 'Cotton Poplin', 'Basics', 'Minimalist'],
    sku: 'NIC-2026-SH04',
    reviews: []
  },
  {
    id: 'nic-cl-05',
    name: 'Pleated Wide-Leg Palazzo Trousers',
    brand: 'NICDEMUS Atelier',
    category: 'clothing',
    subcategory: 'Trousers',
    price: 260,
    originalPrice: 310,
    discountPercent: 16,
    description: 'High-rise trousers cut with sharp inverted front pleats and a relaxed pooling wide leg. Designed to elongate the silhouette while delivering effortless comfort.',
    details: [
      'Tropical wool and lyocell blend',
      'Hidden hook and eye closure with extended tab',
      'Deep side slant pockets and welt back pockets',
      'Unfinished hem allowance for custom tailoring'
    ],
    fabricCare: ['Dry clean recommended', 'Steam iron'],
    colors: [
      { name: 'Raw Sand', hex: '#DFD8CA' },
      { name: 'Charcoal', hex: '#333333' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 19,
    rating: 4.9,
    reviewCount: 21,
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Trousers', 'Wide Leg', 'Pleated', 'Contemporary'],
    sku: 'NIC-2026-TR05',
    reviews: []
  },

  // ---------------- SHOES ----------------
  {
    id: 'nic-sh-01',
    name: 'Monolith Architectural Calfskin Loafers',
    brand: 'NICDEMUS Footwear',
    category: 'shoes',
    subcategory: 'Loafers',
    price: 380,
    originalPrice: 450,
    discountPercent: 15,
    description: 'Chunky lug-sole loafers sculpted from full-grain vegetable-tanned calfskin leather. Accented with brushed matte silver penny keeper hardware.',
    details: [
      '100% Italian Box Calf Leather',
      'Vibram lightweight lugged rubber tread sole',
      'Memory foam ergonomic leather footbed',
      'Blake stitched construction for durability',
      'Handcrafted in Porto, Portugal'
    ],
    fabricCare: ['Wipe with damp cloth', 'Condition monthly with natural beeswax leather balm'],
    colors: [
      { name: 'Polished Black', hex: '#111111' },
      { name: 'Oxblood Cordovan', hex: '#4A1521' }
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    stock: 16,
    rating: 4.9,
    reviewCount: 34,
    isTrending: true,
    isBestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Loafers', 'Calfskin', 'Chunky Sole', 'Shoes'],
    sku: 'NIC-2026-SH01',
    reviews: [
      {
        id: 'r5',
        author: 'Marcus Sterling',
        rating: 5,
        date: '2026-08-01',
        title: 'Unbelievable comfort and edge',
        comment: 'Zero break-in period required. The leather quality is equivalent to $800 luxury maison pairs.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'nic-sh-02',
    name: 'Aura Minimalist Low-Top Leather Sneaker',
    brand: 'NICDEMUS Footwear',
    category: 'shoes',
    subcategory: 'Sneakers',
    price: 280,
    description: 'Clean Scandinavian-inspired sneakers handcrafted from supple nappa leather with tonal waxed cotton laces and Margom rubber cupsole.',
    details: [
      'Buttery soft Italian nappa leather upper',
      'Calf leather lined interior for all-day breathability',
      'Vulcanized natural rubber sole',
      'Debossed gold foil serial number on heel tab'
    ],
    fabricCare: ['Clean with soft horsehair brush', 'Use protective sneaker spray'],
    colors: [
      { name: 'Chalk White', hex: '#F9F8F5' },
      { name: 'Warm Taupe', hex: '#B5A895' },
      { name: 'Triple Black', hex: '#151515' }
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    stock: 28,
    rating: 4.8,
    reviewCount: 63,
    isBestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Sneakers', 'Nappa', 'Minimalist', 'Footwear'],
    sku: 'NIC-2026-SN02',
    reviews: []
  },
  {
    id: 'nic-sh-03',
    name: 'Sculptural Asymmetric Heel Mules',
    brand: 'NICDEMUS Evening',
    category: 'shoes',
    subcategory: 'Heels',
    price: 360,
    originalPrice: 420,
    discountPercent: 14,
    description: 'Contemporary square-toe mules defined by a 75mm geometric fluted wood heel and ultra-soft padded glove leather upper.',
    details: [
      'Hand-carved sustainable walnut wood heel',
      'Cushioned arch support padding',
      'Smooth leather sole with anti-slip rubber injection'
    ],
    fabricCare: ['Store in provided cotton dust bag'],
    colors: [
      { name: 'Crema Latte', hex: '#EBE3D5' },
      { name: 'Espresso Bean', hex: '#3B2F2F' }
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    stock: 12,
    rating: 4.9,
    reviewCount: 19,
    isNew: true,
    thumbnail: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Heels', 'Mules', 'Sculptural', 'Evening'],
    sku: 'NIC-2026-HL03',
    reviews: []
  },

  // ---------------- BAGS ----------------
  {
    id: 'nic-bg-01',
    name: 'Arcadia Geometric Structured Leather Tote',
    brand: 'NICDEMUS Leathergoods',
    category: 'bags',
    subcategory: 'Totes',
    price: 520,
    originalPrice: 650,
    discountPercent: 20,
    description: 'An architectural everyday tote with origami-inspired folded gussets, magnetic closure, and removable zip pouch. Accommodates up to 16-inch laptops with poise.',
    details: [
      'Semi-aniline grained calfskin leather (scratch resistant)',
      'Suede-bonded interior lining',
      'Custom brushed nickel hardware with laser engraved crest',
      'Includes detachable leather shoulder strap and key lanyard',
      'Dimensions: 38cm W x 30cm H x 14cm D'
    ],
    fabricCare: ['Keep away from prolonged direct sunlight', 'Condition twice yearly'],
    colors: [
      { name: 'Cognac Saddle', hex: '#9C5B28' },
      { name: 'Obsidian Black', hex: '#111111' },
      { name: 'Stone Grey', hex: '#9E9D99' }
    ],
    sizes: ['One Size (Large)'],
    stock: 15,
    rating: 5.0,
    reviewCount: 42,
    isNew: true,
    isTrending: true,
    isBestSeller: true,
    isSpecialOffer: true,
    thumbnail: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Tote', 'Leather Bag', 'Architectural', 'Workwear'],
    sku: 'NIC-2026-BG01',
    reviews: [
      {
        id: 'r6',
        author: 'Valerie Ross',
        rating: 5,
        date: '2026-08-15',
        title: 'The ultimate luxury work bag',
        comment: 'Structure is rigid enough to stand upright on tables, leather smells intoxicatingly authentic.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'nic-bg-02',
    name: 'Sylvan Flap Crossbody Bag',
    brand: 'NICDEMUS Leathergoods',
    category: 'bags',
    subcategory: 'Crossbody',
    price: 390,
    description: 'Curved silhouette crossbody bag with magnetic horn clasp and an adjustable wide guitar strap. Perfect for seamless day-to-night transitions.',
    details: [
      'Smooth box calfskin with contrast lacquered edge painting',
      'Divided dual compartments and interior card slots',
      'Concealed back slip pocket for fast smartphone access'
    ],
    fabricCare: ['Store in dust bag with silica gel'],
    colors: [
      { name: 'Dark Burgundy', hex: '#42141F' },
      { name: 'Olive Drab', hex: '#484B35' },
      { name: 'Noir', hex: '#141414' }
    ],
    sizes: ['One Size (Medium)'],
    stock: 20,
    rating: 4.8,
    reviewCount: 31,
    thumbnail: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Crossbody', 'Flap Bag', 'Accessories'],
    sku: 'NIC-2026-BG02',
    reviews: []
  },
  {
    id: 'nic-bg-03',
    name: 'Grand Voyageur Suede Duffle Bag',
    brand: 'NICDEMUS Travel',
    category: 'bags',
    subcategory: 'Travel',
    price: 640,
    originalPrice: 720,
    discountPercent: 11,
    description: 'Substantial 48-hour weekender crafted from water-treated velvety Italian calf suede with vegetable-tanned bridle leather trim and brass padlock.',
    details: [
      'Heavyweight water-resistant calf suede',
      'TSA-approved brass padlock & key clochette',
      'Waterproof nylon base compartment for shoes',
      'Capacity: 45 Liters'
    ],
    fabricCare: ['Brush regularly with suede brass wire brush'],
    colors: [
      { name: 'Tobacco Brown', hex: '#70482B' },
      { name: 'Graphite', hex: '#2E2F30' }
    ],
    sizes: ['45L Weekender'],
    stock: 9,
    rating: 5.0,
    reviewCount: 18,
    isSpecialOffer: true,
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Travel', 'Duffle', 'Suede', 'Luggage'],
    sku: 'NIC-2026-BG03',
    reviews: []
  },

  // ---------------- ACCESSORIES ----------------
  {
    id: 'nic-ac-01',
    name: 'Helios Beveled Acetate Sunglasses',
    brand: 'NICDEMUS Eyewear',
    category: 'accessories',
    subcategory: 'Eyewear',
    price: 240,
    originalPrice: 290,
    discountPercent: 17,
    description: 'Chunky 8mm Mazzucchelli Japanese acetate frame with hand-beveled edges, 24k gold core wire temples, and Zeiss polarized UV400 lenses.',
    details: [
      'Mazzucchelli 1849 bio-acetate',
      'Category 3 Zeiss optics with anti-reflective back coating',
      'Seven-barrel German engineered hinges',
      'Includes hard magnetic leather case and microfiber cloth'
    ],
    fabricCare: ['Rinse with lukewarm water', 'Clean only with microfiber cloth'],
    colors: [
      { name: 'Havana Tortoise', hex: '#523B22' },
      { name: 'Piano Black', hex: '#0D0D0D' },
      { name: 'Champagne Crystal', hex: '#EBE5D3' }
    ],
    sizes: ['50-22-145 (Universal Fit)'],
    stock: 30,
    rating: 4.9,
    reviewCount: 57,
    isNew: true,
    isTrending: true,
    isBestSeller: true,
    thumbnail: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Sunglasses', 'Eyewear', 'Zeiss', 'Acetate'],
    sku: 'NIC-2026-AC01',
    reviews: [
      {
        id: 'r7',
        author: 'Julian D.',
        rating: 5,
        date: '2026-08-20',
        title: 'Optical clarity is unmatched',
        comment: 'Weight distribution on the nose bridge is super comfortable. The lens tint enhances sunsets wonderfully.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'nic-ac-02',
    name: 'Aethelgard Chronograph Titanium Watch',
    brand: 'NICDEMUS Horology',
    category: 'accessories',
    subcategory: 'Watches',
    price: 750,
    originalPrice: 890,
    discountPercent: 15,
    description: 'Precision automatic chronograph encased in aerospace-grade Grade-5 brushed titanium with sapphire crystal case back and integrated FKM rubber strap.',
    details: [
      'Swiss-made Sellita SW500 automatic movement',
      '48-hour power reserve with 100m water resistance',
      'Double domed sapphire crystal with anti-glare',
      'Super-LumiNova BGW9 luminous markers'
    ],
    fabricCare: ['Rinse in fresh water after saltwater exposure'],
    colors: [
      { name: 'Titanium Grey', hex: '#8C929D' },
      { name: 'Midnight Blue Dial', hex: '#1C2938' }
    ],
    sizes: ['40mm Case (Lug-to-Lug 46mm)'],
    stock: 8,
    rating: 5.0,
    reviewCount: 24,
    isTrending: true,
    isSpecialOffer: true,
    thumbnail: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Watch', 'Horology', 'Titanium', 'Chronograph'],
    sku: 'NIC-2026-WT02',
    reviews: []
  },
  {
    id: 'nic-ac-03',
    name: 'Pure Mongolian Cashmere Ribbed Scarf',
    brand: 'NICDEMUS Atelier',
    category: 'accessories',
    subcategory: 'Scarves',
    price: 180,
    description: 'Woven from 100% sustainably sourced Inner Mongolian cashmere, measuring an expansive 200cm x 50cm for versatile wrapping.',
    details: [
      '4-ply 12-gauge ultra-plush knit',
      'Fringeless modern minimalist selvedge edge',
      'Subtle tonal embroidered monogram'
    ],
    fabricCare: ['Hand wash cold or dry clean'],
    colors: [
      { name: 'Heather Grey', hex: '#A3A3A3' },
      { name: 'Camel', hex: '#BE9B7B' },
      { name: 'Forest Green', hex: '#2D3E35' }
    ],
    sizes: ['200cm x 50cm'],
    stock: 25,
    rating: 4.8,
    reviewCount: 39,
    thumbnail: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Scarf', 'Cashmere', 'Winter', 'Accessories'],
    sku: 'NIC-2026-AC03',
    reviews: []
  },

  // ---------------- LIFESTYLE ----------------
  {
    id: 'nic-lf-01',
    name: 'Santal & Smoked Amber Artisanal Candle (380g)',
    brand: 'NICDEMUS Maison',
    category: 'lifestyle',
    subcategory: 'Home Fragrance',
    price: 85,
    originalPrice: 100,
    discountPercent: 15,
    description: 'Hand-poured coconut-soy wax candle housed in a heavy fluted matte ceramic vessel with a crackling wooden wick. Notes of cedarwood, rich sandalwood, dark amber, and cardamom.',
    details: [
      '80-hour clean burn time',
      'Natural fragrance oils formulated in Grasse, France',
      'Reusable matte terracotta ceramic vessel',
      'Lead-free organic cotton & cedar wood wick'
    ],
    fabricCare: ['Trim wick to 5mm before each lighting', 'Allow full melt pool on initial burn'],
    colors: [
      { name: 'Terracotta Vessel', hex: '#B86B53' },
      { name: 'Onyx Vessel', hex: '#222222' }
    ],
    sizes: ['380g / 13.4 oz'],
    stock: 40,
    rating: 4.9,
    reviewCount: 78,
    isBestSeller: true,
    isSpecialOffer: true,
    thumbnail: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Candle', 'Fragrance', 'Ceramic', 'Home', 'Lifestyle'],
    sku: 'NIC-2026-LF01',
    reviews: [
      {
        id: 'r8',
        author: 'Amelia Gray',
        rating: 5,
        date: '2026-08-22',
        title: 'Transforms the room ambiance instantly',
        comment: 'The scent throw is majestic without being overpowering. The ceramic jar looks like a museum sculpture on my coffee table.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'nic-lf-02',
    name: 'Arabescato Marble Sculpted Catchall Tray',
    brand: 'NICDEMUS Living',
    category: 'lifestyle',
    subcategory: 'Home Decor',
    price: 160,
    description: 'Carved from a single block of solid Italian Arabescato marble with natural grey veining, hand-honed to a silky matte finish.',
    details: [
      'Solid natural marble (each piece is unique in veining)',
      'Felt-padded underside prevents surface scratches',
      'Dimensions: 28cm L x 16cm W x 3cm H'
    ],
    fabricCare: ['Wipe clean with soft microfiber', 'Avoid acidic cleaners'],
    colors: [
      { name: 'Arabescato White Marble', hex: '#EAE6DF' },
      { name: 'Nero Marquina Black', hex: '#262626' }
    ],
    sizes: ['Standard (28x16cm)'],
    stock: 17,
    rating: 4.8,
    reviewCount: 33,
    thumbnail: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Marble', 'Catchall', 'Decor', 'Lifestyle'],
    sku: 'NIC-2026-LF02',
    reviews: []
  },
  {
    id: 'nic-lf-03',
    name: 'Washed French Linen Throw Blanket',
    brand: 'NICDEMUS Maison',
    category: 'lifestyle',
    subcategory: 'Textiles',
    price: 210,
    originalPrice: 250,
    discountPercent: 16,
    description: 'Pre-washed pure Normandy flax linen with micro-fringed borders. Breathable in summer and cozy in winter.',
    details: [
      '100% French Normandy Flax Linen',
      'OEKO-TEX Standard 100 Certified non-toxic',
      'Dimensions: 140cm x 220cm'
    ],
    fabricCare: ['Machine wash gentle cycle', 'Tumble dry low for natural relaxed wrinkles'],
    colors: [
      { name: 'Oatmeal', hex: '#DDD2C3' },
      { name: 'Sage Leaf', hex: '#9DA893' },
      { name: 'Warm Charcoal', hex: '#3B3A36' }
    ],
    sizes: ['140cm x 220cm'],
    stock: 23,
    rating: 4.9,
    reviewCount: 41,
    isSpecialOffer: true,
    thumbnail: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Linen', 'Throw', 'Home Textiles', 'Living'],
    sku: 'NIC-2026-LF03',
    reviews: []
  }
];

export const CATEGORIES_META = [
  {
    id: 'clothing',
    name: 'Clothing',
    tagline: 'Sculpted Silhouettes & Tailored Outerwear',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    itemCount: 48
  },
  {
    id: 'shoes',
    name: 'Footwear & Shoes',
    tagline: 'Architectural Heels & Monolith Leather Loafers',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
    itemCount: 26
  },
  {
    id: 'bags',
    name: 'Handcrafted Bags',
    tagline: 'Minimalist Totes & Grained Box Crossbodies',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    itemCount: 19
  },
  {
    id: 'accessories',
    name: 'Accessories & Eyewear',
    tagline: 'Titanium Timepieces & Hand-Beveled Optics',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    itemCount: 34
  },
  {
    id: 'lifestyle',
    name: 'Maison & Lifestyle',
    tagline: 'Artisanal Scents, Marble Vessels & Linens',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    itemCount: 22
  }
];

export const LOOKBOOK_GALLERY = [
  {
    id: 'lk-1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    title: 'Spring / Summer 2026 Editorial',
    subtitle: 'Florence Minimalist Movement',
    taggedProducts: ['nic-cl-01', 'nic-bg-01'],
    likes: 1420
  },
  {
    id: 'lk-2',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    title: 'Architectural Fluidity in Motion',
    subtitle: 'Palazzo Trousers & Tailored Blazer',
    taggedProducts: ['nic-cl-02', 'nic-cl-05'],
    likes: 980
  },
  {
    id: 'lk-3',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80',
    title: 'Monochrome Urbanity',
    subtitle: 'Cashmere outerwear & Loafers',
    taggedProducts: ['nic-cl-01', 'nic-sh-01', 'nic-ac-01'],
    likes: 2150
  },
  {
    id: 'lk-4',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
    title: 'Evening Radiance',
    subtitle: 'Mulberry Silk Slip & Sculptural Mules',
    taggedProducts: ['nic-cl-03', 'nic-sh-03'],
    likes: 1870
  }
];
