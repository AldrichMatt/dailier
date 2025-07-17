import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export const ToastSuccess = (message) => toast.success(({ closeToast }) => 
      <div className="flex sm:pb-4 items-center">
        <div className="flex px-2 pt-4">
          <div className="mt-3 items-center sm:mt-0">
            <span as="h3" className="text-center text-gray-800">
              {message}
            </span>
          </div>
        </div>
      </div>
      )