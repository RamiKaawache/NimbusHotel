    package com.thesis.nimbus.Model;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.Setter;
    import org.apache.commons.lang3.RandomStringUtils;

    import java.math.BigDecimal;
    import java.sql.Blob;
    import java.util.ArrayList;
    import java.util.List;


    @Entity
    @Getter
    @Setter
    @AllArgsConstructor
    public class Room {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long Id;
        private String RoomType;
        private BigDecimal RoomPrice;
        private boolean Booked = false;

        @Lob
        private Blob image;; // Image of the room.

        @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        //Cascade all means anything done to the room affects its entire attributes.
        private List<BookedRoom> Bookings;

        public Room() {
            this.Bookings = new ArrayList<>(); //Pointer array to avoid Bookings exception when running first time.
        }

        public void AddBookings(BookedRoom bookedRoom) {
            if (Bookings == null) {
                Bookings = new ArrayList<>();
            }
            Bookings.add(bookedRoom);
            bookedRoom.setRoom(this);
            Booked = true; //changes initial state to true when room added
            String BookingCode = RandomStringUtils.randomNumeric(10);
            bookedRoom.setConfirmationCode(BookingCode);
        }
    }
