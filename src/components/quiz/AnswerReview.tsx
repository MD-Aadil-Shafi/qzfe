import { Link } from "react-router-dom"
import { useAppSelector } from "../../redux/useTypedSelectors"

const AnswerReview = () => {
    
    const {singleQuiz, answers} = useAppSelector(store => store.quiz)

    const attempted = () =>{
        let temp = answers?.solutions?.filter((x:{answer:string}) => x?.answer !== "")
        return temp?.length
    }
    const correct = () =>{
        let temp = answers?.solutions?.filter((x:{answer:string, correct:boolean}) => x?.answer !== "" && x?.correct === true)
        return temp?.length
    }
    const inCorrect = () =>{
        let temp = answers?.solutions?.filter((x:{answer:string, correct:boolean}) => x?.answer !== "" && x?.correct === false)
        return temp?.length
    }

    const topicWiseCheck = () =>{
        // @ts-ignore
        const suggestions = answers?.solutions?.reduce((acc, solution) => {
            const topic = solution.topic;
            const isCorrect = solution.correct;
        
            if (!acc[topic]) {
                acc[topic] = { correct: 0, wrong: 0};
            }
        
            if (isCorrect) {
                acc[topic].correct += 1;
            } else {
                acc[topic].wrong += 1;
            }
            return acc;
        }, {});
        return suggestions;
    }
   

    const reviewer = (val:number):string =>{
        if(val !== 0 && val >= 4) return "Need to work more on this topic"
        if(val !== 0 && val >= 3) return "Need focus on this topic"
        if(val !== 0 && val >= 1) return "Need little focus on this topic"
        return "Your are having good command on this topic. Keep it up!!"
    }

    return (
    <section>
        <h1 className="text-xl text-primary">Answer Review of</h1>
        <div className="flex items-center justify-between">
        <h2 className="text-2xl">{singleQuiz?.quiz?.title || answers?.quizId?.title}</h2>
        <Link to="/quiz"><button className="btn btn-sm btn-neutral">Back To All Quiz</button></Link>
        </div>
        <h2 className="mb-5">By: {singleQuiz?.quiz?.creatorName || answers?.quizId?.creatorName}</h2>

        <p className="text-xl mb-5">Total Questions: <span className="font-bold text-2xl">20</span></p>
        <div className="flex items-center justify-evenly flex-wrap">
        <InnerProgress title="Attempted" number={attempted()} bg="text-yellow-500"/>
        <InnerProgress title="Correct" number={correct()} bg="text-green-500"/>
        <InnerProgress title="InCorrect" number={inCorrect()} bg="text-red-500"/>
        </div>

        <div>
            <p className="text-xl my-5">Topic Wise Results & Suggestions :</p>
            {Object.entries(topicWiseCheck()).map((item:any, index:number)=>(
                <div className="p-2 bg-white shadow-lg rounded-lg flex flex-wrap items-center gap-3 mb-3" key={index}>
                    <p className="w-[180px] font-bold capitalize">{item[0]}</p>
                    <p className="w-[160px]">Correct : <span className="text-green-500 font-bold">{item[1]?.correct}</span></p>
                    <p className="w-[200px]">Wrong/Un-attempted : <span className="text-red-500 font-bold">{item[1]?.wrong}</span></p>
                    <p className={`${item[1].wrong > 0 ? "text-red-500" : "text-green-500"}`}>({reviewer(item[1]?.wrong)})</p>
                </div>
            ))}
        </div>


    </section>
  )
}

//100
//20
//15

const InnerProgress = ({title = '', number= 0, bg=''}) => {
    return (
        // @ts-ignore
        <div className={`radial-progress ${bg} bg-white shadow-lg mb-2`} style={{ "--value": (Number(number)/20)*100, "--size": "12rem", "--thickness": "2rem" }} role="progressbar">
            <p className="text-center font-bold">{title}</p>
            <p className="text-center font-bold text-3xl">{number}</p>
        </div>
    )
}

export default AnswerReview