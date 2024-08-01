import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../../url";

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            const response = await axios.get(URL+"/api/auth/refetch", {withCredentials: true})
            setUser(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    return <UserContext.Provider value={{setUser, user}}>
        {children}
    </UserContext.Provider>
}