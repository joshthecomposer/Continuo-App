import { useEffect, useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom';
const MobileNav = () => {
    const [today, setToday] = useState(new Date());
    const [navRevealed, setNavRevealed] = useState(false);
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
    const toggleNav = () => {
        setNavRevealed(!navRevealed);
    }
    return (
        <>
            <div className="text-neutral-300 font-oswald text-xl mb-6">
                <div className="flex items-center justify-between mx-2 mt-2">
                    <AiOutlineMenu onClick={toggleNav} className="w-6 h-6 hover:cursor-pointer" />
                    <p className="font-medium underline underline-offset-2">Continuo<span className="font-light text-lg">App</span></p>
                </div>
                <p className="text-right mx-2 text-indigo-500 text-sm italic">{months[today.getMonth()]} {today.getDate()}, {today.getFullYear()}</p>
            </div>
            <div
                className="fixed font-oswald inset-y-0 z-10 justify-between flex flex-col grow gap-3 bg-indigo-900 text-neutral-100 py-2 pr-12 pl-2 shadow-lg"
                style={{ display: (navRevealed ? 'flex' : 'none') }}>
                <div className="flex flex-col gap-3">
                <AiOutlineClose onClick={toggleNav} className="w-6 h-6 hover:cursor-pointer" /> 
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/">Sessions</Link>
                    <Link to="/instruments">Instruments</Link>
                    <Link to="/">Settings</Link>
                </div>
                <Link className="text-neutral-100" to="/logout">Logout</Link>
            </div>
        </>
    )
}

export default MobileNav