import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-6">
          <h1>{place.title}</h1>
        </div>
      )}
    </>
  );
};
