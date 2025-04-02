import { useState } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import CategoryBadge from '../components/CategoryBadge';
import FilterSection from '../components/FilterSection';
import RestaurantCard from '../components/RestaurantCard';

const CATEGORIES = [
  { name: 'Pizza', icon: 'pizza' },
  { name: 'Burger', icon: 'burger' },
  { name: 'Coffee', icon: 'coffee' },
  { name: 'Salad', icon: 'salad' },
  { name: 'Steak', icon: 'meat' },
  { name: 'Seafood', icon: 'seafood' },
  { name: 'Dessert', icon: 'dessert' },
  { name: 'Soup', icon: 'soup' },
];

const RESTAURANTS = [
  {
    id: 1,
    name: 'Delicious Pizza House',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop',
    cuisine: 'Italian, Pizza, Pasta',
    rating: 4.8,
    reviewCount: 342,
    priceRange: '$$',
    timeEstimate: '25-35 min',
    distance: '1.2 miles',
    isNew: true,
  },
  {
    id: 2,
    name: 'Burger Joint',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop',
    cuisine: 'American, Burgers, Fast Food',
    rating: 4.5,
    reviewCount: 286,
    priceRange: '$',
    timeEstimate: '15-25 min',
    distance: '0.8 miles',
  },
  {
    id: 3,
    name: 'Green Garden',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    cuisine: 'Vegetarian, Healthy, Salads',
    rating: 4.7,
    reviewCount: 201,
    priceRange: '$$',
    timeEstimate: '20-30 min',
    distance: '1.5 miles',
  },
  {
    id: 4,
    name: 'Seafood Palace',
    image: 'https://images.unsplash.com/photo-1579631542780-4267d9a4d64c?q=80&w=2070&auto=format&fit=crop',
    cuisine: 'Seafood, Fine Dining',
    rating: 4.9,
    reviewCount: 178,
    priceRange: '$$$',
    timeEstimate: '30-45 min',
    distance: '2.1 miles',
  },
  {
    id: 5,
    name: 'Sweet Treats',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1887&auto=format&fit=crop',
    cuisine: 'Dessert, Bakery, Cafe',
    rating: 4.6,
    reviewCount: 156,
    priceRange: '$$',
    timeEstimate: '15-25 min',
    distance: '0.6 miles',
    isNew: true,
  },
  {
    id: 6,
    name: 'Steak House',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop',
    cuisine: 'Steakhouse, American',
    rating: 4.8,
    reviewCount: 224,
    priceRange: '$$$',
    timeEstimate: '25-40 min',
    distance: '1.8 miles',
  },
];

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('recommended');
  const [priceFilter, setPriceFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  // Filter restaurants based on selected filters
  const filteredRestaurants = RESTAURANTS.filter(restaurant => {
    // Filter by price
    if (priceFilter.length > 0 && !priceFilter.includes(restaurant.priceRange)) {
      return false;
    }

    // Filter by rating
    if (ratingFilter !== null && restaurant.rating < ratingFilter) {
      return false;
    }

    return true;
  });

  // Sort restaurants based on selected sort option
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      case 'newest':
        return b.isNew ? -1 : a.isNew ? 1 : 0;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-16">
        <Hero />

        {/* Categories Section */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 animate-fade-in">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {CATEGORIES.map((category, index) => (
              <CategoryBadge
                key={category.name}
                category={category}
                index={index}
                isSelected={selectedCategory === category.name}
                onClick={() => {
                  setSelectedCategory(prevCat =>
                    prevCat === category.name ? null : category.name
                  );
                }}
              />
            ))}
          </div>
        </section>

        {/* Restaurants Section */}
        <section className="container mx-auto px-6 py-8 pb-20">
          <FilterSection
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRestaurants.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold">
                  Fork <span className="text-food-red">&</span> Find
                </span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Discover the best food from over 1,000 restaurants and fast delivery to your doorstep
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-food-red transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Investors</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Company Blog</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-food-red transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-food-red transition-colors">Terms</a></li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold mb-4">Get The App</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-white text-gray-900 px-4 py-2 rounded flex items-center gap-2">
                    <span className="font-medium">iOS</span>
                  </a>
                  <a href="#" className="bg-white text-gray-900 px-4 py-2 rounded flex items-center gap-2">
                    <span className="font-medium">Android</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">&copy; 2023 Fork & Find. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;