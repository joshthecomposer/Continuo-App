import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const Dashboard = () => {
    const [result, setResult] = useState({
        Item1: "",
        Item2: ""
    });
    const navigate = useNavigate();
    const sessionId = sessionStorage.getItem('userId');
    const jwt = sessionStorage.getItem('jwt');
    const rft = sessionStorage.getItem("rft");
    const config = {
        headers: {Authorization:`Bearer ${jwt}`}
    };
    useEffect(() => {
        axios.get("http://localhost:5000/api/users/" + sessionId + "/dashboard", config)
            .then(res => {
                console.log("VALID TOKEN")
                console.log(res.data)
                setResult(res.data);
            })
            .catch(err => {
                console.log("INVALID TOKEN")
                console.log(err)
                axios.post("http://localhost:5000/api/auth/tokens/refresh/" + sessionId, { accessToken: jwt, refreshToken: rft })
                    .then(res => {
                        console.log(res.data)
                        Object.assign(sessionStorage, {
                            jwt: res.data.accessToken,
                            rft: res.data.refreshToken
                        })
                        setResult(res.data);
                    })
                    .catch(err => {
                        console.log(err.data);
                        sessionStorage.clear();
                        navigate("/login");
                    })
            });
    },[result.Item1, result.Item2])

    return (
        <>
            <h1 className="text-xl text-neutral-100 text-center">{result.Item1}</h1>
            <h1 className="text-xl text-neutral-100 text-center">{result.Item2}</h1>
        </>
    )
}

export default Dashboard