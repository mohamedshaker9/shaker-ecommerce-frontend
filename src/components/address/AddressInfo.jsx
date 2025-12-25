import React from 'react';
import { Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddressDialog from './AddressDialog.jsx';
import { useState } from 'react';
import api from '../../api.js';
import { clearSelectedAddress } from '../../store/slices/address-slice.jsx';
import { useDispatch } from 'react-redux';

const AddressInfo = ({address, isSelected, setUpdatedAddress}) => {

     const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
     const dispatch = useDispatch();
     const handleEdit = (address) => () => {
        setIsAddressDialogOpen(true);
     }

    const handleDelete = async (addressId) => {
        try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    console.error('No authentication token found');
                    return;
                }
                
                const response = await api.delete(`/addresses/${addressId}`, {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                    }});
                if (response.status === 204) {
                    dispatch(clearSelectedAddress());
                    setUpdatedAddress(addressId);
                }
            } catch (error) {
                console.error('Failed to delete address:', error);
                if (error.response?.status === 401) {
                    console.error('Unauthorized - please login again');
                } else if (error.response?.status === 404) {
                    console.error('Address not found');
                } else {
                    console.error('An error occurred while deleting the address');
                }
        }
        
    }


    if (!address) {
        return (
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-center gap-2 text-gray-500">
            <LocationOnIcon className="text-gray-400" />
            No address information available
            </div>
        );
    }

    return (
        <div className={`p-4 border border-gray-200 rounded-lg bg-white shadow-sm ${isSelected ? 'border-green-500' : ''}`} >
            <AddressDialog isOpen={isAddressDialogOpen} setIsOpen={setIsAddressDialogOpen} selectedAddress={address} setUpdatedAddress={setUpdatedAddress} />

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{address.addressType}</h3>
               
                    <div className="flex gap-2 mb-3">
                        <IconButton onClick={handleEdit(address)} size="small" color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(address.id)} size="small" color="error">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                
            </div>
            
            
            <div className="space-y-2 text-gray-700">
                <p>
                    <span className="font-medium">Street:</span> {address.street}
                </p>
                <p>
                    <span className="font-medium">Building:</span> {address.buildingNumber}
                </p>
                <p>
                    <span className="font-medium">City:</span> {address.city}
                </p>
                <p>
                    <span className="font-medium">State:</span> {address.state}
                </p>
                <p>
                    <span className="font-medium">Country:</span> {address.country}
                </p>
                <p>
                    <span className="font-medium">ZIP Code:</span> {address.zipCode}
                </p>
            </div>
        </div>
    );
};

export default AddressInfo;