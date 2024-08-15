
import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Cartslice";
 const userStore = configureStore({
    reducer:{
        cart: CartReducer,
    }
 })
  export default userStore