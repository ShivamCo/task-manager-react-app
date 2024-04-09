import express from 'express';
import mongoose from 'mongoose';
import { UserModel } from '../models/userModel.js';

const router = express.Router();

router.post("/add-task", async (req, res) => {
    let { userID, title, description, dueDate, completed } = req.body
    
    const taskWithId = {
        "taskID": Date.now().toString(),
        "title": title,
        "description": description,
        "dueDate": dueDate,
        "completed": false

    }

    try {


        await UserModel.findByIdAndUpdate({ _id: userID }, { $push: { "tasks": taskWithId } })
        res.send({ 'message': 'Task Added Successfully' })


    } catch (error) {
        res.send({ 'message': 'Error in Fetching' })

    }

})

router.post("/update-task", async (req, res) => {
    let { userID, taskID, title, description, dueDate, completed } = req.body

    const UpdatedTask = {
        "taskID": taskID,
        "title": title,
        "description": description,
        "dueDate": dueDate,
        "completed": completed

    }

    try {
        
        const user = await UserModel.findOneAndUpdate(
          { _id: userID, 'tasks.taskID': taskID }, 
          { $set: { 'tasks.$': UpdatedTask } }, 
          { new: true } 
        );
      
        if (!user) {
          res.send('User or task not found.');
          
        } else {
            res.send('Task updated successfully:');
          
        }
      } catch (error) {
        res.send('Error updating task:', error);
        
      }

})

router.post("/completed-task", async (req, res) => {
    let { userID, taskID, completed } = req.body

    console.log(req.body)

    const UpdatedTask = {
        "taskID": taskID,
        "completed": completed

    }

    try {
        const user = await UserModel.findOneAndUpdate(
            { _id: userID, "tasks.taskID": taskID },
            { $set: { "tasks.$.completed": completed } },
            { new: true }
        ).then(
            res.send("Marked Completed")
        )

        if (!user) {
            throw new Error('User or task not found');
        }

        
    } catch (error) {
        console.error('Error updating task completed status:', error);
        throw error;
    }

})




router.post("/remove-task", async (req, res) => {
    let { userID, taskID } = req.body

    const isTask = await UserModel.findOne({ "_id": userID, "tasks.taskID": taskID }, { "tasks.$": 1 })

    try {

        if (!isTask) {
            throw new Error("Task Does not Exists")
        }

        await UserModel.updateOne(
            { _id: userID },
            { $pull: { tasks: { taskID: taskID } } }
        )
        res.send({ 'message': 'Task Removed Successfully' })


    } catch (error) {
        res.send({ 'message': 'Error in Fetching' })

    }

})


router.post("/get-all-task", async (req, res) => {
    let { userID } = req.body

    try {
        const isUser = await UserModel.findById({ _id: userID })

        if (!isUser) {
            throw new Error("User Not Found")
        }

        res.json(isUser.tasks)

    } catch (error) {
        res.send(error)
    }





})


router.post("/awake", async (req, res) => {

    try {
  
      const response = await UserModel.findOne({email: "sdasdfasdsa"})
      
      res.json(response)
      console.log(response)
  
    } catch (error) {
  
      console.log(error.message)
  
    }
  
  })

export { router as TasksManagment }