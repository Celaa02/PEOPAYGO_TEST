import { useForm } from "react-hook-form"
import { useEmployee } from "../context/EmployeeContext";

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";


function EmployeeFormPage(){
    const { register, handleSubmit, setValue } = useForm();
    const { createSheet, getSheetById, putSheetById } = useEmployee()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        async function loadSheet(){
            if(params.id){
               const sheet = await getSheetById(params.id)
               console.log('sheet', sheet)
               setValue('Employee', sheet.Employee)
               setValue('Hourly_rate', sheet.Hourly_rate)
               setValue('hours', sheet.hours)
               setValue('total_pay', sheet.total_pay)
             }
        }
        loadSheet()
    }, [])

    const onSubmit = handleSubmit((data) => {
        if(params.id) {
            putSheetById(params.id, data)
        }else{
            createSheet(data)
        }
        navigate('/Employee');
    });

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h1 className='text-2xl font-bold'>Add Time Sheet</h1>
            <form onSubmit={onSubmit}>
                <input
                type="text"
                placeholder="Employee"
                { ...register("Employee")}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                autoFocus
                />
                <input
                type="number"
                placeholder="Hourly_rate"
                { ...register("Hourly_rate")}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                autoFocus
                />
                
                <input
                type="number"
                placeholder="Hours"
                { ...register("hours")}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                <input
                type="number"
                placeholder="total_pay"
                { ...register("total_pay")}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                autoFocus
                />
                <button type='submit'  className="center">Save</button>
            </form>
        </div>
        </div>
    )
}

export default EmployeeFormPage