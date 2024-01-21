import * as api from '../../api/Axios';

const initialState = {
  token: '',
  email: '',
  name: '선아',
  capsules: [
    {
      id: 0,
      writer: '',
      writtendate: '',
      arrivaldate: '',
      cards: [],
      music: '',
      theme: '',
      isChecked: false,
    },
  ],
  uncheckedCount: 0,
  loading: {
    POST_USER_REQUEST: false,
  },
};

// Action Types
const UPDATE_TOKEN = 'user/UPDATE_TOKEN';
const LOGOUT = 'user/LOGOUT';
const UPDATE_CHECK = 'user/UPDATE_CHECK';
const COUNT_UNCHECKED = 'user/COUNT_UNCHECKED';

const POST_USER_REQUEST = 'user/POST_USER_REQUEST';
const POST_USER_SUCCESS = 'user/POST_USER_SUCCESS';
const POST_USER_FAILURE = 'user/POST_USER_FAILURE';

// Action Creators
export const update_token = (token) => ({
  type: UPDATE_TOKEN,
  token,
});
export const logout = () => ({
  type: LOGOUT,
});

export const update_check = (id) => ({
  type: UPDATE_CHECK,
  id,
});

export const count_unchecked = () => ({ type: COUNT_UNCHECKED });

export const post_user_request = () => ({ type: POST_USER_REQUEST });
export const post_user_success = (res) => ({
  type: POST_USER_SUCCESS,
  res,
});
export const post_user_failure = (err) => ({
  type: POST_USER_FAILURE,
  payload: err,
  error: true,
});

// Thunk Creators
export const post_user = () => async (dispatch) => {
  dispatch(post_user_request());
  try {
    const res = await api.postUser();
    dispatch(post_user_success(res));
  } catch (err) {
    dispatch(post_user_failure(err.message));
  }
};

// Reducer
function user(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case LOGOUT:
      return initialState;

    case UPDATE_CHECK:
      return {
        ...state,
        capsules: state.capsules.map((capsule) =>
          capsule.id === action.id ? { ...capsule, isChecked: true } : capsule
        ),
      };
    case COUNT_UNCHECKED:
      const uncheckedCount = state.capsules.filter(
        (capsule) => !capsule.isChecked
      ).length;
      return {
        ...state,
        uncheckedCount,
      };
    case POST_USER_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          POST_USER_REQUEST: true,
        },
      };
    case POST_USER_SUCCESS:
      return {
        ...state,
        token: action.res.data.memberID,
        email: action.res.data.email,
        name: action.res.data.name,
        capsules: action.res.data.capsules,
      };
    case POST_USER_FAILURE: {
      return {
        ...state,
        loading: {
          ...state.loading,
          POST_USER_REQUEST: false,
        },
        error: action.payload,
      };
    }
    default:
      return state;
  }
}

export default user;
