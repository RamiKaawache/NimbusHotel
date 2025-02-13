import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCards = ({ room }) => {
    return (
        <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
            <Card className="shadow-sm border-0 h-100 room-card">
                <Link to={`/book-room/${room.id}`}>
                    <Card.Img
                        variant="top"
                        src={`data:image/png;base64, ${room.image}`}
                        alt="Room Image"
                        className="hover-zoom"
                    />
                </Link>
                <Card.Body className="d-flex flex-column justify-content-between">
                    <div className="flex-grow-1">
                        <Card.Title className="hotel-color font-weight-bold text-center">{room.roomType}</Card.Title>
                        <div className="room-price font-weight-bold text-center mt-2">
                            {room.roomPrice} HUF <span className="per-night">/ Night</span>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm book-now-btn">
                            Book Now!
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default RoomCards;
