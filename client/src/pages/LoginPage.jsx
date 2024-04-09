import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../redux/features/authSlice";



const LoginPage = () => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState();
    const handleChange = (event) => {

        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmitLogin = async (event) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const response = await axios.post("https://task-manager-react-app-5nnd.onrender.com/api/login", formData)

            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userID", response.data.userID)
            dispatch(loginUser());
            setIsLoading(false)
            navigate("/")

        } catch (error) {
            alert(error.response.data.message)

        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate(-1)
        }
    }, [])

    return (
        <section className="bg-white ">
            <div className="flex mt-10 sm:mt-1 flex-col items-center justify-center px-6 py-6 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex text-sky-600 items-center mb-6 text-2xl font-semibold ">
                    <img className="w-8 h-8 mr-2" src="../../public/task-icon.png" alt="logo" />
                    Manage Tasks
                </a>
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
                    {
                        isLoading ?

                            <div className="flex justify-center items-center " role="status">
                                <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>

                            :
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-sky-700 md:text-2xl ">
                                    Sign in to your account
                                </h1>
                                <form onSubmit={handleSubmitLogin} className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                        <input onChange={handleChange} type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Joe Phoe" required />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 d">Password</label>
                                        <input onChange={handleChange} type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
                                    </div>

                                    <button onClick={handleSubmitLogin} type="submit" className="w-full bg-sky-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                                    <p className="text-sm font-light text-gray-500 ">
                                        Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline ">Sign up</a>
                                    </p>
                                </form>
                            </div>


                    }

                </div>
            </div>
        </section>
    )

}

export default LoginPage;