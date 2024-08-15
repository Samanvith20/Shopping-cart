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
                <h1 className="text-3xl font-bold mb-4 text-center">Your Shopping Cart</h1>
                {cart.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="lg:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left font-semibold p-2">Product</th>
                                                <th className="text-left font-semibold p-2">Price</th>
                                                <th className="text-left font-semibold p-2">Quantity</th>
                                                <th className="text-left font-semibold p-2">Total</th>
                                                <th className="text-left font-semibold p-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item) => (
                                                <tr key={item.id} className="border-b">
                                                    <td className="py-4 p-2">
                                                        <div className="flex items-center">
                                                            <img
                                                                className="h-16 w-16 mr-4 object-cover rounded"
                                                                src={item.image}
                                                                alt={item.name}
                                                            />
                                                            <span className="font-semibold">{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 p-2">${item.price.toFixed(2)}</td>
                                                    <td className="py-4 ">
                                                        <div className="flex items-center  rounded-md">
                                                            <button
                                                                className={`px-3 py-1  ${item.quantity <= 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                                                                onClick={() => handleDecrease(item.id)}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-3 py-1">{item.quantity}</span>
                                                            <button
                                                                className="px-3 py-1  hover:bg-gray-100"
                                                                onClick={() => handleIncrease(item.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 p-2">${calculateItemTotal(item).toFixed(2)}</td>
                                                    <td className="py-4 p-2">
                                                        <button
                                                            className="text-red-500 hover:text-red-600"
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/4">
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