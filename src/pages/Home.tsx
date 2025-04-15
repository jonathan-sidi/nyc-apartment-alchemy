
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterBar } from "@/components/search/FilterBar";

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070"
            alt="New York City Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Find Your Perfect NYC Apartment
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Discover apartments that match exactly what you're looking for using our advanced semantic search technology.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <SearchBar variant="large" onSearch={handleSearch} />
              
              <div className="mt-6">
                <FilterBar 
                  className="justify-center"
                  onFilterChange={(filters) => {
                    const params = new URLSearchParams();
                    
                    if (filters.location.length > 0) {
                      params.set('locations', filters.location.join(','));
                    }
                    
                    params.set('minPrice', filters.priceRange[0].toString());
                    params.set('maxPrice', filters.priceRange[1].toString());
                    
                    if (filters.beds !== 'any') {
                      params.set('beds', filters.beds);
                    }
                    
                    if (filters.baths !== 'any') {
                      params.set('baths', filters.baths);
                    }
                    
                    if (filters.amenities.length > 0) {
                      params.set('amenities', filters.amenities.join(','));
                    }
                    
                    navigate(`/search?${params.toString()}`);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Neighborhoods Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            Explore NYC Neighborhoods
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Manhattan', image: 'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?q=80&w=2070' },
              { name: 'Brooklyn', image: 'https://images.unsplash.com/photo-1585870720328-93c4199a5d04?q=80&w=2070' },
              { name: 'Queens', image: 'https://images.unsplash.com/photo-1600200852986-259ade7a3461?q=80&w=2070' },
            ].map((borough) => (
              <div key={borough.name} className="relative rounded-lg overflow-hidden h-64 group cursor-pointer"
                onClick={() => {
                  navigate(`/search?locations=${encodeURIComponent(borough.name)}`);
                }}
              >
                <img 
                  src={borough.image} 
                  alt={borough.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <h3 className="font-heading text-2xl font-semibold text-white">{borough.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center mb-4">
            How NYC Apartment Alchemy Works
          </h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
            Our advanced semantic search technology finds apartments that match exactly what you're looking for - even from natural language descriptions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-accent/15 rounded-full flex items-center justify-center mb-4">
                <span className="text-accent font-bold text-2xl">1</span>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Describe Your Dream Apartment</h3>
              <p className="text-gray-500">
                Use natural language to describe the features you want: "high ceilings, exposed brick, and close to the subway"
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-accent/15 rounded-full flex items-center justify-center mb-4">
                <span className="text-accent font-bold text-2xl">2</span>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Our AI Finds Perfect Matches</h3>
              <p className="text-gray-500">
                Our technology analyzes thousands of listings to find apartments that match your criteria, even if they don't use the exact words
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-accent/15 rounded-full flex items-center justify-center mb-4">
                <span className="text-accent font-bold text-2xl">3</span>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Choose Your New Home</h3>
              <p className="text-gray-500">
                Browse your personalized results, save favorites, and schedule viewings of your perfect NYC apartment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Find Your Perfect NYC Apartment?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Start your search now and discover apartments that truly match what you're looking for.
          </p>
          <button
            className="bg-accent hover:bg-accent/90 text-white font-medium py-3 px-8 rounded-full text-lg shadow-lg"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Start Your Search
          </button>
        </div>
      </section>
    </div>
  );
}
