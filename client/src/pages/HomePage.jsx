import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AddTask from "../components/AddTask";
import { PopContext, PopUpProvider } from '../components/PopUpContext'


const HomePage = () => {

    const { isOpen, closePopUp, openPopUp, addTaskDetails } = useContext(PopContext)

    const navigate = useNavigate()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const [taskList, setTaskList] = useState([]);



    const getTaskList = async () => {
        try {

            const response = await axios.post("http://localhost:5000/api/get-all-task", { "userID": localStorage.getItem("userID") })
            setTaskList(response.data)
        } catch (error) {
            console.log(error)
        }

    }

    const handleAddButton = () => {
        addTaskDetails({})
        openPopUp()
    }
    

    useEffect(() => {

        if (isLoggedIn) {
            getTaskList()
        }

    }, [])

    

    return (
        <>
            {
                isOpen ? <AddTask task={"Add Task"} /> : <div></div>
            }

            {isLoggedIn ?

                <div className={`${isOpen ? "blur-sm" : ""} bg-gray-900 min-h-screen flex items-center justify-center`}>
                    <div className="bg-gray-800 flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">



                        <div className="flex-1 w-full px-2 p-2 sm:px-0">

                            <div className="flex justify-between items-center">
                                <h3 className="text-3xl font-extralight text-white/50">Tasks</h3>

                            </div>
                            <div className="mb-10 sm:mb-0 mt-10 pt-10 overflow-auto max-h-screen grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                <div onClick={handleAddButton} className="group  bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
                                    <a className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </a>
                                    <a className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center" href="#">Create group</a>
                                </div>

                                {
                                    taskList?.map((i) =>
                                        <TaskCard
                                            key={i.taskID}
                                            taskID={i.taskID}
                                            title={i.title}
                                            description={i.description}
                                            dueDate={i.dueDate}
                                            completed={i.completed}
                                        />
                                    )
                                }





                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="bg-gray-900 min-h-screen flex items-center justify-center">
                    <div className="bg-gray-800 justify-center sm:flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
                        <button onClick={() => navigate("/login")} className="text-white font-semibold shadow-lg hover:bg-sky-800 p-2 px-4 rounded-xl bg-sky-500" >
                            Login
                        </button>
                    </div>
                </div>

            }
        </>
    )


}

export default HomePage;