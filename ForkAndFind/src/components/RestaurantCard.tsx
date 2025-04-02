import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface RestaurantCardProps {
  restaurant: {
    id: number;
    name: string;
    image: string;
    cuisine: string;
    rating: number;
    reviewCount: number;
    priceRange: string;
    timeEstimate: string;
    distance: string;
    isNew?: boolean;
  };
  index: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, index }) => {
  const delayClass = `animate-delay-${(index % 5) * 100}`;

  return (
    <div
      className={cn(
        "bg-white rounded-xl overflow-hidden filter-card animate-fade-in",
        delayClass
      )}
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        {restaurant.isNew && (
          <span className="absolute top-4 left-4 bg-food-red text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </span>
        )}
        <span className="absolute top-4 right-4 bg-white text-xs font-bold px-2 py-1 rounded-full">
          {restaurant.priceRange}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{restaurant.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-food-yellow fill-food-yellow mr-1" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({restaurant.reviewCount})</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-3">{restaurant.cuisine}</p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{restaurant.timeEstimate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{restaurant.distance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
