import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
//   console.log(location);
  
  const { orderTotal = 0, orderItems = [] } = location.state || {};

  // Memoize the order summary to avoid unnecessary re-renders
  const orderSummary = useMemo(
    () => orderItems.map((item) => (
      <div key={item.id} className="flex justify-between items-center mb-2">
        <span>{item.name} x {item.quantity}</span>
        <span>${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    )),
    [orderItems]
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Order Confirmation</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">Thank you for your purchase!</h2>
          <p className="mb-4">Your order has been successfully placed and is being processed.</p>
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          {orderSummary}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
