import { PencilIcon } from "@heroicons/react/24/outline";

export function EditButton({onClick}){
    return(
        <button
            className="
            mx-1
            bg-yellow-500
            rounded-md
            shadow-lg
            hover:bg-yellow-700
            "
            onClick={onClick}
            >
            <PencilIcon
            className="
            size-8
            p-1
            w-full
            text-white
            hover:text-gray-400
            "
            ></PencilIcon>
        </button>
    )
}