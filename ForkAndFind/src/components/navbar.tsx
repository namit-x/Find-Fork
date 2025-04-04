import React from 'react';
import { Button } from '../components/ui/button';
import { Utensils } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 h-16 fixed top-0 left-0 right-0 z-50">
      <div className="container h-full mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-food-red" />
          <span className="text-2xl font-bold text-gray-900">
            Fork <span className="text-food-red">&</span> Find
          </span>
        </a>
        
        <div className="hidden md:flex items-center space-x-20">
          <a href="#" className="text-gray-700 hover:text-food-red transition-colors">Home</a>
          <a href="#" className="text-gray-700 hover:text-food-red transition-colors">Explore</a>
          <a href="#" className="text-gray-700 hover:text-food-red transition-colors">About</a>
          <a href="#" className="text-gray-700 hover:text-food-red transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;