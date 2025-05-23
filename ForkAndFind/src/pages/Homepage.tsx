import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import CategoryBadge from '../components/CategoryBadge';
import FoodItemCard from '../components/FoodItemCard';
import { Footer } from '../components/Footer';
import { Loader, ChevronDown, ChevronUp } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { Skeleton } from '../components/ui/skeleton';

// Initial categories to display
const CATEGORIES = [
  { name: 'Dairies', icon: 'dairies' },
  { name: 'Burger', icon: 'burger' },
  { name: 'Cakes', icon: 'cakes' },
  { name: 'Salad', icon: 'salad' },
  { name: 'Chickens', icon: 'chickens' },
  { name: 'Seafood', icon: 'seafood' },
  { name: 'Desserts', icon: 'dessert' },
];

// API constants
const API_BASE_URL = 'https://world.openfoodfacts.org/api/v2';
const PAGE_SIZE = 20;
const FIELDS_PARAM = 'fields=product_name,code,image_url,categories_tags,nutrition_grades,ingredients_text';

// Interface for API categories
interface ApiCategory {
  id: string;
  name: string;
  products: number;
  url: string;
}

// Interface for processed categories to display
interface ProcessedCategory {
  displayName: string;  // Cleaned up name for display
  category: string;     // Original ID for API calls
  products: number;     // Number of products
}

// Interface for food item
interface FoodItem {
  code: string;
  product_name: string;
  image_url: string;
  categories: any;
  ingredients: any;
  nutrition_grades: string;
}

// Skeleton card component for loading state
const FoodItemCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden filter-card animate-pulse">
      <Skeleton className="w-full h-48" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-3" />
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
};

const Homepage = () => {
  const navigate = useNavigate();
  const { searchName, setSearchName } = useSearch();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategoryDisplay, setSelectedCategoryDisplay] = useState<string | null>(null);
  const [sortType, setSortType] = useState<{ field: 'name' | 'nutrition', order: 'asc' | 'desc' }>({ field: 'name', order: 'asc' });
  const [processedFoodItems, setProcessedFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [apiCategories, setApiCategories] = useState<ProcessedCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Reference to the Sentinel Div
  const loadingRef = useRef<HTMLDivElement>(null);

  // Helper function to clean category names consistently
  const cleanCategoryName = (categoryName: string): string => {
    let displayName = categoryName.replace('en:', '').replace('fr:', '');

    displayName = displayName
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return displayName;
  };

  // Helper function to process food items from API response
  const processFoodItems = (products: any[]): FoodItem[] => {
    return products
      .filter((product: any) => {
        if (!product || !product.code || !product.product_name) return false;

        return !!(
          product.image_url ||
          product.image_thumb_url ||
          (product.images && product.images[0]) ||
          product.image_small_url ||
          product.image_front_url
        );
      })
      .map((product: any) => {
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
  };

// Helper function to build the API URL based on current filters
const buildApiUrl = (pageNum: number, isSearch: boolean, isCategoryFilter: boolean): string => {
  if (isSearch && searchName) {
    return `${API_BASE_URL}/search?${FIELDS_PARAM}&page=${pageNum}&page_size=${PAGE_SIZE}&sort_by=popularity&search_terms=${encodeURIComponent(searchName)}`;
  } else if (isCategoryFilter && selectedCategory) {
    return `${API_BASE_URL}/search?${FIELDS_PARAM}&page=${pageNum}&page_size=${PAGE_SIZE}&categories_tags=${encodeURIComponent(selectedCategory)}`;
  } else {
    return `${API_BASE_URL}/search?${FIELDS_PARAM}&page=${pageNum}&page_size=${PAGE_SIZE}&sort_by=random`;
  }
};
  // Fetch categories from OpenFoodFacts API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await fetch(`${API_BASE_URL}/facets/categories.json`);
        const data = await response.json();

        if (data && data.tags && Array.isArray(data.tags)) {
          // Filter out categories that are already in CATEGORIES
          const existingCategoryNames = CATEGORIES.map(cat => cat.name.toLowerCase());

          // Sort by product count and take top 20
          const topCategories = data.tags
            .filter((tag: ApiCategory) =>
              !existingCategoryNames.includes(tag.name.toLowerCase()) &&
              tag.products > 10000) // Only show categories with at least 10,000 products
            .sort((a: ApiCategory, b: ApiCategory) => b.products - a.products)
            .slice(0, 20)
            .map((category: ApiCategory) => {
              // Use the helper function for consistent cleaning
              const displayName = cleanCategoryName(category.name);

              return {
                displayName,
                category: category.id, // Keep original ID for API calls
                products: category.products
              };
            });

          setApiCategories(topCategories);
        }
        setIsLoadingCategories(false);
      } catch (error) {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Manage infinite scroll observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && !isLoading && !isLoadingMore && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isLoading, isLoadingMore, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1
    });

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [handleObserver]);

  // Listen to searchName changes from context
  useEffect(() => {
    if (searchName && selectedCategory) {
      // If search is being used, clear category selection
      setSelectedCategory(null);
      setSelectedCategoryDisplay(null);
      localStorage.removeItem('selectedCategory');
      localStorage.removeItem('selectedCategoryDisplay');
    }
  }, [searchName]);

  // Reset pagination when search criteria change
  useEffect(() => {
    setPage(1);
    setProcessedFoodItems([]);
    setHasMore(true);
  }, [selectedCategory, searchName]);

  // Restore saved category from localStorage
  useEffect(() => {
    if (localStorage.getItem('selectedCategory') && !selectedCategory && !searchName) {
      const savedCategory = localStorage.getItem('selectedCategory') as string;
      setSelectedCategory(savedCategory);

      // Also restore the display name if available
      const savedCategoryDisplay = localStorage.getItem('selectedCategoryDisplay');
      if (savedCategoryDisplay) {
        setSelectedCategoryDisplay(savedCategoryDisplay);
      } else {
        // If no display name is saved, generate one from the category ID
        setSelectedCategoryDisplay(cleanCategoryName(savedCategory));
      }
    }
  }, [selectedCategory, searchName]);

  // Fetch more data when page changes (infinite scroll)
  useEffect(() => {
    const fetchMoreItems = async () => {
      if (page === 1) return; // Initial data load is handled by the main fetch

      try {
        setIsLoadingMore(true);

        const isSearching = !!searchName;
        const isCategoryFiltering = !!selectedCategory;
        const apiUrl = buildApiUrl(page, isSearching, isCategoryFiltering);

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.products || !Array.isArray(data.products) || data.products.length === 0) {
          setHasMore(false);
          setIsLoadingMore(false);
          return;
        }

        const newItems = processFoodItems(data.products);
        setProcessedFoodItems(prevItems => [...prevItems, ...newItems]);
        setIsLoadingMore(false);
      } catch (error) {
        setIsLoadingMore(false);
        setHasMore(false);
      }
    };

    if (page > 1) {
      fetchMoreItems();
    }
  }, [page, selectedCategory, searchName]);

  // Initial data fetch when search or category selection changes
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setIsLoading(true);
        // console.log("category: ", selectedCategory)
        setHasMore(true);
        // Handle mutual exclusivity of search and category
        if (searchName && selectedCategory) {
          setSelectedCategory(null);
          setSelectedCategoryDisplay(null);
          localStorage.removeItem('selectedCategory');
          localStorage.removeItem('selectedCategoryDisplay');
        } else if (!searchName && selectedCategory) {
          // No need to clear the search as it's already handled elsewhere
        }

        const isSearching = !!searchName;
        const isCategoryFiltering = !!selectedCategory;
        const apiUrl = buildApiUrl(1, isSearching, isCategoryFiltering);
        // console.log("URL: ", apiUrl);

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.products || !Array.isArray(data.products) || data.products.length === 0) {
          setIsLoading(false);
          setProcessedFoodItems([]);
          setHasMore(false);
          return;
        }

        const processedItems = processFoodItems(data.products);
        setProcessedFoodItems(processedItems);
        setPage(2); // Prepare for next page fetch
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setProcessedFoodItems([]);
        setHasMore(false);
      }
    };

    fetchFoodItems();
  }, [selectedCategory, searchName]);

  // Sort based on the current sort type
  useEffect(() => {
    if (processedFoodItems.length > 0) {
      const sortFoodItems = () => {
        let sortedArray = [...processedFoodItems];

        if (sortType.field === 'name') {
          sortedArray.sort((a, b) => {
            return sortType.order === 'asc'
              ? a.product_name.localeCompare(b.product_name)
              : b.product_name.localeCompare(a.product_name);
          });
        } else if (sortType.field === 'nutrition') {
          sortedArray.sort((a, b) => {
            return sortType.order === 'asc'
              ? a.nutrition_grades.localeCompare(b.nutrition_grades)
              : b.nutrition_grades.localeCompare(a.nutrition_grades);
          });
        }

        setProcessedFoodItems(sortedArray);
      };

      sortFoodItems();
    }
  }, [sortType]);

  // Event handlers
  const handleProductClick = (code: string) => {
    navigate(`/product/${code}`);
  };

  const handleCategorySelect = (categoryId: string, displayName: string) => {
    // Clear search when selecting a category
    setSearchName('');

    // Store both the category ID and display name
    localStorage.setItem('selectedCategory', categoryId.toLowerCase());
    localStorage.setItem('selectedCategoryDisplay', displayName);
    setSelectedCategory(categoryId.toLowerCase());
    setSelectedCategoryDisplay(displayName);
    setIsDropdownOpen(false);
  };

  const handlePredefinedCategorySelect = (category: string) => {
    // Clear search when selecting a category
    setSearchName('');

    localStorage.setItem('selectedCategory', category.toLowerCase());

    // Clean and store the display name for predefined categories
    const displayName = cleanCategoryName(category);
    localStorage.setItem('selectedCategoryDisplay', displayName);

    setSelectedCategory(category.toLowerCase());
    setSelectedCategoryDisplay(displayName);
  };

  // Render components
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
                isSelected={selectedCategory === category.name.toLowerCase()}
                onClick={() => handlePredefinedCategorySelect(category.name)}
              />
            ))}

            {/* More Categories Dropdown */}
            <div
              className={`relative flex flex-col items-center justify-center p-4 bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 ${isDropdownOpen ? 'border-food-red' : 'border-gray-200 hover:border-gray-300'}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center justify-center mb-2">
                {isDropdownOpen ? (
                  <ChevronUp className="w-5 h-5 text-food-red" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <span className={`text-sm font-medium ${isDropdownOpen ? 'text-food-red' : 'text-gray-700'}`}>
                More Categories
              </span>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="max-h-72 overflow-y-auto py-2">
                    {isLoadingCategories ? (
                      <div className="px-4 py-2 text-center">
                        <Loader className="h-5 w-5 animate-spin mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Loading categories...</p>
                      </div>
                    ) : apiCategories.length > 0 ? (
                      apiCategories.map((categoryItem) => (
                        <div
                          key={categoryItem.category}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${selectedCategory === categoryItem.category.toLowerCase() ? 'bg-gray-50 text-food-red font-medium' : 'text-gray-700'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategorySelect(categoryItem.category, categoryItem.displayName);
                          }}
                        >
                          {categoryItem.displayName}
                          <span className="text-xs text-gray-500 ml-1">
                            ({categoryItem.products.toLocaleString()})
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-sm text-gray-500">No additional categories found</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Food Items Section */}
        <section className="container mx-auto px-6 py-8 pb-20">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                Food Items - {selectedCategoryDisplay || (selectedCategory ? cleanCategoryName(selectedCategory) : 'All')}
                {searchName && <span className="ml-2 text-food-red">Search: "{searchName}"</span>}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {!isLoading && (
                  searchName
                    ? `Found ${processedFoodItems.length} results for "${searchName}"`
                    : `Found ${processedFoodItems.length} items`
                )}
              </p>
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <FoodItemCardSkeleton key={index} />
              ))}
            </div>)
            :
            processedFoodItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
                <p className="text-xl text-gray-600 mb-4">No food items found</p>
                {searchName && (
                  <p className="text-gray-500">
                    No results matching "{searchName}". Try a different search term.
                  </p>
                )}
                {!searchName && (
                  <p className="text-gray-500">
                    Unable to load food items. Please try selecting a different category or refresh the page.
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {processedFoodItems.map((foodItem, index) => (
                    <FoodItemCard
                      key={`${foodItem.code}-${index}`}
                      foodItem={foodItem}
                      index={index}
                      onClick={() => handleProductClick(foodItem.code)}
                    />
                  ))}

                  {/* Add skeleton loaders when loading more items */}
                  {isLoadingMore && (
                    <>
                      {[...Array(3)].map((_, index) => (
                        <FoodItemCardSkeleton key={`more-${index}`} />
                      ))}
                    </>
                  )}
                </div>

                {/* Sentinel Div */}
                <div
                  ref={loadingRef}
                  className="w-full h-16 flex items-center justify-center my-4"
                >
                  {isLoadingMore ? (
                    <div className="flex items-center">
                      <Loader className="h-5 w-5 animate-spin text-black mr-2" />
                      <p className="text-gray-600">Loading more items...</p>
                    </div>
                  ) : hasMore ? (
                    <p className="text-gray-500 text-sm">Scroll for more items</p>
                  ) : (
                    <p className="text-gray-500 text-sm">No more items to load</p>
                  )}
                </div>
              </>
            )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
