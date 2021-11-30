import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from '../todo/toDoSlice';

export const store = configureStore({
    reducer: {
        todo: toDoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;