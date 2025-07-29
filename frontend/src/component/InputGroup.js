export default function InputGroup({label, children}) {
    return (
        <div className="
        flex flex-col
        pb-2
        ">
            <label className="
            text-sm
            pb-2 px-2
            text-gray-600   
            font-semibold
            ">
                {label}
            </label>
            <div
            className="
            rounded-md
            outline outline-gray-300
            px-2 py-2
            text-sm
            focus-within:outline-violet-500
            ">
                {children}
            </div>
        </div>
    )
}