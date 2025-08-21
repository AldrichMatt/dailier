import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export function ButtonType({type, onClick}){
    switch (type) {
        case "delete":
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
        case "edit" :
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

    case "confirm" : 
    return(
        <button
            className="
            mx-1
            bg-green-500
            rounded-md
            shadow-lg
            hover:bg-green-700
            "
            onClick={onClick}
            >
            <CheckIcon
            className="
            size-8
            p-1
            w-full
            text-white
            hover:text-gray-400
            "
            ></CheckIcon>
        </button>
    )
        default:
            break;
    }
    
}