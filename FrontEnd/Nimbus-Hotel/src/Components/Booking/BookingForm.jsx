import React, { useEffect, useState } from "react";
import { bookRoom, getRoomById } from "../Utilities/APIfxns";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment"; // date conversion package
import { Form, FormControl } from "react-bootstrap";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const currentUser = localStorage.getItem("userId");
    const [booking, setBooking] = useState({
        guestName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
    });


    const [roomInfo, setRoomInfo] = useState({
        image: "",
        roomType: "",
        roomPrice: "",
    });

    const { roomId } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId);
            setRoomPrice(response.roomPrice);
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getRoomPriceById(roomId);
    }, [roomId]);

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffInDays = checkOutDate.diff(checkInDate, "days");
        const price = roomPrice ? roomPrice : 0;
        return diffInDays * price;
    };

    // Make sure the Number of adults is at least one.
    const GuestValidity = () => {
        const adultCount = parseInt(booking.numOfAdults);
        const childrenCount = parseInt(booking.numOfChildren);
        const totalCount = adultCount + childrenCount;
        return totalCount >= 1 && adultCount >= 1;
    };

    const checkOutDateValidity = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("The Check-Out date must be assigned After the Check-In date!");
            return false;
        } else {
            setErrorMessage("");
            return true;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false || !GuestValidity() || !checkOutDateValidity()) {
            e.stopPropagation();
        } else {
            setIsSubmitted(true);
        }
        setIsValidated(true);
    };

    const HandleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking);
            setIsSubmitted(true);

            navigate("/booking-success", { state: { message: confirmationCode } });
        } catch (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
            navigate("/booking-success", { state: { error: errorMessage } });
        }
    };

    const today = moment().format("YYYY-MM-DD");

    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-5">
                        <div className="form-card-body mt-1">
                            <h4 className="card-title">Reserve Room</h4>

                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="guestName" className="hotel-color">
                                        Full Name
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type="text"
                                        id="guestName"
                                        name="guestName"
                                        value={booking.guestName}
                                        placeholder="Enter Your Full Name"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter your Full Name.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="guestEmail" className="hotel-color">
                                        Email Address
                                    </Form.Label>
                                    <FormControl
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder="Enter your Email Address"
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter a Valid Email Address.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <hr /> {/* Line added here */}
                                <fieldset style={{ border: "2px" }}>
                                    <legend>Lodging Period</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="checkInDate" className="hotel-color">
                                                Check-In Date
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkInDate"
                                                name="checkInDate"
                                                value={booking.checkInDate}
                                                placeholder="check-in-date"
                                                min={today}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please Select a Check In Date.
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="checkOutDate" className="hotel-color">
                                                Check-Out Date
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkOutDate"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                placeholder="check-out-date"
                                                min={today}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please Select a Check Out Date.
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                    </div>
                                    <hr /> {/* Line added here */}
                                </fieldset>

                                <fieldset style={{ border: "2px" }}>
                                    <legend>Number of Guests</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfAdults" className="hotel-color">
                                                Adults
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfAdults"
                                                name="numOfAdults"
                                                value={booking.numOfAdults}
                                                min={1}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please Select at least 1 Adult.
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfChildren" className="hotel-color">
                                                Children
                                            </Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfChildren"
                                                name="numOfChildren"
                                                value={booking.numOfChildren}
                                                placeholder="0"
                                                min={0}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Select 0 If No Children
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                    
                                </fieldset>

                                <div className="form-group mt-2 mb-2">
                                    <button type="submit" className="btn btn-hotel">
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="col-md-7">
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                onConfirm={HandleBooking}
                                isFormValid={isValidated}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingForm;
