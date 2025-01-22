import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Spinner from '../components/Spinner';
import moment from "moment";

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const {loading} = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <DefaultLayout>
        {loading && (<Spinner />)}
      <h3 className="text-center mt-2">My Bookings</h3>
    
      <Container>
        <Row>
          {bookings.filter(o=>o.user==user._id).map((booking) => (
            <Col md={4} key={booking._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{booking.car.name}</Card.Title>
                  <Card.Text>
                    From: {booking.bookedTimeSlots.from} <br />
                    To: {booking.bookedTimeSlots.to}
                  </Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default UserBookings;