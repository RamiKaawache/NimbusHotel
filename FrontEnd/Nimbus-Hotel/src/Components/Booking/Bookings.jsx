import React, { useEffect, useState } from "react";
import { cancelBooking, getAllBookings } from "../Utilities/APIfxns";
import Header from "../Common/Header";
import BookingsTable from "./BookingsTable";

const Bookings = () => {

    const[bookingInfo, setBookingInfo] = useState([])
    const[isLoading, setIsLoading] = useState(true)
    const[error, setError] = useState("")
    
    const handleBookingCancellation = async(bookingID) => {
        try{
            await cancelBooking(bookingID)
            const data = await getAllBookings()
            setBookingInfo(data)
        } catch(error) {
            setError(error.message)
        }
    }
    
    useEffect(() => {
        setTimeout(() => {
            getAllBookings().then((data) => {
                setBookingInfo(data)
                setIsLoading(false)
            }).catch((error) => {
                setError(error.message)
                setIsLoading(false)
            }) 
        }, 1000)
    }, [])

    

    return(
        <section className="container" style={{backgroundColor: "whitesmoke"}}>
            <Header title={"Guest Bookings"} />
            {error && <div className="text-danger">{error}</div>}
            {isLoading ? ( 
                <div>Loading Existing Bookings</div>
            ) : (
                <BookingsTable bookingInfo={bookingInfo} handleBookingCancellation={handleBookingCancellation}/>
            )}
        </section>
    )
}

export default Bookings