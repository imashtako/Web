import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ToDoState {
    tasks: Array<string>
}

const initialState: ToDoState = {
    tasks: [],
};

export const toDoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        createTask: (state, action: PayloadAction<string>) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks.splice(action.payload, 1);
        },
        changeTask: (state, action: PayloadAction<{index: number, text: string}>) => {
            state.tasks[action.payload.index] = action.payload.text;
        },
    },
});

export const { createTask, deleteTask, changeTask } = toDoSlice.actions;

export default toDoSlice.reducer