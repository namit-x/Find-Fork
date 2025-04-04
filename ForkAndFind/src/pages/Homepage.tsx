import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import CategoryBadge from '../components/CategoryBadge';
// import FilterSection from '../components/FilterSection';
import FoodItemCard from '../components/FoodItemCard';
import { Footer } from '../components/Footer';
import { Loader } from 'lucide-react';

const CATEGORIES = [
  { name: 'Dairies', icon: 'dairies' },
  { name: 'Burger', icon: 'burger' },
  { name: 'Cakes', icon: 'cakes' },
  { name: 'Salad', icon: 'salad' },
  { name: 'Chickens', icon: 'chickens' },
  { name: 'Seafood', icon: 'seafood' },
  { name: 'Desserts', icon: 'dessert' },
  { name: 'Soups', icon: 'soup' },
];


const Homepage = () => {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortType, setSortType] = useState<{ field: 'name' | 'nutrition', order: 'asc' | 'desc' }>({ field: 'name', order: 'asc' });
  const [processedFoodItems, setProcessedFoodItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {

        setIsLoading(true);
        let response;
        if (!selectedCategory) {
          response = await fetch(`https://world.openfoodfacts.org/api/v2/search.json?page_size=20`);
        }
        else {
          // console.log('Fetching for category:', selectedCategory);
          response = await fetch(`https://world.openfoodfacts.org/facets/categories/${selectedCategory}.json?page=1&page_size=20`);
        }
        const data = await response.json();
        // console.log('API Response:', data);

        if (!data.products || !Array.isArray(data.products)) {
          console.error("No products found or invalid data format!");
          return;
        }

        let processedFoodItems = data.products
          .filter((product: any) => {
            // Check if product has basic required fields
            if (!product || !product.code || !product.product_name) return false;

            // Check if product has any image
            return !!(
              product.image_url ||
              product.image_thumb_url ||
              (product.images && product.images[0]) ||
              product.image_small_url ||
              product.image_front_url
            );
          })
          .map((product: any) => {
            // Find the first available image URL
            const imageUrl =
              product.image_url ||
              product.image_thumb_url ||
              (product.images && product.images[0]) ||
              product.image_small_url ||
              product.image_front_url;

            return {
              code: product.code || '',
              product_name: product.product_name || 'Unknown Product',
              image_url: imageUrl,
              categories: product.categories || product.categories_tags || [],
              ingredients: product.ingredients || product.ingredients_text || [],
              nutrition_grades: product.nutrition_grades?.toUpperCase() || 'N/A'
            };
          });

        setProcessedFoodItems(processedFoodItems);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching food items:', error);
        setIsLoading(false);
      }
    };

    fetchFoodItems();
  }, [selectedCategory]);

  // Sort based on the current sort type
  useEffect(() => {
    let array = processedFoodItems;
    if (sortType.field === 'name') {
      array = [...array.sort((a: any, b: any) => {
        return sortType.order === 'asc'
          ? a.product_name.localeCompare(b.product_name)
          : b.product_name.localeCompare(a.product_name);
      })];
    } else if (sortType.field === 'nutrition') {
      array = [...array.sort((a: any, b: any) => {
        return sortType.order === 'asc'
          ? a.nutrition_grades.localeCompare(b.nutrition_grades)
          : b.nutrition_grades.localeCompare(a.nutrition_grades);
      })];
    }

    setProcessedFoodItems(array);
    setIsLoading(false);
  }, [sortType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-16">
        <Hero />

        {/* Categories Section */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6 animate-fade-in">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {CATEGORIES.map((category, index) => {

              return (
                <CategoryBadge
                  key={category.name}
                  category={category}
                  index={index}
                  isSelected={selectedCategory === category.name}
                  onClick={() => {
                    console.log('Category clicked in Homepage:', category.name);
                    const newCategory = category.name.toLowerCase();
                    console.log('Setting category to:', newCategory);
                    setSelectedCategory(newCategory);
                  }}
                />
              );
            })}
          </div>
        </section>

        {/* Food Items Section */}
        <section className="container mx-auto px-6 py-8 pb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Food Items - {selectedCategory ? selectedCategory : 'All'}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortType({ field: 'name', order: sortType.field === 'name' ? (sortType.order === 'asc' ? 'desc' : 'asc') : 'asc' })}
                className={`text-black border-2 px-4 py-2 rounded-md ${sortType.field === 'name' ? 'border-food-red text-food-red' : 'border-gray-600'}`}
              >
                By Name {sortType.field === 'name' && (sortType.order === 'asc' ? '(A-Z)' : '(Z-A)')}
              </button>
              <button
                onClick={() => setSortType({ field: 'nutrition', order: sortType.field === 'nutrition' ? (sortType.order === 'asc' ? 'desc' : 'asc') : 'asc' })}
                className={`text-black border-2 px-4 py-2 rounded-md ${sortType.field === 'nutrition' ? 'border-food-red text-food-red' : 'border-gray-600'}`}
              >
                Nutrition {sortType.field === 'nutrition' && (sortType.order === 'asc' ? '(A-E)' : '(E-A)')}
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <Loader className="h-8 w-8 animate-spin text-black mb-4" />
              <p className="text-gray-600">Loading...</p>
            </div>) :

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedFoodItems.map((foodItem, index) => (
                <FoodItemCard
                  key={foodItem.code}
                  foodItem={foodItem}
                  index={index}
                />
              ))}
            </div>
          }
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;