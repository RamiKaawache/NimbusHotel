package com.thesis.nimbus.Repository;

import com.thesis.nimbus.Model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookedRoomRepository extends JpaRepository<BookedRoom, Long> {

    List<BookedRoom> findByRoomId(Long roomId);

    Optional<BookedRoom> findByConfirmationCode(String confirmationCode);

    List<BookedRoom> findByGuestEmail(String guestEmail);
}
