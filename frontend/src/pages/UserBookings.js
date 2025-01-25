import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllBookings } from "../redux/actions/bookingActions";
import { format } from "date-fns";

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  const userBookings = bookings.filter(booking => 
    booking.user === user?._id && booking.car
  );

  if (loading) return <DefaultLayout><Spinner /></DefaultLayout>;
  
  if (error) return (
    <DefaultLayout>
      <Alert variant="danger">{error}</Alert>
    </DefaultLayout>
  );

  return (
    <DefaultLayout>
      <h3 className="text-center mt-2">My Bookings</h3>
      <Container>
        <Row>
          {userBookings.length === 0 ? (
            <Col className="text-center mt-5">
              <h4>No bookings found</h4>
            </Col>
          ) : (
            userBookings.map((booking) => (
              <Col md={4} key={booking._id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{`${booking.car?.year} ${booking.car?.make} ${booking.car?.model}` || 'Car Unavailable'}</Card.Title>
                    <Card.Text>
                      <strong>From:</strong>{' '}
                      {format(new Date(booking.bookedTimeSlots.from), 'PPpp')}
                      <br />
                      <strong>To:</strong>{' '}
                      {format(new Date(booking.bookedTimeSlots.to), 'PPpp')}
                      <br />
                      <strong>Total Hours:</strong> {booking.totalHours}
                      <br />
                      <strong>Total Amount:</strong> ${booking.totalAmount}
                    </Card.Text>
                    <Button 
                      variant="outline-primary"
                      href={`/booking/${booking._id}`}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default UserBookings;