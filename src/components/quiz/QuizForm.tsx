import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/useTypedSelectors"
import { addQuiz, getAllQuiz } from "../../redux/reducers/quizSlice";
import { useNavigate } from "react-router-dom";


const QuizForm = ({selectQuestions}:{selectQuestions:string[]}) => {

    const dispatch = useAppDispatch();
    const {user} = useAppSelector(store => store.auth)
    const { loading } = useAppSelector(store => store.quiz);
    const navigate = useNavigate()
    const [data, setData] = useState({
        title:'',
        timeLimitInMinutes: 20,
        maxParticipants: 10,
        creatorName: user?.name,
        questionsId: selectQuestions,
    })
    const [error, setError] = useState('')

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
            setData({...data, [e.target.name]:e.target.value})

    }

    const handleSubmit = async() =>{
        setError('')
        if(!data.title || !data.timeLimitInMinutes || !data.maxParticipants){
            return setError("All fields are required")
        }
        if(data.timeLimitInMinutes < 10){
            return setError("Time limit should be at least 10 minutes")
        }
        if(data.maxParticipants < 1){
            return setError("At-least one participants enrollment is required.")
        }
        data.creatorName = user?.name;
        if(selectQuestions?.length !== 20) return setError("Please select 20 question for quiz.")
        data.questionsId = selectQuestions;
        
        const res = await dispatch(addQuiz(data));
        if(res?.type === "/quiz/add/fulfilled"){
            dispatch(getAllQuiz())
            //@ts-ignore
            document.getElementById('quiz-inner-close')?.click();
            navigate('/quiz')
        }
    }
    
  return (
<dialog id="quiz_modal" className="modal">
<div className="modal-box w-11/12 max-w-5xl">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" id="quiz-inner-close">✕</button>
    </form>
    <h3 className="font-bold text-lg">Creating New Quiz!</h3>
    <div className="my-3">
        <div className="mb-3">
            <label>Title</label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full input-sm" 
            name="title" onChange={handleChange}
            />
        </div>
        <div className="mb-3 flex justify-between items-center gap-4">
        <div className="w-full">
            <label>Time Limit (in minutes)</label>
            <input type="number" placeholder="Type here" className="input input-bordered w-full input-sm" 
            name="timeLimitInMinutes" onChange={handleChange} value={data.timeLimitInMinutes}
            />
        </div>

        <div className="w-full">
            <label>Maximum Participants Allowed</label>
            <input type="number" placeholder="Type here" className="input input-bordered w-full input-sm" 
            name="maxParticipants" onChange={handleChange} value={data.maxParticipants}
            />
        </div>

        </div>

    </div>
    <p className="text-rose-500">{error}</p>

    <div className='flex justify-end'>
      <button className="btn btn-sm btn-primary shadow-md"
      onClick={handleSubmit}
      >
        {loading && <span className="loading loading-spinner"></span>}
        Submit
    </button>

    </div>
  </div>
</dialog>
  )
}

export default QuizForm