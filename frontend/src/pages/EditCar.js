import React, {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import LocationAutocomplete from '../components/LocationAutocomplete';
import { editCar, getAllCars } from "../redux/actions/carsActions";

function EditCar({ car }) {
  const { carid } = useParams();
  const dispatch = useDispatch();
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const [formData, setFormData] = useState(null);
  
  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    }
  }, [dispatch]);

  useEffect(() => {
    if (cars.length > 0) {
      const carData = cars.find(car => car._id === carid);
      if (carData) {
        setFormData(carData);
      }
    }
  }, [cars, carid]);

  if (!formData) {
    return <DefaultLayout><Spinner /></DefaultLayout>;
  }


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLocationChange = (value) => {
    setFormData(prev => ({
      ...prev,
      location: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCar({ ...formData, _id: carid }));
  };



  return (
    <Container>
      {loading && <Spinner />}
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formMake">
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formModel">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBodyStyle">
              <Form.Label>Body Style</Form.Label>
              <Form.Select
                name="bodyStyle"
                value={formData.bodyStyle}
                onChange={handleChange}
                required
              >
                <option value="">Select body style</option>
                <option value="Hatchback">Hatchback</option>
                <option value="SUV">SUV</option>
                <option value="Crossover">Crossover</option>
                <option value="Sedan">Sedan</option>
                <option value="Pickup">Pickup</option>
                <option value="Coupe">Coupe</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <LocationAutocomplete
                value={formData.location}
                onChange={handleLocationChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
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

            <Form.Group className="mb-3" controlId="formTransmissionType">
              <Form.Label>Transmission Type</Form.Label>
              <Form.Select
                name="transmissionType"
                value={formData.transmissionType}
                onChange={handleChange}
                required
              >
                <option value="">Select transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRentPerHour">
              <Form.Label>Rent Per Hour</Form.Label>
              <Form.Control
                type="number"
                name="rentPerHour"
                value={formData.rentPerHour}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Update Car
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditCar;