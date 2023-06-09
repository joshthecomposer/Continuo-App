import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useContext, useRef, useLayoutEffect } from "react"
import axios from "axios"
import {BsMusicNoteList} from 'react-icons/bs'
import { ApiUrlContext } from "../components/ApiUrlContext"
import MobileNav from "../components/MobileNav"
import BassClar from "../assets/BassClar"
import Cello from "../assets/Cello"
import Flute from "../assets/Flute"

const Dashboard = () => {
    const colorMap = {
        neutral: "bg-neutral-800",
        red: "bg-red-800",
        orange: "bg-orange-800",
        yellow: "bg-yellow-800",
        green: "bg-green-800",
        blue: "bg-blue-800",
        purple: "bg-purple-800",
        pink: "bg-pink-800"
    }
    const instrumentMap = {
        BassClar: <BassClar width="50px" height="50px" />,
        Cello: <Cello width="50px" height="50px"/>,
        Flute: <Flute width="50px" height="50px"/>
    }
    const [dashboardData, setDashboardData] = useState({
        userId:"",
        firstName: "",
        lastName: "",
        email: "",
        instruments: []
    });
    const effectRan = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("userId")) {
            navigate("/logout")
        }
        if (!effectRan.current) {
            setDashboardData({
                userId: localStorage.getItem("userId"),
                firstName: localStorage.getItem("firstName"),
                lastName: localStorage.getItem("lastName"),
                email: localStorage.getItem("email"),
                instruments: JSON.parse(localStorage.getItem("instruments"))
            })
        }
        return()=> effectRan.current = true;
    }, [])

    return (
        <>
            <MobileNav />
            <div className="w-full text-neutral-300 text-center text-neutral-300 flex flex-col">
                <div className="py-2 px-2 max-h-1/2 flex flex-col flex-wrap gap-3 justify-center items-center bg-neutral-700 bg-opacity-10">
                    <h1 className="text-xl uppercase font-oswald text-neutral-300">Tap to begin practice</h1>
                    <div className="flex gap-4 flex-wrap justify-center">
                        {
                            dashboardData.instruments.length === 0 ? <p className="bg-neutral-800 p-2 rounded-lg">No Instruments, <Link className="underline italic" to="/instrument/create">Add One</Link></p> :
                                dashboardData.instruments.map((i) => (
                                    <Link key={i.instrumentId} to={`/instrument/practice?instrument=${i.name}&instrumentId=${i.instrumentId}`}>
                                        <div
                                            className={`w-20 h-20 rounded-lg overflow-hidden flex flex-col items-center justify-center ${colorMap[i.color]}`}
                                        >
                                            <div className="z-0">{instrumentMap[i.image]}</div>
                                            <p className={i.name.length < 13 ? "text-base" : "text-xs"}>{i.name}</p>
                                        </div>
                                    </Link>
                                ))
                        }
                    </div>
                    {
                        dashboardData.instruments.length !== 0 ? <Link className="underline italic tracking-wider font-oswald font-light text-indigo-500" to="/instrument/create">Add Instruments</Link> :
                            null
                    }
                </div>
                <div className="py-2 px-2 max-h-1/2 flex flex-col flex-wrap gap-3 justify-center items-center bg-opacity-10">
                    <h1 className="text-xl uppercase font-oswald font-thin">Recent <span className="font-bold">Sessions</span></h1>
                    <div className="w-full px-5 flex flex-col gap-3">
                        <div className="w-full bg-neutral-700">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-indigo-700 w-[40px] h-[40px] rounded-full fixed bottom-0 right-0 m-5 shadow-lg flex justify-center items-center">
                <BsMusicNoteList className="text-neutral-300" />
            </div>
        </>
    )
}

export default Dashboard