import { useState, useEffect, useContext, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import MobileNav from '../components/MobileNav';
import { ApiUrlContext } from '../components/ApiUrlContext';

const PracticeSession = (props) => {
    const { currentTime, setCurrentTime} = props
    const [searchParams, setSearchParams] = useSearchParams()
    const apiUrl = useContext(ApiUrlContext)
    const userId = localStorage.getItem('userId')
    const instrumentId = searchParams.get("instrumentId")
    const jwt = localStorage.getItem('jwt')
    const rft = localStorage.getItem('rft')
    const requestUrl = `${apiUrl}sessions/${userId}/latest/${instrumentId}`;
    const navigate = useNavigate();
    const effectRan = useRef(false);
    const [activeSession, setActiveSession] = useState({
        UserId: userId,
        InstrumentId: instrumentId,
        Seconds: 0,
    })

    useEffect(() => {
        if (!effectRan.current) {
            axios.get(requestUrl, { headers: { Authorization: `Bearer ${jwt}` } })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        axios.post(apiUrl + "auth/tokens/refresh/" + userId, { AccessToken: jwt, RefreshToken: rft })
                            .then(res => {
                                localStorage.setItem("jwt", res.data.accessToken)
                                localStorage.setItem("rft", res.data.refreshToken)
                                axios.get(requestUrl, { headers: { Authorization: `Bearer ${res.data.accessToken}` } })
                                    .then(res => {
                                        console.log("refreshed and ready to go!")
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        if (err.response.status === 404) {
                                            console.log("we refreshed and 404'd")
                                        }
                                    })
                            })
                            .catch(err => {
                                console.log(err)
                                navigate("/logout");
                            })
                    }
                    if (err.response.status === 404) {
                        console.log("we were authorized and 404'd")
                    }
                })
        }
        return ()=> effectRan.current = true;
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSession({...activeSession, Seconds:activeSession.Seconds+1})
        }, 1000)
        return () => clearInterval(timer);
    },[activeSession])

    return (
        <>
            <MobileNav />
            <h1 className="text-neutral-300 text-4xl uppercase text-center">you are practicing {searchParams.get("instrument")} </h1>
            <p className="text-neutral-300 text-4xl uppercase text-center">{activeSession.Seconds}</p>
        </>
    )
}

export default PracticeSession