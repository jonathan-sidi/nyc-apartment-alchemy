
import { Apartment } from "@/types/apartment";

export const mockApartments: Apartment[] = [
  {
    id: "apt-1",
    title: "Luxurious 2BR with Manhattan Skyline Views",
    description: "Stunning 2 bedroom apartment with floor-to-ceiling windows offering breathtaking views of the Manhattan skyline. This recently renovated unit features granite countertops, stainless steel appliances, hardwood floors throughout, and a spacious open layout. The building offers a 24-hour doorman, fitness center, and rooftop deck with panoramic views. Located just steps from multiple subway lines and trendy restaurants.",
    price: 4200,
    location: {
      address: "123 Kent Ave",
      borough: "Brooklyn",
      neighborhood: "Williamsburg"
    },
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 950,
    amenities: [
      "Doorman",
      "Elevator",
      "Gym",
      "Roof Deck",
      "Dishwasher",
      "Laundry in Building",
      "Pet Friendly"
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1560",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1560",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=1560"
    ],
    floorPlan: "https://example.com/floorplan1.jpg",
    video: "https://example.com/apartment-tour.mp4",
    availableDate: "2024-05-01",
    dateAdded: "2024-04-05",
    semanticScore: 0.92
  },
  {
    id: "apt-2",
    title: "Charming West Village 1BR with Exposed Brick",
    description: "Quintessential West Village charm in this beautiful 1 bedroom apartment featuring exposed brick walls, a decorative fireplace, and hardwood floors. The kitchen has been updated with modern appliances while preserving the pre-war character. Located on a quiet, tree-lined street just steps from Washington Square Park, trendy boutiques, and acclaimed restaurants.",
    price: 3800,
    location: {
      address: "45 Bedford St",
      borough: "Manhattan",
      neighborhood: "West Village"
    },
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 650,
    amenities: [
      "Laundry in Building",
      "Pet Friendly",
      "Pre-war",
      "Exposed Brick"
    ],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1560",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1560",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1560"
    ],
    availableDate: "2024-04-15",
    dateAdded: "2024-03-20",
    semanticScore: 0.89
  },
  {
    id: "apt-3",
    title: "Modern Loft-style Studio in Long Island City",
    description: "Bright and airy loft-style studio with soaring 12-foot ceilings and oversized windows in a boutique luxury building. This modern unit features an open kitchen with breakfast bar, in-unit washer/dryer, and a thoughtfully designed floor plan that maximizes space. Building amenities include a fitness center, bike storage, and communal rooftop with BBQ area. Just one stop from Midtown Manhattan.",
    price: 2800,
    location: {
      address: "27-28 Thomson Ave",
      borough: "Queens",
      neighborhood: "Long Island City"
    },
    bedrooms: "studio",
    bathrooms: 1,
    squareFeet: 550,
    amenities: [
      "Doorman",
      "Elevator",
      "Gym",
      "Roof Deck",
      "Dishwasher",
      "Washer/Dryer in Unit"
    ],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1560",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1560",
      "https://images.unsplash.com/photo-1539922631499-09155cc609a4?q=80&w=1560"
    ],
    availableDate: "2024-04-10",
    dateAdded: "2024-03-25",
    semanticScore: 0.87
  },
  {
    id: "apt-4",
    title: "Spacious 3BR with Private Backyard in Park Slope",
    description: "Rare find in prime Park Slope! This spacious 3 bedroom, 2 bathroom apartment occupies the ground floor and basement of a classic brownstone, featuring a large private backyard perfect for entertaining. Original details include crown moldings, hardwood floors, and a decorative fireplace. Modern kitchen with granite counters and stainless steel appliances. Steps from Prospect Park and 7th Avenue shopping.",
    price: 4800,
    location: {
      address: "415 5th Street",
      borough: "Brooklyn",
      neighborhood: "Park Slope"
    },
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1200,
    amenities: [
      "Private Outdoor Space",
      "Dishwasher",
      "Washer/Dryer in Unit",
      "Pet Friendly",
      "Storage"
    ],
    images: [
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=1560",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1560",
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1560"
    ],
    availableDate: "2024-05-15",
    dateAdded: "2024-04-02",
    semanticScore: 0.94
  },
  {
    id: "apt-5",
    title: "Luxury 1BR with Balcony in Midtown East",
    description: "High-floor luxury one bedroom apartment in a full-service building with stunning city views. This corner unit features a private balcony, floor-to-ceiling windows, and high-end finishes throughout. The gourmet kitchen includes top-of-the-line appliances and custom cabinetry. Building amenities include 24-hour doorman, fitness center, swimming pool, and resident lounge. Convenient location near Grand Central Station.",
    price: 4500,
    location: {
      address: "300 E 46th St",
      borough: "Manhattan",
      neighborhood: "Midtown East"
    },
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 750,
    amenities: [
      "Doorman",
      "Elevator",
      "Gym",
      "Swimming Pool",
      "Balcony",
      "Dishwasher",
      "Laundry in Building"
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1560",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=1560",
      "https://images.unsplash.com/photo-1556912173-3bb406ef7e8b?q=80&w=1560"
    ],
    availableDate: "2024-04-20",
    dateAdded: "2024-03-15",
    semanticScore: 0.88
  },
  {
    id: "apt-6",
    title: "Renovated 2BR in Historic Harlem Brownstone",
    description: "Beautifully renovated 2 bedroom apartment in a historic Harlem brownstone, featuring high ceilings, large windows, and elegant original details. Completely updated kitchen and bathrooms with modern fixtures while preserving the pre-war charm. Located on a quiet, tree-lined block near Marcus Garvey Park, with easy access to multiple subway lines, restaurants, and cafes.",
    price: 3200,
    location: {
      address: "142 W 120th St",
      borough: "Manhattan",
      neighborhood: "Harlem"
    },
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 850,
    amenities: [
      "Pre-war",
      "High Ceilings",
      "Dishwasher",
      "Laundry in Building"
    ],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1560",
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?q=80&w=1560",
      "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?q=80&w=1560"
    ],
    availableDate: "2024-05-01",
    dateAdded: "2024-04-03",
    semanticScore: 0.91
  }
];
