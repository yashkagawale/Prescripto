import React, { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'


const Navbar = () => {

  const navigate = useNavigate()

  const {token, setToken} = useContext(AppContext)

  const [showMenu, setShowMenu] = useState()

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    toast.success('Logged out successfully');
    navigate('/login');
    setShowDropdown(false)
  }

  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef()

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev)
  }

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={() => {navigate('/')}} src={assets.logo} alt="Logo" className='w-44 cursor-pointer' />

      {/* Desktop Navigation */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'><li className='py-1'>HOME</li></NavLink>
        <NavLink to='/doctors'><li className='py-1'>ALL DOCTORS</li></NavLink>
        <NavLink to='/about'><li className='py-1'>ABOUT</li></NavLink>
        <NavLink to='/contact'><li className='py-1'>CONTACT</li></NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div ref={dropdownRef} className="relative flex items-center gap-2 cursor-pointer">
            <div onClick={toggleDropdown} className="flex items-center gap-2">
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile Pic" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
            </div>
            {showDropdown && (
              <div className="absolute right-0 top-12 text-base font-medium text-gray-600 z-20">
                <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4 shadow-lg">
                  <p onClick={() => {navigate('/my-profile'); setShowDropdown(false)}} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => {navigate('/my-appointments'); setShowDropdown(false)}} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-indigo-500 text-white px-8 py-3 rounded-full font-light hidden md:block">
            Create account
          </button>
        )}

        {/* Mobile Menu Button */}
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden ' src={assets.menu_icon} alt="Menu Icon" />

        {/* Mobile Menu */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5 py-6">
            <img className='w-36' src={assets.logo} alt="Logo" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close Icon" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT US</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
