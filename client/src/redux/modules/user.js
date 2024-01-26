import axios from 'axios';

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
const PUT_CHECK_SUCCESS = 'user/POST_CAPSULE_SUCCESS'; // 캡슐 체크 상태 변경 성공
const PUT_CHECK_FAILURE = 'user/POST_CAPSULE_FAILURE'; // 캡슐 체크 상태 변경 실패

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

export const put_check_reqeust = () => ({ type: PUT_CHECK_REQUEST });
export const put_check_success = () => ({
  type: PUT_CHECK_SUCCESS,
});
export const put_check_failure = (err) => ({
  type: PUT_CHECK_FAILURE,
  payload: err,
  error: true,
});

// Thunk Creators
export const post_user = (token) => async (dispatch) => {
  dispatch(post_user_request());
  try {
    const res = await axios.post(
      'http://3.38.80.77:8080/user',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(post_user_success(res));
  } catch (err) {
    dispatch(post_user_failure(err.message));
  }
};

export const put_check = (token, id) => async (dispatch) => {
  dispatch(put_check_reqeust);

  try {
    // TODO: 엔드포인트 /capsule/id 로 요청해야 하는지
    // 아니면 user에서 받은 캡슐 id를 request body에 포함해야 하는지 논의 필요
    const res = axios.put(
      `http://3.38.80.77:8080/capsule/${id}`,
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
        email: action.res.data.email,
        name: action.res.data.name,
        capsules: action.res.data.capsules,
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
