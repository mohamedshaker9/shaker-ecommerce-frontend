import { Button, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { FaExclamationTriangle } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
 

function DeleteModal({isDeleteModalOpen, setIsDeleteModalOpen, 
  onDeleteHandler, title, message}) {


   function close() {
     setIsDeleteModalOpen(false);
   }

  return (
  
      <Dialog open={isDeleteModalOpen} as="div"
       className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <DialogBackdrop className="fixed inset-0 bg-blue-600/30" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <DialogTitle className="text-lg font-semibold text-gray-900 mb-4">
             <FaExclamationTriangle className="inline mr-2 text-red-600" /> Delete {title}
            </DialogTitle>
            <p className="text-gray-600 mb-6">
              {message} 
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                onClick={close}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-900 hover:bg-gray-300 font-medium"
              >
                Cancel
              </Button>
              <Button
                onClick={onDeleteHandler}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 font-medium"
              >
                Delete
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    
    );

}


export default DeleteModal;