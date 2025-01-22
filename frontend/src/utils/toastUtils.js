
export const showToast = (dispatch, message, type = 'success') => {
  dispatch({ 
    type: "SHOW_TOAST", 
    payload: { message, type }
  });
};