import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
import { authTokenHeader, baseUrl } from "../baseUrl";
import { errorToast } from "../../utils/errorToast";
import { toast } from "react-toastify";

export const getAllQuiz = createAsyncThunk(
    '/quiz/all',
    async(_, {rejectWithValue})=>{
        try{
            let res = await axios.get(`${baseUrl}/quiz`,{
                headers:{
                    ...authTokenHeader
                }
            });
            return res?.data?.quiz
        }catch(err:any){
            errorToast(err);
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
);

export const getQuizById = createAsyncThunk(
    '/quiz/single',
    async(id:string, {rejectWithValue})=>{
        try{
            let res = await axios.get(`${baseUrl}/quiz/${id}`,{
                headers:{
                    ...authTokenHeader
                }
            });
            return res?.data?.quiz
        }catch(err:any){
            errorToast(err);
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
);


interface AddQuizValues {
    title: string;
    creatorName: string;
    questionsId: string[];
    timeLimitInMinutes: number;
    maxParticipants: number;
}

export const addQuiz = createAsyncThunk(
    '/quiz/add',
    async(values:AddQuizValues, {rejectWithValue})=>{
        try{
            let res = await axios.post(`${baseUrl}/quiz`,values,{
                headers:{
                    ...authTokenHeader
                }
            });
            toast.success(res?.data?.message)
            return res?.data?.message
        }catch(err:any){
            errorToast(err);
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
);

interface UpdateQuizType{
    url:string;
    id: string;
    data:{}
}

export const updateQuiz = createAsyncThunk(
    '/quiz/update',
    async(values:UpdateQuizType, {rejectWithValue})=>{
        try{
            let res = await axios.patch(`${baseUrl}/quiz/${values.url}/${values.id}`,values.data,{
                headers:{
                    ...authTokenHeader
                }
            });
            toast.success(res?.data?.message)
            return res?.data?.quiz
        }catch(err:any){
            errorToast(err);
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
);


type ansType = {
    questionId: string,
    question: string,
    topic: string,
    answer: string
  }

interface AddAnswerValues {
    quizId: string;
    solutions: ansType[];
}

export const addAnswer = createAsyncThunk(
    '/quiz/answer/add',
    async(values:AddAnswerValues, {rejectWithValue})=>{
        try{
            let res = await axios.post(`${baseUrl}/answer`,values,{
                headers:{
                    ...authTokenHeader
                }
            });
            toast.success(res?.data?.message)
            return res?.data?.answers
        }catch(err:any){
            errorToast(err);
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
);


export const getAnswer = createAsyncThunk(
    '/quiz/answer/get',
    async(id:string, {rejectWithValue})=>{
        try{
            let res = await axios.get(`${baseUrl}/answer/user-answer/${id}`,{
                headers:{
                    ...authTokenHeader
                }
            });
            return res?.data?.answers
        }catch(err:any){
            errorToast(err);
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
);

type answerResponeType = {
    quizId:string,
    solutions:[]
}

interface QuizState {
    allQuizLoading:Boolean,
    allQuiz:[],
    singleQuizLoading:Boolean,
    singleQuiz:[],
    loading:Boolean,
    answers:answerResponeType,
  }


const initialState = {
    allQuizLoading:false,
    allQuiz:[],
    singleQuizLoading:false,
    singleQuiz:[],
    loading:false,
    answers: {
        quizId:'',
        solutions:[]
    }
}as QuizState


const quizSlice = createSlice({
    name:'quiz',
    initialState: initialState,
    reducers:{
        clearAnswers:(state)=>{
            state.answers = {
                quizId:'',
                solutions:[]
            }
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(getAllQuiz.pending, (state)=>{
            state.allQuizLoading = true
        })
        .addCase(getAllQuiz.fulfilled, (state, action:PayloadAction<any>)=>{
            state.allQuizLoading = false,
            state.allQuiz = action.payload;
        })
        .addCase(getAllQuiz.rejected, (state)=>{
            state.allQuizLoading = false
        })
        .addCase(getQuizById.pending, (state)=>{
            state.singleQuizLoading = true
        })
        .addCase(getQuizById.fulfilled, (state, action:PayloadAction<any>)=>{
            state.singleQuizLoading = false,
            state.singleQuiz = action.payload;
        })
        .addCase(getQuizById.rejected, (state)=>{
            state.singleQuizLoading = false
        })
        .addCase(addQuiz.pending, (state)=>{
            state.loading = true
        })
        .addCase(addQuiz.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(addQuiz.rejected, (state)=>{
            state.loading = false
        })
        .addCase(updateQuiz.pending, (state)=>{
            state.loading = true
        })
        .addCase(updateQuiz.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(updateQuiz.rejected, (state)=>{
            state.loading = false
        })
        .addCase(addAnswer.pending, (state)=>{
            state.loading = true
        })
        .addCase(addAnswer.fulfilled, (state, action:PayloadAction<any>)=>{
            state.loading = false
            state.answers = action.payload
        })
        .addCase(addAnswer.rejected, (state)=>{
            state.loading = false
        })
        .addCase(getAnswer.pending, (state)=>{
            state.loading = true
        })
        .addCase(getAnswer.fulfilled, (state, action:PayloadAction<any>)=>{
            state.loading = false
            state.answers = action.payload
        })
        .addCase(getAnswer.rejected, (state)=>{
            state.loading = false
        })
    }
})

export const { clearAnswers } = quizSlice.actions
export default quizSlice.reducer