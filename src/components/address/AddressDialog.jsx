import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import AddressModalForm from './AddressModalForm';


function AddressDialog({selectedAddress, isOpen, setIsOpen, setUpdatedAddress}) {
  
    
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Add New Address Form</DialogTitle>
            <Description>Please enter your new address details below.</Description>
            <p>Fill out the form to add a new address to your account.</p>
            <AddressModalForm selectedAddress={selectedAddress} setIsOpen={setIsOpen} setUpdatedAddress={setUpdatedAddress} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default AddressDialog;