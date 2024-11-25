import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import questionSlice from './reducers/questionSlice';
import quizSlice from './reducers/quizSlice';



export const store:any = configureStore({
    reducer:{
        auth: authSlice,
        question: questionSlice,
        quiz: quizSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
