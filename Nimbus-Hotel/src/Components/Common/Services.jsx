import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import { FaClock, FaCocktail, FaDumbbell, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa";

const Services = () => {
  return (
    <Container className="mb-5">
      <Header title={"Our Services"} />
      <Row className="text-center mb-4">
        <div className="service-highlight d-flex justify-content-center align-items-center">
          <FaClock className="me-2" />
          <span>24 Hour Front Desk</span>
        </div>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        <Col>
          <Card className="service-card hover-zoom">
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaDumbbell /> Gym
              </Card.Title>
              <Card.Text>The Gym offers state-of-the-Art equipment.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="service-card hover-zoom">
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaUtensils /> Breakfast
              </Card.Title>
              <Card.Text>Start your day with a delicious breakfast buffet.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="service-card hover-zoom">
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaTshirt /> Laundry
              </Card.Title>
              <Card.Text>Keep your clothes clean and fresh with our laundry service.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="service-card hover-zoom">
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaCocktail /> Mini-bar
              </Card.Title>
              <Card.Text>Enjoy a refreshing drink or snack from our in-room mini-bar.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="service-card hover-zoom">
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaParking /> Parking
              </Card.Title>
              <Card.Text>Park your car conveniently in our on-site parking lot.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="service-card hover-zoom">
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaSnowflake /> Air Conditioning
              </Card.Title>
              <Card.Text>Stay cool and comfortable with our air conditioning system.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
