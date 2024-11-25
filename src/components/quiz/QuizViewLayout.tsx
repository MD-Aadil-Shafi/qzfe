import { useAppDispatch, useAppSelector } from "../../redux/useTypedSelectors"
import { getAllQuiz } from "../../redux/reducers/quizSlice";
import Loader from "../Loader";
import { useEffect } from "react";
import QuizViewCard, { QuizViewCardType } from "./QuizViewCard";

const QuizViewLayout = () => {
    
    const dispatch = useAppDispatch()
    const {allQuizLoading, allQuiz} = useAppSelector(store => store.quiz);

    useEffect(()=>{
        dispatch(getAllQuiz())
    },[])


  return (
    <div className="px-10 w-full py-2 rounded-lg min-h-[86vh]">
        <h1 className='text-2xl mb-3'>All Quiz</h1>
        {allQuizLoading ?
        <Loader/>
        : 
        allQuiz?.length ?
        <section className="flex justify-center items-center gap-4 flex-wrap">
        {
            allQuiz?.map((item:QuizViewCardType, index:number)=>(
                <QuizViewCard item={item} index={index}/>
            ))
        }
        </section>
        :
        <h6 className="text-xl my-10 text-center">No Quiz Found</h6>
        }
    </div>
  )
}

export default QuizViewLayout;