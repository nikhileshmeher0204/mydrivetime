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
            
          <Form.Group controlId="formMake">
              <Form.Label>Make</Form.Label>
              <Form.Control type="text" defaultValue={car.make} required />
            </Form.Group>

            <Form.Group controlId="formModel">
              <Form.Label>Model</Form.Label>
              <Form.Control type="text" defaultValue={car.model} required />
            </Form.Group>

            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" defaultValue={car.year} required />
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" defaultValue={car.location} required />
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
            Update Car
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditCar;