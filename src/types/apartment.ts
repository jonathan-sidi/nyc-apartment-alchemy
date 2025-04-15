
export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    borough: string;
    neighborhood: string;
  };
  bedrooms: number | 'studio';
  bathrooms: number;
  squareFeet: number;
  amenities: string[];
  images: string[];
  floorPlan?: string;
  video?: string;
  availableDate: string;
  dateAdded: string;
  semanticScore?: number;
}
