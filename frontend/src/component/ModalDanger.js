'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ModalDanger({message}) {
  const [open, setOpen] = useState(true)

  console.log(message);
  
  return (
      <Dialog open={open} onClose={setOpen} className="relative z-10">
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
              sm:my-8 sm:w-full sm:max-w-48 sm:items-center sm:max-h-xs
              data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-2 sm:pb-4">
                <div className="sm:flex sm:items-center sm:justify-end">
                  <button
                    type='button'
                    onClick={() => setOpen(false)}
                    className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 transition"
                    aria-label="Close modal"
                  >
                    <XMarkIcon aria-hidden="true" className="size-4 text-gray-600" />
                  </button>
                </div>
                <div className="sm:flex sm:items-center sm:justify-center pt-5">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                  </div>
                </div>
                <div className="sm:flex sm:items-center sm:justify-center pt-4">
                  <div className="mt-3 sm:mt-0">
                    <DialogTitle as="h3" className="text-center font-semibold text-gray-900">
                      {message}
                    </DialogTitle>
                  </div>
                </div>
              </div>

            </DialogPanel>
          </div>
        </div>
      </Dialog>
  )
}
