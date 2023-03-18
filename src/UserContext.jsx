import axios from 'axios';
import React, { createContext,  useEffect,  useState } from 'react';
import { serverPort } from './Port';

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!user) {
          axios.get(`${serverPort}/profile`)
          .then(response => {
              setUser(response.data);
              setReady(true);
          })
          
        
        }
      }, []);

    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    );
}
