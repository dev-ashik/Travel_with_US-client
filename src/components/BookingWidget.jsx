import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNight = 0;
  if (checkIn && checkOut) {
    numberOfNight = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    const data = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNight * place.price,
    };

    const response = await axios.post("/bookings", data);
    const bookingId = response.data._id;
    setRedirect(`/account/booking/${bookingId}`);
    // console.log(bookingId)
  };

  if (redirect) {
    console.log(redirect);
    return <Navigate to={redirect} />;
  }

  let totalPrice = numberOfNight * place.price * numberOfGuests;
  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4 flex-1">
              <label htmlFor="checkIn">Check in:</label>
              <input
                type="date"
                name="checkIn"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 flex-1 border-l">
              <label htmlFor="checkOut">Check out:</label>
              <input
                type="date"
                name="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label htmlFor="">Number of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
          {numberOfNight > 0 && (
            <div className="py-3 px-4 border-t">
              <label htmlFor="">Your full name:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label htmlFor="">Phone number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={bookThisPlace} className="primary mt-4">
          Book this place {numberOfNight > 0 && <span>${totalPrice}</span>}
        </button>
      </div>
    </div>
  );
};
