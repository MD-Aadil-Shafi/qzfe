
import { QuestionType } from './QuestionViewCard'


interface cardItemType {
    item:QuestionType,
    handleChange:(val:string)=>void;
}

const QuestionAnswerCard = ({item, handleChange}:cardItemType) => {
  return (
    <div className='p-3 rounded-md shadow-md min-h-[180px] mb-5'>
        <div className='flex items-center justify-between'>
        <label className='text-xl font-bold'>Question</label>
        <div className='flex items-center gap-3'>
        <div className="badge capitalize bg-primary text-white px-4">{item?.topic}</div>
        <div className={`badge capitalize px-4 ${item?.level === "easy" ? "bg-green-300" : item?.level === "medium" ? "bg-yellow-300" : "bg-red-300"}`}>{item?.level}</div>
        </div>
        </div>
        <p className='mb-5 text-xl'>{item?.question}</p>

        <label className='text-xl font-bold'>Options</label>
        <div className='flex items-center justify-between mt-3'>
          {Object.entries(item?.options?.[0])?.filter(x => x[0] !== "_id")?.map((opt, idx)=>(
            <div className='flex items-center' key={idx}>
        <input type="radio" name={item?._id} className="radio radio-success mr-3" value={opt[1]}
        // @ts-ignore
        checked={item?.answer === opt[1]} 
        onChange={(e)=>handleChange(e.target.value)}
        />
        <p><span className='font-bold'>{idx + 1}.</span> {opt[1]}</p>
        
        </div>
          ))}
        </div>
    </div>
  )
}

export default QuestionAnswerCard