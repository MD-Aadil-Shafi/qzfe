import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
import { baseUrl } from "../baseUrl";
import { toast } from "react-toastify";
import { errorToast } from "../../utils/errorToast";

type registerType={
    name?:string,
    email?:string,
    password?:string,
    code?:string,
}
export const register = createAsyncThunk(
    '/user/register',
    async(value:registerType, {rejectWithValue})=>{
        try{
            let res = await axios.post(`${baseUrl}/auth/register`,value);
            if(res?.data?.token){
                localStorage.setItem('token',res?.data?.token)
                let user = {
                    ...res?.data?.user
                }
                localStorage.setItem('quiz-user', JSON.stringify(user))
              toast.success("Registration successful! Welcome to Quiz Online.")
                setTimeout(()=>{
                    window.location.href = "/dashboard"
                },500)
            }
        }catch(err:any){
            errorToast(err);
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
)


type loginType = {
    email?:string
    password?:string
    code?:string
}
export const login = createAsyncThunk(
    '/user/login',
    async(value:loginType, {rejectWithValue})=>{
        try{
            let res = await axios.post(`${baseUrl}/auth/login`,value);
            if(res?.data?.token){
                localStorage.setItem('token',res?.data?.token)
                let user = {
                    ...res?.data?.user
                }
                localStorage.setItem('quiz-user', JSON.stringify(user))
              toast.success("Login successful! Welcome back to Quiz Online.")
                setTimeout(()=>{
                    window.location.href = "/dashboard"
                },500)
            }
        }catch(err:any){
            errorToast(err)
            return rejectWithValue(err?.response?.data?.message);
        }
        
    }
)


interface AuthState {
    loading: boolean;
    user: object | {};
  }


const initialState = {
    loading:false,
     user: JSON.parse(localStorage.getItem('quiz-user') || '{}') || {}
    }as AuthState


const authSlice = createSlice({
    name:'auth',
    initialState: initialState,
    reducers:{
        logout:(state)=>{
            state.user = {}
            localStorage.removeItem('quiz-user')
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        
    },
    extraReducers: (builder) =>{
        builder.addCase(register.pending, (state)=>{
            state.loading = true
        })
        .addCase(register.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(register.rejected, (state)=>{
            state.loading = false
        })

        .addCase(login.pending, (state)=>{
            state.loading = true
        })
        .addCase(login.fulfilled, (state, action:PayloadAction<any>)=>{
            state.loading = false,
            state.user = action.payload
        })
        .addCase(login.rejected, (state)=>{
            state.loading = false
        })
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer