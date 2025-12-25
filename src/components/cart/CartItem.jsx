import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../store/slices/cart-slice.jsx';
import { MdDeleteOutline } from "react-icons/md";



const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (quantity) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ id: item.id, quantity }));
        } 
    };

    const handleRemove = () => {
        dispatch(removeFromCart(item.id));
    };

    return (
        <div className="flex items-center justify-between border-b border-gray-200 py-4 px-4">
            
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
            />

           
            <div className="flex-1 mx-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
            </div>

            
            <div className="flex items-center gap-2 border border-gray-300 rounded">
                <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                >
                    −
                </button>
                <span className="px-3 py-1">{item.quantity}</span>
                <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                >
                    +
                </button>
            </div>

          
            <div className="mx-4 min-w-max">

                 {item.specialPrice ? (
                                <div className="flex flex-col">
                                <span className="line-through mr-2 text-sm text-gray text-red-500">${Number(item.price * item.quantity).toFixed(2)}</span>
                                <span className="mr-2 font-bold text-lg text-green-500">${Number(item.specialPrice * item.quantity).toFixed(2)}</span>
                                </div>
                              ) :

                                (<p className="text-green-600 font-semibold mb-2">${Number(item.price * item.quantity).toFixed(2)}</p>)
                }

            </div>

        
            <button
                onClick={handleRemove}
                className="ml-2 text-sm px-2 py-1 bg-red-300 text-white rounded hover:bg-red-600 transition"
            >
            <MdDeleteOutline />
            </button>
        </div>
    );
};

export default CartItem;