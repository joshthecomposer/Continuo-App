import { useEffect, useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
const MobileNav = () => {
    const [today, setToday] = useState(new Date());
    const months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    }
    return (
        <div className="text-neutral-300 font-oswald text-xl mb-6">
            <div className="flex items-center justify-between mx-2 mt-2">
                <AiOutlineMenu className="w-6 h-6" />
                <p className="font-light">Welcome Back, <span className="font-medium">{sessionStorage.getItem("firstName")}</span></p>
            </div>
            <p className="text-right mx-2 text-indigo-500 text-sm">{months[today.getMonth()]} {today.getDate()}, {today.getFullYear()}</p>
        </div>
    )
}

export default MobileNav