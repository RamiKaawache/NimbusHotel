package com.thesis.nimbus.Repository;

import com.thesis.nimbus.Model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT DISTINCT r.RoomType FROM Room r")
    List<String> findDistinctRoomTypes();


    @Query(" SELECT r FROM Room r " +
            " WHERE r.RoomType LIKE %:roomType% " +
            " AND r.Id NOT IN (" +
            "  SELECT br.room.Id FROM BookedRoom br " +
            "  WHERE ((br.CheckInDate <= :checkOutDate) AND (br.CheckOutDate >= :checkInDate))" +
            ")")
    List<Room> findAvailableRoomsByDatesAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
}
