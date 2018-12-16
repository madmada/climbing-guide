import Store from '../store/rocks';

export const initialState = Store;

export default function rockReducer(state = initialState, action) {
  switch (action.type) {
    case 'ROCKS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'ROCKS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        rocks: action.data,
      };
    }
    default:
      return state;
  }
}
