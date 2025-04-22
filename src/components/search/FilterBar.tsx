
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@mui/material/Slider";

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
  className?: string;
}

interface FilterState {
  location: string[];
  priceRange: [number, number];
  beds: string;
  baths: string;
  amenities: string[];
}

const BOROUGHS = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];
const AMENITIES = [
  "Doorman",
  "Elevator",
  "Gym",
  "Laundry",
  "Dishwasher",
  "Pet Friendly",
  "Balcony",
  "Roof Deck",
  "Swimming Pool",
  "Parking"
];

export function FilterBar({ 
  onFilterChange,
  initialFilters,
  className = ""
}: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    location: initialFilters?.location || [],
    priceRange: initialFilters?.priceRange || [0, 15000],
    beds: initialFilters?.beds || "any",
    baths: initialFilters?.baths || "any",
    amenities: initialFilters?.amenities || []
  });

  const handleLocationChange = (borough: string) => {
    const newLocations = filters.location.includes(borough)
      ? filters.location.filter(loc => loc !== borough)
      : [...filters.location, borough];
    
    updateFilters({ ...filters, location: newLocations });
  };

  const handlePriceChange = (value: number[]) => {
    updateFilters({ ...filters, priceRange: [value[0], value[1]] as [number, number] });
  };

  const handleBedroomsChange = (value: string) => {
    updateFilters({ ...filters, beds: value });
  };

  const handleBathroomsChange = (value: string) => {
    updateFilters({ ...filters, baths: value });
  };

  const handleAmenityChange = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    
    updateFilters({ ...filters, amenities: newAmenities });
  };

  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* Location Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Location
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <div className="space-y-4">
            <h3 className="font-medium">NYC Boroughs</h3>
            <div className="grid grid-cols-1 gap-2">
              {BOROUGHS.map((borough) => (
                <div key={borough} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`borough-${borough}`}
                    checked={filters.location.includes(borough)}
                    onCheckedChange={() => handleLocationChange(borough)}
                  />
                  <Label htmlFor={`borough-${borough}`}>{borough}</Label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Price Range Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Price Range
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex justify-between mb-4">
                <span>${filters.priceRange[0].toLocaleString()}</span>
                <span>${filters.priceRange[1].toLocaleString()}</span>
              </div>
              <Slider
                value={filters.priceRange}
                step={100}
                max={15000}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Bedrooms Filter */}
      <Select
        value={filters.beds}
        onValueChange={handleBedroomsChange}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Beds" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any Beds</SelectItem>
          <SelectItem value="studio">Studio</SelectItem>
          <SelectItem value="1">1 Bed</SelectItem>
          <SelectItem value="2">2 Beds</SelectItem>
          <SelectItem value="3">3 Beds</SelectItem>
          <SelectItem value="4+">4+ Beds</SelectItem>
        </SelectContent>
      </Select>

      {/* Bathrooms Filter */}
      <Select
        value={filters.baths}
        onValueChange={handleBathroomsChange}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Baths" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any Baths</SelectItem>
          <SelectItem value="1">1+ Bath</SelectItem>
          <SelectItem value="2">2+ Baths</SelectItem>
          <SelectItem value="3">3+ Baths</SelectItem>
        </SelectContent>
      </Select>

      {/* Amenities Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Amenities
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <div className="space-y-4">
            <h3 className="font-medium">Amenities</h3>
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
              {AMENITIES.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`amenity-${amenity}`}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityChange(amenity)}
                  />
                  <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
