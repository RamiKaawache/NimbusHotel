import { parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import DateSlider from "./DateSlider";

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);
        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  return (
    <section className="p-4">
      <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
      <table className="table table-bordered table-hover shadow table-font">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Booking ID</th>
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Guest Name</th>
            <th>Guest Email</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Number of Guests</th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <tr  key={booking.bookingID}>
                <td>{index + 1}</td>
                <td>{booking.bookingID}</td>
                <td>{booking.room.id}</td>
                <td>{booking.room.roomType}</td>
                <td>{booking.checkInDate}</td>
                <td>{booking.checkOutDate}</td>
                <td>{booking.guestName}</td>
                <td>{booking.guestEmail}</td>
                <td>{booking.numOfAdults}</td>
                <td>{booking.numOfChildren}</td>
                <td>{booking.totalGuests}</td>
                <td>{booking.confirmationCode}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleBookingCancellation(booking.bookingID)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14">No booking found for the selected dates</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default BookingsTable;
