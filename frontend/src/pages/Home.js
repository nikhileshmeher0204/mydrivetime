import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCars } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import DefaultLayout from "../components/DefaultLayout";

function Home() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  useEffect(() => {
    try {
      dispatch(getAllCars());
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <DefaultLayout>
      <Container>
        <Row>
          {cars && cars.map((car) => (
            <Col md={4} key={car._id}>
              <Card className="car-card">
                <div className="car-image-container">
                  <Card.Img 
                    variant="top" 
                    src={car.image} 
                    className="car-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=Car+Image";
                    }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{car.name}</Card.Title>
                  <Card.Text>
                    Rent per hour: ${car.rentPerHour}
                  </Card.Text>
                  <Link to={`/booking/${car._id}`}>
                    <Button variant="primary">Book Now</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default Home;