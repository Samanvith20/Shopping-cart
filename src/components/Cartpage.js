import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { removeItem, increaseQuantity, decreaseQuantity } from '../utils/Cartslice'

const Cartpage = () => {
    const cart = useSelector((store) => store.cart.items)
    const dispatch = useDispatch()

    const handleDelete = (itemId) => {
        dispatch(removeItem(itemId))
    }

    const handleIncrease = (itemId) => {
        dispatch(increaseQuantity(itemId))
    }

    const handleDecrease = (itemId) => {
        const item = cart.find(item => item.id === itemId)
        if (item && item.quantity > 1) {
            dispatch(decreaseQuantity(itemId))
        }
    }

    const calculateItemTotal = (item) => {
        return item.price * item.quantity
    }

    const orderTotal = cart.reduce((total, item) => total + calculateItemTotal(item), 0)

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl flex justify-center items-center md:text-3xl font-bold mb-4 ">Your Shopping Cart</h1>
                {cart.length > 0 ? (
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <div className="hidden md:grid md:grid-cols-6 md:gap-4 mb-4 font-semibold">
                                    <div className="col-span-2">Product</div>
                                    <div>Price</div>
                                    <div>Quantity</div>
                                    <div>Total</div>
                                    <div>Remove</div>
                                </div>
                                {cart.map((item) => (
                                    <div key={item.id} className="mb-6 md:mb-4 md:grid md:grid-cols-6 md:gap-4 md:items-center border-b pb-4">
                                        <div className="flex items-center mb-4 md:mb-0 col-span-2">
                                            <img
                                                className="h-16 w-16 mr-4 object-cover rounded"
                                                src={item.image}
                                                alt={item.name}
                                            />
                                            <span className="font-semibold">{item.name}</span>
                                        </div>
                                        <div className="mb-2 md:mb-0">
                                            <span className="md:hidden font-semibold mr-2">Price:</span>
                                            ${item.price.toFixed(2)}
                                        </div>
                                        <div className="flex items-center mb-2 md:mb-0">
                                            <span className="md:hidden font-semibold mr-2">Quantity:</span>
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    className={`px-3 py-1 border-r ${item.quantity <= 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                                                    onClick={() => handleDecrease(item.id)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1">{item.quantity}</span>
                                                <button
                                                    className="px-3 py-1 border-l hover:bg-gray-100"
                                                    onClick={() => handleIncrease(item.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-2 md:mb-0">
                                            <span className="md:hidden font-semibold mr-2">Total:</span>
                                            ${calculateItemTotal(item).toFixed(2)}
                                        </div>
                                        <div>
                                        <span className="md:hidden font-semibold mr-2">Remove</span>
                                            <button
                                                className="text-red-500 hover:text-red-600 ml-4"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>${orderTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Shipping</span>
                                    <span>$0.00</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">${orderTotal.toFixed(2)}</span>
                                </div>
                                <Link
                                    to="/checkout"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full block text-center hover:bg-blue-600"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-xl mb-4">Your cart is empty</p>
                        <Link
                            to="/"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cartpage