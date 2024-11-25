import { useAppSelector, useAppDispatch } from '../redux/useTypedSelectors'
import { Link, useLocation } from 'react-router-dom';
import { TiArrowSortedDown } from "react-icons/ti";
import { logout } from '../redux/reducers/authSlice';

const Navbar = () => {
    const {user} = useAppSelector(store => store.auth);
    const dispatch = useAppDispatch();
    const path = useLocation();

    const handleLogout = () =>{
      dispatch(logout())
    }
    const handleClick = () => {
      const elem = document.activeElement;
      if (elem) {
        // @ts-ignore
        elem?.blur();
      }
    };

  
    if (!user?.name) return null
  return (
    <nav className='flex justify-between items-center px-10 py-2 bg-slate-100 shadow-md'>
        <Link to="/" className='text-2xl font-bold text-primary'>Quiz Online</Link>

<div className='flex gap-2'>
<div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-sm btn-primary capitalize"
  >Hi, {user?.name?.split(" ")?.[0]} <TiArrowSortedDown/></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 shadow rounded z-50">
    {path?.pathname !== "/dashboard"
    &&
    <li onClick={handleClick}><Link to="/dashboard">Dashboard</Link></li>
    }
    <li onClick={handleClick}><a className='bg-red-300' onClick={handleLogout}>Logout</a></li>
  </ul>
</div>
<img src={user?.dp || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} className='w-[30px] h-[30px] rounded-full'/>
</div>
    </nav>
  )
}

export default Navbar