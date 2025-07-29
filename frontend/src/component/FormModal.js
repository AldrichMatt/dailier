import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function FormModal({title, onClose, children, handleSubmit}) {
  return (
      <Dialog open={true} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="
          fixed 
          inset-0 
          bg-gray-500/75 
          transition-opacity 
          data-closed:opacity-0 
          data-enter:duration-300 
          data-enter:ease-out 
          data-leave:duration-200 
          data-leave:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex sm:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <form onSubmit={handleSubmit} method='post'>
            <DialogPanel
              transition
              className="
              flex flex-col
              px-7
              relative 
              transform 
              overflow-hidden 
              rounded-lg 
              bg-white 
              text-left 
              shadow-xl 
              transition-all 
              data-closed:translate-y-4 
              data-closed:opacity-0 
              data-enter:duration-300 
              data-enter:ease-out 
              data-leave:duration-200 
              data-leave:ease-in 
              sm:my-8 sm:max-w-3xl sm:items-center sm:max-h-xs
              data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-2 sm:pb-4 flex flex-col flex-grow">
                {/* title goes here */}
                    {title}
                <div className="sm:flex sm:items-center sm:justify-end">
                  <button
                    type='button'
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 transition"
                    aria-label="Close modal"
                    >
                    <XMarkIcon aria-hidden="true" className="size-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex pt-4">
                  <div className="mt-3 sm:mt-0">
                    <DialogTitle as="h3" className="text-left text-gray-600">
                            {children}
                    </DialogTitle>
                  </div>
                </div>
                
              </div>
            <div className="flex flex-row pb-3 w-full justify-end">
                <button
                  type="submit"
                  data-autofocus
                  className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 mx-1 text-sm font-semibold text-white shadow-xs hover:bg-green-600 sm:mt-0 sm:w-auto"
                  >
                  Confirm
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={onClose}
                  className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 mx-1 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                  Cancel
                </button>
              </div>
            </DialogPanel>
            </form>
          </div>
        </div>
      </Dialog>
  )
}
