import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointments = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')



  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo)
  }

  const getAvaliableSlots = async () => {
    setDocSlots([])
    
    //getting current date
    let today = new Date()

    for(let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      //setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        // Increment current time by 30 mintues
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => {
    fetchDocInfo()
  },[doctors,docId])

  useEffect(() => {
    getAvaliableSlots()
  },[docInfo])

  useEffect(() => {
    console.log(docSlots)
  },[docSlots])

  return docInfo && (
    <div>
      {/*--------------- Doctor Details ---------------*/}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="">
          <img className='bg-blue-50 w-full sm:max-w-72 rounded-lg border border-blue-200' src={docInfo.image} alt="" />
        </div>
        
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/*--------------------- Doc Info : name, degree, experince -----------------------*/}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name} 
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/*--------------------- Doctor About -----------------------*/}
          <div className="">
            <p className='flex items-center gap-1 text-sm font-medium texy-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/*-----------Booking Slots--------------*/}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-centerw-full overflow-x-scroll mt-4">
          {
            docSlots.length && docSlots.map((item, index) => (
              // <div key={index} onClick={() => setSlotIndex(index)}  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-indigo-500 text-white' : 'border border-gray-200'}`}>
              //   <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              //   <p>{item[0] && item[0].datetime.getDate()}</p>
              // </div>

              <div
                key={index}
                onClick={() => {
                  if (!(index === 0 && new Date().getHours() >= 20)) setSlotIndex(index);
                }}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-300 ${
                  slotIndex === index
                    ? "bg-indigo-500 text-white"
                    : index === 0 && new Date().getHours() >= 20
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-800 border border-gray-300 cursor-pointer"
                }`}
              >
                <p className="text-xs font-medium">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className="text-base font-bold">{item[0] && item[0].datetime.getDate()}</p>
              </div>
            )) 
          }
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots[slotIndex].length > 0 ? (
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-indigo-500 text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))
          ) : (
            <p className="text-sm text-red-500 font-medium">No slots available for today</p>
          )}
        </div>
        {/* <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length && docSlots[slotIndex].map((item,index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrik-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-indigo-500 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {
                item.time.toLowerCase()
              }
            </p>
          ))}
        </div> */}
        <button className='bg-indigo-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer hover:bg-indigo-600'>Book a appointment</button>
      </div>

      {/*-----------------Listing Related Docotors------------------------*/}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointments