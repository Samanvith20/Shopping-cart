

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/Cartslice';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const dispatch= useDispatch();
  const navigate=useNavigate();
  const addToCart=(item)=>{
    dispatch(addItem(item))
    alert("Item added to cart")
    navigate("/cart")
}

  useEffect(() => {
    fetch('./products.json')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  

  return (
    <>
    <h1 className="text-3xl font-bold text-center my-8">Product Listing</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
       
      {products.map(product => (
        <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold mt-2">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ProductList;
