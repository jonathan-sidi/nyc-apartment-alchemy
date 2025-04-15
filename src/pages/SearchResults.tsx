
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterBar } from "@/components/search/FilterBar";
import { ApartmentGrid } from "@/components/apartment/ApartmentGrid";
import { Apartment } from "@/types/apartment";

// Temporary fallback to mock data if API fails
import { mockApartments } from "@/mock/apartments";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedApartments, setSavedApartments] = useState<string[]>([]);

  // Get search parameters
  const query = searchParams.get("query") || "";
  const locations = searchParams.get("locations")?.split(",") || [];
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 10000;
  const beds = searchParams.get("beds") || "any";
  const baths = searchParams.get("baths") || "any";
  const amenities = searchParams.get("amenities")?.split(",") || [];

  // Fetch apartments from the backend
  useEffect(() => {
    setLoading(true);
    
    const fetchApartments = async () => {
      try {
        // Build query URL with all filter parameters
        let apiUrl = `http://localhost:8080/search?q=${encodeURIComponent(query)}`;
        
        // Add filter parameters
        if (locations.length > 0) {
          apiUrl += `&locations=${encodeURIComponent(locations.join(','))}`;
        }
        
        apiUrl += `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        
        if (beds !== "any") {
          apiUrl += `&beds=${beds}`;
        }
        
        if (baths !== "any") {
          apiUrl += `&baths=${baths}`;
        }
        
        if (amenities.length > 0) {
          apiUrl += `&amenities=${encodeURIComponent(amenities.join(','))}`;
        }
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API response to match our Apartment type
        const transformedData = data.map((apt: any) => ({
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
        
        setApartments(transformedData);
      } catch (error) {
        console.error("Error fetching apartments:", error);
        toast.error("Failed to load search results. Displaying sample data.");
        // Fallback to mock data if API fails
        setApartments(mockApartments);
      } finally {
        setLoading(false);
      }
    };

    // Only make API call if there's a search query
    if (query) {
      fetchApartments();
    } else {
      setApartments([]);
      setLoading(false);
    }
  }, [query, locations, minPrice, maxPrice, beds, baths, amenities]);

  // Get saved apartments from local storage
  useEffect(() => {
    // Get saved apartments from local storage as a placeholder
    // In production, this would come from your user database
    const saved = JSON.parse(localStorage.getItem("savedApartments") || "[]");
    setSavedApartments(saved);
  }, []);

  const handleSaveApartment = (id: string) => {
    setSavedApartments((prev) => {
      const newSaved = prev.includes(id)
        ? prev.filter((savedId) => savedId !== id)
        : [...prev, id];
      
      // Save to local storage (placeholder for backend)
      localStorage.setItem("savedApartments", JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const handleSearch = (newQuery: string) => {
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  const handleFilterChange = (filters: any) => {
    if (filters.location.length > 0) {
      searchParams.set("locations", filters.location.join(","));
    } else {
      searchParams.delete("locations");
    }
    
    searchParams.set("minPrice", filters.priceRange[0].toString());
    searchParams.set("maxPrice", filters.priceRange[1].toString());
    
    if (filters.beds !== "any") {
      searchParams.set("beds", filters.beds);
    } else {
      searchParams.delete("beds");
    }
    
    if (filters.baths !== "any") {
      searchParams.set("baths", filters.baths);
    } else {
      searchParams.delete("baths");
    }
    
    if (filters.amenities.length > 0) {
      searchParams.set("amenities", filters.amenities.join(","));
    } else {
      searchParams.delete("amenities");
    }
    
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <SearchBar 
            variant="small" 
            initialValue={query} 
            onSearch={handleSearch}
          />
          
          <div className="mt-6">
            <FilterBar
              initialFilters={{
                location: locations,
                priceRange: [minPrice, maxPrice],
                beds,
                baths,
                amenities
              }}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold">
            {query ? `Search results for "${query}"` : "All Apartments"}
          </h1>
          <p className="text-gray-500">
            {apartments.length} {apartments.length === 1 ? "apartment" : "apartments"} found
          </p>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : (
          <ApartmentGrid 
            apartments={apartments} 
            savedApartments={savedApartments}
            onSaveApartment={handleSaveApartment}
          />
        )}
      </div>
    </div>
  );
}
