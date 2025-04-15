
import { toast } from "sonner";
import { Apartment } from "@/types/apartment";

const API_BASE_URL = 'http://localhost:8080';

export interface SearchParams {
  query: string;
  locations?: string[];
  minPrice?: number;
  maxPrice?: number;
  beds?: string;
  baths?: string;
  amenities?: string[];
}

export async function searchApartments(params: SearchParams): Promise<Apartment[]> {
  try {
    // Build query URL with all filter parameters
    let apiUrl = `${API_BASE_URL}/search?q=${encodeURIComponent(params.query || '')}`;
    
    // Add filter parameters
    if (params.locations && params.locations.length > 0) {
      apiUrl += `&locations=${encodeURIComponent(params.locations.join(','))}`;
    }
    
    if (params.minPrice !== undefined) {
      apiUrl += `&minPrice=${params.minPrice}`;
    }
    
    if (params.maxPrice !== undefined) {
      apiUrl += `&maxPrice=${params.maxPrice}`;
    }
    
    if (params.beds && params.beds !== "any") {
      apiUrl += `&beds=${params.beds}`;
    }
    
    if (params.baths && params.baths !== "any") {
      apiUrl += `&baths=${params.baths}`;
    }
    
    if (params.amenities && params.amenities.length > 0) {
      apiUrl += `&amenities=${encodeURIComponent(params.amenities.join(','))}`;
    }
    
    console.log('Fetching apartments from:', apiUrl);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform API response to match our Apartment type
    return data.map((apt: any) => ({
      id: apt.id.toString(),
      title: apt.address,
      description: "Apartment details...", // Backend doesn't return full description
      price: apt.price,
      location: {
        address: apt.address,
        borough: apt.address.split(',').pop()?.trim() || "NYC",
        neighborhood: "",
      },
      bedrooms: apt.bedrooms,
      bathrooms: apt.bathrooms,
      squareFeet: 0, // Not provided by API
      amenities: [], // Detail not included in response
      images: apt.image_url ? [apt.image_url] : [], 
      availableDate: new Date().toISOString(),
      dateAdded: new Date().toISOString(),
      semanticScore: apt.score,
    }));
  } catch (error) {
    console.error("Error fetching apartments:", error);
    toast.error("Failed to load search results");
    throw error;
  }
}
