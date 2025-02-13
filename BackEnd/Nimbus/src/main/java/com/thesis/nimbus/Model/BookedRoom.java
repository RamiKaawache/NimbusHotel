package com.thesis.nimbus.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookedRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long BookingID;

    @Column(name = "Check_In")
    private LocalDate CheckInDate;

    @Column(name = "Check_Out")
    private LocalDate CheckOutDate;

    @Column(name = "Full_Name")
    private String GuestName;

    @Column(name = "Email_Address")
    private String guestEmail;

    @Column(name = "Adults")
    private int NumOfAdults;

    @Column(name = "Children")
    private int NumOfChildren;

    private int TotalGuests; //NumOfAdults+NumOfChildren = TotalGuests

    private String confirmationCode;

    @ManyToOne(fetch = FetchType.LAZY) //Many bookings can occur on one room.
    @JoinColumn(name = "Room_ID")
    private Room room;

    public void TotalNumOfGuests() {
        this.TotalGuests = this.NumOfAdults + NumOfChildren;
    }

    public void setNumOfAdults(int numOfAdults) {
        NumOfAdults = numOfAdults;
        TotalNumOfGuests(); //Call method cuz in case client changes NumOfAdults it regenerates.
    }

    public void setNumOfChildren(int numOfChildren) {
        NumOfChildren = numOfChildren;
        TotalNumOfGuests(); //Call method cuz in case client changes NumOfChildren it regenerates.
    }

    public void setConfirmationCode(String confirmationCode) {
        this.confirmationCode = confirmationCode;
    }

}
