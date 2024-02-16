import { useForm } from 'react-hook-form';
import {  useNavigate, Link } from 'react-router-dom';

//import { signupRequest } from '../api/auth';

import './style/signup.css'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';


 
function SignupPage(){
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { signup, user, isAuthenticate, errors: signupErrors } = useAuth();
    const navigation = useNavigate();

    console.log('this info register: ', user);
    useEffect(() => {
            if(isAuthenticate && user.data.is_admin == false) navigation('/Employee');
            if(isAuthenticate && user.data.is_admin == true) navigation('/Admin');
            
    }, [isAuthenticate])

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
             {
                    signupErrors.map((error, i) => {
                        <div className='bg-red-500 p-2 text-white' key={i}>{error}</div>
                    })
                }
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                <form onSubmit={ onSubmit }>
                    <input 
                    type="text" 
                    {...register("username", { require: true })} 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='username' 
                    />
                    {
                        errors.username && ( <p className='text-red-500'>Username is required</p> )
                    }
                    <input 
                    type="email" 
                    {...register("email", { require: true })} 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='email' 
                    />
                    {
                        errors.email && ( <p className='text-red-500'>email is required</p> )
                    }
                    <input 
                    type="password" 
                    {...register("password", { require: true })} 
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    placeholder='password' 
                    />
                    {
                        errors.passsword && ( <p className='text-red-500'>password is required</p> )
                    }
                    <input 
                    type="checkbox" 
                    {...register("is_admin", { require: true })} 
                    className='form-control'
                    />Admin
                    <p className='flex gap-x-2 justify-between'>
                            Already have an account? <Link to="/login" className='text-sky-500'>Login</Link>
                        </p>
                    <button type='submit'  className="center">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage