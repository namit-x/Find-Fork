import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Heart, Tag, ChevronLeft, Loader, Copy, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import Navbar from '../components/navbar';


// Type for product data
interface ProductData {
  code: string;
  product_name: string;
  image_url: string;
  categories: string;
  ingredients_text: string;
  nutriscore_grade: string;
  nutrient_levels: Record<string, string>;
  nutriments: Record<string, any>;
  labels: string[];
}

const getNutritionGradeColor = (grade: string) => {
  switch (grade.toUpperCase()) {
    case 'A': return 'bg-green-500 text-white';
    case 'B': return 'bg-green-400 text-white';
    case 'C': return 'bg-yellow-500 text-black';
    case 'D': return 'bg-orange-500 text-white';
    case 'E': return 'bg-red-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getLabelColor = (label: string) => {
  if (label.includes('vegan') || label.includes('organic')) return 'bg-green-100 text-green-800';
  if (label.includes('no-gluten')) return 'bg-blue-100 text-blue-800';
  if (label.includes('high-protein')) return 'bg-purple-100 text-purple-800';
  if (label.includes('contains')) return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-800';
};

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

const ProductDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchByCode = async () => {
      if (!code) {
        setError('No product code provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
        const data = await response.json();

        if (data.status !== 1 || !data.product) {
          setError('Product not found');
          setLoading(false);
          return;
        }

        // Process the product data
        const productData: ProductData = {
          code: data.product.code || '',
          product_name: data.product.product_name || 'Unknown Product',
          image_url: data.product.image_url || data.product.image_thumb_url || '',
          categories: safeRender(data.product.categories || data.product.categories_tags || []),
          ingredients_text: data.product.ingredients_text.replace('_', '') || 'No ingredients information available',
          nutriscore_grade: (data.product.nutriscore_grade || 'unknown').toUpperCase(),
          nutrient_levels: data.product.nutrient_levels || {},
          nutriments: data.product.nutriments || {},
          labels: Array.isArray(data.product.labels_tags)
            ? data.product.labels_tags.map((label: string) => {
              label = label.replace('en:', '');
              label = label.replace('fr:', '');
              return label;
            })
            : []
        };

        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product data');
        setLoading(false);
      }
    };

    fetchByCode();
  }, [code]);

  const copyCodeToClipboard = () => {
    if (product && product.code) {
      navigator.clipboard.writeText(product.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col items-center justify-center">
            <Loader className="h-12 w-12 animate-spin text-food-red mb-4" />
            <p className="text-xl font-medium">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "The product you're looking for doesn't exist or has been removed."}</p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-food-red transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back to Products</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{product.product_name}</h1>
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-5 w-5 text-gray-600" />
              </Button>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <Badge variant="secondary" className="flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                {product.categories.split(',')[0]}
              </Badge>
              <div className={`rounded-full px-2 py-1 text-xs font-bold ${getNutritionGradeColor(product.nutriscore_grade)}`}>
                Nutri-Score {product.nutriscore_grade}
              </div>
            </div>

            {/* Product Code */}
            <Card className="mb-4">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Product Code</h3>
                  <p className="text-base font-mono">{product.code}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyCodeToClipboard}
                  className="flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Labels */}
            {product.labels.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Labels</h3>
                <div className="flex flex-wrap gap-2">
                  {product.labels.map((label, index) => (
                    <Badge key={index} className={`${getLabelColor(label)} hover:cursor-default`}>
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{product.ingredients_text}</p>
              </CardContent>
            </Card>

            {/* Nutritional Values */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nutritional Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-y-3">
                  {Object.entries(product.nutriments)
                    .filter(([key]) =>
                      ['energy', 'fat', 'saturated-fat', 'carbohydrates', 'sugars', 'proteins', 'salt', 'fiber'].includes(key)
                    )
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between pr-4">
                        <span className="text-gray-600 capitalize">{key.replace(/-/g, ' ')}</span>
                        <span className="font-medium">{typeof value === 'number' ? `${value}${product.nutriments[`${key}_unit`] || 'g'}` : value}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Nutrient Levels */}
            {Object.keys(product.nutrient_levels).length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Nutrient Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-3">
                    {Object.entries(product.nutrient_levels).map(([key, value]) => (
                      <div key={key} className="flex justify-between pr-4">
                        <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className="font-medium capitalize">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;