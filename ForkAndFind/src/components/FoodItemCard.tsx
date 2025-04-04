import React from 'react';
// import { Star, Clock, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface FoodItemCardProps {
  foodItem: {
    code: string;
    product_name: string;
    image_url: string;
    categories: any;
    ingredients: any;
    nutrition_grades: any;
  };
  index: number;
}

// Helper function to safely render potentially complex values
const safeRender = (value: any): string => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  if (Array.isArray(value)) {
    return value.map(item => safeRender(item)).join(', ');
  }
  if (typeof value === 'object') {
    if (value.text) return value.text;
    return JSON.stringify(value);
  }
  return String(value);
};

const FoodItemCard: React.FC<FoodItemCardProps> = ({ foodItem, index }) => {
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
          src={foodItem.image_url}
          alt={safeRender(foodItem.product_name)}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{safeRender(foodItem.product_name)}</h3>
        </div>

        <p className="text-sm text-gray-500 mb-3">{safeRender(foodItem.categories)}</p>
        <p className="text-xs text-gray-500 mb-2">Ingredients: {safeRender(foodItem.ingredients)}</p>
        <p className="text-xs text-gray-500 mb-2">Nutrition Grade: {safeRender(foodItem.nutrition_grades)}</p>
      </div>
    </div>
  );
};

export default FoodItemCard;
