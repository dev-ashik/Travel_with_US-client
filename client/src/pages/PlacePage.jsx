import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get(`/places/${id}`).then((response) => {
        setPlace(response.data);
      });
    }
  }, [id]);

  return (
    <>
      {!place ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
          <h1 className="text-3xl">{place.title}</h1>
          <a
            className="my-2 block font-semibold underline"
            target="_blank"
            href={"https://maps.google.com/?q=" + place.address}
          >
            {place.title}
          </a>
          <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr]">
              <div>
                {place.photos?.[0] && (
                  <img
                    src={"http://localhost:5000/" + place.photos[0]}
                    className="aspect-square object-cover"
                    alt="first photo"
                  />
                )}
              </div>
              <div className="grid">
                {place.photos?.[1] && (
                  <img
                    src={"http://localhost:5000/" + place.photos[1]}
                    className="aspect-square object-cover"
                    alt="first photo"
                  />
                )}
                <div className="overflow-hidden">
                  {place.photos?.[2] && (
                    <img
                      src={"http://localhost:5000/" + place.photos[2]}
                      className="aspect-square object-cover relative top-2"
                      alt="first photo"
                    />
                  )}
                </div>
              </div>
            </div>
            <button className="absolute bottom-0 right-0">Show more photos</button>
          </div>
        </div>
      )}
    </>
  );
};
