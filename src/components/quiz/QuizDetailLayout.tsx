import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/useTypedSelectors"
import { getQuizById } from "../../redux/reducers/quizSlice"
import { useEffect } from "react"
import Loader from "../Loader"
import QuestionAnswerLayout from "./QuestionAnswerLayout"

const QuizDetailLayout = () => {
  
  const {id} = useParams();
  const {singleQuizLoading, singleQuiz} = useAppSelector(store => store.quiz)
  // console.log('single quiz', singleQuiz)
  const dispatch = useAppDispatch();

  useEffect(()=>{
   id && dispatch(getQuizById(id))
  },[id])


  return (
    <div className="px-10 w-full py-2 rounded-lg min-h-[86vh]">
        {singleQuizLoading ?
        <Loader/>
        :
        singleQuiz?.quiz?._id ?
        <>
          <QuestionAnswerLayout/>
        </>
        :
        <h6 className="text-xl my-10 text-center">No Quiz Found</h6>
        }
    </div>
  )
}

export default QuizDetailLayout