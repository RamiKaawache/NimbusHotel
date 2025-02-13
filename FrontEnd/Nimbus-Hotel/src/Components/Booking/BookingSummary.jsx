import { Button } from "react-bootstrap";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, onConfirm, isFormValid}) => {

    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numOfDays = checkOutDate.diff(checkInDate, "days")
    const[isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const[isProcessingPayment, setIsProcessingPayment]  = useState(false)
    const navigate = useNavigate()
    
    const handleConfirmBooking = () => {
        setIsProcessingPayment(true);
        setTimeout(() => {
            setIsProcessingPayment(false);
            setIsBookingConfirmed(true);
            onConfirm()
        }, 3000)
    }

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success",  { state: { message: "Your booking was successful!" }});
        }
    }, [isBookingConfirmed, navigate])

    return (
        <div className="row">
        <div className="col-md-7"></div>
        <div className="form-card-body-2 mt-1">
            <h4>Reservation Summary</h4>

            <p>Full Name: <strong>{booking.guestName}</strong></p>
            <p>E-mail Address: <strong>{booking.guestEmail}</strong></p>
            <p>Check-In Date: <strong>{moment(booking.checkInDate).format("Do MMM YYYY")}</strong></p>
            <p>Check-Out Date: <strong>{moment(booking.checkOutDate).format("Do MMM YYYY")}</strong></p>
            <p>Number Of Days: <strong>{numOfDays}</strong></p>

            <div>
                <h5>Number Of Guests</h5>
                <strong>Adult{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}</strong>
                <strong>   Child{booking.numOfChildren > 1 ? "ren" : ""} : {booking.numOfChildren}</strong>
            </div>
            {payment > 0 ? (
                <>
                <p>
                    Total Payment: <strong>{payment} HUF</strong>   
                </p>
                {isFormValid && !isBookingConfirmed ? (
                    <Button variant="success" onClick={handleConfirmBooking}>
                        {isProcessingPayment ? (
                            <>
                            <span className="spinner-border spinner-border-sm mr-2"
                            role="status"
                            aria-hidden="true">
                            </span>
                            Redirecting to the Payment Page..   
                            </>
                        ):(
                            "Confirm Booking and Proceed to Payment"
                        )}
                    </Button>
                ): isBookingConfirmed ? (
                    
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading</span>
                        </div>
                    </div>
                ): null}
                </>
            ): (
                <p className="text-danger">
                    The Check-Out date must be assigned After the Check-In date! 
                </p>
            )}
        </div>
        </div>
    )
} 

export default BookingSummary