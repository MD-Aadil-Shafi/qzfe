import { useState } from "react"
import SystemQuestions from "./SystemQuestions"
import { toast } from "react-toastify"
import SelfQuestions from "./SelfQuestions"
import QuizForm from "./QuizForm"


const CreateQuizLayout = () => {

  const [selectQuestions, setSelectedQuestions] = useState<string[]>([])
  const [selectionCount, setSelectionCount] = useState(0)

  const handleSelect = (val:string) =>{
    let temp = selectQuestions;
    let exists = selectQuestions.some((x) => x === val)
    if(exists) return toast.error("Already selected");
    if(temp.length < 20){
      temp.push(val);
      setSelectedQuestions([...temp])
      setSelectionCount(temp.length)
    }else{
      return toast.error("Already selected 20 questions")
    }
  }


  const handleRemove = (val:string) =>{
    let temp = selectQuestions;
    temp = temp.filter(x => x!== val);
    setSelectedQuestions([...temp]);
    setSelectionCount(temp.length)
  }

  const handleShowForm = () =>{
    //@ts-ignore
    document.getElementById('quiz_modal').showModal()
}

  return (
    <div className='px-10 py-5 min-h-[86vh]'>
      <div className="flex justify-between items-center">
      <h1 className='text-2xl'>Create Quiz</h1>
      <button className="btn btn-sm btn-neutral w-[140px]"
      disabled={selectionCount !== 20}
      onClick={handleShowForm}
      >Create + </button>
      </div>
      <p className="font-bold mb-2">Question selected <span className="text-xl">{selectionCount}/20</span></p>


  <div className="collapse collapse-arrow bg-primary mb-3">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title text-xl font-medium text-white">Select from your questions</div>
  <div className="collapse-content">
    <SelfQuestions
    selectedQuestions={selectQuestions}
    handleSelect={handleSelect}
    handleRemove={handleRemove}
   />
  </div>
</div>

  <div className="collapse collapse-arrow bg-primary mb-3">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title text-xl font-medium text-white">Select from system questions <span className="text-xs">(You won't be able to view system question's answers)</span></div>
  <div className="collapse-content">
    <SystemQuestions
     selectedQuestions={selectQuestions}
     handleSelect={handleSelect}
     handleRemove={handleRemove}
    />
  </div>
</div>

<QuizForm selectQuestions={selectQuestions}/>
    </div>
  )
}

export default CreateQuizLayout