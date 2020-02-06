import React, { Component } from "react";
import Task from "./Task";
import axios from "axios";

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [
                { _id: 0, name: "Task 0" }
            ]
        };

        this.saveChange = this.saveChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleCreateTask = this.handleCreateTask.bind(this);
    }

    async componentDidMount() {
        await this.loadTasks();
    }

    async loadTasks() {
        try {
            const request = await axios("/api/tasks");
            const data = await request.data;
            this.setState({ tasks: data })
        } catch { }
    }

    async handleCreateTask() {
        // const newTask = { id: Math.floor(Math.random() * 1000) };
        // this.setState(prevState => {
        //     const newTasks = [newTask, ...prevState.tasks];
        //     return {
        //         tasks: newTasks
        //     }
        // })
        try {
            await axios.post("/api/tasks");
            await this.loadTasks();
        } catch { }
    }

    async handleDeleteTask(id) {
        try {
            await axios.delete(`/api/tasks/${id}`);
            await this.loadTasks();
        } catch {
        }
        // this.setState(prevState => {
        //     const tasks = prevState.tasks.filter(task => task._id !== id);
        //     return {
        //         tasks
        //     };
        // });
    }

    handleChange({ name, value }, id) {

        this.setState(prevState => {
            const tasks = prevState.tasks.map(task => {
                if (task._id === id) {
                    let newTask = { ...task };
                    newTask[name] = value;
                    return newTask;
                } else {
                    return { ...task };
                }
            });
            return {
                tasks
            };
        });
    }

    async saveChange(id) {
        const [thisTask] = this.state.tasks.filter(task => task._id === id);

        try {
            await axios.put(`/api/tasks/${id}`, {
                taskName: thisTask.name,
                taskDescription: thisTask.description
            });
        } catch { }
    }

    render() {
        const tasks = this.state.tasks.map(task =>
            <Task
                key={task._id}
                id={task._id}
                name={task.name}
                description={task.description}
                handleChange={this.handleChange}
                saveChange={this.saveChange}
                handleDelete={this.handleDeleteTask}
                link={true}
            />)

        return (
            <React.Fragment>
                <button onClick={this.handleCreateTask}>Add Task</button>
                <div className="tasks">
                    {tasks}
                </div>
            </React.Fragment>
        )
    }
}

export default TaskList;