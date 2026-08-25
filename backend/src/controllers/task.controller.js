import Task from "../models/task.model.js";


//create task
const createTask = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const task = await Task.create({
        title,
        user: req.userId
    });

    res.status(201).json({
        message: "Task created successfully",
        task
    });
};


const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.userId
    });

    res.status(200).json({
        tasks
    });
};


//update task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = await Task.findOne({
        _id: id,
        user: req.userId
    });

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    if (title !== undefined) {
        task.title = title;
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    await task.save();

    res.status(200).json({
        message: "Task updated successfully",
        task
    });
};


//delete Task
const deleteTask = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOne({
        _id: id,
        user: req.userId
    });

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    await task.deleteOne();

    res.status(200).json({
        message: "Task deleted successfully"
    });
};
export { createTask ,getTasks,updateTask,deleteTask  };