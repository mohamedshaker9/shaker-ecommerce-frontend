import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { useState } from 'react'
import { MdDone, MdClose } from 'react-icons/md';
import Status from './Status.jsx';

export default function MyModal({isProductViewOpen, setIsProductViewOpen, product, isProductAvailable }) {

  const { id, name, image, description, price, specialPrice, quantity, category } = product;

  function close() {
    setIsProductViewOpen(false);
  }

  return (
    <>
      <Dialog open={isProductViewOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transion-all sm:max-w-[4  50px] md:max-w-[600px] lg:max-w-[900px] w-full"
            >

               <div className="aspect-4/3">
                    < img src={image} alt={name} className="mb-4 h-full w-full rounded" />
              </div>

              <div className="flex flex-row justify-between items-center">
                  <div>   
                    <DialogTitle as="h3" className="font-m text-xl font-bold text-black">
                      {name}
                    </DialogTitle>
                </div>
                <div>
                    <p className="text-s text-gray-500 bg-amber-200 rounded-2xl p-1">Category: {category}</p>
                </div>
              </div>
              
              <p className="mt-2 text-md text-gray-500">
                {description}
              </p>
              <div className="flex flex-row  items-center my-6"> 
                        <div>
                          {specialPrice ? (
                            <>
                             <span className="line-through mr-2 text-md text-gray">${Number(price).toFixed(2)}</span>
                             <span className="mr-2 font-bold text-2xl text-green-500">${Number(specialPrice).toFixed(2)}</span>
                            </>
                           ) :

                             (<p className="text-green-600 font-semibold mb-2">${Number(price).toFixed(2)}</p>)
                          }
                          </div>
                          <div className="">
                            {isProductAvailable? <Status 
                            text="In Stock"
                            icon={MdDone}
                            color="text-green-700"
                            bg="bg-green-100"
                            /> : <Status
                            text="Out of Stock"
                            icon={MdClose}
                            color="text-red-700"
                            bg="bg-red-100"
                            />}
                          </div>
              </div>
              <div className="flex flex-row mt-4 justify-between items-center">

                <div>
                  <button className={`mt-2 px-4 py-2 rounded text-xs ${isProductAvailable ? 
                            'bg-blue-500 text-white hover:bg-blue-600' :
                             'bg-gray-400 text-gray-700 cursor-not-allowed'}`} disabled={!isProductAvailable}>
                            {isProductAvailable ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                </div>
                <div>
                <Button
                  className="inline-flex flex--reverse items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={close}
                >
                  Close
                </Button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
