import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/useTypedSelectors"
import { useParams } from "react-router-dom";
import { clearAnswers, getAnswer } from "../redux/reducers/quizSlice";
import Loader from "../components/Loader";
import AnswerReview from "../components/quiz/AnswerReview";

const ViewAnswer = () => {
  
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {loading, answers} = useAppSelector(store => store.quiz)

    useEffect(()=>{
        dispatch(clearAnswers())
        if(id){
            dispatch(getAnswer(id))
        }
    },[])

    return (
    <div className="px-10 py-4 min-[86vh]">
        {loading ? 
        <Loader/>
        :
        answers?.quizId ?
        <AnswerReview/>
        :
        <p className="text-center text-red-500 my-10">No Answer Found!</p>
        }
    </div>
  )
}

export default ViewAnswer