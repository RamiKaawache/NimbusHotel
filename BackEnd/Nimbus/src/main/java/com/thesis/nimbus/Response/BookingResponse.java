package com.thesis.nimbus.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

// The purpose of this package is to make sure I select the information I want to show in the front end.

@AllArgsConstructor //In case we need all attributes.
@NoArgsConstructor
@Data
public class BookingResponse {

    private Long BookingID;

    private LocalDate CheckInDate;

    private LocalDate CheckOutDate;

    private String GuestName;

    private String guestEmail;

    private int NumOfAdults;

    private int NumOfChildren;

    private int TotalGuests; //NumOfAdults+NumOfChildren = TotalGuests

    private String confirmationCode;
    private RoomResponse room;

    public BookingResponse(Long bookingID, LocalDate checkInDate,
                           LocalDate checkOutDate, String confirmationCode) {
        this.BookingID = bookingID;
        this.CheckInDate = checkInDate;
        this.CheckOutDate = checkOutDate;
        this.confirmationCode = confirmationCode;
    }
}
