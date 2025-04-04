import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[600px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop")'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Discover & Know <br />
            <span className="text-food-red">Your Food</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find the perfect food items, read reviews, view options, and order delicious dishes all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for dishes, cuisines, or ingredients..."
                className="pl-10 py-6 rounded-full border border-gray-300 focus:border-food-red focus:ring-1 focus:ring-food-red shadow-sm w-full"
              />
            </div>
            <Button className="bg-food-red hover:bg-food-red/90 text-white py-6 px-8 rounded-full shadow-md">
              Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <span className="text-sm text-gray-500">Popular searches:</span>
            <a href="#" className="text-sm text-food-red hover:underline">Italian</a>
            <a href="#" className="text-sm text-food-red hover:underline">Chinese</a>
            <a href="#" className="text-sm text-food-red hover:underline">Vegetarian</a>
            <a href="#" className="text-sm text-food-red hover:underline">Fast Food</a>
            <a href="#" className="text-sm text-food-red hover:underline">Fine Dining</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;