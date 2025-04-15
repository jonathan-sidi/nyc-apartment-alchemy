
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Apartment } from "@/types/apartment";

interface ApartmentCardProps {
  apartment: Apartment;
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

export function ApartmentCard({ apartment, onSave, isSaved = false }: ApartmentCardProps) {
  const { id, title, price, bedrooms, bathrooms, location, images, amenities } = apartment;
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) {
      onSave(id);
    }
  };

  const formatBedrooms = (beds: number | 'studio') => {
    if (beds === 'studio') return 'Studio';
    return `${beds} Bed${beds > 1 ? 's' : ''}`;
  };

  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link to={`/apartments/${id}`} className="block h-full">
        <div className="relative">
          <AspectRatio ratio={4/3}>
            <img 
              src={images[0] || '/placeholder.svg'} 
              alt={title} 
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`absolute top-2 right-2 bg-white/70 rounded-full hover:bg-white/90 ${
              isSaved ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={handleSaveClick}
          >
            <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p className="text-white font-heading font-semibold text-xl">${price.toLocaleString()}/month</p>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-heading font-semibold text-lg line-clamp-1 mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-1 mb-2">
            {location.neighborhood}, {location.borough}
          </p>
          <div className="flex items-center space-x-2 text-sm mb-3">
            <span>{formatBedrooms(bedrooms)}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>{bathrooms} Bath{bathrooms > 1 ? 's' : ''}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="bg-secondary text-xs">
                {amenity}
              </Badge>
            ))}
            {amenities.length > 3 && (
              <Badge variant="outline" className="bg-secondary text-xs">
                +{amenities.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
