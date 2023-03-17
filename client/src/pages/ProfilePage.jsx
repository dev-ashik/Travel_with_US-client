import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AccounntNav } from "../components/AccounntNav";
import { UserContext } from "../UserContext";
import { PlacesPage } from "./PlacesPage";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  };

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      {!ready ? (
        <div className="flex justify-center">
          <h1 className="mt-6 text-2xl font-bold"> loading...</h1>
        </div>
      ) : (
        <div>
          <AccounntNav />

          {subpage === "profile" && (
            <div className="text-center max-w-lg mx-auto">
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="bg-gray-500 rounded-full overflow-hidden relative w-44 h-44">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-44 h-44 absolute top-3 text-gray-200 "
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="text-2xl">Name: {user.name}</h2>
                <h2 className="text-2xl">Email: {user.email}</h2>
              </div>
              <button className="primary max-w-sm mt-6" onClick={logout}>
                LogOut
              </button>
            </div>
          )}

          {subpage === "places" && <PlacesPage />}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
