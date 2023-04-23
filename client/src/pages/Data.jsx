import {useEffect, useState} from 'react'
import axios from 'axios'

const Data = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get("http://localhost:5000/api/data")
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
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