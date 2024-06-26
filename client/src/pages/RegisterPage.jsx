import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    

    const navigate = useNavigate()

    const [formData, setFormData] = useState();
    const handleChange = (event) =>{
        
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmitLogin = async (event) => {
            event.preventDefault()
            try {
                const response = await axios.post("https://task-manager-react-app-5nnd.onrender.com/api/register", formData)
                
                navigate("/login")
                
            } catch(error){
                console.log(error)
        
            }
    }

    useEffect(()=>{
        if(isLoggedIn){
            navigate("/")
        }
    },[])

    return (
        <section className="bg-white ">
            <div className="flex mt-10 sm:mt-1 flex-col items-center justify-center px-6 py-6 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex text-sky-600 items-center mb-6 text-2xl font-semibold ">
                    <img className="w-8 h-8 mr-2" src="../../public/task-icon.png" alt="logo" />
                    Manage Tasks
                </a>
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-sky-700 md:text-2xl ">
                            Sign up to your account
                        </h1>
                        <form onSubmit={handleSubmitLogin}  className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                <input onChange={handleChange} type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Joe Phoe" required />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input onChange={handleChange} type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 d">Password</label>
                                <input onChange={handleChange} type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
                            </div>

                            <button type="submit" className="w-full bg-sky-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                            <p className="text-sm font-light text-gray-500 ">
                                Already have an account ? <a href="/login" className="font-medium text-primary-600 hover:underline ">Sign In</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default RegisterPage;