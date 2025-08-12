import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ModalConfirm({state, message, onConfirm, onClose}) {
  const confirmColorClass = {
  danger: 'bg-red-600 hover:bg-red-500',
  notify: 'bg-yellow-600 hover:bg-yellow-500',
  confirm: 'bg-green-600 hover:bg-green-500',
}[state] || 'bg-gray-600 hover:bg-gray-500';
  const iconMap ={
      danger : <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />, 
      notify : <ExclamationCircleIcon aria-hidden="true" className="size-6 text-yellow-600" />,
      confirm : <CheckCircleIcon aria-hidden="true" className="size-6 text-green-600" />,
  }[state] || <ExclamationCircleIcon aria-hidden="true" className="size-6 text-gray-600" />
  return (
      <Dialog open={true} onClose={onClose} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="
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
              sm:my-8 sm:w-full sm:max-w-72 sm:items-center sm:max-h-xs
              data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="
              flex flex-col flex-shrink
              bg-white px-4 pt-2 sm:pb-4">
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
                <div className="sm:flex sm:items-center sm:justify-center pt-5">
                    {(() => {
                        switch (state) {
                            case 'danger' :
                              return (
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    {iconMap}    
                                </div>
                              )
                            case "notify" : 
                              return (
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:size-10">
                                    {iconMap}    
                                </div>
                              )
                            case 'confirm' :
                              return (
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                                    {iconMap}    
                                </div>
                              )
                            default:
                              return (
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:size-10">
                                    {iconMap}    
                                </div>
                              )
                        }
                    })()}
                </div>
                <div className="sm:flex sm:items-center sm:justify-center pt-4">
                  <div className="mt-3 sm:mt-0">
                    <DialogTitle className="text-center font-semibold text-sm text-gray-900">
                      {message}
                    </DialogTitle>
                  </div>
                </div>
              </div>
            <div className="bg-gray-50 px-4 py-3 justify-center sm:flex sm:flex-row sm:px-6">
                <button
                  type="button"
                  onClick={onConfirm}
                  className={`${confirmColorClass} inline-flex w-full justify-center rounded-md px-3 py-2 mx-1 text-sm font-semibold text-white shadow-xs sm:w-auto`}
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
          </div>
        </div>
      </Dialog>
  )
}
