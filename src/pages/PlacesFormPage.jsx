import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AccounntNav } from "../components/AccounntNav";
import { PerksLabels } from "../components/PerksLabels";
import PhotosUploader from "../components/PhotosUploader";
import { serverPort } from "../Port";

export const PlacesFormPage = () => {
    const {id} = useParams();
    // console.log(id)
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);

  useEffect(() => {
    if(!id) {
        return;
    } 
    else {
        axios.get(`${serverPort}/places/`+id)
        .then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price)
            // console.log(data)
        })
    }
  }, [id])
  

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

  const savePlace = async (ev) => {
    ev.preventDefault();

    const palaceData = {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
      };

    if(id) {
        // update place

          await axios.put(`${serverPort}/places`, {id, ...palaceData});
          setRedirect(true);
    }
    else {
        // add new place
          await axios.post(`${serverPort}/places`, palaceData);
          setRedirect(true);
    }
    
  };

  if(redirect) {
    return <Navigate to = {'/account/places'} />
  }

//   console.log(perks)
  return (
    <div>
      <AccounntNav />
      <form onSubmit={savePlace}>
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

        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
          <PerksLabels selected={perks} onChange={setPerks} />
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

        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
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
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-2">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>

        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
};
