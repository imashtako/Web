import * as React from "react";
import {connect} from "react-redux";

import Task from "./Task";
import TaskCreator from "./TaskCreator";

import './todo.css';
import {RootState} from "../redux/store";

type PropsType = {
    tasks: Array<string>
};

class ToDo extends React.Component<PropsType> {
    render() {
        return(
        <div  className="TaskContainer">
            {
                this.props.tasks.map((task, i) => <Task task={task} index={i} key={i + task}/>)
            }
            <TaskCreator/>
        </div>
        );
    }
}

const mapState = (state: RootState) => ({
    tasks: state.todo.tasks,
});

export default connect(mapState)(ToDo)