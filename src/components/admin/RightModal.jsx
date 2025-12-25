import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { RxCross1 } from 'react-icons/rx';
 

function RightModal({isProductViewOpen, setIsProductViewOpen, 
  content, modalTitle, selectedItem, setSelectedItem}) {


   function close() {
     setIsProductViewOpen(false);
   }

  return (
  
      <Dialog open={isProductViewOpen} as="div"
       className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <DialogBackdrop className="fixed inset-0 bg-blue-600/30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center justify-end">
            <DialogPanel
              transition
              className="relative min-h-screen inset-0 transform overflow-hidden  bg-white p-6 shadow-xl transion-all sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] w-full"
            >
              <div className="flex flex-row justify-between items-center">  
                  <div>   
                    <DialogTitle as="h3" className="font-m text-xl font-bold text-black">
                      {modalTitle}
                    </DialogTitle>
                </div>
                <div>
                  <Button 
                    className="text-gray-500 bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={close}
                  >
                    <RxCross1 size={20} />
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                
                  {content}
                
              </div>
            </DialogPanel>
          </div>
        </div>

      </Dialog>
    
    );

}


export default RightModal;