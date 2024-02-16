import { createContext, useContext, useState } from "react";
import { createEmployees, findEmployees, deleteEmployees, findEmployeesById, putEmployeesById , getAllEmployees} from '../api/employee'


const EmployeeContext = createContext()

export const useEmployee = () => {
    const context = useContext(EmployeeContext);

    if(!context){
        throw new Error("useEmployee must be used within a TaskProvider")
    }
    return context;
}

export function EmployeeProvider({ children }) {

    const [ timesheet, setTimesheet ] = useState([]);

    const getTimeSheet = async () => {
        try {
            const res = await findEmployees()
            setTimesheet(res.data)
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    const createSheet = async (timesheet) => {
        console.log('data', timesheet)

        const res = await createEmployees(timesheet);
        console.log(res)
    }
    const deleteSheet = async (id) => {
        try {
            const res = await deleteEmployees(id)
            console.log(res.data.affected)
            if(res.data.affected == 1) setTimesheet(timesheet.filter(sheet => sheet.id != id))
            
        } catch (error) {
            console.log(error)
        }
    }

    const getSheetById = async (id) => {
        try {
            const res = await findEmployeesById(id)
            console.log('data', res)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const putSheetById = async (id, timesheet) => {
        try {
            const res = await putEmployeesById(id, timesheet)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    const allSheet = async () => {
        try {
            const res = await getAllEmployees()
            setTimesheet(res.data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <EmployeeContext.Provider value={{
            timesheet,
            createSheet,
            getTimeSheet,
            getSheetById,
            putSheetById,
            allSheet,
            deleteSheet
        }}>
            {children}
        </EmployeeContext.Provider>
    )
}