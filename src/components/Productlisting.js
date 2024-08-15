import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../utils/Cartslice';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState({});
  const cart = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = (product) => {
    dispatch(addItem(product));
    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product.id]: false }));
    }, 1500); 
  }

  useEffect(() => {
    fetch('./products.json')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Listing</h1>
          <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
            <FaShoppingCart className="text-2xl text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-green-600 font-bold mt-2">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className={`mt-4 w-full py-2 px-4 rounded transition-all duration-300 ease-in-out ${
                    addedProducts[product.id]
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  disabled={addedProducts[product.id]}
                >
                  {addedProducts[product.id] ? (
                    <span className="flex items-center justify-center">
                      <FaCheck className="mr-2" /> Added to Cart
                    </span>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;