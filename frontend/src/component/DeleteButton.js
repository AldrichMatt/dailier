import { TrashIcon } from "@heroicons/react/24/outline";

export function DeleteButton({onClick}){
    return(
        <button
            className="
            mx-1
            bg-red-500
            rounded-md
            shadow-lg
            hover:bg-red-700
            "
            onClick={onClick}
            >
            <TrashIcon
            className="
            size-8
            p-1
            w-full
            text-white
            hover:text-gray-400
            "
            ></TrashIcon>
        </button>
    )
}