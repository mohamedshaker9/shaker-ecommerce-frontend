import React, { useState } from 'react';
import OrderTable from './OrderTable';


export default function Orders() {
    const emptyOrder = false;
    
    return (
        <div className=" p-6 min-h-screen">
            <h2 className="text-3xl font-semibold text-center mb-4">Orders</h2>
           {
            emptyOrder ? (
                <div className="flex flex-col items-center justify-center ">
                    <h2 className="text-3xl font-semibold mb-4">No Orders Placed Yet</h2>
                </div>
            ) : ( <OrderTable /> ) 
           }
            
        </div>
    );
}