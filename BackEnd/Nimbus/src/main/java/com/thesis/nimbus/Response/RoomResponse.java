package com.thesis.nimbus.Response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;

// The purpose of this package is to make sure I select the information I want to show in the front end.

@Data
@NoArgsConstructor
public class RoomResponse {

    private Long Id;
    private String RoomType;
    private BigDecimal RoomPrice;
    private boolean Booked = false;
    private String image;
    private List<BookingResponse> bookings;

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice) {
        Id = id;
        RoomType = roomType;
        RoomPrice = roomPrice;
    }

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice, boolean booked, byte[] imageBytes
            /*List<BookingResponse> bookings*/) {
        Id = id;
        RoomType = roomType;
        RoomPrice = roomPrice;
        Booked = booked;
        this.image = imageBytes != null ? Base64.encodeBase64String(imageBytes) : null;
        //Checks if not null.
        //Converts the byte array in imageByte to a base-64 encoded string.
        //It is then stored in imageByte.
        //this.bookings = bookings;
    }
}