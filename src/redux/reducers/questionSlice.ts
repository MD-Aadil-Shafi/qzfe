import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
import { authTokenHeader, baseUrl } from "../baseUrl";
import { errorToast } from "../../utils/errorToast";
import { toast } from "react-toastify";

export const getSystemQuestions = createAsyncThunk(
    '/questions/system',
    async(_, {rejectWithValue})=>{
        try{
            let res = await axios.get(`${baseUrl}/question`,{
                headers:{
                    ...authTokenHeader
                }
            });
            return res?.data?.questions
        }catch(err:any){
            errorToast(err);
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
);

export const getUserQuestions = createAsyncThunk(
    '/questions/user',
    async(_, {rejectWithValue})=>{
        try{
            let res = await axios.get(`${baseUrl}/question/user-question`,{
                headers:{
                    ...authTokenHeader
                }
            });
            return res?.data?.questions
        }catch(err:any){
            errorToast(err);
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
);

export const deleteQuestion = createAsyncThunk(
    '/questions/delete',
    async(value:string, {rejectWithValue})=>{
        try{
            let res = await axios.delete(`${baseUrl}/question/${value}`,{
                headers:{
                    ...authTokenHeader
                }
            });
            toast.success("Deleted Successfully")
            return res?.data?.message
        }catch(err:any){
            errorToast(err);
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
);

type options = {
    one:string,
    two: string,
    three: string,
    four: string
}

interface AddQuestionValues {
    question: string;
    topic: string;
    level: string;
    options: options[];
    correctOption: string;
}

export const addQuestion = createAsyncThunk(
    '/questions/add',
    async(values:AddQuestionValues, {rejectWithValue})=>{
        try{
            let res = await axios.post(`${baseUrl}/question`,values,{
                headers:{
                    ...authTokenHeader
                }
            });
            return res?.data?.message
        }catch(err:any){
            errorToast(err);
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
);



interface QuestionState {
    allQuestionsLoading:Boolean,
    allQuestions:[],
    userQuestionsLoading:Boolean,
    userQuestions:[],
    loading:Boolean,
  }


const initialState = {
    allQuestionsLoading:false,
    allQuestions:[],
    userQuestionsLoading:false,
    userQuestions:[],
    loading:false,
}as QuestionState


const questionSlice = createSlice({
    name:'question',
    initialState: initialState,
    reducers:{
    },
    extraReducers: (builder) =>{
        builder.addCase(getSystemQuestions.pending, (state)=>{
            state.allQuestionsLoading = true
        })
        .addCase(getSystemQuestions.fulfilled, (state, action:PayloadAction<any>)=>{
            state.allQuestionsLoading = false,
            state.allQuestions = action.payload;
        })
        .addCase(getSystemQuestions.rejected, (state)=>{
            state.allQuestionsLoading = false
        })
        .addCase(getUserQuestions.pending, (state)=>{
            state.userQuestionsLoading = true
        })
        .addCase(getUserQuestions.fulfilled, (state, action:PayloadAction<any>)=>{
            state.userQuestionsLoading = false,
            state.userQuestions = action.payload;
        })
        .addCase(getUserQuestions.rejected, (state)=>{
            state.userQuestionsLoading = false
        })
        .addCase(addQuestion.pending, (state)=>{
            state.loading = true
        })
        .addCase(addQuestion.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(addQuestion.rejected, (state)=>{
            state.loading = false
        })
        .addCase(deleteQuestion.pending, (state)=>{
            state.loading = true
        })
        .addCase(deleteQuestion.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(deleteQuestion.rejected, (state)=>{
            state.loading = false
        })
    }
})

export default questionSlice.reducer