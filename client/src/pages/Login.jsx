import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useContext } from 'react'
import { ApiUrlContext } from '../components/ApiUrlContext'

const Login = () => {
    const apiUrl = useContext(ApiUrlContext);
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState({
        email: "",
        password : ""
    });
    const [validationErrors, setErrors] = useState({});

    const handleChange = (e) => {
        setLoginUser({...loginUser, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(apiUrl + "auth/login", loginUser)
            .then(res => {
                localStorage.clear();
                console.log(res.data)
                Object.assign(localStorage, {
                    jwt : res.data.accessToken,
                    rft : res.data.refreshToken,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    userId: res.data.userId,
                    instruments: JSON.stringify(res.data.instruments)
                })
                navigate("/dashboard");
            })
            .catch(err => {
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors);
            })
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
                <h1 className="font-oswald uppercase text-4xl text-neutral-100 font-semibold uppercase">Login</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 max-w-lg bg-opacity-30 rounded shadow-lg px-5">
                    <div className="flex flex-wrap -mx-3">
                        <div className="flex flex-col gap-2 w-full px-3">
                            <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold">
                            Email
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="example@email.com"
                                onChange={handleChange}
                                value={loginUser.email}
                                name="email"/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3">
                        <div className="flex flex-col gap-2 w-full px-3">
                        <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold">
                            Password
                        </label>
                        <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                                type="password"
                                placeholder="********" 
                                onChange={handleChange}
                                value={loginUser.password}
                                name="password" />
                        </div>
                    </div>
                    <button type="submit"
                    className="bg-indigo-700 hover:bg-indigo-500 text-neutral-100 font-bold py-2 px-4 rounded w-full shadow-lg">Submit</button>
                </form>
                <p className="text-neutral-100 text-sm my-3">Wanted to Sign Up instead? <Link className="underline italic" to="/register">Go here.</Link></p>
                </div>
        </>
    )
}

export default Login