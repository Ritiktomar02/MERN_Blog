import {  createContext, useEffect, useState } from "react";
import axios from 'axios'


export const Authcontext=createContext();

export default function AuthcontexProvider({children}){
    
    const [blogs,setblogs]=useState();
    const [profile, setProfile] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{


        const fetchProfile = async () => {
            try {
              // token should be let type variable because its value will change in every login. (in backend also)
              let token = localStorage.getItem("jwt") // Retrieve the token directly from the localStorage (Go to login.jsx)
             
              if (token) {
                const { data } = await axios.get(
                  "http://localhost:4001/api/v1/user/my-profile",
                  {
                    withCredentials: true,
                  }
                );
              
                setProfile(data.user);
                setIsAuthenticated(true);
              }
            } catch (error) {
              console.log(error);
            }
          };

        const fetchblogs = async () => {
            try {
              const { data } = await axios.get(
                "http://localhost:4001/api/v1/blog/all-blogs",
                { withCredentials: true }
              );
              console.log(data);
              setblogs(data);
            } catch (error) {
              console.log("Error: ",error);
            }
          };
        fetchblogs();
        fetchProfile();
    },[])
    
    console.log(blogs)
     const value={
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated

     }
    return <Authcontext.Provider value={value}>
          {children}
    </Authcontext.Provider>


}