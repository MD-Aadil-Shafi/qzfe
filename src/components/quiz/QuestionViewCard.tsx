import { SystemQuestionsType } from './SystemQuestions'

type optionsType = {
    one:string,
    two:string,
    three:string,
    four:string
}

export interface QuestionType{
    _id:string,
    question:string,
    topic:string,
    level:string,
    options: optionsType[],
    correctOption?:string,
}

interface cardItemType extends SystemQuestionsType {
    item:QuestionType,
    index: number,
}


const QuestionViewCard = ({item, index, selectedQuestions, handleRemove, handleSelect}:cardItemType) => {

    const checkContains = () =>{
        let temp = selectedQuestions.some((x) => x === item?._id);
        return temp;
    }

    const handleSelection = () =>{
        if(checkContains() === true){
            handleRemove(item?._id)
        }else{
            handleSelect(item?._id)
        }
    }

  return (
    <div className='w-full p-2 mb-2 bg-slate-100 rounded-lg shadow-lg'>
        <div className='flex justify-between items-center'>
        <p className='font-bold'>Question {index+1}</p>

        <div className='flex items-center gap-3'>
        <div className="badge capitalize bg-primary text-white">{item?.topic}</div>
        <div className={`badge capitalize ${item?.level === "easy" ? "bg-green-300" : item?.level === "medium" ? "bg-yellow-300" : "bg-red-300"}`}>{item?.level}</div>
        <button className={`btn btn-sm shadow ${checkContains() === false ? "bg-white" : "bg-green-400"}`}
        onClick={handleSelection}
        >
            {checkContains() === true ? "Selected" : "Select"}
        </button>
        </div>
        </div>
        <p className='mb-2'>{item?.question}</p>
        <p className='font-bold'>Options :</p>
        <section className='flex gap-4'>
        <p><span className='font-bold'>A.</span> {item?.options?.[0]?.one}</p>
        <p><span className='font-bold'>B.</span> {item?.options?.[0]?.two}</p>
        <p><span className='font-bold'>C.</span> {item?.options?.[0]?.three}</p>
        <p><span className='font-bold'>D.</span> {item?.options?.[0]?.four}</p>
         </section>
         {item?.correctOption ?
         <>
         <p className='font-bold mt-2'>Correct Answer : <span className='text-green-600'>{item?.correctOption}</span></p>
         </>
        : null}
        
    </div>
  )
}

export default QuestionViewCard