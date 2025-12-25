import { useState } from 'react';
import { Radio, RadioGroup, Label, Description } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethod } from '../../store/slices/payment-method-slice.jsx';

const paymentOptions = [
    { id: 'STRIPE', name: 'STRIPE', description: 'Pay with credit/debit card' },
    { id: 'CASH', name: 'Cash On Delivery', description: 'Pay when you receive' }
];

const PaymentMethod = () => {
    const dispatch = useDispatch();
    const paymentMethod = useSelector((state) => state.paymentMethod);
    const [selected, setSelected] = useState(paymentMethod || 'STRIPE');

    const handlePaymentChange = (value) => {
        setSelected(value);
        dispatch(setPaymentMethod(value));
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
            
            <RadioGroup value={selected} onChange={handlePaymentChange}>
                <Label className="sr-only">Select Payment Method</Label>
                <div className="space-y-4">
                    {paymentOptions.map((option) => (
                        <Radio
                            key={option.id}
                            value={option.id}
                            className="group relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none border-2 border-gray-200 data-[focus]:ring-2 data-[focus]:ring-offset-2 data-[focus]:ring-blue-500 data-[checked]:bg-blue-600 data-[checked]:text-white bg-white"
                        >
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                    <div className="text-sm">
                                        <Label className="font-medium group-data-[checked]:text-white text-gray-900">
                                            {option.name}
                                        </Label>
                                        <Description className="inline group-data-[checked]:text-blue-100 text-gray-500">
                                            {option.description}
                                        </Description>
                                    </div>
                                </div>
                                <div className="shrink-0 text-white opacity-0 group-data-[checked]:opacity-100">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
                                        <path
                                            d="M7 13l3 3 7-7"
                                            stroke="#fff"
                                            strokeWidth={1.5}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Radio>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
};

export default PaymentMethod;
