package com.thesis.nimbus.Controller;

import com.thesis.nimbus.Exception.ImageRetrievalException;
import com.thesis.nimbus.Exception.ResourceNotFoundException;
import com.thesis.nimbus.Model.BookedRoom;
import com.thesis.nimbus.Model.Room;
import com.thesis.nimbus.Response.RoomResponse;
import com.thesis.nimbus.Service.BookedRoomService;
import com.thesis.nimbus.Service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor // Inject dependencies into this class
@RequestMapping("/rooms")
public class RoomController {

    private final IRoomService roomService;
    private final BookedRoomService bookedRoomService;

    @PostMapping("/add/new-room")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("image") MultipartFile image, //MultipartFile is a Spring class for handling file uploads.
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {

        Room savedRoom = roomService.addNewRoom(image, roomType, roomPrice);
        RoomResponse response = new RoomResponse(savedRoom.getId(),
                savedRoom.getRoomType(),
                savedRoom.getRoomPrice());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/room/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @Transactional
    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms = roomService.getAllRooms(); // Calls getAllRooms function in roomService to retrieve all rooms.
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : rooms) { //Method fetches the room image data (stored as binary) based on the room's ID.
            byte[] imageBytes = roomService.getRoomImageByRoomId(room.getId());
            if (imageBytes != null && imageBytes.length > 0) { // Check if image data exists.
                String base64Image = Base64.encodeBase64String(imageBytes); // Convert Image to Base64-Encoded String.
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setImage(base64Image);
                roomResponses.add(roomResponse);
            }
        }
        return ResponseEntity.ok(roomResponses);
    }

    @Transactional
    public RoomResponse getRoomResponse(Room room) {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());
        byte[] imageBytes = null;
        Blob imageBlob = room.getImage();
        if (imageBlob != null) {
            try {
                // Using PostgreSQL API to retrieve the bytes safely.
                imageBytes = retrieveBlobData(imageBlob);
            } catch (SQLException e) {
                throw new ImageRetrievalException("Error retrieving image bytes: " + e.getMessage());
            }
        }
        return new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice(),
                room.isBooked(), imageBytes);
    }

    private byte[] retrieveBlobData(Blob blob) throws SQLException {
        // Using the PostgreSQL Blob handling
        long blobLength = blob.length();
        if (blobLength > Integer.MAX_VALUE) {
            throw new ImageRetrievalException("Blob size exceeds the maximum limit.");
        }
        return blob.getBytes(1, (int) blobLength);
    }

    @Transactional
    @GetMapping("/available-rooms")
    public ResponseEntity<List<RoomResponse>> getAvailableRooms(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkOutDate,
            @RequestParam("roomType") String roomType) throws SQLException {
        List<Room> availableRooms = roomService.getAvailableRooms(checkInDate, checkOutDate, roomType);
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : availableRooms) {
            byte[] imageBytes = roomService.getRoomImageByRoomId(room.getId());
            if (imageBytes != null && imageBytes.length > 0) {
                String imageBase64 = Base64.encodeBase64String(imageBytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setImage(imageBase64);
                roomResponses.add(roomResponse);
            }
        }
        if (roomResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.ok(roomResponses);
        }
    }

    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update/{roomId}")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long roomId,
                                                   @RequestParam(required = false) String roomType,
                                                   @RequestParam(required = false) BigDecimal roomPrice,
                                                   @RequestParam(required = false) MultipartFile image)
            throws IOException, SQLException {
        byte[] imageBytes = image != null && !image.isEmpty()? image.getBytes() :
                roomService.getRoomImageByRoomId(roomId);
        Blob imageBlob = imageBytes != null && imageBytes.length > 0 ? new SerialBlob(imageBytes) : null;
        Room theRoom = roomService.updateRoom(roomId, roomType, roomPrice, imageBytes);
        theRoom.setImage(imageBlob);
        RoomResponse roomResponse = getRoomResponse(theRoom);
        return ResponseEntity.ok(roomResponse);
    }

    @Transactional
    @GetMapping("/room/{roomId}")
    public ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long roomId){
        Optional<Room> theRoom = roomService.getRoomById(roomId);
        return theRoom.map(room -> {
            RoomResponse roomResponse = getRoomResponse(room);
            return ResponseEntity.ok(Optional.of(roomResponse));
        }).orElseThrow(() -> new ResourceNotFoundException(("Room was not found")));
    }

    @DeleteMapping("/delete/room/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId){
        roomService.deleteRoom(roomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    private List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookedRoomService.getAllBookingsByRoomId(roomId);
    }
}
