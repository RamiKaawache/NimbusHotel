package com.thesis.nimbus.Controller;

import com.thesis.nimbus.Exception.InvalidBookingRequestException;
import com.thesis.nimbus.Exception.ResourceNotFoundException;
import com.thesis.nimbus.Model.BookedRoom;
import com.thesis.nimbus.Model.Room;
import com.thesis.nimbus.Response.BookingResponse;
import com.thesis.nimbus.Response.RoomResponse;
import com.thesis.nimbus.Service.IBookedRoomService;
import com.thesis.nimbus.Service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookedRoomController {

    private final IRoomService roomService;
    private final IBookedRoomService bookedRoomService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        List<BookedRoom> bookings = bookedRoomService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookedRoom booking = bookedRoomService.findBookingByConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        }
        catch (ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("/user/{guestEmail}/bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String guestEmail) {
        List<BookedRoom> bookings = bookedRoomService.getBookingsByUserEmail(guestEmail);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }


    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse room = new RoomResponse(theRoom.getId(), theRoom.getRoomType(), theRoom.getRoomPrice());
        return new BookingResponse(booking.getBookingID(), booking.getCheckInDate(), booking.getCheckOutDate(),
                booking.getGuestName(), booking.getGuestEmail(), booking.getNumOfAdults(), booking.getNumOfChildren(),
                booking.getTotalGuests(), booking.getConfirmationCode(), room);
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId, @RequestBody BookedRoom bookingRequest){
        try{
            String confirmationCode = bookedRoomService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok("The Room Has Been Booked Successfully." +
                    " Your Confirmation Code is: " + confirmationCode);
        }
        catch (InvalidBookingRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{bookingID}/delete")
    public void cancelBooking(@PathVariable Long bookingID){
        bookedRoomService.cancelBooking(bookingID);
    }
}
