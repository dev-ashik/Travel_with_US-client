import axios from 'axios';
import React, { createContext,  useEffect,  useState } from 'react';

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
          axios.get("/profile")
          .then(response => {
              setUser(response.data);
          })
          
        
        }
      }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}
