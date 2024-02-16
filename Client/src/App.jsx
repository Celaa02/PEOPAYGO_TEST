import {BrowserRouter, Routes, Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import EmployeePage from './pages/EmployeePage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import ProtectedRoute from './ProtectedRoute';
import { EmployeeProvider } from './context/EmployeeContext';
import Navbar from './components/Navbar';
import AdminFormPage from './pages/AdminFormPage';

function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          
          <Route element={<ProtectedRoute/>}>
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/admin/add-timesheet' element={<AdminFormPage/>}/>
            <Route path='/admin/:id' element={<AdminFormPage/>}/>
            <Route path='/employee' element={<EmployeePage/>}/>
            <Route path='/employee/add-timesheet' element={<EmployeeFormPage/>}/>
            <Route path='/employee/:id' element={<EmployeeFormPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </EmployeeProvider>
    </AuthProvider>
  )
}

export default App
