import React, { createContext, useState } from 'react';

const PopContext = createContext();

const PopUpProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [taskDetails, setTaskDetails] = useState(null)
    
    const closePopUp = () => {
        setIsOpen(false);
    };

    const openPopUp = () => {
        setIsOpen(true);
    };

    const addTaskDetails = (props) => {
        setTaskDetails({
            "userID": localStorage.getItem("userID"),
            "title": props.title,
            "taskID": props.taskID,
            "description": props.description,
            "dueDate": props.dueDate,
            "completed": props.completed}
        )
    }

    return (
        <PopContext.Provider value={{ isOpen, taskDetails, addTaskDetails, closePopUp, openPopUp }}>
            {children}
        </PopContext.Provider>
    );
};

export { PopContext, PopUpProvider };