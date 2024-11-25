import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import Login from "../components/Login";
import bgImg from '../assets/kidImg.webp';

const KEY = import.meta.env.VITE_API_KEY;
// console.log("key", KEY)

const Auth = () => {
    const [screenType, setScreenType] = useState("login");
  
    return (
        <section className="flex w-full">
            <div className="w-[0px] md:w-1/2 p-5">
            <img src={bgImg} className="w-full h-[calc(100vh-40px)] rounded-xl object-cover"/>
            </div>
            <div className="w-full md:w-1/2 p-5">
            <GoogleOAuthProvider clientId={KEY}>
            <Login setScreenType={setScreenType} screenType={screenType}/>
	    </GoogleOAuthProvider>
            </div>
        </section>
  )
}

export default Auth