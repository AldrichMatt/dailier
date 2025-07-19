export const Row = ({children}) => {
    return(
        <div className="
        flex flex-row
        py-3 px-3 my-3
        rounded-md
        bg-neutral-100
        shadow-xl
        justify-evenly
        ">
            {children}
        </div>
    )
}