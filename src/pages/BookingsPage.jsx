import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccounntNav } from "../components/AccounntNav";
import { BookingDays } from "../components/BookingDays";
import { PlaceImg } from "../components/PlaceImg";
import { serverPort } from "../Port";

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get(`https://travel-with-us.onrender.com/bookings`).then((response) => {
      setBookings(response.data);
    });
  }, []);

  console.log(bookings)
  return (
    <div>
      <AccounntNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking, index) => (
            <Link
              to={`/account/booking/${booking._id}`}
              key={index}
              className="flex gap-4 bg-gray-200 rounded-xl overflow-hidden"
            >
              <div className="w-48">
                {/* <PlaceImg place={booking.place} /> */}
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl border-b border-gray-300 mb-2 pb-2">
                  {booking.place.title}
                </h2>

                <div className="text-xl">
                  <BookingDays booking={booking} className={"text-gray-500"} />

                  <div className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    Total price: ${booking.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
