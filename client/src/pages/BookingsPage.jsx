import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AccounntNav } from '../components/AccounntNav'

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([])
  useEffect(()=> {
    axios.get('/bookings')
    .then(response => {
      setBookings(response.data);
    })
  }, []);

  // console.log(bookings)
  return (
    <div>
      <AccounntNav/>
      <div>
        {
          bookings?.length > 0 && bookings.map((booking, index) => (
            <div key={index}>
              {booking.checkIn} - {booking.checkOut}
            </div>
          ))
        }
      </div>
    </div>
  )
}
