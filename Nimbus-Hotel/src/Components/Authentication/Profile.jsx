import React, { useEffect, useState } from "react";
import { deleteUser, getBookingsByUserId, getUser } from "../Utilities/APIfxns";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Profile = () => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        roles: [{ id: "", name: "" }]
    });
    const [bookings, setBookings] = useState([{
        bookingID: "",
        room: { id: "", roomType: "" },
        checkInDate: "",
        checkOutDate: "",
        confirmationCode: ""
    }]);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId, token);
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [userId, token]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByUserId(userId, token);
                setBookings(response);
            } catch (error) {
                console.error("Error fetching bookings:", error.message);
                setErrorMessage(error.message);
            }
        };
        fetchBookings();
    }, [userId, token]);

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmed) {
            await deleteUser(userId).then((response) => {
                setMessage(response.data);
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("userRole");
                navigate("/");
                window.location.reload();
            }).catch((error) => {
                setErrorMessage(error.data);
            });
        }
    };

    return (
        <div className="container">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {message && <p className="text-danger">{message}</p>}
            {user ? (
                <div className="profile-container">
                    <h4 className="user-info-title">User Information</h4>
                    <div className="profile-content">
                        <div className="row align-items-center">
                            <div className="col-md-4 text-center">
                                <img
                                    src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                                    alt="Profile"
                                    className="profile-image"
                                />
                            </div>
                            <div className="col-md-1 vertical-line"></div>
                            <div className="col-md-7">
                                <table className="table user-info-table">
                                    <tbody>
                                        <tr>
                                            <th>ID:</th>
                                            <td>{user.id}</td>
                                        </tr>
                                        <tr>
                                            <th>First Name:</th>
                                            <td>{user.firstName}</td>
                                        </tr>
                                        <tr>
                                            <th>Last Name:</th>
                                            <td>{user.lastName}</td>
                                        </tr>
                                        <tr>
                                            <th>Email:</th>
                                            <td>{user.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="roles-section">
                                    <label className="fw-bold">Roles:</label>
                                    <ul className="list-unstyled">
                                        {user.roles.map((role) => (
                                            <li key={role.id} className="card-text">
                                                {role.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 className="card-title text-center mt-4">Booking History</h4>
                    {bookings.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover shadow">
                                <thead>
                                    <tr>
                                        <th scope="col">Booking ID</th>
                                        <th scope="col">Room ID</th>
                                        <th scope="col">Room Type</th>
                                        <th scope="col">Check In Date</th>
                                        <th scope="col">Check Out Date</th>
                                        <th scope="col">Confirmation Code</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={index}>
                                            <td>{booking.bookingID}</td>
                                            <td>{booking.room.id}</td>
                                            <td>{booking.room.roomType}</td>
                                            <td>{moment(booking.checkInDate).format("MMM Do, YYYY")}</td>
                                            <td>{moment(booking.checkOutDate).format("MMM Do, YYYY")}</td>
                                            <td>{booking.confirmationCode}</td>
                                            <td className="text-success">On-going</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>You have not made any bookings yet.</p>
                    )}
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
                            Delete account
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
