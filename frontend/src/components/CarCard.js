import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCar, FaGasPump, FaUsers, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi';

function CarCard({ car }) {
  return (
    <Card className="car-card h-100">
      <div className="card-header-container p-2">
        <div className="d-flex align-items-center">
          <FaStar className="text-warning me-1" />
          <span>{car.rating.toFixed(1)}</span>
        </div>
        <span className="availability-badge">Available now</span>
      </div>
      
      <div className="car-image-container">
        <Card.Img variant="top" src={car.image} className="car-image" />
      </div>
      
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="mb-0">{`${car.year} ${car.make} ${car.model}`}</Card.Title>
          <span className="price">₹{car.rentPerHour}/hr</span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <FaMapMarkerAlt className="me-1" />
          <span style={{ fontSize: '0.875rem', fontWeight: '300' }}>{car.location}</span>
        </div>
        
        <hr className="my-2" />
        
        <div className="car-specs mb-3">
          <div className="spec-item">
            <FaCar className="spec-icon" />
            <span>{car.bodyStyle}</span>
          </div>
          <div className="spec-item">
            <GiGearStickPattern className="spec-icon" />
            <span>{car.transmissionType}</span>
          </div>
          <div className="spec-item">
            <FaGasPump className="spec-icon" />
            <span>{car.fuelType}</span>
          </div>
          <div className="spec-item">
            <FaUsers className="spec-icon" />
            <span>{car.capacity} seats</span>
          </div>
        </div>
        <Link to={`/booking/${car._id}`} className="w-100">
          <Button variant="primary" className="w-100">Book Now</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CarCard;  // Add default export