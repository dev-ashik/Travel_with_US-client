import React from 'react'

export const BookingWidget = ({place}) => {
  return (
    <div>
        <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-2xl text-center">
                  Price: ${place.price} / per night
                </div>
                <div className="border rounded-2xl mt-4">
                  <div className="flex">
                    <div className="py-3 px-4 flex-1">
                      <label htmlFor="">Check in:</label>
                      <input type="date" />
                    </div>
                    <div className="py-3 px-4 flex-1 border-l">
                      <label htmlFor="">Check out:</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="py-3 px-4 border-t">
                    <label htmlFor="">Number of guests:</label>
                    <input type="number" value={1} />
                  </div>
                </div>
                <button className="primary mt-4">Book this place</button>
              </div>
    </div>
  )
}
