import React, { useState, useEffect, useRef } from "react";
import Avatar from "react-avatar";

// components
import MenuLink from "./MenuLink";

// images
import downIcon from "../../assets/images/navbar/down-icon.png";
import userIcon from "../../assets/images/navbar/user-icon.png";
import exitIcon from "../../assets/images/navbar/exit-icon.png";

const ProfileDropDown = ({ openAccountModal, logout, account }) => {
  const dropDownRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);
  const username = account?.username;
  const name = account?.name;

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <div
      className="profile-wrapper"
      onClick={() => setDropDown(!dropDown)}
      ref={dropDownRef}
    >
      <div className="profile">
        {/* <img src={image} alt="" /> */}
        <Avatar name={username + " D"} size="35" round="50%" />
      </div>
      <img src={downIcon} alt="" className="down-icon" />

      <div className={dropDown ? "drop-down-open" : "drop-down-close"}>
        <p id="profile-username">{name}</p>
        <div
          style={{
            border: "1px solid rgba(49, 49, 51, .12)",
            margin: "5px 0",
          }}
        />
        <MenuLink icon={userIcon} label="Account" onClick={openAccountModal} />
        <MenuLink icon={exitIcon} label="Sign out" onClick={logout} />
      </div>
    </div>
  );
};

export default ProfileDropDown;
