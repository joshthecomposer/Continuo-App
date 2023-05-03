import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ApiUrlContext } from "../components/ApiUrlContext";
import axios from "axios"

const InstrumentForm = () => {
    const apiUrl = useContext(ApiUrlContext);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId")
    const [newInstrument, setNewInstrument] = useState({
        Name: "",
        UserId: userId,
        Color: "neutral",
        Image: "BassClar"
    });
    const jwt = localStorage.getItem('jwt');
    const rft = localStorage.getItem('rft');
    const config = {
        headers: {Authorization:`Bearer ${jwt}`}
    };
    const [validationErrors, setErrors] = useState({});

    const handleChange = (e) => {
        setNewInstrument({...newInstrument, [e.target.name]:e.target.value})
    }
    //TODO: This form needs a refresh attempt. Lift this refresh into a more globalized function.
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(config, apiUrl, newInstrument)
        axios.post(apiUrl + "instruments/create", newInstrument, config)
            .then(res => {
                console.log(res.data)
                let arr = JSON.parse(localStorage.getItem("instruments"))
                arr = [...arr, res.data]
                localStorage.setItem("instruments", JSON.stringify(arr))
                navigate("/dashboard")
            })
            .catch(err => {
                //Find a way to determine if error is unauthorized or something else.
                if (err.response.status === 401) {
                    //Do the refresh
                    console.log(err.response.data)
                    axios.post(apiUrl + "auth/tokens/refresh/" + userId, {AccessToken: jwt,RefreshToken:rft})
                        .then(res => {
                            console.log(res)
                            localStorage.setItem('jwt', res.data.accessToken);
                            localStorage.setItem('rft', res.data.refreshToken);
                                axios.post(apiUrl + "instruments/create", newInstrument, {headers: {Authorization:`Bearer ${res.data.accessToken}`}})
                                    .then(res => {
                                        console.log(res.data)
                                        let arr = JSON.parse(localStorage.getItem("instruments"))
                                        arr = [...arr, res.data]
                                        localStorage.setItem("instruments", JSON.stringify(arr))
                                        navigate("/dashboard")
                                    })
                                    .catch(err => {
                                        if (err.response.status === 400) {
                                            //Display messages.
                                            console.log(err.response.data.errors)
                                            setErrors(err.response.data.errors);
                                        } else {
                                            localStorage.clear();
                                            navigate("/login")
                                        }
                                    })
                        })
                        .catch(err=>console.log("ERR FROM REFRESH: " + err))
                }
                if (err.response.status === 400) {
                    //Display messages.
                    console.log(err.response.data.errors)
                    setErrors(err.response.data.errors);
                }
            });
    }
    return (
        <>
            <div className="fixed top-0 left-0 w-full flex flex-col gap-1">
                    {
                        Object.entries(validationErrors).map(([key, val]) => (
                                <div key={key} className="w-full uppercase text-neutral-100 font-medium text-xs bg-red-600">
                                    <h1 className="relative">{key} : {val}</h1>
                                </div>
                        ))
                    }
                    </div>
            <div className="flex flex-col gap-4 min-h-screen justify-center items-center login font-oswald p-2">
                <h1 className="font-oswald uppercase text-3xl text-neutral-100 font-semibold uppercase">Create An Instrument</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 max-w-lg bg-opacity-30 rounded shadow-lg px-5">
                    <div className="flex flex-wrap -mx-3">
                        <div className="flex flex-col gap-2 w-full px-3">
                            <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold">
                            Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Cello"
                                onChange={handleChange}
                                value={newInstrument.Name}
                                name="Name"/>
                            <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold">
                            Color
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Cello"
                                onChange={handleChange}
                                value={newInstrument.Color}
                                name="Color">
                                <option value="neutral">Default</option>
                                <option value="red">Red</option>
                                <option value="orange">Orange</option>
                                <option value="yellow">Yellow</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                                <option value="purple">Purple</option>
                                <option value="pink">Pink</option>
                            </select>
                            <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold">
                            Icon
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Cello"
                                onChange={handleChange}
                                value={newInstrument.Image}
                                name="Image">
                                <option value="BassClar">Clarinet</option>
                                <option value="Cello">Cello</option>
                                <option value="Flute">Flute</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit"
                    className="bg-indigo-700 hover:bg-indigo-500 text-neutral-100 font-bold py-2 px-4 rounded w-full shadow-lg">Submit</button>
                </form>
                <p className="text-neutral-100 text-sm my-3"><Link className="underline italic" to="/dashboard">Go back.</Link></p>
                </div>
        </>
    )
}

export default InstrumentForm