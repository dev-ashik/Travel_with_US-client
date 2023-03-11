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

  //   if (!ready) {
  //     return <div></div>;
  //   }

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
          <AccounntNav/>

          {subpage === "profile" && (
            <div className="text-center max-w-lg mx-auto">
              logged in as {user.name} ({user.email}) <br />
              <button className="primary max-w-sm mt-2" onClick={logout}>
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
