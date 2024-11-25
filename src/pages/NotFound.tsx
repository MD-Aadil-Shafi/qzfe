import { useNavigate } from 'react-router-dom'

const NotFound = () => {
 const navigate = useNavigate()

    return (
    <div className='text-center p-5'>
        <h1 className='text-4xl text-red-600 mb-3 mt-5'>404</h1>
        <h4 className='font-light mb-3 text-2xl'>Page Not Found</h4>
        <button className='btn btn-danger shadow fw-bold'
        onClick={()=>navigate('/dashboard', { replace: true })}
        >Back to Dashboard</button>
    </div>
  )
}

export default NotFound