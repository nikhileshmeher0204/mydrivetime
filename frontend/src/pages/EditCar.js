import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editCar } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";

function EditCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  const car = cars.find((car) => car._id === match.params.carid);

  function onFinish(values) {
    values._id = car._id;
    dispatch(editCar(values));
  }

  return (
    <Container>
      {loading && <Spinner />}
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Edit Car</h1>
          <Form onSubmit={onFinish}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" defaultValue={car.name} required />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" defaultValue={car.image} required />
            </Form.Group>

            <Form.Group controlId="formBasicRent">
              <Form.Label>Rent Per Day</Form.Label>
              <Form.Control type="number" defaultValue={car.rentPerDay} required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Edit Car
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditCar;