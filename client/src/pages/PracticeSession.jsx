import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
import MobileNav from '../components/MobileNav';
import { ApiUrlContext } from '../components/ApiUrlContext';

const PracticeSession = (props) => {
    const { currentTime, setCurrentTime } = props
    const [searchParams, setSearchParams] = useSearchParams()
    const [activeSession, setActiveSession] = useState()
    const apiUrl = useContext(ApiUrlContext)
    const userId = localStorage.getItem('userId')
    const jwt = localStorage.getItem('jwt')

    useEffect(() => {
        axios.get(`${apiUrl}/sessions/${userId}/latest`, { headers: { Authorization: `Bearer ${jwt}` } })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    
    return (
        <>
            <MobileNav />
            <h1 className="text-neutral-300 text-4xl uppercase text-center">you are practicing {searchParams.get("instrument")} Time: {currentTime }</h1>
        </>
    )
}

export default PracticeSession