import { ApartmentCard } from "./ApartmentCard";
import { Apartment } from "@/types/apartment";

interface ApartmentGridProps {
  apartments: Apartment[];
  savedApartments?: string[];
  onSaveApartment?: (id: string) => void;
}

export function ApartmentGrid({ 
  apartments, 
  savedApartments = [],
  onSaveApartment
}: ApartmentGridProps) {
  console.log("ApartmentGrid rendering with", apartments.length, "apartments");
  console.log("ApartmentGrid data:", apartments);

  if (apartments.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-medium text-gray-700 mb-2">No apartments found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {apartments.map(apartment => (
        <ApartmentCard 
          key={apartment.id} 
          apartment={apartment} 
          isSaved={savedApartments.includes(apartment.id)}
          onSave={onSaveApartment}
        />
      ))}
    </div>
  );
}
