
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProductById, Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingCart, ChevronRight, ChevronLeft } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const productId = id ? parseInt(id, 10) : 0;
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Return to Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <nav className="mb-8">
          <ol className="flex items-center text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-accent-500">Home</Link>
            </li>
            <ChevronRight className="h-4 w-4 mx-2" />
            <li>
              <Link to="/products" className="hover:text-accent-500">Products</Link>
            </li>
            <ChevronRight className="h-4 w-4 mx-2" />
            <li>
              <Link to={`/products?category=${product.category}`} className="hover:text-accent-500 capitalize">{product.category}</Link>
            </li>
            <ChevronRight className="h-4 w-4 mx-2" />
            <li className="text-gray-900 font-medium truncate">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="text-sm text-gray-600 ml-2">
                {product.rating.toFixed(1)} ({Math.floor(product.rating * 10)} reviews)
              </span>
            </div>
            
            <div className="text-2xl font-bold text-navy-800 mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-gray-700 mb-8">{product.description}</p>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button 
                  onClick={decreaseQuantity}
                  className="border border-gray-300 rounded-l px-3 py-2 hover:bg-gray-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border-t border-b border-gray-300 text-center w-16 py-2"
                />
                <button 
                  onClick={increaseQuantity}
                  className="border border-gray-300 rounded-r px-3 py-2 hover:bg-gray-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent-500 hover:bg-accent-600 flex items-center gap-2 px-8 btn-hover"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-hover"
              >
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
          
          <div className="bg-white shadow-sm rounded-lg p-6">
            <p className="text-gray-700 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel purus vel ante pellentesque volutpat. Donec feugiat sem non orci finibus, vel fermentum dui iaculis. Maecenas dapibus bibendum feugiat. In et mauris vel mi aliquam dapibus. Duis pharetra consequat congue.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Premium quality materials</li>
                  <li>Durable construction</li>
                  <li>Easy maintenance</li>
                  <li>Modern, timeless design</li>
                  <li>Versatile use cases</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Specifications</h3>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-32">Category:</span>
                    <span className="text-gray-600 capitalize">{product.category}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-32">Brand:</span>
                    <span className="text-gray-600">NexShop</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-32">Material:</span>
                    <span className="text-gray-600">Premium</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-32">Warranty:</span>
                    <span className="text-gray-600">1 Year</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-32">Origin:</span>
                    <span className="text-gray-600">Imported</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
