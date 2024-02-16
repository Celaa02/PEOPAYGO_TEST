import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function LoginPage(){
    const { register, handleSubmit } = useForm();
    const { login, errors: loginErrors, isAuthenticate, user} = useAuth();
    const navegate = useNavigate();

    console.log('user', user)

    const onSubmit = handleSubmit((data) => {
        login(data);
    })
    useEffect(() => {
        if(isAuthenticate && user.data.is_admin == false) navegate('/Employee');
        if(isAuthenticate && user.data.is_admin == true) navegate('/Admin');
    }, [isAuthenticate])

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            {
                    loginErrors.map((error, i) => {
                        <div className='bg-red-500 p-2 text-white my-2' key={i}>{error}</div>
                    })
                }
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <h1 className='text-2xl font-bold'>Login</h1>
                <form onSubmit={ onSubmit }>
                    <input 
                    type="email" 
                    {...register("email", { require: true })} 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='email' 
                    />
                    <input 
                    type="password" 
                    {...register("password", { require: true })} 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='password' 
                    />
                    <p className='flex gap-x-2 justify-between'>
                        Don`t have an account? <Link to="/signup" className='text-sky-500'>Sign up</Link>
                    </p>
                    <button type='submit'  className="center">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage