import React from 'react';
import { cn } from '../lib/utils';
import {
  Cake, Salad, Sandwich, Dessert, Fish, Soup, Milk, Ham
} from 'lucide-react';
interface CategoryBadgeProps {
  category: {
    name: string;
    icon: string;
  };
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

// const navigate = useNavigate();

const iconMap: Record<string, React.ReactNode> = {
  dairies: <Milk className="h-6 w-6" />,
  cakes: <Cake className="h-6 w-6" />,
  burger: <Sandwich className="h-6 w-6" />,
  chickens: <Ham className="h-6 w-6" />,
  salad: <Salad className="h-6 w-6" />,
  dessert: <Dessert className="h-6 w-6" />,
  seafood: <Fish className="h-6 w-6" />,
  soup: <Soup className="h-6 w-6" />,
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  index,
  isSelected,
  onClick,
}) => {
  const delayClass = `animate-delay-${(index % 5) * 100}`;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 animate-fade-in",
        delayClass,
        isSelected
          ? "bg-food-red text-white shadow-lg"
          : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-food-red",
      )}
    >
      <div className="mb-2">
        {iconMap[category.icon.toLowerCase()] || <Sandwich className="h-6 w-6" />}
      </div>
      <span className="text-sm font-medium">{category.name}</span>
    </button>
  );
};

export default CategoryBadge;
