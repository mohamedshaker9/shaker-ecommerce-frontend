import React, { use, useState } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Box,
    Container,
} from '@mui/material';
import { toast, Toaster } from 'react-hot-toast';

import { useSelector } from 'react-redux';
import AddressList from '../address/AddressList.jsx';
import PaymentMethod from '../payment/PaymentMethod.jsx';
import OrderSummary from './OrderSummary.jsx';
import StripePayment from '../payment/StripePayment.jsx';


const steps = ['Address', 'Payment Method', 'Order Summary', 'Payment'];

const Checkout = () => {
    
    const [activeStep, setActiveStep] = useState(0);
   // const [addressNotSelectedError, setAddressNotSelectedError] = useState(false);
    const selectedAddress = useSelector((state) => state.selectedAddress.selectedAddress);
    const totalAmount = useSelector((state) => state.cart.totalPrice);

    const handleNext = () => {
        if (activeStep === 0) {
            if (!selectedAddress || !selectedAddress.id) {
                toast.error('Please select  an address to proceed.');
                return;
            }
        }
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <AddressList />;
            case 1:
                return <PaymentMethod />;
            case 2:
                return <OrderSummary />;
            case 3:
                //TODO return payment component based on selected payment method
                return <StripePayment totalAmount={totalAmount}/>;
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="md" className="py-14">
            <Toaster
                    position="top-center"
                    reverseOrder={false}
            />
           

            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div className="my-4 min-h-[300px]">
                {renderStepContent(activeStep)}
            </div>

            <div className="flex justify-between gap-2 fixed bottom-0 left-0 w-full bg-white p-4 border-t">
                <Button 
                    variant="outlined"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className="min-w-[120px]"
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={activeStep === steps.length - 1}
                    className="min-w-[120px]"
                >
                    {activeStep === 2 ? 'Place Order' : 'Next'}
                </Button>
            </div>
        </Container>
    );
};

export default Checkout;