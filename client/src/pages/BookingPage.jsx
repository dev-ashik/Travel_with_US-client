import React from 'react'
import { useParams } from 'react-router-dom'

export const BookingPage = () => {
    const {id} = useParams();
    console.log(id)
  return (
    <div>BookingPage: {id}</div>
  )
}
