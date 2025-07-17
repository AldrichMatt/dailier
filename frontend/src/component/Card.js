export const Card = ({children}) => {
    return(
        <div className="
        flex flex-col flex-grow
        px-2 py-2
        mx-1
        justify-center align-middle
        rounded-sm
        shadow-md
        bg-white
        ">
            {children}
        </div>
    )
}