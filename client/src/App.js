import React from "react";
import TaskList from "./Components/TaskList"
import TaskView from "./Components/TaskView"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
    return (
        <Router>
            <Link to="/"><h1>Tasks List</h1></Link>
            <Switch>
                <Route path="/view/:id" component={TaskView} />
                <Route path="/" component={TaskList} />
            </Switch>
        </Router>
    );
}

export default App;