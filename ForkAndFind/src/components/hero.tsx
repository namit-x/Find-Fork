import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { setSearchName } = useSearch();

  const searchProduct = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    if (/^\d+$/.test(searchQuery)) {
      navigate(`/product/${searchQuery}`);
    }
    else {
      setSearchName(searchQuery);
    }
  }

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
                placeholder="Search products by barcode or name..."
                className="pl-10 py-6 rounded-full border border-gray-300 focus:border-food-red focus:ring-1 focus:ring-food-red shadow-sm w-full"
                onChange={(e) => {setSearchQuery(e.target.value); e.target.value='';}}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchProduct(searchQuery);
                  }
                }}
                value={searchQuery}
              />
            </div>
            <Button
              className="bg-food-red hover:bg-food-red/90 text-white py-6 px-8 rounded-full shadow-md"
              onClick={() => searchProduct(searchQuery)}
            >
              Search
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;