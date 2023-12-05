import React from "react"
import "../Header/style.css"

export default function Header() {

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
        </div>
      </div>
    </>
  )
}