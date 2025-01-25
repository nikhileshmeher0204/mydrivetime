import React, { useEffect } from "react";
import { Container, Row, Col} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";
import DefaultLayout from "../components/DefaultLayout";
import CarCard from "../components/CarCard";

function Home() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  useEffect(() => {
    try {
      dispatch(getAllCars());
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <DefaultLayout>
      <Container>
        <Row>
          {cars &&
            cars.map((car) => (
              <Col key={car._id} lg={4} md={6} className="mb-4">
                <CarCard car={car} />
              </Col>
            ))}
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default Home;
