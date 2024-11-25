import {Suspense, lazy} from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { getFallbackUI } from './components/navigations/AuthorizedRoutes';
const Auth = lazy(()=>import('./pages/Auth'))
const AuthorizedRoutes = lazy(()=>import('./components/navigations/AuthorizedRoutes'))
const Home = lazy(()=>import('./pages/Home'))


const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Suspense fallback={getFallbackUI()}>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth/>} />
      <Route path='*' element={<AuthorizedRoutes/>}/>
    </Routes>
    </Suspense>
    <Footer/>
    <ToastContainer />
    </BrowserRouter>
  )
}

export default App