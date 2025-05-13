
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, Product } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal } from "lucide-react";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get initial category from URL if present
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }

    // Apply initial filtering
    applyFilters();
  }, [searchParams]);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, priceRange]);

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by categories if any are selected
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        // Remove category if already selected
        const result = prev.filter(c => c !== category);
        // Update URL
        if (result.length === 0) {
          searchParams.delete("category");
        } else {
          searchParams.set("category", result.join(","));
        }
        setSearchParams(searchParams);
        return result;
      } else {
        // Add category if not selected
        const result = [...prev, category];
        searchParams.set("category", result.join(","));
        setSearchParams(searchParams);
        return result;
      }
    });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const clearFilters = () => {
    setPriceRange([0, 300]);
    setSelectedCategories([]);
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-navy-800">Products</h1>
          <Button 
            variant="outline" 
            className="md:hidden flex items-center gap-2"
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-full md:w-64 md:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                <Button variant="ghost" onClick={clearFilters} className="text-sm text-gray-500">
                  Clear all
                </Button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {uniqueCategories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox 
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label 
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm capitalize"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-3">
                  <h3 className="font-medium">Price Range</h3>
                  <span className="text-sm text-gray-600">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 300]}
                  max={300}
                  step={5}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={handlePriceChange}
                  className="my-6"
                />
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">Showing {filteredProducts.length} results</p>
              <div className="flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <span className="text-sm">Sort by:</span>
                <select className="ml-2 border-b border-gray-300 bg-transparent py-1 px-2 text-sm focus:outline-none">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
