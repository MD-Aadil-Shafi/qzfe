import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/useTypedSelectors";
import { toast } from "react-toastify";

export type QuizViewCardType = {

createdAt:string
createdBy:string
creatorName:string
isActive:boolean
isOpen:boolean
maxParticipants:number
participantsId:string[]
timeLimitInMinutes:number
title:string
_id:string

}

type quizInnerType = {
    item: QuizViewCardType,
    index:number
}

const QuizViewCard = ({item, index}: quizInnerType) => {
    
  const {user} = useAppSelector(store => store.auth);

    const navigate = useNavigate();

    const handleNavigate = () =>{
      if(item?.participantsId?.includes(user?._id)){
        navigate(`/quiz-answer/${item?._id}`)
      }else if(item?.participantsId?.length === item?.maxParticipants){
        return toast.error("Enrollment Filled.")
      }else{
        navigate(`/quiz-enabled/${item?._id}`)
      }
    }

  return (
    <motion.div
    key={index}
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative h-[440px] w-80 shrink-0 overflow-hidden rounded-xl bg-primary p-8 mb-3 shadow-lg"
    >
      <div className="relative z-10 text-white">
        <span className="mb-3 block w-fit rounded-full bg-white/30 px-3 py-0.5 text-sm font-light text-white">
          {item?.timeLimitInMinutes} Minutes
        </span>
        <motion.span
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="my-2 block origin-top-left font-mono text-3xl font-black leading-[1.2]"
        >
          {item?.title}
        </motion.span>
        <p className="font-bold">
         <span className="text-yellow-500">Participants</span> {item?.participantsId?.length}/{item?.maxParticipants}
        </p>
        <p className="my-3">
         <span className="text-yellow-500">Created By</span><br></br> {item?.creatorName}
        </p>
        <p className="my-3">
         {new Date(item?.createdAt).toDateString()}
        </p>
        <div className={`badge ${item?.participantsId?.length < item?.maxParticipants  ? "bg-green-400" : "bg-red-400"}`}>
            {item?.participantsId?.length < item?.maxParticipants  ? "Active" : "Closed"}
        </div>
      </div>
      <button
      // disabled={item?.participantsId?.length === item?.maxParticipants}
      onClick={handleNavigate}
      className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white cursor-pointer">
        {item?.participantsId?.length === item?.maxParticipants ? "Enrollment Filled" : item?.participantsId?.includes(user?._id) ? "View Result" : "Attend Now"}
      </button>
      <Background />
    </motion.div>
  );
};

const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="none"
      />
      <motion.ellipse
        variants={{
          hover: {
            scale: 500,
            
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="0.5"
        ry="0.5"
        fill="#000"
      />
    </motion.svg>
  );
};

export default QuizViewCard;