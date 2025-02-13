import React, { useEffect, useState } from "react";
import { getAllRooms } from "../Utilities/APIfxns";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const RoomSlider2 = () => {
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

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) {
        return <div className="mt-5">Loading Rooms..</div>;
    }

    if (errorMessage) {
        return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>;
    }

    return (
        <section className="room-slider bg-light mb-5 mt-5 shadow">
            <h2 className="text-left my-4 hotel-color">Explore More Rooms</h2>
            
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
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row className="justify-content-center">
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.id} className="mb-4" xs={12} sm={6} md={4} lg={3}>
                                        <Card className="room-card-custom h-100 shadow-sm border-0">
                                            <Link to={`/book-room/${room.id}`} onClick={handleScrollToTop}>
                                                <Card.Img
                                                    variant="top"
                                                    src={`data:image/png;base64, ${room.image}`}
                                                    alt="Room Image"
                                                    className="w-100 rounded-top"
                                                    style={{ height: "150px", objectFit: "cover" }} // Reduced height
                                                />
                                            </Link>
                                            <Card.Body className="text-center">
                                                <Card.Title className="hotel-color mb-1" style={{ fontSize: "1rem" }}>
                                                    {room.roomType}
                                                </Card.Title>
                                                <Card.Text className="room-price mb-2" style={{ fontSize: "0.9rem" }}>
                                                    {room.roomPrice} HUF / Night
                                                </Card.Text>
                                                <Link 
                                                    to={`/book-room/${room.id}`} 
                                                    className="btn btn-hotel btn-sm book-now-btn" 
                                                    onClick={handleScrollToTop}
                                                >
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

export default RoomSlider2;
