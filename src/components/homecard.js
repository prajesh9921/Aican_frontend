import React from "react";

const HomeCard = ({icon, title, onPress}) => {
    return (
        <div onClick={onPress} className="p-2.5 m-5 flex flex-col justify-between h-36 flex-1 rounded-lg border border-[#E49BFF] hover:border-[#850F8D] cursor-pointer">
            <p className="text-xl">{title}</p>
            <p className="self-end">{icon}</p>
        </div>
    )
}

export default HomeCard;