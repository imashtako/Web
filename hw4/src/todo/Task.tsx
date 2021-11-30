import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {deleteTask, changeTask} from "./toDoSlice";

import './todo.css';
import {connect} from "react-redux";
import TextField from "@mui/material/TextField/TextField";

type StateType = {
    editable: boolean,
    text: string
}

type PropsType = {
    task: string,
    index: number,
    deleteTask: typeof deleteTask,
    changeTask: typeof changeTask,
};

class Task extends React.Component<PropsType, StateType> {
    constructor(props: PropsType){
        super(props);
        this.state = {
            editable: false,
            text: props.task
        };
    }


    onDelete(){
        this.props.deleteTask(this.props.index);
    }

    onChange(event: any){
        this.setState({text: event.target.value});
    }

    onTextFieldBlur(){
        this.setState({editable: false});
        this.props.changeTask({index: this.props.index, text: this.state.text});
    }

    render() {
        const Text = () => {
            if (this.state.editable){
                return(
                    <TextField
                        value={this.state.text}
                        autoFocus
                        onBlur={() => this.onTextFieldBlur()}
                        onChange={(event) => this.onChange(event)}
                    />
                )
            }

            return <span>{this.props.task}</span>;
        };

        return(
            <Card className="Task">
                <CardContent>
                    <Text/>
                    <IconButton onClick={() => this.setState({editable: true})}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => this.onDelete()}>
                        <DeleteIcon/>
                    </IconButton>
                </CardContent>
            </Card>
        );
    }
}

const mapDispatch = {
    deleteTask: deleteTask,
    changeTask: changeTask,
};

export default connect(null, mapDispatch)(Task)