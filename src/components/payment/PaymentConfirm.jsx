import React, { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api.js";
import { clearCart } from "../../store/slices/cart-slice.jsx";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";



const PaymentConfirm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const selectedAddress =  JSON.parse(localStorage.getItem('selectedAddress'));
    

    const search = new URLSearchParams(location.search);
    const paymentIntentId = search.get("payment_intent");


     const createOrder = async () => {
            if (!paymentIntentId) {
                setError("Missing payment intent id in URL.");
                setLoading(false);
                return;
            }
            if (!selectedAddress) {
                setError("Missing shipping address. Please complete checkout.");
                setLoading(false);
                return;
            }
            console.log("Seleceted address in PaymentSuccess:", selectedAddress);
            const body = {
                "shippingAddressId": selectedAddress.selectedAddress.id,
                "paymentIntentId": paymentIntentId,
                "paymentType": "STRIPE" //TODO get this from selected payment method in store
            };

            try {
                setLoading(true);
                setError(null);

                const token = JSON.parse(localStorage.getItem('userToken')).token;
                const res = await api.post("/orders", body,
                 {
                    
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                dispatch(clearCart());
                localStorage.removeItem('cart');
                localStorage.removeItem('selectedAddress');
                setLoading(false);
                console.log("Order created successfully:", res.data);
            } catch (err) {
                console.error("Order creation failed", err);
                const message =
                    err?.response?.data?.message || err?.message || "Order creation failed.";
                setError(message);
                setLoading(false);
            }
        };

    useEffect(() => {
       

        createOrder();
       
    }, []); 

    if (loading) {
        return <div>Finalizing payment and creating order...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col p-8 items-center justify-center max-w-md mx-auto rounded-lg shadow-lg border">
                    <div className="text-red-500 mb-4">
                        <RxCrossCircled size={50} />
                    </div>
                    
                    <h2 className="text-gray-500 font-bold text-2xl">Payment Failed</h2>
                    <p className="text-gray-500 text-xl">Your order not created</p>
                </div>
            
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col p-8 items-center justify-center max-w-md mx-auto rounded-lg shadow-lg border">
                <div className="text-green-500 mb-4">
                    <FaCheckCircle size={50} />
                </div>
                
                <h2 className="text-gray-500 font-bold text-2xl">Payment successful</h2>
                <p className="text-gray-500 text-xl">Your order has been created</p>
            </div>
            
        </div>
    );
};

export default PaymentConfirm;