import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/useTypedSelectors"
import { addQuestion, getUserQuestions } from "../../redux/reducers/questionSlice";
import { toast } from "react-toastify";

const questionTopis = [
    'algebra',
    'geometry',
    'statistics',
    'physics',
    'chemistry',
    'biology',
    'computer science',
    ]

const AddQuestion = () => {

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(store => store.question);

    const [data, setData] = useState({
        question:'',
        topic: '',
        level: '',
        options:[
            {
                one:'',
                two:'',
                three:'',
                four:''
            }
        ],
        correctOption: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, option?:string) =>{
        if(option){
            setData({
                ...data,
                options: [
                    {
                        ...data.options[0],
                        [option]: e.target.value
                    }
                ]
            });
        }else{
            setData({...data, [e.target.name]:e.target.value})
        }
    }

    const handleSubmit = async() =>{
        setError('')
        if(!data.question || !data.topic || !data.level || !data.correctOption || 
            Object.values(data.options[0]).includes('')
        ){
            return setError("All fields are required")
        }
        if(!Object.values(data.options[0]).some(x => x == data.correctOption)){
            return setError("please enter an option's answer in correct answer.")
        }
        const res = await dispatch(addQuestion(data));
        if(res?.type === "/questions/add/fulfilled"){
            toast.success("Added Successfully")
            dispatch(getUserQuestions())
            //@ts-ignore
            document.getElementById('inner-close')?.click();
        }
    }
    
  return (
<dialog id="question_modal" className="modal">
<div className="modal-box w-11/12 max-w-5xl">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" id="inner-close">✕</button>
    </form>
    <h3 className="font-bold text-lg">Adding New Question!</h3>
    <div className="my-3">
        <div className="mb-3">
            <label>Question</label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full input-sm" 
            name="question" onChange={handleChange}
            />
        </div>
        <div className="mb-3 flex justify-between items-center gap-4">
        <div className="w-full">
            <label>Topic</label>
            <select className="select select-bordered w-full select-sm"
            name="topic" onChange={handleChange}
            >
            <option disabled selected>Select an option?</option>
            {questionTopis.map((item, index)=>(
                <option key={index}>{item}</option>
            ))}
            </select>
        </div>

        <div className="w-full">
            <label>Level</label>
            <select className="select select-bordered w-full select-sm"
            name="level" onChange={handleChange}
            >
            <option disabled selected>Select an option?</option>
            {['easy', 'medium', 'hard'].map((item, index)=>(
                <option key={index}>{item}</option>
            ))}
            </select>
        </div>

        <div className="w-full">
            <label>Correct Answer</label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full input-sm" 
            name="correctOption" onChange={handleChange}
            />
        </div>
        </div>

        <div className="flex justify-between items-center gap-4">
            {['one', 'two', 'three', 'four'].map((item, index)=>(
                <div className="" key={index}>
                    <label>Option <span className="capitalize">{item}</span></label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full input-sm" 
                    onChange={e => handleChange(e, item)}
                    />
                </div>
            ))}
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

export default AddQuestion