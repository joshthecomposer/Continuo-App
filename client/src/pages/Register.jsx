import { Link, useNavigate } from "react-router-dom"
import { useState, useContext, useRef } from "react"
import axios from "axios"
import { ApiUrlContext } from "../components/ApiUrlContext"

const Register = () => {
    const apiUrl = useContext(ApiUrlContext)
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm:""
    });
    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(apiUrl + "auth/register", newUser)
            .then(res => {
                console.log(res);
                navigate("/login");
            })
            .catch(err => console.log(err.response.data));
    }
    return (
        <div className="flex flex-col min-h-screen justify-center items-center login font-oswald p-2 gap-4">
            <h1 className="font-oswald uppercase text-4xl text-neutral-100  font-semibold uppercase">Register</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-opacity-30 rounded shadow-lg px-5 flex flex-col gap-4">
                <div className="flex flex-wrap -mx-3 gap-3">
                    <div className="flex w-full">
                        <div className="flex flex-col gap-2 w-1/2 px-3 ">
                            <label className="flex block uppercase tracking-wide text-neutral-100 text-xs font-bold  gap-3">
                                First Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Jane"
                                name="firstName"
                                value={newUser.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 px-3">
                            <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold">
                                Last Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Doe"
                                name="lastName"
                                value={newUser.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full px-3">
                        <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold ">
                            Email
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            placeholder="example@email.com"
                            name="email"
                            value={newUser.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex w-full">
                        <div className="flex flex-col gap-2 w-1/2 px-3">
                            <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold ">
                                Password
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white"
                                type="password"
                                placeholder="********"
                                name="password"
                                value={newUser.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-1/2 px-3">
                            <label className="flex gap-3 uppercase tracking-wide text-neutral-100 text-xs font-bold ">
                                Confirm
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white"
                                type="password"
                                placeholder="********"
                                name="confirm"
                                value={newUser.confirm}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-indigo-700 hover:bg-indigo-500 text-neutral-100 font-bold py-2 px-4 rounded w-full shadow-lg">Submit</button>
            </form>
            <p className="text-neutral-100 text-sm my-3">Wanted to Login instead? <Link className="underline italic" to="/login">Go here.</Link></p>
        </div>
    )
}

export default Register