
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/useTypedSelectors'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import QuestionAnswerCard from './QuestionAnswerCard';
import ConfirmModal from '../ConfirmModal';
import { addAnswer, clearAnswers } from '../../redux/reducers/quizSlice';
import Counter from './Counter';
import { useNavigate } from 'react-router-dom';
import AnswerReview from './AnswerReview';


const QuestionAnswerLayout = () => {

  const {singleQuiz, loading} = useAppSelector(store => store.quiz)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //for modal
  const [isOpen, setIsOpen] = useState(false)
  const handleAlertClose = () =>{
    setIsOpen(false)
  }
  //-------------------
  const [activeIndex, setActiveIndex] = useState(1);
  const [newQuestionSet, setNewQuestionSet] = useState(singleQuiz?.questions)
  const [showReviews, setShowReviews] = useState(false)

  useEffect(()=>{
    dispatch(clearAnswers())
    if(singleQuiz?.questions?.length){
      let temp = singleQuiz?.questions?.map((item:any)=>{
        return {
          ...item,
          answer:''
        }
      })
      setNewQuestionSet(temp);
      setIsOpen(true)
    }
    
  },[singleQuiz])

  const handlePrev = () =>{
    activeIndex >= 2 && setActiveIndex(prev => prev - 1);
  }

  type finalType = {
    _id: string,
    question: string,
    topic: string,
    answer: string
  }
  const handleNext = async() =>{
    if(activeIndex === 20){
      
      let final = newQuestionSet.map((item:finalType) =>{
        return{
          questionId: item?._id,
          question: item?.question,
          topic: item?.topic,
          answer: item?.answer,
        }
      })
      let res = await dispatch(addAnswer({quizId:singleQuiz?.quiz?._id , solutions:final}))
      if(res?.type === "/quiz/answer/add/fulfilled"){
        setShowReviews(true);
      }else{
        navigate('/quiz')
      }
    }else{
      activeIndex <= 19 && setActiveIndex(prev => prev + 1);
    }
    
  }

  const handleTimeOver = () =>{
    setActiveIndex(20)
    setTimeout(()=>{
      handleNext()
    },500)
  }

  const handleChange = (val: string) => {
    
    const temp = [...newQuestionSet];
    temp[activeIndex - 1].answer = val;
    setNewQuestionSet([...temp]);
};


  return (
    <>
    {showReviews ?
  <AnswerReview/>
  :  
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">{singleQuiz?.quiz?.title}</h1>
        <Counter initialMinutes={singleQuiz?.quiz?.timeLimitInMinutes} action={handleTimeOver}/>
        </div>
        <h2>By: {singleQuiz?.quiz?.creatorName}</h2>

      <p className='text-xl font-bold'>{activeIndex }/20</p>
        <progress className="progress progress-success w-full mb-3" value={activeIndex?.toString()} max="20"></progress>

    <QuestionAnswerCard item={newQuestionSet?.[activeIndex - 1]} handleChange={handleChange}/>
      <div className='flex justify-between items-center'>
        <button className='btn btn-sm btn-neutral w-[140px]'
        onClick={handlePrev}
        disabled={activeIndex === 1}
        ><FaLongArrowAltLeft/> Previous</button>
        <button className={`btn btn-sm w-[140px] ${activeIndex === 20 ? "btn-success" : "btn-neutral"}`}
        onClick={handleNext}
        disabled={loading}
        >
          {loading && <span className="loading loading-spinner"></span>}
          <FaLongArrowAltRight/>
        {activeIndex === 20 ? "Submit" : "Next"}
        </button>
      </div>
      <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} action={handleAlertClose}
      text="You are not allowed to re-fresh this page. You have to complete this quiz withing given amount of time else it'll get auto submitted when times over. "
      showSingle={true}/>
    </div>
     }
    </>
  )
}

export default QuestionAnswerLayout