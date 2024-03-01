import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";



const HeaderBar = () => {

    
    const [menuOn, setMenuOn] = useState(false)
    const navigate = useNavigate()

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        dispatch(logoutUser());
    };


    return(
        <header>
        <nav className="bg-white border-gray-200 px-2 lg:px-6 py-2.5 dark:bg-gray-800">
            <div className="flex flex-wrap bg-gray-100 rounded-xl justify-between p-2 shadow-sm items-center mx-auto max-w-screen-xl">
                <a href="/" className="flex items-center">
                    <img src="../../public/task-icon.png" className="mr-3 h-8 sm:h-9" alt="Manage Task" />
                    <span className="self-center text-xl font-semibold text-sky-600 whitespace-nowrap dark:text-white">Manage Tasks</span>
                </a>
                <div className="flex items-center lg:order-2">
                {!isLoggedIn
                ?
                <a href="/login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                :
                <button onClick={handleLogout} className="text-red-400 dark:text-red hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log Out</button>
                }  
                    <button onClick={()=>setMenuOn(!menuOn)} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
                        <span className="sr-only">Open main menu</span>
                        <svg className={`${menuOn ? 'hidden' : ''  } w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className={`${menuOn ? '' : 'hidden'  } w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className={` ${menuOn ? '' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <a href="/" className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                        </li>
                        
                        
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    )

}



export default HeaderBar