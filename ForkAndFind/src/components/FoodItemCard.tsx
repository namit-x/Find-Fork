import React from 'react';
import { Utensils, Tag, Info } from 'lucide-react';
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
  onClick: () => void;
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

// Function to get color based on nutrition grade
const getNutritionGradeColor = (grade: string) => {
  switch (grade.toUpperCase()) {
    case 'A':
      return 'bg-food-green text-white';
    case 'B':
      return 'bg-food-green/80 text-white';
    case 'C':
      return 'bg-food-yellow text-black';
    case 'D':
      return 'bg-food-orange text-white';
    case 'E':
      return 'bg-food-red text-white';
    default:
      return 'bg-gray-400 text-white';
  }
};

// Function to truncate text if it's too long
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const FoodItemCard: React.FC<FoodItemCardProps> = ({ foodItem, index, onClick }) => {
  // Define a fixed set of delay classes for animation consistency
  const delayClasses = [
    "animate-delay-0",
    "animate-delay-100",
    "animate-delay-200", 
    "animate-delay-300",
    "animate-delay-400"
  ];
  
  const delayClass = delayClasses[index % delayClasses.length];
  const nutritionGrade = safeRender(foodItem.nutrition_grades);
  const productName = safeRender(foodItem.product_name);
  const categories = safeRender(foodItem.categories);
  const ingredients = safeRender(foodItem.ingredients);

  return (
    <div
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 filter-card animate-fade-in cursor-pointer h-full flex flex-col",
        delayClass
      )}
      onClick={onClick}
    >
      <div className="relative overflow-hidden group">
        <img
          src={foodItem.image_url || 'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image'}
          alt={productName}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/e2e8f0/64748b?text=No+Image';
          }}
        />
        <div className="absolute top-2 right-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${getNutritionGradeColor(nutritionGrade)}`}>
            {nutritionGrade.toUpperCase() || '?'}
          </span>
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">{productName}</h3>
        
        <div className="flex items-center gap-1.5 mb-2">
          <Tag className="h-4 w-4 text-food-orange" />
          <p className="text-sm text-gray-600 line-clamp-1">{categories}</p>
        </div>
        
        <div className="flex items-start gap-1.5 mb-3">
          <Utensils className="h-4 w-4 text-food-orange mt-0.5 shrink-0" />
          <p className="text-xs text-gray-500 line-clamp-2">{truncateText(ingredients, 100)}</p>
        </div>
        
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center mt-2">
            <Info className="h-4 w-4 text-gray-500 mr-1.5" />
            <span className="text-xs text-gray-600 font-medium">Nutrition Grade:</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-md font-semibold mt-2 ${getNutritionGradeColor(nutritionGrade)}`}>
            {nutritionGrade.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;