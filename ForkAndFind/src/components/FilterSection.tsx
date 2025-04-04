import React from 'react';
import {
  Check, ChevronDown, Star, DollarSign, Filter
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface FilterSectionProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  priceFilter: string[];
  setPriceFilter: (value: string[]) => void;
  ratingFilter: number | null;
  setRatingFilter: (value: number | null) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  sortBy,
  setSortBy,
  priceFilter,
  setPriceFilter,
  ratingFilter,
  setRatingFilter,
}) => {
  const handlePriceToggle = (price: string) => {
    if (priceFilter.includes(price)) {
      setPriceFilter(priceFilter.filter(p => p !== price));
    } else {
      setPriceFilter([...priceFilter, price]);
    }
  };

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviewed' },
    { value: 'newest', label: 'Newest First' },
  ];

  const ratingOptions = [4, 3, 2, 1];

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 mb-6 space-y-4 md:space-y-0 animate-fade-in">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold mr-2">Food Items</h2>
        <span className="text-gray-500 text-sm">(24 results)</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <span>Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className="flex items-center justify-between cursor-pointer"
              >
                {option.label}
                {sortBy === option.value && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Price Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>Price</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Price Range</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {['$', '$$', '$$$', '$$$$'].map((price) => (
              <DropdownMenuCheckboxItem
                key={price}
                checked={priceFilter.includes(price)}
                onCheckedChange={() => handlePriceToggle(price)}
              >
                {price}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Rating Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>Rating</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minimum Rating</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {ratingOptions.map((rating) => (
              <DropdownMenuItem
                key={rating}
                onClick={() => setRatingFilter(rating)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-food-yellow text-food-yellow" />
                  ))}
                  <span className="ml-2">{rating}+ stars</span>
                </div>
                {ratingFilter === rating && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              onClick={() => setRatingFilter(null)}
              className="flex items-center justify-between cursor-pointer"
            >
              <span>Show all</span>
              {ratingFilter === null && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Filter Button */}
        <Button variant="outline" className="md:hidden flex items-center gap-1">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;