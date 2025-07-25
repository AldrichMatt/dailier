export const Row = ({children}) => {
    return(
        <div className="
        flex flex-row
        py-4 px-2 mb-5
        rounded-md
        bg-slate-200
        shadow-xl
        justify-evenly
        ">
            {children}
        </div>
    )
}