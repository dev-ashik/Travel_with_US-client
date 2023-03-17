import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-col-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, index) => (
          <Link to={'/place/'+place._id} key={index}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  src={"http://localhost:5000/" + place.photos?.[0]}
                  className='rounded-2xl object-cover aspect-square w-full'
                  alt="photo"
                />
              )}
            </div>
            <h2 className="font-bold">{place.title}</h2>
            <h3 className="font-bold text-gray-500">{place.address}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};
