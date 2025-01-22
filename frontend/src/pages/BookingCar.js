import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import { FaClock, FaCalendarAlt } from "react-icons/fa";

function BookingCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === match.params.carid));
    }
  }, [cars]);

  useEffect(() => {
    if (from && to) {
      const diffTime = Math.abs(to - from);
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      setTotalHours(diffHours);
    }
  }, [from, to]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount((prevAmount) => prevAmount + 30 * totalHours);
    }
  }, [driver, totalHours, car.rentPerHour]);

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from: from.toISOString(),
        to: to.toISOString(),
      },
    };
    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Card>
              <Card.Img variant="top" src={car.image} className="w-100" />
              <Card.Body>
                <Card.Title>{car.name}</Card.Title>
                <Card.Text>
                  Rent Per Hour: ${car.rentPerHour}
                  <br />
                  Fuel Type: {car.fuelType}
                  <br />
                  Max Persons: {car.capacity}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Select Time Slots</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>From</Form.Label>
                  <DateTimePicker
                    onChange={setFrom}
                    value={from}
                    className="form-control"
                    minDate={new Date()}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>To</Form.Label>
                  <DateTimePicker
                    onChange={setTo}
                    value={to}
                    className="form-control"
                    minDate={from}
                  />
                </Form.Group>

                <Button variant="primary" onClick={() => setShowModal(true)}>
                  See Booked Slots
                </Button>

                {totalHours > 0 && (
                  <div className="mt-3">
                    <p>
                      Total Hours: <b>{totalHours}</b>
                    </p>
                    <p>
                      Rent Per Hour: <b>${car.rentPerHour}</b>
                    </p>
                    <Form.Check
                      type="checkbox"
                      label="Driver Required (+$30/hr)"
                      onChange={(e) => setDriver(e.target.checked)}
                    />
                    <h3>Total Amount: ${totalAmount}</h3>
                    <StripeCheckout
                      token={onToken}
                      currency="USD"
                      amount={totalAmount * 100}
                      stripeKey="pk_test_51QWfcWD7EZicVnxwoMA4KDEMNpRTkPvZrFgM4bMuCTjgNrWH1EouGctn4ljdN5sCabMVb0gXKkLZuIBFnYrHbCOU00V8q1U1DP"
                    >
                      <Button variant="success" className="mt-3">
                        Book Now
                      </Button>
                    </StripeCheckout>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>
              <FaCalendarAlt className="me-2" />
              Booked Time Slots
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            {car.bookedTimeSlots?.length === 0 ? (
              <div className="text-center text-muted p-4">
                <h5>No bookings available for this car</h5>
              </div>
            ) : (
              car.bookedTimeSlots?.map((slot, index) => {
                const fromDate = new Date(slot.from);
                const toDate = new Date(slot.to);
                const isPastBooking = fromDate < new Date();

                return (
                  <div
                    key={index}
                    className={`p-3 mb-3 rounded shadow-sm ${
                      isPastBooking ? "bg-light" : "bg-white border"
                    }`}
                  >
                    <div className="d-flex align-items-center mb-2">
                      <FaClock className="text-primary me-2" />
                      <span className="fw-bold">{formatDate(fromDate)}</span>
                    </div>
                    <div className="ms-4 ps-2 border-start">
                      <div>From: {formatTime(fromDate)}</div>
                      <div>To: {formatTime(toDate)}</div>
                    </div>
                  </div>
                );
              })
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </DefaultLayout>
  );
}

export default BookingCar;
