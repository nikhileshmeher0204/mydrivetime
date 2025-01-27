import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import DefaultLayout from "../components/DefaultLayout";
import CarCard from "../components/CarCard";
import LocationAutocomplete from "../components/LocationAutocomplete";

function Home() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    bodyStyle: "",
    transmission: "",
    fuelType: "",
    rentPerHourFrom: "",
    rentPerHourTo: "",
  });

  useEffect(() => {
    try {
      dispatch(getAllCars());
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  const handleSearch = () => {
    const pickup = new Date(
      `${filters.pickupDate}T${filters.pickupTime || "00:00"}`
    );
    const dropoff = new Date(
      `${filters.returnDate}T${filters.returnTime || "00:00"}`
    );

    const results = cars.filter((car) => {
      // Match location
      if (
        filters.location &&
        !car.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }
      // Body Style
      if (filters.bodyStyle && car.bodyStyle !== filters.bodyStyle) {
        return false;
      }
      // Transmission
      if (
        filters.transmission &&
        car.transmissionType.toLowerCase() !==
          filters.transmission.toLowerCase()
      ) {
        return false;
      }
      // Fuel Type
      if (
        filters.fuelType &&
        car.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()
      ) {
        return false;
      }
      // rentPerHour range
      if (
        filters.rentPerHourFrom &&
        car.rentPerHour < Number(filters.rentPerHourFrom)
      ) {
        return false;
      }
      if (
        filters.rentPerHourTo &&
        car.rentPerHour > Number(filters.rentPerHourTo)
      ) {
        return false;
      }
      // Check booking overlap
      for (let slot of car.bookedTimeSlots) {
        const bookedFrom = new Date(slot.from);
        const bookedTo = new Date(slot.to);
        if (pickup < bookedTo && dropoff > bookedFrom) {
          return false;
        }
      }
      return true;
    });
    setFilteredCars(results);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <DefaultLayout>
      <div className="hero-section" style={{ color: "white" }}>
        <div className="hero-content hero-content-bottom-center">
          <h2 className="text-center mb-3">Find Your Perfect Car</h2>
          <div
            className="search-card p-4 search-card-horizontal"
            style={{ maxWidth: "1000px" }}
          >
            <div className="search-field">
              <label className="search-label">Pickup Location</label>
              <LocationAutocomplete
                value={filters.location}
                onChange={(value) =>
                  setFilters({ ...filters, location: value })
                }
                placeholder="Enter pickup location"
              />
            </div>
            <div className="search-field search-field-date-time">
              <label className="search-label">Pickup Date & Time</label>
              <div className="date-time-group">
                <input
                  type="date"
                  className="form-control"
                  value={filters.pickupDate}
                  onChange={(e) =>
                    setFilters({ ...filters, pickupDate: e.target.value })
                  }
                />
                <input
                  type="time"
                  className="form-control"
                  value={filters.pickupTime}
                  onChange={(e) =>
                    setFilters({ ...filters, pickupTime: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="search-field search-field-date-time">
              <label className="search-label">Return Date & Time</label>
              <div className="date-time-group">
                <input
                  type="date"
                  className="form-control"
                  value={filters.returnDate}
                  onChange={(e) =>
                    setFilters({ ...filters, returnDate: e.target.value })
                  }
                />
                <input
                  type="time"
                  className="form-control"
                  value={filters.returnTime}
                  onChange={(e) =>
                    setFilters({ ...filters, returnTime: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="search-button-wrapper">
              <button className="search-button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <Container fluid className="mt-5">
        <Row>
          {/* Left panel for additional filters */}
          <Col md={3}>
            <div className="filter-card p-4">
              <h5 className="mb-4">Filter by:</h5>

              <div className="filter-section">
                <div className="filter-section-title">BODY STYLE</div>
                <div className="checkbox-group">
                  {[
                    "Hatchback",
                    "SUV",
                    "Crossover",
                    "Sedan",
                    "Pickup",
                    "Coupe",
                  ].map((style) => (
                    <label key={style} className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={filters.bodyStyle === style}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            bodyStyle: filters.bodyStyle === style ? "" : style,
                          })
                        }
                      />
                      <span>{style}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <div className="filter-section-title">TRANSMISSION</div>
                <div className="checkbox-group">
                  {["Manual", "Automatic"].map((type) => (
                    <label key={type} className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={filters.transmission === type}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            transmission:
                              filters.transmission === type ? "" : type,
                          })
                        }
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <div className="filter-section-title">FUEL TYPE</div>
                <div className="checkbox-group">
                  {["Petrol", "Diesel", "Electric"].map((fuel) => (
                    <label key={fuel} className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={filters.fuelType === fuel}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            fuelType: filters.fuelType === fuel ? "" : fuel,
                          })
                        }
                      />
                      <span>{fuel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <div className="filter-section-title">PRICE RANGE ($/hr)</div>
                <div className="price-range">
                  <input
                    type="number"
                    className="price-input"
                    placeholder="From"
                    min="0"
                    value={filters.rentPerHourFrom}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        rentPerHourFrom: e.target.value,
                      })
                    }
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="price-input"
                    placeholder="To"
                    min="0"
                    value={filters.rentPerHourTo}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        rentPerHourTo: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <button
                className="search-button w-100 mt-3"
                onClick={handleSearch}
              >
                Apply Filters
              </button>
            </div>
          </Col>
          {/* Car listings */}
          <Col md={9}>
            <Row>
              {filteredCars &&
                filteredCars.map((car) => (
                  <Col key={car._id} lg={4} md={6} className="mb-4">
                    <CarCard car={car} />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default Home;
