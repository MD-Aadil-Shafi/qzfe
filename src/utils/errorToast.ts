import { toast } from "react-toastify";

export const errorToast = (err:any)=>{

    if(err?.response?.data?.message){
        return toast.error(err?.response?.data?.message)
    }else if(err?.response?.data?.detail){
        return toast.error(err?.response?.data?.detail)
    }
    else if(typeof err?.response?.data === "string" && err?.response?.data !== ""){
        return toast.error(err?.response?.data)
    }
    else if(typeof err?.response?.data !== "string" && Object.values(err?.response?.data)?.length){
        Object.entries(err?.response?.data)?.map((item: any )=>{
            toast.error(`${item?.[0]} : ${item?.[1]}`)
    })
    return
    }else{
        return toast.error("Something went wrong. Please Try later")
    }
}