import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {connect} from "react-redux";

import {createTask} from "./toDoSlice";

import './todo.css'

type StateType = {
    text: string
}

type PropsType = {
    createTask: typeof createTask
}

class TaskCreator extends React.Component<PropsType, StateType> {
    state = {
        text: ""
    };

    createTask(){
        this.props.createTask(this.state.text);
        this.setState({text: ''});
    }

    onChangeText(event: any){
        this.setState({text: event.target.value});
    }

    render() {
        return(
            <div className='TaskCreator'>
                <TextField
                    onChange={event => this.onChangeText(event)}
                    value={this.state.text}
                    fullWidth
                />
                <Button
                    onClick={() => this.createTask()}
                    fullWidth
                >Create</Button>
            </div>
        );
    }
}

const mapDispatch = {
    createTask: createTask,
};

export default connect(null, mapDispatch)(TaskCreator)