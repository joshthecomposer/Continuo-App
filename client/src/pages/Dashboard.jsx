import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext, useRef } from "react"
import axios from "axios"
import { ApiUrlContext } from "../components/ApiUrlContext"

const Dashboard = () => {
    const effectRan = useRef(false);
    const apiUrl = useContext(ApiUrlContext);
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
        if (effectRan.current === false) {
            axios.get(apiUrl + "users/" + sessionId + "/dashboard", config)
                .then(res => {
                    console.log(res.data)
                    setResult(res.data);
                })
                .catch(err => {
                    console.log(err)
                    axios.post(apiUrl + "auth/tokens/refresh/" + sessionId, { accessToken: jwt, refreshToken: rft })
                        .then(res => {
                            console.log(res.data)
                            Object.assign(sessionStorage, {
                                jwt: res.data.accessToken,
                                rft: res.data.refreshToken
                            })
                            axios.get(apiUrl + "users/" + sessionId + "/dashboard", {headers: {Authorization:`Bearer ${res.data.accessToken}`}})
                                .then(res => {
                                    console.log(res.data)
                                    setResult(res.data);
                                })
                                .catch(err => {
                                    navigate("/login");
                                })
                        })
                        .catch(err => {
                            console.log(err.data);
                            sessionStorage.clear();
                            navigate("/login");
                        })
                });
            return () => { effectRan.current = true };
        }
    }, [])

    return (
        <>
            <h1 className="text-xl text-neutral-100 text-center">{result.Item1}</h1>
            <h1 className="text-xl text-neutral-100 text-center">{result.Item2}</h1>
        </>
    )
}

export default Dashboard