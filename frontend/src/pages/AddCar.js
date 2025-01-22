import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";

function AddCar() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    dispatch(addCar(values));
  }

  return (
    <Container>
      {loading && <Spinner />}
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Add Car</h1>
          <Form onSubmit={onFinish}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter car name" required />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter image URL" required />
            </Form.Group>

            <Form.Group controlId="formBasicRent">
              <Form.Label>Rent Per Day</Form.Label>
              <Form.Control type="number" placeholder="Enter rent per day" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Car
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddCar;