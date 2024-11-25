import { useAppDispatch, useAppSelector } from "../../redux/useTypedSelectors"
import { getUserQuestions } from "../../redux/reducers/questionSlice"
import Loader from "../Loader";
import { useEffect } from "react";
import QuestionViewCard, { QuestionType } from "./QuestionViewCard";
import { SystemQuestionsType } from "./SystemQuestions";


const SelfQuestions = ({selectedQuestions, handleSelect, handleRemove}:SystemQuestionsType) => {
    
    const dispatch = useAppDispatch()
    const {userQuestionsLoading, userQuestions} = useAppSelector(store => store.question);

    useEffect(()=>{
        dispatch(getUserQuestions())
    },[])

  return (
    <div className="w-full p-2 rounded-lg">
        {userQuestionsLoading ?
        <Loader/>
        : !userQuestions?.length ?
            <p className="text-white my-5">You've not created any questions yet. Your can create new question from dashboard.</p>
        : userQuestions?.map((item:QuestionType, index:number)=>(
            <section key={index}>
            <QuestionViewCard item={item} index={index}
            selectedQuestions={selectedQuestions}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            />
            </section>
        ))}
    </div>
  )
}

export default SelfQuestions;