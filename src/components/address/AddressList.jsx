import { useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import AddressInfo from './AddressInfo';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../api';
import AddressDialog from './AddressDialog';
import { setSelectedAddress } from '../../store/slices/address-slice.jsx';


export default function AddressList() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(0);
    const selectedAddress = useSelector((state) => state.selectedAddress);
    const dispatch = useDispatch();
    const [updatedAddress, setUpdatedAddress] = useState(null);

    const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

    const handleSelectedAddress = (address) => {
        console.log("Selected address:", address);
        dispatch(setSelectedAddress({address}));
        setSelectedAddressId(address.id);
    }

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('userToken')).token;
                const response = await api.get('/addresses', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                console.log(response)
                if (!response.status === 200) {
                    throw new Error('Failed to fetch addresses');
                }
                const data = response.data;
                setAddresses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [updatedAddress]);



    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="w-full max-w-xl mx-auto p-4 ">
            <h2 className="text-2xl text-center font-bold mb-6">Select Address</h2>
            
            <div className="space-y-4">
                {loading ? (
                         <div>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </div>
                ) : addresses.length > 0 ? (
                    addresses.map((address) => (
                        <div onClick={() => handleSelectedAddress(address)} key={address.id}>
                            <AddressInfo 
                            isSelected={selectedAddressId === address.id}  
                            address={address} 
                            isEditAddressDialogOpen={isAddressDialogOpen}
                            setIsEditDialogOpen={setIsAddressDialogOpen}
                            setUpdatedAddress={setUpdatedAddress} />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No addresses found</p>
                )}

            </div>
            <button className="flex justify-self-center bg-blue-500 hover:bg-blue-600 cursor-pointer rounded px-3 py-2 mt-2 " 
                  onClick={() => setIsAddressDialogOpen(true)}>Add Address</button>

                {
                    isAddressDialogOpen && <AddressDialog isOpen={isAddressDialogOpen} setUpdatedAddress={setUpdatedAddress} setIsOpen={setIsAddressDialogOpen}  />
                }
            
        </div>
    )
}``