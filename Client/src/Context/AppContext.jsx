import { createContext, useState } from "react";

export const Appcontent=createContext();

export const AppContextProvider = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const[isloggedin,setIsloggedin]=useState(false);
    const value={
        backendUrl,
        isloggedin,setIsloggedin
    }
    return(
        <Appcontent.Provider value={value}>
            {props.children}
        </Appcontent.Provider>
    )
}