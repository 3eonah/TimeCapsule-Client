const initialState = {
  token: '',
  user_id: '',
  username: '선아',
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
};

// Action Types
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';
const GET_CAPSULES = 'user/GET_CAPSULES';
const UPDATE_CHECK = 'user/UPDATE_CHECK';
const COUNT_UNCHECKED = 'user/COUNT_UNCHECKED';

// Action Creators
export const login = (token, name) => ({
  type: LOGIN,
  token,
  name,
});

export const logout = () => ({
  type: LOGOUT,
});

export const get_capsules = (capsules) => ({
  type: GET_CAPSULES,
  capsules,
});

export const update_check = (id) => ({
  type: UPDATE_CHECK,
  id,
});

export const count_unchecked = () => ({ type: COUNT_UNCHECKED });

// Thunk Creators

// Reducer
function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        name: action.name,
      };
    case LOGOUT:
      return initialState;

    case GET_CAPSULES:
      return {
        ...state,
        capsules: action.capsules,
      };
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
    default:
      return state;
  }
}

export default user;
