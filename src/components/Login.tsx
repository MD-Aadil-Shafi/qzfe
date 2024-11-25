import {useState} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch, useAppSelector } from "../redux/useTypedSelectors";
import { login, register } from "../redux/reducers/authSlice";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

type LoginProps = {
    screenType: string,
    setScreenType: (val:string)=>void;
}

const Login = ({setScreenType, screenType}:LoginProps) => {
    const dispatch = useAppDispatch();
    const {loading} = useAppSelector(store => store.auth);
	const responseGoogle = async (authResult:any) => {
		try {
			if (authResult["code"]) {
                if(screenType === "login"){
                    await dispatch(login({code:authResult.code}))
                }else{
                    await dispatch(register({code:authResult.code}))
                }
                
			} else {
				// console.log('google auth error', authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log('Error while Google Login...', e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

    const [state, setState] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state, [e.target.name]:e.target.value})
    }

    const handleSubmit = async() =>{
        if(screenType === "login" && (!state.email || !state.password)){
            return toast.error("Email and password is required.")
        }
        if(screenType === "register" && (!state.email || !state.password || !state.name || !state.confirmPassword)){
            return toast.error("All fields are required.")
        }
        if(state.password.length < 6){
            return toast.error("Password must be at least of 6 characters.")
        }
        if(screenType === "register" && (state.password !== state.confirmPassword)){
            return toast.error("Password and confirm password should match")
        }
        let tempData = {

        }
        if(screenType === "login"){
            tempData = {email: state.email, password:state.password}
            await dispatch(login(tempData));
        }else{
            tempData = {name: state.name, email: state.email, password:state.password}
            await dispatch(register(tempData));
        }
    }

	return (
		<div className="w-full md:px-5 rounded-xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-5 text-center">Quiz Online</h1>

            <div className="mx-auto p-5 w-full sm:w-[80%] shadow rounded-lg">
                <h2 className="mb-4 text-3xl">{screenType === "login" ? "Sign in" : "Sign up"}</h2>

                {screenType === "register" ?
                <div className="mb-3">
                <label>Name</label><br></br>
                <input type="text" placeholder="Type name here" 
                className="input input-bordered w-full"
                name="name" value={state.name} onChange={handleChange}
                />
                </div>
                :null}
                <div className="mb-3">
                    <label>Email</label><br></br>
                <input type="text" placeholder="Type email here" 
                className="input input-bordered w-full" 
                name="email" value={state.email} onChange={handleChange}
                />
                </div>
                <div className="mb-3">
                    <label>Password</label><br></br>
                <input type="password" placeholder="Type password here" 
                className="input input-bordered w-full" 
                name="password" value={state.password} onChange={handleChange}
                />
                </div>
                {screenType === "register" ?
                <div className="mb-3">
                    <label>Confirm Password</label><br></br>
                <input type="password" placeholder="Confirm password here" 
                className="input input-bordered w-full" 
                name="confirmPassword" value={state.confirmPassword} onChange={handleChange}
                />
                </div>
                : null}
                <div className="my-3 flex justify-center items-center">
                <button onClick={handleSubmit} 
                data-testid="normalSignBtn"
                className="btn w-full btn-neutral" disabled={loading}>
                    {screenType === "login" ? "Sign in" : "Sign up"}
			</button>	
                </div>
                <p className="text-center text-xl">Or</p>
                <hr></hr>
                <div className="my-3 flex justify-center items-center">
                <button onClick={googleLogin} disabled={loading} 
                data-testid="googleSignBtn"
                className="btn w-full btn-primary">
                <FaGoogle/>
				{screenType === "login" ? "Sign in with Google" : "Sign up with google"}
			</button>	
                </div>
                {screenType === "login" ?
                <p className="text-center">Haven't created account yet? <span className="text-primary cursor-pointer"
                onClick={()=>setScreenType("register")}
                data-testid="registerSwitchBtn"
                >Click to Register</span></p>
                :
                <p className="text-center">Already crated an account? <span className="text-primary cursor-pointer"
                onClick={()=>setScreenType("login")}
                data-testid="loginSwitchBtn"
                >Click to Login</span></p>
                }
            </div>
			
		</div>
	);
}

export default Login