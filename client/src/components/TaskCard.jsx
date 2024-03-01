import axios from "axios"
import { useNavigate } from "react-router-dom"
import { PopContext, PopUpProvider } from '../components/PopUpContext'
import { useContext, useState } from "react"

const TaskCard = (props) => {
    const { isOpen, closePopUp, openPopUp, addTaskDetails } = useContext(PopContext)
    const navigate = useNavigate()
    const [TastID, setTaskID] = useState(props.taskID)

    const removeClickHandle = async (event) => {


        try {

            const response = await axios.post("http://localhost:5000/api/remove-task", { "userID": localStorage.getItem("userID"), "taskID": event.target.value })
            // setTaskList(response.data)
        } catch (error) {
            console.log(error)
        }
        navigate(0)

    }

    const markCompleted = async (event) => {

        console.log(event.target.value)
        try {

            const response = await axios.post("http://localhost:5000/api/completed-task", { "userID": localStorage.getItem("userID"), "taskID": TastID, "completed": !props.completed })
            // setTaskList(response.data)
        } catch (error) {
            console.log(error)
        }
        navigate(0)
    }

    const OpenEdit = (event) => {
        openPopUp()
        addTaskDetails(props)
    }



    return (
        <div className="relative hover:bg-gray-100 group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
            <div className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-blue-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
            <div className="relative">
                <a onClick={markCompleted} value={props.taskID} className="hover:bg-gradient-to-r font-semibold hover:cursor-pointer hover:from-green-200 hover:to-green-100 group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                    <p className="w-fit" >
                        {
                            props.completed === true
                                ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 text-yellow-500 h-6">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                                
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 drop-shadow-md text-yellow-500 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                
                                
                        }


                    </p>

                </a>

                <div className="mt-2 " >
                    <p className=" text-sm" >
                        {props.dueDate}
                    </p>
                </div>

                <div className="mt-2 pb-2" >
                    <p className=" text-xl" >
                        {props.title}
                    </p>
                </div>

                <div className="mt-2 pb-2  overflow-auto rounded-b-[--card-border-radius]">
                    <p className="text-gray-700 dark:text-gray-300">{props.description}</p>
                </div>

                <div className="flex gap-3 content-center -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                    <a onClick={OpenEdit} className=" hover:bg-gradient-to-r hover:from-sky-200 hover:to-sky-100 group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                        <span className=" text-lg text-gray-700 " >Edit</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>


                    </a>

                    <button className="text-red-500 font-medium hover:underline " onClick={removeClickHandle} value={props.taskID} >
                        Remove
                    </button>



                </div>
            </div>
        </div>
    )


}

export default TaskCard