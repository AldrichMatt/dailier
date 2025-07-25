export default function SelectInput({label, name, children}){
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
            <select className="
            rounded-md
            outline outline-gray-300
            px-2 py-2
            text-sm
            "
            >
                {children}
            </select>
        </div>
    )
}