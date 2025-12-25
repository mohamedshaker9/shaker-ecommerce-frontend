import React from 'react';
import { set, useForm } from 'react-hook-form';
import api from '../../../api';
import toast from 'react-hot-toast';

const OrderUpdateForm = ({ selectedOrder, setSelectedOrder, setUpdateRowStatus }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            orderStatus: selectedOrder?.status 
        }
    });
    


    const onSubmit = async (data) => {
        try {
            
            console.log("Submitting order data:", data);

            let response = await api.patch(`/orders/${selectedOrder.id}/status?status=${data.orderStatus}`, data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                }});
                

            if (!response.status === 201 || !response.status === 200) {
                throw new Error('Network response was not ok');
            }
            
            setSelectedOrder({...selectedOrder, status: response.data.status});
            setUpdateRowStatus(response.data.status);

            toast.success('Order updated successfully!');
        } catch (error) {
            console.error('Error updating order:', error.response.data.message);
            toast.error(`Failed to update order. ${error.response.data.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             {errors.orderStatus &&
                 <span className="text-red-500 text-sm">{errors.orderStatus.message}</span>
            }
            <select
                id="orderStatus"
                {...register(
                    'orderStatus', { required: 'Order status is required' })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                { /* TODO: get from backend enum */ }
                <option value="">Select order status</option>
                <option value="CREATED">CREATED</option>
                <option value="PAYMENT_SUCCESS">PROCESPAYMENT_SUCCESSING</option> 
                <option value="PAYMENT_FAILED">PAYMENT_FAILED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="REFUNDED">REFUNDED</option>
            </select>
           
           
            <button type="submit" 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer hover:shadow-lg">
                Update Order 
            </button>
        </form>
    );
};

export default OrderUpdateForm;