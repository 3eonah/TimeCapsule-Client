import axios from 'axios';
import { instance } from '../../api/Axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
  token: '',
  email: '',
  name: '',
  // TODO: 실제 데이터 받을 땐 빈 배열이어야 됨
  capsules: [
    {
      id: 0,
      writer: '솔룩스',
      writtendate: '',
      arrivaldate: '',
      cards: [],
      music: '',
      theme: 'default',
      isChecked: false,
    },
    {
      id: 1,
      writer: '솔룩스',
      writtendate: '',
      arrivaldate: '',
      cards: [],
      music: '',
      theme: 'retro',
      isChecked: false,
    },
    {
      id: 2,
      writer: '솔룩스',
      writtendate: '',
      arrivaldate: '',
      cards: [],
      music: '',
      theme: 'newyear',
      isChecked: false,
    },
    {
      id: 3,
      writer: '솔룩스',
      writtendate: '',
      arrivaldate: '',
      cards: [],
      music: '',
      theme: 'newyear',
      isChecked: true,
    },
  ],
  uncheckedCount: 0,
  loading: {
    POST_USER_REQUEST: false,
    PUT_CHECK_REQUEST: false,
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

const PUT_CHECK_REQUEST = 'user/PUT_CHECK_REQUEST'; // 캡슐 체크 상태 변경 요청
const PUT_CHECK_SUCCESS = 'user/PUT_CHECK_SUCCESS'; // 캡슐 체크 상태 변경 성공
const PUT_CHECK_FAILURE = 'user/PUT_CHECK_FAILURE'; // 캡슐 체크 상태 변경 실패

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

export const put_check_request = () => ({ type: PUT_CHECK_REQUEST });
export const put_check_success = () => ({
  type: PUT_CHECK_SUCCESS,
});
export const put_check_failure = (err) => ({
  type: PUT_CHECK_FAILURE,
  payload: err,
  error: true,
});

// Thunk Creators
export const post_user = (token) => async (dispatch, getState) => {
  dispatch(post_user_request());
  try {
    const res = await instance.post(
      '/users',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200 && res.data.result.name && res.data.result.email) {
      dispatch(post_user_success(res));
    } else {
      console.log(res.data.result);
    }
  } catch (err) {
    dispatch(post_user_failure(err.message));
  }
};

export const put_check = (token, id) => async (dispatch) => {
  dispatch(put_check_request());
  try {
    const res = await instance.put(
      `/capsule/${id}`,
      {
        readState: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      dispatch(put_check_success());
      dispatch(update_check(id));
    }
  } catch (err) {
    dispatch(put_check_failure(err.message));
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
      if (state.capsules.length === 0) {
        return {
          ...state,
          uncheckedCount: 0,
        };
      } else {
        const uncheckedCount = state.capsules.filter(
          (capsule) => !capsule.isChecked
        ).length;
        return {
          ...state,
          uncheckedCount,
        };
      }

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
        email: action.res.data.result.email,
        name: action.res.data.result.name,
        capsules: action.res.data.result.capsules,
      };
    case POST_USER_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          POST_USER_REQUEST: false,
        },
        error: action.payload,
      };

    case PUT_CHECK_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          PUT_CHECK_REQUEST: true,
        },
      };

    case PUT_CHECK_SUCCESS:
      return {
        ...state,
        loading: {
          ...state.loading,
          PUT_CHECK_REQUEST: false,
        },
      };

    case PUT_CHECK_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          PUT_CHECK_REQUEST: false,
        },
        error: action.payload,
      };

    default:
      return state;
  }
}

export default user;
