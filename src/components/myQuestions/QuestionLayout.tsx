import { IoMdAdd } from "react-icons/io";
import AddQuestion from "./AddQuestion";
import MyQuestions from "./MyQuestions";

const QuestionLayout = () => {

    const handleShowForm = () =>{
        //@ts-ignore
        document.getElementById('question_modal').showModal()
    }
  return (
    <div className='px-10 py-5 min-h-[86vh]'>
        <div className="flex justify-between items-center">
        <h1 className='text-2xl'>My Questions</h1>
        <button className="btn btn-sm btn-neutral w-[140px]"
        onClick={handleShowForm}
        >Add New <IoMdAdd/></button>
        </div>
        <MyQuestions/>
        <AddQuestion/>
    </div>
  )
}

export default QuestionLayout