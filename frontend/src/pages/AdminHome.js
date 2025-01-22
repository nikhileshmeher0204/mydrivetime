import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars, deleteCar } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";

function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  const handleDelete = (carid) => {
    dispatch(deleteCar({ carid }));
  };

  return (
    <Container>
      {loading && <Spinner />}
      <Row>
        {totalCars.map((car) => (
          <Col md={4} key={car._id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={car.image} />
              <Card.Body>
                <Card.Title>{car.name}</Card.Title>
                <Card.Text>
                  {car.description}
                </Card.Text>
                <Button variant="primary" href={`/editcar/${car._id}`}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(car._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AdminHome;