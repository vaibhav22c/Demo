import React, { useEffect } from "react"
import "../Header/style.css"
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useUserContext } from "../../context/provider.tsx";
import { checkAuth, signOut } from "../../firebase/auth.ts";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, updateData }: any = useUserContext();

  useEffect(() => {
    // check auth and get userData and set into userProvide from here
    if (location) {
      console.log('data', data);

      checkAuth(navigate, data.id).then((userData) => {
        if (userData) updateData(userData);
      })
        .catch((err: any) => {
          console.log('Error', err);
        });
    }
  }, [location]);

  const handleLogout = async () => {
    // logout account
    // redirect into login page and clear user provide state
    updateData(null);
    localStorage.removeItem('userData');
    await signOut()
    navigate('/login');
  }

  return (
    <>
      <div className="header-main">
        <div className="">
          <span className="header-logo"> Task Management</span>
        </div>
        <div className="header-tab">
          {/* <div className="input-box">
            <input type="text" placeholder="Search here..." />
          </div> */}
        </div>
        <div className="header-tab">
          <Button onClick={() => handleLogout()} color="error" variant="contained">Log out</Button>
        </div>
      </div>
    </>
  )
}