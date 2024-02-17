import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import './style/navbar.css' 

function Navbar(){
     const { isAuthenticate, logout, user } = useAuth()
    return(
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to={'/'}>
                <h1 className="text-2xl font-bold">PeoPayGo Manager</h1>
            </Link>
            <ul className="flex gap-x-2">
                {
                    isAuthenticate ? (
                        <>
                        <li>
                        Welcome { user.username}
                        </li>
                        <li>
                            {
                                user.is_admin == true  ? 
                                <Link to='/admin/add-timesheet'>Admin timesheet</Link> :
                                <Link to='/employee/add-timesheet'>Add timesheet</Link>
                            }
                        </li>
                        <li>
                            <Link to='/' onClick={() => {
                                logout();
                            }} className='bg-yellow-600 px-4 py-1 rounded-lg'>Logout</Link>
                        </li>
                        </>
                    ) : (
                        <>
                        <li>
                        <Link to='login' className='bg-yellow-600 px-4 py-1 rounded-lg'>Login</Link>
                        </li>
                        <li>
                            <Link to='signup' className='bg-yellow-600 px-4 py-1 rounded-lg'>signup</Link>
                        </li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar 