import {useContext, useEffect, useState} from 'react'
import axios from 'axios'

const Data = () => {
    const effectRan = useRef(false);
    const {apiUrl} = useContext(MyContext)
    const [data, setData] = useState({});

    useEffect(() => {
        if (effectRan.current === false) {
            axios.get(apiUrl + "data")
                .then(res => {
                    setData(res.data);
                })
                .catch(err => console.log(err));
            return () => { effectRan.current = true };
        }
    },[])
    return (
        <>
            <h1 className="text-xl">Some dummy data from the Asp.Net API</h1>
            <p className="text-lg mt-2">{data["firstName"]}</p>
            <p className="text-lg">{data["email"]}</p>
        </>
    )
}

export default Data