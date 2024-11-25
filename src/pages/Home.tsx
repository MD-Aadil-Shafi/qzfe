import { FaGoogle } from "react-icons/fa";
import { IoIosBrowsers } from "react-icons/io";
import bgImg from '../assets/kidImg.webp';
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/useTypedSelectors";

const Home = () => {
  
    const {user} = useAppSelector(store => store.auth);

  return (
    <div className='flex w-full p-5 flex-wrap'>
        <div className='p-5 w-full md:w-1/2'>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-2">Quiz Online</h1>
        <h2 className='text-3xl font-bold mb-4'>Quality question sets.</h2>
        <p className='mb-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus odit cum, repellat id consequuntur recusandae harum aliquam. Quam repellendus dolores nostrum quibusdam sunt, architecto deleniti sed, natus reiciendis quidem rem quo laudantium rerum! Rerum, corrupti qui voluptatem ad officiis magni esse totam adipisci veniam aperiam consequatur, deleniti veritatis. Eveniet, dolorum?</p>
        
        <div className="mb-5">
            <p className="text-2xl mb-2">Liked by 10000+ Kids.</p>
        <div className="rating rating-lg rating-half">
  <input type="radio" disabled name="rating-10" className="rating-hidden" />
  <input type="radio" disabled name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
  <input type="radio" disabled name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
  <input
    type="radio" disabled
    name="rating-10"
    className="mask mask-star-2 mask-half-1 bg-orange-400"
     />
  <input type="radio" disabled name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
  <input type="radio" disabled name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
  <input type="radio" disabled name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
  <input type="radio" disabled name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
  <input type="radio" disabled name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
  <input type="radio" disabled name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" 
  defaultChecked
  />
  <input type="radio" disabled name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
</div>
        </div>

        <div className="mb-16">
            <p className="text-2xl">Rated for <span className="text-5xl font-bold">7</span>th <span className="text-primary">To</span> <span className="text-5xl font-bold">10</span>th grade kids.</p>
        </div>

        {user?.name ?
        <div className='flex flex-wrap w-full items-center'>
        <Link to="/dashboard">
        <button className='btn btn-wide mr-4 btn-neutral mb-3'>Move To Dashboard</button>
        </Link>
        <Link to="/quiz">
        <button className='btn btn-wide btn-primary flex mb-3'><IoIosBrowsers/> Browse Quiz</button>
        </Link>
        </div>
        :
        <div className='flex flex-wrap w-full items-center'>
        <Link to="/login">
        <button className='btn btn-wide mr-4 btn-neutral mb-3'>Sign in</button>
        </Link>
        <Link to="/login">
        <button className='btn btn-wide btn-primary flex mb-3'><FaGoogle/> Proceed With Google</button>
        </Link>
        </div>
        }

       

        </div>
        <div className='p-5 w-full md:w-1/2'>
        <img src={bgImg} className="w-full h-[calc(100vh-120px)] rounded-xl object-cover"/>
        </div>
    </div>
  )
}

export default Home