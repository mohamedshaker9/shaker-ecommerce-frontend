import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { MdShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import {formatPrice} from "../../utils/FormatPrice"
import api from '../../api';
import { useState } from 'react';

export default function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.totalQuantity);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const totalSepcialPrice = useSelector((state) => state.cart.specialPrice);

    const [loadingSaveCartToBackend, setLoadingSaveCartToBackend] = useState(false);
    const [error, setError] = useState(null);

    const handleSaveCartToBackend = () => {
        saveCartToBackend(cartItems);
        
    };

    const saveCartToBackend = (cartItems) => {
            setLoadingSaveCartToBackend(true);
            setError(null);

            api.post('/carts', cartItems)
            .then(response => {
                console.log('Cart saved successfully:', response.data);
                setLoadingSaveCartToBackend(false);
            })
            .catch(error => {
                console.error('Error saving cart:', error);
                setError(error.message || 'Failed to save cart');
                setLoadingSaveCartToBackend(false);
            });
    }


    console.log(cartItems);
    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-3xl text-gray-500">Your cart is empty</p>
                <Link to="/products" className="flex items-center gap-3 mr-4 text-2xl font-bold text-blue-600"> <FaArrowLeftLong className="text-3xl pt-2"/> Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 class = "flex items-center gap-2 text-4xl font-bold text-gray-600 mb-2"> <MdShoppingCart /><span>Your Cart</span></h1>

                <div className="bg-white rounded-lg shadow">
                    <div className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Sub-Total:</span>
                            <span className="text-2xl font-bold text-green-600">
                             {totalSepcialPrice ? (
                                <div className="flex flex-col">
                                <span className="line-through mr-2 text-sm text-gray">{formatPrice(Number(totalPrice).toFixed(2))}</span>
                                <span className="mr-2 font-bold text-lg text-green-500">{formatPrice(Number(totalSepcialPrice).toFixed(2))}</span>
                                </div>
                              ) :

                                (<p className="text-green-600 font-semibold mb-2">{formatPrice(Number(totalPrice).toFixed(2))}</p>)
                              }
 
                            </span>
                        </div>
                            <Link to="/checkout" onClick={handleSaveCartToBackend} className="flex justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition">
                                Proceed to Checkout
                            </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}