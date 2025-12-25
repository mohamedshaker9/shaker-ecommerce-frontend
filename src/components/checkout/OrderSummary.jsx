import React from 'react';
import { useSelector } from 'react-redux';


const OrderSummary = () => {
    const { items } = useSelector((state) => state.cart);
    const { selectedAddress } = useSelector((state) => state.selectedAddress);
    const { paymentMethod } = useSelector((state) => state.paymentMethod);

    const calculateSubtotal = () => {
        return items.reduce((total, item) => {
            const price = item.specialPrice || item.price;
            return total + price * item.quantity;
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const shipping = 10.00;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Items</h3>
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                <p className="font-semibold">
                                    ${(item.specialPrice || item.price).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shipping Address */}
            {selectedAddress && (
                <div className="mb-6 pb-6 border-b">
                    <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                    <p className="text-gray-700">
                        {selectedAddress.buildingNumber}, {selectedAddress.street}
                        <br />
                        {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
                        <br />
                        {selectedAddress.country}
                    </p>
                </div>
            )}

            {/* Payment Method */}
            {paymentMethod && (
                <div className="mb-6 pb-6 border-b">
                    <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                    <p className="text-gray-700 capitalize">{paymentMethod}</p>
                </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                        ${total.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;