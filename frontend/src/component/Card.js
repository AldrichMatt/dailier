export const Card = ({title, description, children, action}) => {
    return(
        <div className="
        flex flex-col flex-grow
        px-4 py-3 mx-2
        rounded-lg shadow-md
        bg-slate-100 text-gray-600
        ">
            <div className="
            flex flex-row
            justify-between
            ">
                <div className="
                text-2xl
                text-gray-700
                pb-3
                font-sans
                ">
                    {title}
                    <div className="
                    text-xs
                    text-gray-500
                    ">
                        {description}
                    </div>
                </div>
                <div className="
                text-2xl
                text-gray-700
                pb-3
                font-sans
                self-center
                ">
                    {action}
                </div>
            </div>
            {children}
        </div>
    )
}