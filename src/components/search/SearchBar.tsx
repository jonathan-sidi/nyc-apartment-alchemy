
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  variant?: "large" | "small";
  initialValue?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ 
  variant = "large", 
  initialValue = "",
  onSearch 
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative ${variant === "large" ? "max-w-4xl mx-auto" : "max-w-xl"}`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search for granite countertops, rooftop access, pet friendly..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-20 border-2 border-gray-300 focus:border-accent w-full ${
              variant === "large" ? "h-14 text-lg rounded-full" : "h-10 rounded-lg"
            }`}
          />
          <Button 
            type="submit" 
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${
              variant === "large" ? "px-6 rounded-full" : "px-4 rounded-md"
            }`}
          >
            Search
          </Button>
        </div>
        {variant === "large" && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            Try: "exposed brick, high ceilings, washer/dryer" or "doorman, gym, close to subway"
          </p>
        )}
      </div>
    </form>
  );
}
