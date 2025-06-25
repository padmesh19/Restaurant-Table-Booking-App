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
    dispatch(logout(() => {
      navigate("/login", { replace: true });
    }));

    // socket.emit(SOCKET_EVENTS.CS_OFFLINE, {
    //   roomId,
    //   userId,
    // })
  };


  const isTeacher = user?.user_type === 1;
  const profileType = user?.user_type

  const userProfile = user?.userProfile;
  return (
    <>

      <Nav className="navbar navbar-expand-sm p-0 fixed-top" {...properties}>
        {profileType === 1 ? (
          <ul className="col p-0 navbar-nav justify-content-center nav-pills h-100 d-flex">
            <li className="nav-item admin-navitem active">
              <NavLink
               className={({ isActive }) =>
                    isActive ? "nav-link d-flex align-items-center activeLink" : "nav-link d-flex align-items-center"
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
                    isActive ? "nav-link d-flex align-items-center activeLink" : "nav-link d-flex align-items-center"
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
                    isActive ? "nav-link d-flex align-items-center activeLink" : "nav-link d-flex align-items-center"
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
                className={`activebtn nav-link d-flex align-items-center${pathname.includes("/reservations") ? " activeLink" : ""
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
                    isActive ? "nav-link d-flex align-items-center activeLink" : "nav-link d-flex align-items-center"
                  }
                  end
                to="/admin/comments"
                id="dashboard-id"
              >
                <span>User Comments</span>
              </NavLink>
              
            </li>
            {/*
                <li className="nav-item admin-navitem active">
                  <button
                    type="button"
                    className={`activebtn nav-link d-flex align-items-center${
                      pathname.includes('/organisation') ? ' activeLink' : ''
                    }`}
                    onMouseEnter={() => {
                      setIsOrgDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      setIsOrgDropdownOpen(false);
                    }}
                    id="organisation-id"
                  >
                    <span>Organisation</span>
                    <img
                      alt="Show Works"
                      className="organisation-button-icon"
                      src={
                        pathname.includes('/organisation')
                          ? arrowBlue
                          : arrowGrey
                      }
                    />
                    {isOrgDropdownOpen ? (
                      <div className="orgdropdown">
                        <ul className="dropdown-content">
                          <li href="#">
                            <button
                              className="organisation-dropdown-item"
                              onClick={() => {
                                setIsOrgDropdownOpen(false);
                                history(`/admin/organisation/basic-info`);
                              }}
                              type="button"
                              id="basic-info-id"
                            >
                              <span className="dropdown-text">Basic Info</span>
                            </button>
                          </li>
                          <li href="#">
                            <button
                              className="organisation-dropdown-item"
                              onClick={() => {
                                setIsOrgDropdownOpen(false);
                                history(`/admin/organisation/departments`);
                              }}
                              type="button"
                              id="department-id"
                            >
                              <span className="dropdown-text">Departments</span>
                            </button>
                          </li>
                          <li href="#">
                            <button
                              className="organisation-dropdown-item"
                              onClick={() => {
                                history(
                                  `/admin/organisation/academicyear`,
                                );
                                setIsOrgDropdownOpen(false);
                              }}
                              type="button"
                              id="academic-year-id"
                            >
                              <span className="dropdown-text">
                                Academic Years
                              </span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : null}
                  </button>
                </li>
                <li className="nav-item admin-navitem active">
                  <NavLink
                    className="nav-link d-flex align-items-center"
                    activeClassName="activeLink"
                    to="/admin/qualifications"
                    id="qualifications-id"
                  >
                    <span>Qualifications</span>
                  </NavLink>
                </li>
                <li className="nav-item admin-navitem active">
                  <NavLink
                    className="nav-link d-flex align-items-center"
                    activeClassName="activeLink"
                    to="/admin/courses/active-courses"
                    id="classes-id"
                  >
                    <span>Courses</span>
                  </NavLink>
                </li>
                <li className="nav-item admin-navitem active">
                  <NavLink
                    className="nav-link d-flex align-items-center"
                    activeClassName="activeLink"
                    to="/admin/classes"
                    id="classes-id"
                  >
                    <span>Classes</span>
                  </NavLink>
                </li>
                <li className="nav-item admin-navitem active">
                  <button
                    type="button"
                    className={`activebtn nav-link d-flex align-items-center${
                      pathname.includes('/users') ? ' activeLink' : ''
                    }`}
                    onMouseEnter={() => {
                      setIsUserDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      setIsUserDropdownOpen(false);
                    }}
                    id="users-id"
                  >
                    <span>Users</span>
                    <img
                      alt="Show Works"
                      className="add-works-button-icon"
                      src={pathname.includes('/users') ? arrowBlue : arrowGrey}
                    />
                    {isUserDropdownOpen ? (
                      <div className="orgdropdown">
                        <ul className="dropdown-content">
                          <li href="#">
                            <button
                              className="organisation-dropdown-item"
                              onClick={() => {
                                setIsUserDropdownOpen(false);
                                history(`/admin/users/admin`);
                              }}
                              type="button"
                              id="admin-teacher-id"
                            >
                              <span className="dropdown-text">
                                Admin & Teacher
                              </span>
                            </button>
                          </li> */}
            {/* <li href="#">
                            <button
                              className="organisation-dropdown-item"
                              onClick={() => {
                                setIsUserDropdownOpen(false);
                                history(`/admin/users/teacher`);
                              }}
                              type="button"
                            >
                              <span className="dropdown-text">Teacher</span>
                            </button>
                          </li> */}
            {/* <li href="#">
                            <button
                              className="organisation-dropdown-item"
                              onClick={() => {
                                setIsUserDropdownOpen(false);
                                history(`/admin/users/student`);
                              }}
                              type="button"
                              id="student-id"
                            >
                              <span className="dropdown-text">Student</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : null}
                  </button>
                </li>
            

                <li className="nav-item admin-navitem active">
                  <NavLink
                    className="nav-link d-flex align-items-center"
                    activeClassName="activeLink"
                    to="/admin/library"
                    id="admin-library-id"
                  >
                    <span>Library</span>
                  </NavLink>
                </li> */}

            {/* <li className="nav-item admin-navitem active">
                  <NavLink
                    className="nav-link d-flex align-items-center"
                    activeClassName="activeLink"
                    to="/admin/units"
                  >
                    <span>Units</span>
                  </NavLink>
                </li> */}
          </ul>
        ) : (
          <ul className="col p-0 navbar-nav justify-content-center nav-pills h-100 d-flex">

            <>
              <li className="nav-item admin-navitem active">
                <NavLink
                  to="/customer"
                  className={({ isActive }) =>
                    isActive ? "nav-link d-flex align-items-center activeLink" : "nav-link d-flex align-items-center"
                  }
                  end
                  id="stream-id"
                >
                  <span>Hotel List</span>
                </NavLink>
              </li>
              <li className="nav-item admin-navitem active">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link d-flex align-items-center activeLink" : "nav-link d-flex align-items-center"
                  }
                  to="/customer/history"
                  exact
                  id="dashboard-id"
                >
                  <span>Booking History</span>
                </NavLink>
              </li>
              {/*
                  <li className="nav-item active">
                    <NavLink
                      className="nav-link d-flex align-items-center"
                      activeClassName="activeLink"
                      to={`/stream/${classId}/works`}
                      id="work-id"
                    >
                      <span>Works</span>
                    </NavLink>
                  </li> */}
              {/* <li className="nav-item active">
            <NavLink
              className="nav-link d-flex align-items-center"
              activeClassName="activeLink"
              to={`/stream/${classId}/units`}
            >
              <span>Units</span>
            </NavLink>
          </li> */}
              {/* <li className="nav-item active">
                    <NavLink
                      className="nav-link d-flex align-items-center"
                      activeClassName="activeLink"
                      to={`/stream/${classId}/students`}
                      id="student-teachapp-id"
                    >
                      <span>Students</span>
                    </NavLink>
                  </li>
                  <li className="nav-item active ">
                    <NavLink
                      className="nav-link d-flex align-items-center flex-shrink-0"
                      activeClassName="activeLink"
                      to={`/stream/${classId}/assessment-map`}
                      id="assessment-map-id"
                    >
                      <span className="flex-shrink-0">Assessment Map</span>
                    </NavLink>
                  </li>
                  <li className="nav-item active ml-3">
                    <NavLink
                      className="nav-link d-flex align-items-center"
                      activeClassName="activeLink"
                      to={`/stream/${classId}/library`}
                      id="teacher-library-id"
                    >
                      <span className="flex-shrink-0">Library</span>
                    </NavLink>
                  </li> */}
            </>
          </ul>
        )}
        <div className="rightSideNavbar-resp">
          <div className="d-flex p-0 col rightSideNavbar">
            {/* </div> */}
            {/* ) : null} */}
            <div ref={wrapperRef} className="wrapperForlogout">
              {/* {isTeacher ? (
                  <button
                    className="bg-white border-0 home-icon"
                    onClick={() => history("/classes")}
                    type="submit"
                    id="home-icon-id"
                  >
                    <img src={homeIco} alt="homeIco" />
                  </button>
                ) : null} */}

              <button
                className="profile-btn border-0 d-flex"
                onClick={() => {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                  setIsResponsiveProfileMenuOpen(
                    !isResponsiveProfileMenuOpen
                  );
                }}
                type="submit"
                id="profile-id"
              >
                <img
                  src={
                    userProfile?.up_avatar_thumbnail
                      ? userProfile?.up_avatar_thumbnail
                      : profile
                  }
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
