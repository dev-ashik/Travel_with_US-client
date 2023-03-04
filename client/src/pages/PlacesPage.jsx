import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PerksLabels } from "../components/PerksLabels";
import PhotosUploader from "../components/PhotosUploader";

export const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  
  const [description, setDescription] = useState("");
  const [parks, setParks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState('');

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };
  const inputDescription = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };
  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const addNewPlace = async (ev) => {
    ev.preventDefault();
    const palaceData = {title, address, addedPhotos, description, parks, extraInfo, checkIn, checkOut, maxGuests}
    await axios.post('/places', palaceData);
    setRedirect('/accout/places')
  }

  if(redirect) {
    return <Navigate to={redirect} />
  }


  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-1"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form onSubmit={addNewPlace}>
            {preInput(
              "Title",
              "title for your place, should be short and catchy as in advertisment"
            )}
            <input
              type="text"
              placeholder="title, for example: My lovely apt"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            {preInput("Address", "Address to you place")}
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />

            {preInput("Photos", "more = better")}
            
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            
            <h2 className="text-2xl mt-4">Description</h2>
            <p className="text-gray-500 text-sm">description of the place</p>
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            ></textarea>
            <h2 className="text-2xl mt-4">Perks</h2>
            <p className="text-gray-500 text-sm">
              select all the perks of your place
            </p>
            <div className="grid grid-col-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2">
              <PerksLabels seclected={parks} onChange={setParks} />
            </div>
            {preInput("Extra info", "house rules, etc")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            ></textarea>

            {preInput(
              "Check om&out times",
              "add check in and out times, remember to have some time window for cleaning the room between guests"
            )}

            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-2">Check in time</h3>
                <input
                  type="text"
                  placeholder="14"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-2">Check out time</h3>
                <input
                  type="text"
                  placeholder="11"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-2">Max number of guests</h3>
                <input 
                type="number" 
                value={maxGuests}
                onChange={ev => setMaxGuests(ev.target.value)}
                />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
