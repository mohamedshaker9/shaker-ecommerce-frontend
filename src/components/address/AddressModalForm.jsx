import React from 'react';
import { set, useForm } from 'react-hook-form';
import api from '../../api';
import toast from 'react-hot-toast';
import InputField from '../../shared/InputField.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearSelectedAddress, setSelectedAddress } from '../../store/slices/address-slice.jsx';

const AddressModalForm = ({ selectedAddress, setIsOpen, setUpdatedAddress}) => {

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            addressType: selectedAddress?.addressType || '',
            street: selectedAddress?.street || '',
            buildingNumber: selectedAddress?.buildingNumber || '',
            city: selectedAddress?.city || '',
            state: selectedAddress?.state || '',
            country: selectedAddress?.country || '',
            zipCode: selectedAddress?.zipCode || '',
        }
    });
    


    const onSubmit = async (data) => {
        try {
            const addressUrl = selectedAddress && selectedAddress.id ? `/addresses/${selectedAddress.id}` : '/addresses';
            console.log("Submitting address data:", data);

            let response = '';
            if (selectedAddress && selectedAddress.id) {
                 response = await api.put(addressUrl, data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                }});
                
            } else {
                 response = await api.post(addressUrl, data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                }});
            }

            if (!response.status === 201 || !response.status === 200) {
                throw new Error('Network response was not ok');
            }
          
            setUpdatedAddress(response.data);
               
            dispatch(clearSelectedAddress());
            toast.success('Address saved successfully!');
            setIsOpen(false);
        } catch (error) {
            console.error('Error saving address:', error);
            toast.error('Failed to save address. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             {errors.addressType && <span className="text-red-500 text-sm">{errors.addressType.message}</span>}
            <select
                id="addressType"
                {...register('addressType', { required: 'Address type is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select address type</option>
                <option value="HOME">HOME</option>
                <option value="WORK">WORK</option>
                <option value="OFFICE">OFFICE</option>
                <option value="SHIPPING">SHIPPING</option>
                <option value="BILLING">BILLING</option>
                <option value="OTHER">OTHER</option>
            </select>
           
            
            <InputField
                id="street"
                label="Street"
                type="text"
                errors={errors}
                register={register}
                required
                message="Street is required"
                className="w-full"
                placeholder="Enter street"
                
            />
            <InputField
                id="buildingNumber"
                label="Building Number"
                type="text"
                errors={errors}
                register={register}
                required
                message="Building number is required"
                className="w-full"
                placeholder="Enter building number"
                
            />
            <InputField
                id="city"
                label="City"
                type="text"
                errors={errors}
                register={register}
                required
                message="City is required"
                className="w-full"
                placeholder="Enter city"
                
            />
            <InputField
                id="state"
                label="State"
                type="text"
                errors={errors}
                register={register}
                required
                message="State is required"
                className="w-full"
                placeholder="Enter state"
              
            />
            <InputField
                id="country"
                label="Country"
                type="text"
                errors={errors}
                register={register}
                required
                message="Country is required"
                className="w-full"
                placeholder="Enter country"
             
            />
            <InputField
                id="zipCode"
                label="Zip Code"
                type="text"
                errors={errors}
                register={register}
                required
                message="Zip code is required"
                className="w-full"
                placeholder="Enter zip code"
              
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Save Address
            </button>
        </form>
    );
};

export default AddressModalForm;