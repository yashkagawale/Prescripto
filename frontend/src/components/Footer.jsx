import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
            {/*-----------Left Side-----------*/}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="Logo" />
            </div>
            {/*-----------Center Section-----------*/}
            <div className="">
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            {/*-----------Right Side-----------*/}
            <div className="">
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 00000-00000</li>
                    <li>prescipto@gmail.com</li>
                </ul>
            </div>
        </div>
         {/*-----------Copyright Side-----------*/}
        <div className="">
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024 @ yashkagawale - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer