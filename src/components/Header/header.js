import React, { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import CButton from "../Button/button";
import Spacer from "../Spacer/spacer";
import { FaBars, FaBookmark } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import StringAvatar from "./avatarnaming";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export default function Header({ showModal, setAuthType }) {
  let token = localStorage.getItem("token");
  let userEmail = localStorage.getItem("userEmail");

  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [LogoutMenu, setLogoutMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const TypeAuth = (type) => {
    setAuthType(type);
    showModal(true);
    setOpenMenu(false);
  };

  const showNavbar = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleNavigate = () => {
    navigate('/bookmark');
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth > 480);
      if (window.innerWidth > 480) {
        setOpenMenu(false); // Close the menu if screen size is larger than 480px
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={openMenu ? styles.containerexpanded : styles.container}>
      <div className={styles.navbar}>
        <h2 onClick={() => navigate('/home')} >SwipTory</h2>
        <div className={styles.headerbtn}>
          {token ? (
            <UserMenu
              userEmail={userEmail}
              dialog={LogoutMenu}
              setDialog={setLogoutMenu}
              handleLogout={handleLogout}
              handleNavigate={handleNavigate}
            />
          ) : (
            <>
              <CButton
                title="Register Now"
                color="#FF7373"
                style={{ color: "#fff" }}
                onClick={() => TypeAuth("register")}
              />
              <Spacer width="20px" />
              <CButton
                title="Sign In"
                color="#73ABFF"
                style={{ color: "#fff" }}
                onClick={() => TypeAuth("login")}
              />
            </>
          )}
        </div>
        {openMenu ? (
          <MdClose size={24} className={styles.menuopen} onClick={showNavbar} />
        ) : (
          <FaBars size={24} className={styles.menuopen} onClick={showNavbar} />
        )}
      </div>

      {openMenu ? (
        <div className={styles.headerbtn2}>
          {token ? (
            <UserMenuMobile handleNavigate={handleNavigate} userEmail={userEmail} handleLogout={handleLogout} />
          ) : (
            <div className={styles.smauthbtn}>
              <CButton
                title="Register"
                color="#FF7373"
                style={{ color: "#fff" }}
                onClick={() => TypeAuth("register")}
              />
              <CButton
                title="LogIn"
                color="#FF7373"
                style={{ color: "#fff" }}
                onClick={() => TypeAuth("login")}
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

const UserMenu = ({ userEmail, dialog, setDialog, handleLogout, handleNavigate }) => {

  return (
    <>
      <CButton
        title="Bookmarks"
        color="#FF7373"
        style={{ color: "#fff" }}
        icon={<FaBookmark />}
        onClick={handleNavigate}
      />
      <Spacer width="20px" />
      <CButton title="Add Story" color="#FF7373" style={{ color: "#fff" }} />
      <Spacer width="20px" />
      <Avatar {...StringAvatar(userEmail)} />
      <Spacer width="20px" />
      <FaBars size={24} onClick={() => setDialog((prev) => !prev)} />

      <Paper
        elevation={2}
        className={styles.logoutmenu}
        style={{ display: dialog ? "flex" : "none" }}
      >
        <p style={{color: '#000', marginBottom: 20, fontSize: '1rem'}}>{userEmail}</p>
        <CButton onClick={handleLogout} title="Logout" color="#FF7373" style={{ color: "#fff" }} />
      </Paper>
    </>
  );
};

const UserMenuMobile = ({ userEmail, handleLogout, handleNavigate }) => {

  return (
    <div className={styles.smloginMenu}>
      <div style={{ display: "flex", gap: "1rem", alignItems: 'center' }}>
        <Avatar {...StringAvatar(userEmail)} />
        <p style={{color: '#000', fontWeight: 'bold'}}>{userEmail}</p>
      </div>
      <CButton title="Your Story" color="#FF7373" style={{ color: "#fff" }} />
      <CButton title="Add Story" color="#FF7373" style={{ color: "#fff" }} />
      <CButton
        title="Bookmarks"
        color="#FF7373"
        style={{ color: "#fff" }}
        icon={<FaBookmark />}
        onClick={handleNavigate}
      />
      <CButton onClick={handleLogout} title="Logout" color="#FF7373" style={{ color: "#fff" }} />
    </div>
  );
};
