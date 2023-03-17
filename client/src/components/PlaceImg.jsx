import React from "react";

export const PlaceImg = ({ place, index=0, className=null }) => {
    if(place.photos?.length < 0) {
        return 'd';
    }

    if(!className) {
        className='object-cover'
    }
  return (
    <div className="h-full w-full">
      <img className={`h-full w-full ${className}`} src={'http://localhost:5000/'+place.photos[0]} alt="image" />
    </div>
  );
};
