import React from 'react';
import ProductList from './components/Productlisting';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cartpage from './components/Cartpage';


const AppRouter=createBrowserRouter([
  {
    path:"/",
    element:<ProductList/>
  },
  {
    path:"/cart",
    element:<Cartpage/>
  }
])
function App() {
  return (
    <div className="App">
      
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
