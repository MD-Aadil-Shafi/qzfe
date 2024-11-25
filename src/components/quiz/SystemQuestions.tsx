import { useAppDispatch, useAppSelector } from "../../redux/useTypedSelectors"
import { getSystemQuestions } from "../../redux/reducers/questionSlice"
import Loader from "../Loader";
import { useEffect } from "react";
import QuestionViewCard, { QuestionType } from "./QuestionViewCard";

export interface SystemQuestionsType{
    selectedQuestions: string[]
    handleSelect:(val:string)=>void;
    handleRemove:(val:string)=>void;
}

const SystemQuestions = ({selectedQuestions, handleSelect, handleRemove}:SystemQuestionsType) => {
    
    const dispatch = useAppDispatch()
    const {allQuestionsLoading, allQuestions} = useAppSelector(store => store.question);

    useEffect(()=>{
        dispatch(getSystemQuestions())
    },[])

  return (
    <div className="w-full p-2 rounded-lg">
        {allQuestionsLoading ?
        <Loader/>
        : allQuestions?.map((item:QuestionType, index:number)=>(
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

export default SystemQuestions;