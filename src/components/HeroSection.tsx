
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Discover Premium Quality Products
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Shop the latest trends and innovative products with free shipping and hassle-free returns.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent-500 hover:bg-accent-600 text-white px-8">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-300 to-accent-600 rounded-lg blur opacity-75"></div>
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Featured Product"
                className="relative rounded-lg shadow-xl w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
