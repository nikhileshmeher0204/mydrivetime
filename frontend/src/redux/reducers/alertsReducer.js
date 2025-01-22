const initialData = {
    loading: false,
    toast: null
  };
  
  export const alertsReducer = (state = initialData, action) => {
    switch (action.type) {
      case 'LOADING':
        return {
          ...state,
          loading: action.payload
        }
      case 'SHOW_TOAST':
        return {
          ...state,
          toast: action.payload
        }
      case 'HIDE_TOAST':
        return {
          ...state,
          toast: null
        }
      default:
        return state
    }
  };