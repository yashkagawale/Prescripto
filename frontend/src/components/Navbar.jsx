/**
 * Node modules
 */
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

/**
 * Assets
 */
import {assets} from '../assets/assets'


const Navbar = () => {

    const navigate = useNavigate();

    const [showmenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={() => {navigate('/')}} src={assets.logo} alt="Logo" className='w-44 cursor-pointer'/>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'>ALL DOCTORS</li>
                <hr className='border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className="flex items-center gap-4">
            {
                token 
                ?   <div className="flex items-center gap-2 cursor-pointer group relative">
                        <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile Pic" />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block">
                            <div className="min-w-48 bg-stone-100 rounded flex-col gap-4 p-4">
                                <p onClick={() => navigate('/my-profile')} className='hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/my-appointments')} className='hover:text-black'>My Appointments</p>
                                <p onClick={() => setToken(false)} className='hover:text-black'>Logout</p>
                            </div>
                        </div>
                    </div>
                :   <button onClick={() => navigate('/login')} className="bg-indigo-500 text-white px-8 py-3 rounded-full font-light hidden md:block">
                        Create account
                    </button>
            }
            
        </div>
    </div>
  )
}

export default Navbar