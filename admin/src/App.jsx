import React from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes,Route } from 'react-router-dom'
import Dasboard from "./pages/Admin/Dasboard";
import AllApointments from "./pages/Admin/AllApointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";


const App = () => {

  const {aToken} = useContext(AdminContext)

  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dasboard />} />
            <Route path="/all-appointments" element={<AllApointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
          </Routes>
      </div>
    </div>
  ) : (
    <>
        <Login />
        <ToastContainer />
    </>
  )
};

export default App;
