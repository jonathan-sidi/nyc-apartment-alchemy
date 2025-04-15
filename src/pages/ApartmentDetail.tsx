
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ArrowLeft, MapPin, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apartment } from "@/types/apartment";

// In production, this would come from your backend
import { mockApartments } from "@/mock/apartments";

export default function ApartmentDetail() {
  const { id } = useParams<{ id: string }>();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // This would be replaced with a real API call in production
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundApartment = mockApartments.find(apt => apt.id === id);
      setApartment(foundApartment || null);
      setLoading(false);
    }, 500);
  }, [id]);

  // Check if apartment is saved
  useEffect(() => {
    if (!apartment) return;
    
    // Get saved apartments from local storage as a placeholder
    const savedApartments = JSON.parse(localStorage.getItem("savedApartments") || "[]");
    setIsSaved(savedApartments.includes(apartment.id));
  }, [apartment]);

  const handleSaveToggle = () => {
    if (!apartment) return;
    
    const savedApartments = JSON.parse(localStorage.getItem("savedApartments") || "[]");
    let newSaved: string[];
    
    if (isSaved) {
      newSaved = savedApartments.filter((savedId: string) => savedId !== apartment.id);
    } else {
      newSaved = [...savedApartments, apartment.id];
    }
    
    localStorage.setItem("savedApartments", JSON.stringify(newSaved));
    setIsSaved(!isSaved);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Apartment Not Found</h1>
        <p className="mb-8">The apartment you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/search">Back to Search</Link>
        </Button>
      </div>
    );
  }

  const formatBedrooms = (beds: number | 'studio') => {
    if (beds === 'studio') return 'Studio';
    return `${beds} Bed${beds > 1 ? 's' : ''}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button and save button */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/search" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Link>
        </Button>
        <Button 
          variant={isSaved ? "default" : "outline"} 
          size="sm"
          onClick={handleSaveToggle}
          className="flex items-center gap-2"
        >
          <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          {isSaved ? 'Saved' : 'Save'}
        </Button>
      </div>

      {/* Apartment title and price */}
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold mb-2">{apartment.title}</h1>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{apartment.location.neighborhood}, {apartment.location.borough}</span>
          </div>
          <span className="text-2xl font-semibold text-accent">${apartment.price.toLocaleString()}/month</span>
        </div>
      </div>

      {/* Image gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2 rounded-lg overflow-hidden h-[400px]">
          <img 
            src={apartment.images[activeImageIndex]} 
            alt={apartment.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
          {apartment.images.map((image, index) => (
            <div 
              key={index} 
              className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                activeImageIndex === index ? 'border-accent' : 'border-transparent'
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img 
                src={image} 
                alt={`${apartment.title} - image ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Apartment details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4">
              <h2 className="text-xl font-heading font-semibold mb-2">Description</h2>
              <p className="text-gray-600 whitespace-pre-line mb-6">{apartment.description}</p>
              
              <h2 className="text-xl font-heading font-semibold mb-2">Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 text-sm">
                <div>
                  <span className="block text-gray-500">Bedrooms</span>
                  <span className="font-medium">{formatBedrooms(apartment.bedrooms)}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Bathrooms</span>
                  <span className="font-medium">{apartment.bathrooms}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Square Feet</span>
                  <span className="font-medium">{apartment.squareFeet}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Available</span>
                  <span className="font-medium">{new Date(apartment.availableDate).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="block text-gray-500">Listed</span>
                  <span className="font-medium">{new Date(apartment.dateAdded).toLocaleDateString()}</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="amenities" className="p-4">
              <h2 className="text-xl font-heading font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {apartment.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="floorplan" className="p-4">
              {apartment.floorPlan ? (
                <img src={apartment.floorPlan} alt="Floor Plan" className="max-w-full h-auto" />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Home className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Floor plan not available</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-heading font-semibold mb-4">Contact About This Property</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone (optional)</label>
              <input 
                type="tel" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent h-28"
                placeholder="I'm interested in this property..."
                defaultValue={`I'm interested in this apartment at ${apartment.location.address}. Please contact me with more information.`}
              ></textarea>
            </div>
            <Button className="w-full">Submit Inquiry</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
