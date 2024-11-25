import { useAppDispatch, useAppSelector } from "../../redux/useTypedSelectors"
import { deleteQuestion, getUserQuestions } from "../../redux/reducers/questionSlice"
import Loader from "../Loader";
import { useEffect } from "react";
import { QuestionType } from "../quiz/QuestionViewCard";
import MyQuestionCard from './MyQuestionCard';


const MyQuestions = () => {
    
    const dispatch = useAppDispatch()
    const {userQuestionsLoading, userQuestions} = useAppSelector(store => store.question);

    useEffect(()=>{
        dispatch(getUserQuestions())
    },[])

    const handleRemove = async(val:string) =>{
       let res=  await dispatch(deleteQuestion(val));
       if(res?.type === "/questions/delete/fulfilled"){
        dispatch(getUserQuestions())
       }
    }

  return (
    <div className="w-full p-2 rounded-lg">
        {userQuestionsLoading ?
        <Loader/>
        : !userQuestions?.length ?
            <p className="my-5">You've not created any questions yet.</p>
        : userQuestions?.map((item:QuestionType, index:number)=>(
            <section key={index}>
            <MyQuestionCard item={item} index={index}
            handleRemove={handleRemove}
            />
            </section>
        ))}
    </div>
  )
}

export default MyQuestions;