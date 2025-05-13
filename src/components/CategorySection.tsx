
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    description: "The latest gadgets and tech innovations",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "clothing",
    name: "Clothing",
    description: "Stylish apparel for every occasion",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Complete your look with premium accessories",
    image: "https://images.unsplash.com/photo-1586495985096-787929ae9c9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Elevate your living space with modern design",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Shop By Category</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Explore our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative rounded-lg overflow-hidden shadow-md h-64 product-card-hover"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-gray-200 text-sm mb-4">{category.description}</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  asChild
                  className="w-fit bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20"
                >
                  <Link to={`/products?category=${category.id}`}>
                    Browse {category.name}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
