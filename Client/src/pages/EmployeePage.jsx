import { useEffect } from "react";
import { useEmployee } from "../context/EmployeeContext";

import { Link } from 'react-router-dom';

function EmployeePage(){
    const { getTimeSheet, timesheet, deleteSheet } = useEmployee()
    
    console.log(timesheet)

    useEffect(() => {
        getTimeSheet()
    }, [])

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center rounded-lg"'>
            <table className="table-fixed rounded-lg">
                {
                    timesheet.map((sheet) => (
                        <>
                        <div key={sheet.id} className="">
                            <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Employee</th>
                                    <th scope="col" className="px-6 py-4">Hourly_rate</th>
                                    <th scope="col" className="px-6 py-4">hours</th>
                                    <th scope="col" className="px-6 py-4">total_pay</th>
                                    <th scope="col" className="px-6 py-4">status</th>
                                </tr>
                            </thead>
                            <tbody>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{sheet.Employee}</td>
                            <td className="whitespace-nowrap px-6 py-4">{sheet.Hourly_rate}</td>
                            <td className="whitespace-nowrap px-6 py-4">{sheet.hours}</td>
                            <td className="whitespace-nowrap px-6 py-4">{sheet.total_pay}</td>
                            <td className="whitespace-nowrap px-6 py-4">{sheet.status}</td>
                            <td>
                                <button onClick={() => {
                                    deleteSheet(sheet.id)
                                }} type="button" className="py-3 px-4 mx-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-600 text-white hover:bg-white disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-white dark:text-gray-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ">Delete</button>
                                <button type="button" className="py-3 px-4 mx-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-600 text-white hover:bg-white disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-white dark:text-gray-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 " >
                                    <Link to={`/employee/${sheet.id}`}>Edit</Link>
                                    </button>
                            </td>
                            </tbody>
                        </div>
                        </>
                        
                    ))
                    }
            </table>
        </div>
    )
}

export default EmployeePage