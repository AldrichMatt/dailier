export const Card = ({title, children}) => {
    return(
        <div className="
        flex flex-col flex-grow
        px-2 py-2
        mx-1
        justify-center align-middle
        rounded-sm
        shadow-md
        bg-white
        text-gray-600
        ">
            <span className="
            text-2xl
            text-gray-500
            pb-3
            font-sans
            ">{title}</span>
            {children}
        </div>
    )
}