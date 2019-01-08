export const initialState = {
  loading: false,
  error: null,
  success: null,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'STATUS_REPLACE': {
      return {
        ...state,
        loading: action.loading || false,
        error: action.error || null,
        success: action.success || null,
      };
    }
    default:
      return state;
  }
}
