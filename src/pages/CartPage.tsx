
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, Trash, ArrowRight } from "lucide-react";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="hidden sm:grid grid-cols-6 bg-gray-50 p-4 text-sm font-medium text-gray-500">
                <span className="col-span-3">Product</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:items-center">
                    <div className="col-span-3 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <Link to={`/product/${item.id}`} className="font-medium text-navy-800 hover:text-accent-500">
                          {item.name}
                        </Link>
                        <div className="sm:hidden mt-1 flex justify-between">
                          <span className="text-gray-600">${item.price.toFixed(2)}</span>
                          <span className="text-gray-600">x{item.quantity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center hidden sm:block">
                      ${item.price.toFixed(2)}
                    </div>

                    <div className="mt-4 sm:mt-0 flex items-center justify-center">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="border border-gray-300 rounded-l p-1 hover:bg-gray-100"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="border-t border-b border-gray-300 w-10 py-1 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="border border-gray-300 rounded-r p-1 hover:bg-gray-100"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end">
                      <span className="font-medium sm:mr-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/products" className="flex items-center">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
              <Button variant="outline" onClick={clearCart} className="text-red-500 border-red-300 hover:bg-red-50">
                Clear Cart
              </Button>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(totalPrice * 1.1).toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-accent-500 hover:bg-accent-600 btn-hover" asChild>
                <Link to="/checkout" className="flex items-center justify-center">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              
              <div className="mt-6">
                <h3 className="font-medium text-sm mb-2">We Accept</h3>
                <div className="flex space-x-2">
                  <div className="bg-white p-2 rounded shadow-sm">
                    <svg className="h-8 w-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <rect width="32" height="32" fill="#016FD0" />
                      <path d="M14.2 10H17.8L16 15.2L14.2 10Z" fill="white" />
                      <path d="M26.5 21H24L24.5 19.5H21.5L21 21H17L20 11H24L26.5 21Z" fill="white" />
                      <path d="M6.5 11H11.4L12 13.5L12.5 11H16L13.5 21H10L6.5 11Z" fill="white" />
                    </svg>
                  </div>
                  <div className="bg-white p-2 rounded shadow-sm">
                    <svg className="h-8 w-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <rect width="32" height="32" rx="3" fill="#F3F3F3" />
                      <path d="M22 11H18V21H22V11Z" fill="#FF5A00" />
                      <path d="M18.5 16C18.5 14 19.5 12.2 21 11C19.6 9.8 17.8 9 16 9C12 9 9 12 9 16C9 20 12 23 16 23C17.8 23 19.5 22.2 21 21C19.5 19.8 18.5 18 18.5 16Z" fill="#EB001B" />
                      <path d="M30 16C30 20 27 23 23 23C21.2 23 19.5 22.2 18 21C19.5 19.8 20.5 18 20.5 16C20.5 14 19.5 12.2 18 11C19.5 9.8 21.2 9 23 9C27 9 30 12 30 16Z" fill="#F79E1B" />
                    </svg>
                  </div>
                  <div className="bg-white p-2 rounded shadow-sm">
                    <svg className="h-8 w-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <rect width="32" height="32" rx="3" fill="#F3F3F3" />
                      <path d="M24.5 16C24.5 18.5 22.5 20.5 20 20.5C17.5 20.5 15.5 18.5 15.5 16C15.5 13.5 17.5 11.5 20 11.5C22.5 11.5 24.5 13.5 24.5 16Z" fill="#0070BA" />
                      <path d="M7.5 11.5H11.5C13 11.5 14 12.5 14 14C14 15.5 13 16.5 11.5 16.5H9.5V20.5H7.5V11.5ZM9.5 14.5H10.5C11 14.5 11.5 14.5 11.5 14C11.5 13.5 11 13.5 10.5 13.5H9.5V14.5Z" fill="#003087" />
                      <path d="M25 11.5H28C29.5 11.5 30.5 12.5 30.5 14C30.5 15.5 29.5 16.5 28 16.5H27V20.5H25V11.5ZM27 14.5H27.5C28 14.5 28.5 14.5 28.5 14C28.5 13.5 28 13.5 27.5 13.5H27V14.5Z" fill="#0070BA" />
                    </svg>
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

export default CartPage;
