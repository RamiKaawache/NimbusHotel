import React, { useEffect, useState } from "react";
import { getAllRooms } from "../Utilities/APIfxns";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const RoomSlider = () => {
    const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "", image: "" }]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms()
            .then((data) => {
                setRooms(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="mt-5">Loading Rooms..</div>;
    }

    if (errorMessage) {
        return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>;
    }

    return (
        <section className="room-slider bg-light mb-5 mt-5 shadow">
            <h2 className="text-center my-4 hotel-color">Explore Our Rooms</h2>
            
            <div className="text-center mb-4">
                <Link 
                    to="/browse-all-rooms" 
                    className="btn btn-browse-rooms"
                >
                    Browse All Rooms
                </Link>
            </div>

            <Container>
                <Carousel indicators={false} interval={3500}>
                    {[...Array(Math.ceil(rooms.length / 3))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row className="justify-content-center">
                                {rooms.slice(index * 3, index * 3 + 3).map((room) => (
                                    <Col key={room.id} className="mb-4" xs={12} md={6} lg={4}>
                                        <Card className="room-card-custom h-100 shadow-sm border-0">
                                            <Link to={`/book-room/${room.id}`}>
                                                <Card.Img
                                                    variant="top"
                                                    src={`data:image/png;base64, ${room.image}`}
                                                    alt="Room Image"
                                                    className="w-100 rounded-top"
                                                    style={{ height: "200px", objectFit: "cover" }} // Reduced height
                                                />
                                            </Link>
                                            <Card.Body className="text-center">
                                                <Card.Title className="hotel-color mb-1">{room.roomType}</Card.Title>
                                                <Card.Text className="room-price mb-3">
                                                    {room.roomPrice} HUF / Night
                                                </Card.Text>
                                                <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
                                                    Book Now!
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default RoomSlider;
