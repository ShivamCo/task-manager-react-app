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
    const [isLoading, setIsLoading] = useState(false)



    const getTaskList = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post("https://task-manager-react-app-5nnd.onrender.com/api/get-all-task", { "userID": localStorage.getItem("userID") })
            setTaskList(response.data)
            setIsLoading(false)
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
                    {
                        isLoading ?
                            <div role="status">
                                <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                            :

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
                            </div>}




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