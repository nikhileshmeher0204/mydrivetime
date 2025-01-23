import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addCar } from "../redux/actions/carsActions";

function AddCar() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertsReducer);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    rentPerHour: '',
    capacity: '',
    fuelType: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCar(formData));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <DefaultLayout>
      <Container>
        {loading && <Spinner />}
        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <h1 className="mb-4">Add New Car</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Car Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter car name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRent">
                <Form.Label>Rent Per Hour</Form.Label>
                <Form.Control
                  type="number"
                  name="rentPerHour"
                  value={formData.rentPerHour}
                  onChange={handleChange}
                  placeholder="Enter rent per hour"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCapacity">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Enter seating capacity"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formFuelType">
                <Form.Label>Fuel Type</Form.Label>
                <Form.Select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select fuel type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Add Car
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default AddCar;