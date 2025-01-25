import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { deleteCar, getAllCars } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import { FaEdit, FaTrash, FaPlus , FaMapMarkerAlt} from "react-icons/fa";

function AdminHome() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

  const handleDelete = (carId) => {
    dispatch(deleteCar({ carid: carId }));
    setShowDeleteModal(false);
  };

  const confirmDelete = (car) => {
    setSelectedCar(car);
    setShowDeleteModal(true);
  };

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Container>
        <Row className="mb-4 mt-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h2>Admin Panel</h2>
            <Button 
              variant="primary" 
              href="/addcar"
              className="d-flex align-items-center gap-2"
            >
              <FaPlus /> Add Car
            </Button>
          </Col>
        </Row>

        <Row>
          {totalCars.map((car) => (
            <Col key={car._id} lg={4} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={car.image} 
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{`${car.year} ${car.make} ${car.model}`}</Card.Title>
                  <Card.Text className="mb-2">
                      <span className="d-flex align-items-center">
                      <FaMapMarkerAlt className="text-primary me-2" />
                      {car.location}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    Rent Per Hour: ${car.rentPerHour}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-primary"
                      href={`/editcar/${car._id}`}
                      className="d-flex align-items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </Button>
                    <Button 
                      variant="outline-danger"
                      onClick={() => confirmDelete(car)}
                      className="d-flex align-items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedCar?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleDelete(selectedCar?._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </DefaultLayout>
  );
}

export default AdminHome;