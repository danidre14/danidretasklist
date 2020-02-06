import React from "react";
import { Link } from "react-router-dom";
import "./task.css";

function Task({ id, name, description, handleChange, saveChange, handleDelete, link }) {
    const ShowLink = link ? <div className="task--nav">
        <Link className="task--view" to={`/view/${id}`}>View</Link>
        <button
            className="task--delete"
            onClick={() => handleDelete(id)}
        >X</button>
    </div> : ""
    return (
        <div className="task">
            <div>
                <input
                    type="text"
                    name="name"
                    className="task--name"
                    placeholder="Title"
                    value={name}
                    onChange={link ? (event) => handleChange(event.target, id) : null}
                    onBlur={link ? () => saveChange(id) : null}
                    disabled={link ? false : true}
                />
                {ShowLink}

            </div>
            <textarea
                type="text"
                name="description"
                className="task--description"
                placeholder="Note"
                value={description}
                onChange={link ? (event) => handleChange(event.target, id) : null}
                onBlur={link ? () => saveChange(id) : null}
                disabled={link ? false : true}
            />
        </div>
    )
}

export default Task;