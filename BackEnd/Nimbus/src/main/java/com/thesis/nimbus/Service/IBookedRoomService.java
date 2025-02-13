package com.thesis.nimbus.Service;

import com.thesis.nimbus.Model.BookedRoom;

import java.util.List;

public interface IBookedRoomService {

    void cancelBooking(Long bookingID);

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    BookedRoom findBookingByConfirmationCode(String bookingConfirmationCode);

    List<BookedRoom> getAllBookings();

    List<BookedRoom> getBookingsByUserEmail(String email);
}
