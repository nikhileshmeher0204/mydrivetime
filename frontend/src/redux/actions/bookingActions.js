import axios from "axios";
import { Toast } from 'react-bootstrap';


export const showToast = (message, type = 'success') => {
  return (
    <Toast bg={type}>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};


export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/bookings/bookcar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    dispatch({ 
      type: "SHOW_TOAST", 
      payload: { message: "Your car booked successfully", type: "success" }
    });
    setTimeout(() => {
      window.location.href = '/userbookings'
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    dispatch({ 
      type: "SHOW_TOAST", 
      payload: { message: "Something went wrong", type: "danger" }
    });
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/bookings/getallbookings");
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    dispatch({ type: "LOADING", payload: false });
  }
};