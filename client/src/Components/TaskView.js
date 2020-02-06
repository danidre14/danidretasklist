import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Task from "./Task";
import axios from "axios";

function TaskView() {
    const { id } = useParams();

    const [task, setTask] = useState({ _id: 0, name: "", description: "" });
    const [isLoaded, setIsLoaded] = useState(false);

    useLayoutEffect(() => {
        async function getData() {
            try {
                const request = await axios(`/api/tasks/${id}`);
                const data = await request.data;
                setTask(data);
                setIsLoaded(true);
            } catch {
                setTask({ _id: 0, name: "Error", description: "No task found." })
            }
        }
        getData();
    }, []);

    return (
        <Task
            key={isLoaded ? task._id : 0}
            id={task._id}
            name={task.name}
            description={task.description}
        />
    );
}

export default TaskView;