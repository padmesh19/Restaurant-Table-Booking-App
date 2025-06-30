/* eslint-disable no-nested-ternary */
import { useNavigate, NavLink, useLocation } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Nav } from "./Elements/Navbar";
import profile from "../../../assets/icons/profile.svg";
import homeIco from "../../../assets/icons/home.svg";
import arrowBlue from "../../../assets/icons/arrowblue.svg";
import arrowGrey from "../../../assets/icons/arrowgrey.svg";

import { ProfileMenu } from "../../common/Navbar/components";

import { authSelector, logout } from "../../../redux/authSlice";

const Navbar = (properties) => {
  const { user } = useSelector(authSelector);

  const dispatch = useDispatch();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isResponsiveProfileMenuOpen, setIsResponsiveProfileMenuOpen] =
    useState(false);

  // const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false);
  // const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  // const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isReservationsDropdownOpen, setIsReservationDropdownOpen] =
    useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  //   const isArchived = streamState?.classDetails?.class?.oc_is_archived

  const wrapperRef = useRef(null);

  /**
   * fetch Class Details on class Id change
   *  fetch organisation classes using academic year id get from class details for class dropdown
   */

  /** Logout user */
  const logoutUser = () => {
    setIsProfileMenuOpen(false);
    dispatch(
      logout(() => {
        navigate("/login", { replace: true });
      })
    );

    // socket.emit(SOCKET_EVENTS.CS_OFFLINE, {
    //   roomId,
    //   userId,
    // })
  };

  const isTeacher = user?.user_type === 1;
  const profileType = user?.user_type;

  const userProfile = user?.userProfile;
  const avatar = user?.user_avatar.split("]");
  let imageUrl = String(avatar[1]);
  const user_avatar = imageUrl.slice(1, -2);

  return (
    <>
      <Nav className="navbar navbar-expand-sm fixed-top" {...properties}>
        <NavLink
          className="nav-link d-flex align-items-center"
          end
          to="/"
          id="home"
        >
          <img src="/restaurant.png" alt="" className="logo-img" />
          <span className="logo-text">Dine Desk</span>
        </NavLink>
        {profileType === 1 ? (
          <ul className="col p-0 navbar-nav justify-content-center nav-pills h-100 d-flex">
            <li className="nav-item admin-navitem active">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link d-flex align-items-center activeLink"
                    : "nav-link d-flex align-items-center"
                }
                end
                to="/admin"
                id="dashboard-id"
              >
                <span>Menu List</span>
              </NavLink>
            </li>
            <li className="nav-item admin-navitem active">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link d-flex align-items-center activeLink"
                    : "nav-link d-flex align-items-center"
                }
                end
                to="/admin/tables"
                id="dashboard-id"
              >
                <span>Table List</span>
              </NavLink>
            </li>
            <li className="nav-item admin-navitem active">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link d-flex align-items-center activeLink"
                    : "nav-link d-flex align-items-center"
                }
                end
                to="/admin/offers"
                id="dashboard-id"
              >
                <span>Offers List</span>
              </NavLink>
            </li>

            <li className="nav-item admin-navitem active">
              <button
                type="button"
                className={`activebtn nav-link d-flex align-items-center${
                  pathname.includes("/reservations") ? " activeLink" : ""
                }`}
                onMouseEnter={() => {
                  setIsReservationDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  setIsReservationDropdownOpen(false);
                }}
                id="users-id"
              >
                <span>Table Reservation</span>
                <img
                  alt="Show Works"
                  className="add-works-button-icon"
                  src={
                    pathname.includes("/reservations") ? arrowBlue : arrowGrey
                  }
                />
                {isReservationsDropdownOpen ? (
                  <div className="orgdropdown">
                    <ul className="dropdown-content">
                      <li href="#">
                        <button
                          className="organisation-dropdown-item"
                          onClick={() => {
                            setIsReservationDropdownOpen(false);
                            navigate(`/admin/reservations`);
                          }}
                          type="button"
                          id="admin-teacher-id"
                        >
                          <span className="dropdown-text">
                            All Reservations
                          </span>
                        </button>
                      </li>
                      <li href="#">
                        <button
                          className="organisation-dropdown-item"
                          onClick={() => {
                            setIsReservationDropdownOpen(false);
                            navigate(`/admin/reservations/calender`);
                          }}
                          type="button"
                          id="student-id"
                        >
                          <span className="dropdown-text">Calendar</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </button>
            </li>
            <li className="nav-item admin-navitem active">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link d-flex align-items-center activeLink"
                    : "nav-link d-flex align-items-center"
                }
                end
                to="/admin/comments"
                id="dashboard-id"
              >
                <span>User Comments</span>
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="col p-0 navbar-nav justify-content-center nav-pills h-100 d-flex">
            <li className="nav-item admin-navitem active">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link d-flex align-items-center activeLink"
                    : "nav-link d-flex align-items-center"
                }
                end
                to="/customer"
                id="dashboard-id"
              >
                <span>Hotel List</span>
              </NavLink>
            </li>
            <li className="nav-item admin-navitem active">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "nav-link d-flex align-items-center activeLink"
                    : "nav-link d-flex align-items-center"
                }
                to="/customer/history"
                exact
                id="dashboard-id"
              >
                <span>Booking History</span>
              </NavLink>
            </li>
          </ul>
        )}
        <div className="rightSideNavbar-resp">
          <div className="d-flex p-0 col rightSideNavbar">
            <div ref={wrapperRef} className="wrapperForlogout">
              <button
                className="profile-btn d-flex p-0 bg-transparent"
                onClick={() => {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                  setIsResponsiveProfileMenuOpen(!isResponsiveProfileMenuOpen);
                }}
                type="submit"
                id="profile-id"
              >
                <img
                  src={user_avatar ? user_avatar : profile}
                  className="cursor-pointer"
                  alt="profile"
                />
              </button>

              <ProfileMenu
                email={userProfile?.email}
                isVisible={isProfileMenuOpen}
                name={`${userProfile?.first_name} ${userProfile?.last_name}`}
                onClose={() => {
                  setIsProfileMenuOpen(false);
                }}
                onLogout={logoutUser}
              />
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
};
export default Navbar;
