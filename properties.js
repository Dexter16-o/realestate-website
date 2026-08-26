const properties = [
  {
    // =========================
    // UNIQUE PROPERTY ID
    // =========================
    id: "BP-001",

    // =========================
    // BASIC INFORMATION
    // =========================
    title: "Luxury 3 BHK Apartment",
    purpose: "buy", // buy or rent
    category: "residential",
    type: "apartment",
    status: "available",

    // =========================
    // PRICING
    // =========================
    price: 8500000,
    priceDisplay: "₹85 Lakh",

    // =========================
    // LOCATION
    // =========================
    city: "Ahmedabad",
    areaName: "Prime Location",
    address: "Ahmedabad, Gujarat",

    // =========================
    // PROPERTY SPECIFICATIONS
    // =========================
    bhk: "3 BHK",
    area: "1850 sq. ft.",
    bedrooms: 3,
    bathrooms: 3,

    // =========================
    // IMAGES
    // =========================
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",

    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
    ],

    // =========================
    // AMENITIES
    // =========================
    amenities: [
      "Parking",
      "24/7 Security",
      "Lift",
      "Power Backup"
    ],

    // =========================
    // DESCRIPTION
    // =========================
    description:
      "A spacious and modern 3 BHK apartment in a prime location with excellent connectivity and essential amenities.",

    // =========================
    // WEBSITE SETTINGS
    // =========================
    featured: true,
    createdAt: "2026-08-26"
  },

  {
  id: "BP-002",

  title: "Modern 2 BHK Apartment",
  purpose: "rent",
  category: "residential",
  type: "apartment",
  status: "available",

  price: 28000,
  priceDisplay: "₹28,000 / month",

  city: "Ahmedabad",
  areaName: "Bodakdev",
  address: "Bodakdev, Ahmedabad, Gujarat",

  bhk: "2 BHK",
  area: "1250 sq. ft.",
  bedrooms: 2,
  bathrooms: 2,

  coverImage:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",

  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85"
  ],

  amenities: [
    "Parking",
    "Lift",
    "Security",
    "Gym"
  ],

  description:
    "A modern and well-maintained 2 BHK apartment available for rent in Bodakdev.",

  featured: true,
  createdAt: "2026-08-26"
},

{
  id: "BP-003",

  title: "Premium 4 BHK Villa",
  purpose: "buy",
  category: "residential",
  type: "villa",
  status: "available",

  price: 22000000,
  priceDisplay: "₹2.2 Crore",

  city: "Ahmedabad",
  areaName: "South Bopal",
  address: "South Bopal, Ahmedabad, Gujarat",

  bhk: "4 BHK",
  area: "3200 sq. ft.",
  bedrooms: 4,
  bathrooms: 4,

  coverImage:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",

  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
  ],

  amenities: [
    "Private Garden",
    "Parking",
    "Security",
    "Terrace"
  ],

  description:
    "A premium spacious villa with modern architecture and excellent connectivity.",

  featured: true,
  createdAt: "2026-08-26"
},

{
  id: "BP-004",

  title: "Residential Plot for Sale",
  purpose: "buy",
  category: "land",
  type: "plot",
  status: "available",

  price: 6500000,
  priceDisplay: "₹65 Lakh",

  city: "Ahmedabad",
  areaName: "Shela",
  address: "Shela, Ahmedabad, Gujarat",

  bhk: null,
  area: "2200 sq. ft.",
  bedrooms: null,
  bathrooms: null,

  coverImage:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",

  images: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"
  ],

  amenities: [
    "Road Access",
    "Water Connection",
    "Near Main Road"
  ],

  description:
    "A well-located residential plot suitable for building your dream home.",

  featured: false,
  createdAt: "2026-08-26"
},

{
  id: "BP-005",

  title: "Commercial Office Space",
  purpose: "rent",
  category: "commercial",
  type: "office",
  status: "available",

  price: 55000,
  priceDisplay: "₹55,000 / month",

  city: "Ahmedabad",
  areaName: "SG Highway",
  address: "SG Highway, Ahmedabad, Gujarat",

  bhk: null,
  area: "1500 sq. ft.",
  bedrooms: null,
  bathrooms: 2,

  coverImage:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",

  images: [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
  ],

  amenities: [
    "Parking",
    "Reception",
    "24/7 Security",
    "High-Speed Internet"
  ],

  description:
    "A professional commercial office space in a prime business location.",

  featured: false,
  createdAt: "2026-08-26"
},

{
  id: "BP-006",

  title: "Independent 3 BHK House",
  purpose: "buy",
  category: "residential",
  type: "house",
  status: "available",

  price: 12000000,
  priceDisplay: "₹1.2 Crore",

  city: "Ahmedabad",
  areaName: "Thaltej",
  address: "Thaltej, Ahmedabad, Gujarat",

  bhk: "3 BHK",
  area: "2100 sq. ft.",
  bedrooms: 3,
  bathrooms: 3,

  coverImage:
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",

  images: [
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85"
  ],

  amenities: [
    "Private Parking",
    "Balcony",
    "Garden",
    "Water Supply"
  ],

  description:
    "An independent family house in a premium residential area of Ahmedabad.",

  featured: true,
  createdAt: "2026-08-26"
}

];