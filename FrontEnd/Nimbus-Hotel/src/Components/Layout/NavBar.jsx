import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "../Authentication/Logout";

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false);
    const dropDownRef = useRef(null);
    
    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setShowAccount(false); // Close dropdown if clicked outside
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropDownRef]);

    const isLoggedIn = localStorage.getItem("token")
	const userRole = localStorage.getItem("userRole")
    

    return (
        <nav
            className="navbar navbar-expand-lg navbar-light bg-light px-5 shadow sticky-top"
            style={{
                padding: '15px 20px', /* Increase padding for a roomier look */
                marginTop: '12px', /* Adjust margin */
                width: '100%', /* Stretch navbar */
            }}
        >
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <span className="hotel-color">Nimbus Hotel</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-label="Toggle navigation"
                    aria-expanded="false"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/browse-all-rooms">
                                Browse All Rooms
                            </NavLink>
                        </li>
                        {isLoggedIn && userRole === "ROLE_ADMIN" && (
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/admin">
                                Admin
                            </NavLink>
                        </li>
                        )}
                    </ul>

                    <ul className="d-flex navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/find-booking">
                                Find My Booking
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown" ref={dropDownRef}>
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}
                            >
                                {" "}
                                Account
                            </a>
                            <ul
                                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown"
                            >
                                {isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
