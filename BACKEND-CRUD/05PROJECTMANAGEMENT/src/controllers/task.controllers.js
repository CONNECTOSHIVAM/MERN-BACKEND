import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";
import { SubTask } from "../models/subtask.models.js"
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const getTasks = asyncHandler(async(req, res)=>{

})

const createTask = asyncHandler(async(req, res)=>{

    const {title, description, assignedTo, status} = req.body;
    const {projectId} = req.params;

    const project = await Project.findById(projectId)

    if(!project)
    {
        throw new ApiError(404,"Project not found.")
    }
    const files = req.files || [] 

    files.map((file)=>{
        return {
            url: `${process.env.SERVER_URL}/images/${file.originalname}/images/${file.originalname}`,
            mimetype: file.mimetype,
            size: file.size

        }
    })

    const task = await Task.create({
        title,
        description,
        project: new mongoose.Types.ObjectId(projectId),
        assignedTo: assignedTo ? new mongoose.Types.ObjectId(assignedTo): undefined,
        status,
        assignedBy: new mongoose.Types.ObjectId(req.user._id),
        attachments
    })

    return res
            .status(200) 
            .json(new ApiResponse(201, task, "Task created successfully."))
})

const getTasksById = asyncHandler(async(req,res)=>{

})

const updateTask = asyncHandler(async(req,res)=>{

})

const deleteTask = asyncHandler(async(req, res)=>{

})

const createSubTask = asyncHandler(async(req, res)=>{

})

const updateSubTask = asyncHandler(async(req, res)=>{

})

const deleteSubTask = asyncHandler(async(req, res)=>{

})

export {getTasks, createTask, getTasksById, updateTask, deleteTask, createSubTask, updateSubTask, deleteSubTask}