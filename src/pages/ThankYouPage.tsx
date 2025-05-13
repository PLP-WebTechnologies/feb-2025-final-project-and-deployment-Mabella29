
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  // Redirect to homepage if user refreshes the thank you page
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 300000); // 5 minutes

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h1>
          
          <p className="text-gray-600 mb-8">
            Your order has been received and is now being processed. We've sent a confirmation email with all the details.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="mb-4">
              <span className="block text-sm text-gray-500">Order Number</span>
              <span className="text-lg font-medium">{orderNumber}</span>
            </div>
            
            <div>
              <span className="block text-sm text-gray-500">Estimated Delivery</span>
              <span className="text-lg font-medium">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button asChild className="w-full bg-accent-500 hover:bg-accent-600 btn-hover">
              <Link to="/" className="flex items-center justify-center">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/account">View Your Orders</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ThankYouPage;
