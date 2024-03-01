import { createContext, useContext, useEffect, useState } from "react"
import { PopContext } from './PopUpContext'
import axios from "axios"

const AddTask = (props) => {

    const { isOpen, taskDetails, closePopUp, openPopUp } = useContext(PopContext)

    const [formData, setFormData] = useState({
        "userID": localStorage.getItem("userID") ,
        "title":taskDetails.title,
        "dueDate":taskDetails.dueDate,
        "description": taskDetails.description,
        "taskID": taskDetails.taskID
    })

    console.log(taskDetails)

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const AddNewTask = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/add-task", formData)
            console.log(response.message)
        } catch(error){
            console.log(error)
        }
        

    }

    const handleUpdateTask = async () => {

        try {
            const response = await axios.post("http://localhost:5000/api/update-task", formData)
            console.log(response.message)
        } catch(error){
            console.log(error)
        }
        

    }


    useEffect(()=>{

    },[formData])

    console.log(formData)

    return (

        <div className={`${isOpen ? "flex" : "hidden"}  full justify-center content-center`} >
            <div className=" fixed   z-50 justify-center items-center ">
                <div className="relative p-4 w-screen max-w-md max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Add New Task
                            </h3>
                            <button onClick={closePopUp} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>

                            </button>
                        </div>

                        <form  className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input name="title" onChange={handleChange} required type="text" value={formData.title} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                                    <input onChange={handleChange} name="dueDate" required type="date" value={formData.dueDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">

                                    </input>
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea onChange={handleChange} name="description" required value={formData.description} id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>
                                </div>
                            </div>

                            {typeof (taskDetails.title) == "string"
                                ?
                                <button onClick={handleUpdateTask} type="submit" className="text-white inline-flex items-center bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Update Task
                                </button>
                                :

                                <button onClick={AddNewTask} className="text-white inline-flex items-center bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Add Task 
                                </button>
                            }


                        </form>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default AddTask
