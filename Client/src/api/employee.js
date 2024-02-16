import axios from './axios'

export const getEmployees = () => axios.get('timesheet')

export const getAllEmployees = () => axios.get('timesheet/all')

export const createEmployees = (timesheet) => axios.post('timesheet', timesheet)

export const findEmployees = () => axios.get('timesheet')

export const findEmployeesById = (id) => axios.get(`timesheet/${id}`)

export const deleteEmployees = (id) => axios.delete(`timesheet/${id}`)

export const putEmployeesById = (id, timesheet) => axios.patch(`timesheet/${id}`, timesheet)

