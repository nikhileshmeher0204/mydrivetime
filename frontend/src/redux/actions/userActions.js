import axios from "axios";
import { showToast } from '../../utils/toastUtils';

export const userLogin = (reqObj) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.post('/api/users/login', reqObj);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    dispatch({ type: 'LOADING', payload: false });
    showToast(dispatch, 'Login successful', 'success');
    setTimeout(() => {
      if (response.data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
    showToast(dispatch, 'Invalid credentials', 'danger');
  }
};

export const userRegister = (reqObj) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    await axios.post('/api/users/register', reqObj);
    dispatch({ type: 'LOADING', payload: false });
    showToast(dispatch, 'Registration successful', 'success');
    setTimeout(() => {
      window.location.href = '/login';
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
    showToast(dispatch, 'Something went wrong', 'danger');
  }
};