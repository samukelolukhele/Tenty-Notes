import React, { useContext, useEffect, useRef, useState } from 'react';
import '../styles/components/Navbar/Navbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logout from './Logout';
import { FaTimes, FaBars } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import useHover from '../hooks/useHover';
import useModal from '../hooks/useModal';

function Navbar() {
  const navRef = useRef<any>();

  const showNavbar = () => navRef.current.classList.toggle('responsive_nav');
  const { loggedInUser } = useContext(AuthContext);
  const { hover, handleHover } = useHover();
  const [mobileLinksToggle, setMobileLinksToggle] = useState(false);

  const { handleModal, setModal } = useModal({
    full_name: loggedInUser && loggedInUser.full_name,
    username: loggedInUser && loggedInUser.username,
    email: loggedInUser && loggedInUser.email,
    description: loggedInUser && loggedInUser.description,
  });

  const handleNavEditLinks = (modalType: string) => {
    setModal({ status: true, type: modalType });

    return showNavbar();
  };

  return (
    <header className="navbar">
      {handleModal()}
      <div className="container">
        <Link to="/" className="logo">
          <span>Tenty</span>NOTES
        </Link>
        {localStorage.getItem('token') && loggedInUser?.id && (
          <div className="user-container">
            <div
              className="user-info"
              onMouseOver={() => handleHover(true)}
              onMouseOut={() => handleHover(false)}
            >
              <img
                src={`https://storage.googleapis.com/tentynotes/${loggedInUser?.profile_image}`}
              />
              <p>{loggedInUser.full_name}</p>
              <MdOutlineKeyboardArrowDown
                className={mobileLinksToggle ? 'hover' : ''}
              />
            </div>
            <div
              className={hover ? 'edit-links hover' : 'edit-links'}
              onMouseOver={
                hover ? () => handleHover(true) : () => handleHover(false)
              }
              onMouseOut={() => handleHover(false)}
            >
              <div
                className="edit-link"
                onClick={() => handleNavEditLinks('Update_User')}
              >
                <p>Edit Profile</p>
              </div>
              <div
                className="edit-link"
                onClick={() => handleNavEditLinks('Change_Password')}
              >
                <p>Change Password</p>
              </div>
              <div
                className="edit-link"
                onClick={() => handleNavEditLinks('Delete_User')}
              >
                <p>Delete Profile</p>
              </div>
            </div>
          </div>
        )}
        <nav ref={navRef} className="nav-links">
          {!localStorage.getItem('token') ? (
            <>
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
              <Link to="/login" onClick={showNavbar}>
                Login
              </Link>
              <Link to="/register" onClick={showNavbar}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {loggedInUser?.id && (
                <div className="user-container user-container-mobile">
                  <div
                    className="user-info"
                    onMouseOver={() => handleHover(true)}
                    onMouseOut={() => handleHover(false)}
                  >
                    <img
                      src={`https://storage.googleapis.com/tentynotes/${loggedInUser?.profile_image}`}
                    />
                    <p>{loggedInUser.full_name}</p>
                    <MdOutlineKeyboardArrowDown
                      onClick={() => setMobileLinksToggle(!mobileLinksToggle)}
                      className={mobileLinksToggle ? 'hover' : ''}
                    />
                  </div>
                  <div
                    className={
                      mobileLinksToggle ? 'edit-links hover' : 'edit-links'
                    }
                    onMouseOver={
                      hover ? () => handleHover(true) : () => handleHover(false)
                    }
                    onMouseOut={() => handleHover(false)}
                  >
                    <div
                      className="edit-link"
                      onClick={() => handleNavEditLinks('Update_User')}
                    >
                      <p>Edit Profile</p>
                    </div>
                    <div
                      className="edit-link"
                      onClick={() => handleNavEditLinks('Upload_Image')}
                    >
                      <p>Change Profile Image</p>
                    </div>
                    <div
                      className="edit-link"
                      onClick={() => handleNavEditLinks('Change_Password')}
                    >
                      <p>Change Password</p>
                    </div>
                    <div
                      className="edit-link"
                      onClick={() => handleNavEditLinks('Delete_User')}
                    >
                      <p>Delete Profile</p>
                    </div>
                  </div>
                </div>
              )}
              <Link to="/dashboard" onClick={showNavbar}>
                Dashboard
              </Link>
              <Link
                to={`/dashboard/profile/?id=${loggedInUser?.id}`}
                onClick={showNavbar}
              >
                Profile
              </Link>
              <Logout />
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
            </>
          )}
        </nav>
        <button className="nav-btn nav-open-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
