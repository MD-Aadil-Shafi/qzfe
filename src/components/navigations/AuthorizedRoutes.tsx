import {Suspense, lazy} from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import { Spin } from "antd";
import { useAppSelector } from '../../redux/useTypedSelectors';

//routes
const Dashboard = lazy(() => import("../../pages/DashBoard"));
const NotFound = lazy(() => import("../../pages/NotFound"));
const CreateQuiz = lazy(()=> import("../../pages/CreateQuiz"));
const MyQuestions = lazy(()=> import("../../pages/MyQuestions"));
const ViewQuiz = lazy(()=> import("../../pages/ViewQuiz"));
const QuizDetail = lazy(()=> import("../../pages/QuizDetail"));
const ViewAnswer = lazy(()=> import("../../pages/ViewAnswer"));



export const getFallbackUI = () => (
	<div className="flex h-[100vh] w-full justify-center items-center">
		<Spin
			size="large"
		/>
	</div>
);




const AuthorizedRoutes = () => {
    const {user} = useAppSelector(state => state.auth);
    if (!(user?.name)) {
        return <Navigate to="/login" />;
      }

  return (
    <Suspense fallback={getFallbackUI()}>
		<Routes>
          {/* <Route path='/' element={<Dashboard/>}/> */}
          <Route path='/dashboard' element={<Dashboard/>}/> 
          <Route path='/create-quiz' element={<CreateQuiz/>}/> 
          <Route path='/my-question' element={<MyQuestions/>}/> 
          <Route path='/quiz' element={<ViewQuiz/>}/> 
          <Route path='/quiz-enabled/:id' element={<QuizDetail/>}/> 
          <Route path='/quiz-answer/:id' element={<ViewAnswer/>}/> 

          <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
  )
}

export default AuthorizedRoutes