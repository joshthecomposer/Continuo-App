import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import MobileNav from '../components/MobileNav';

const PracticeSession = (props) => {
    const { currentTime, setCurrentTime } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(currentTime + 1);
        }, 1000)
        return () => clearInterval(interval);
    },[currentTime])
    return (
        <>
            <MobileNav />
            <h1 className="text-neutral-300 text-4xl uppercase text-center">you are practicing {searchParams.get("instrument")} Time: {currentTime }</h1>
        </>
    )
}

export default PracticeSession