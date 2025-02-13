package com.thesis.nimbus.Service;

import com.thesis.nimbus.Exception.InvalidBookingRequestException;
import com.thesis.nimbus.Exception.ResourceNotFoundException;
import com.thesis.nimbus.Model.BookedRoom;
import com.thesis.nimbus.Model.Room;
import com.thesis.nimbus.Repository.BookedRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookedRoomService implements IBookedRoomService {

    private final BookedRoomRepository bookedRoomRepository;
    private final IRoomService roomService;

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookedRoomRepository.findAll();
    }

    @Override
    public List<BookedRoom> getBookingsByUserEmail(String email) {
        return bookedRoomRepository.findByGuestEmail(email);
    }

    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookedRoomRepository.findByRoomId(roomId);
    }

    @Override
    public void cancelBooking(Long bookingID) {
        bookedRoomRepository.deleteById(bookingID);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new InvalidBookingRequestException("Check-in Date has to be before the Check-out Date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings(); // for the booked room history
        boolean isRoomAvailable = isRoomAvailable(bookingRequest, existingBookings);
        if (isRoomAvailable) {
            room.AddBookings(bookingRequest);
            bookedRoomRepository.save(bookingRequest);
        }
        else {
            throw new InvalidBookingRequestException("This Room is Not Available for the Selected Dates.");
        }
        return bookingRequest.getConfirmationCode();
    }


    // if room trying to get booked intersects already booked date.
    private boolean isRoomAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream().noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                        || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                        || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())

                        && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                        || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                        && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                        || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                        && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))
                        || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())

                        && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))
                        || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                        && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }

    @Override
    public BookedRoom findBookingByConfirmationCode(String bookingConfirmationCode) {
        return bookedRoomRepository.findByConfirmationCode(bookingConfirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("Confirmation Code " + "'" + bookingConfirmationCode + "'" + " was not found"));
    }


}
