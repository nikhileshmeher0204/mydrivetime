import axios from 'axios';
import { showToast } from '../../utils/toastUtils';

  
export const getAllCars=()=>async dispatch=>{

    dispatch({type: 'LOADING' , payload:true})

    try {
        const response = await axios.get('/api/cars/getallcars', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        dispatch({ type: 'GET_ALL_CARS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false });
    }

}

export const addCar = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
  
    try {
      await axios.post('/api/cars/addcar', reqObj, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
  
      dispatch({ type: 'LOADING', payload: false });
      dispatch({ 
        type: "SHOW_TOAST", 
        payload: { message: "New car added successfully", type: "success" }
      });
      setTimeout(() => {
        window.location.href = '/admin';
      }, 500);
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOADING', payload: false });
      dispatch({ 
        type: "SHOW_TOAST", 
        payload: { message: "Something went wrong", type: "danger" }
      });
    }
  };

  export const editCar = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      await axios.post('/api/cars/editcar', reqObj);
      dispatch({ type: 'LOADING', payload: false });
      showToast(dispatch, 'Car details updated successfully', 'success');
      setTimeout(() => {
        window.location.href = '/admin';
      }, 500);
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOADING', payload: false });
      showToast(dispatch, 'Something went wrong', 'danger');
    }
  };

  export const deleteCar = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      await axios.post('/api/cars/deletecar', reqObj);
      dispatch({ type: 'LOADING', payload: false });
      showToast(dispatch, 'Car deleted successfully', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOADING', payload: false });
      showToast(dispatch, 'Something went wrong', 'danger');
    }
  };