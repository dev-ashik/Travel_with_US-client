import axios from "axios";
import React, { useState } from "react";

const PhotosUploader = ({addedPhotos, onChange}) => {
    const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const uploadPhoto = (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/from-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        // console.log(data);
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using link ...jpg"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl"
          onClick={addPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>

      <div className="mt-2 grid grid-cols-3 md:gird-cols-4 lg:grid-col-6 gap-2">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div key={link} className="h-32 flex">
              <img
                className="rounded-2xl h-32 w-full object-cover"
                src={"http://localhost:5000/" + link}
                alt="uploaded photo"
              />
            </div>
          ))}
        <label className="h-32 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 flex justify-center items-center gap-1 cursor-pointer">
          <input type="file" className="hidden" onChange={uploadPhoto} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
