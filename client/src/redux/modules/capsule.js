import * as api from '../../api/Axios';

const initialState = {
  delete_mode: false,
  capsule: {
    writer: '',
    writtendate: '',
    arrivaldate: '',
    cards: [],
    music: '',
    theme: '',
    isChecked: false,
  },
  loading: {
    POST_CAPSULE: false,
  },
};

// Action Types
const WRITE = 'capsule/WRITE'; // 새로운 카드 작성
const DELETE_ON = 'capsule/DELETE_ON'; //카드 삭제 모드 켜기
const DELETE_OFF = 'capsule/DELETE_OFF'; //카드 삭제 모드 끄기
const REMOVE = 'capsule/REMOVE'; // 카드 삭제
const UPDATE_MUSIC = 'capsule/update_music'; // 음악 상태 변경
const SEND = 'capsule/SEND'; // 새로운 캡슐 전송

const POST_CAPSULE_REQUEST = 'capsule/POST_CAPSULE_REQUEST'; // 캡슐 서버에 전송 요청
const POST_CAPSULE_SUCCESS = 'capsule/POST_CAPSULE_SUCCESS'; // 캡슐 서버에 전송 성공
const POST_CAPSULE_FAILURE = 'capsule/POST_CAPSULE_FAILURE'; // 캡슐 서버에 전송 실패

// Action Creators
let card_id = 0; // write이 호출될 때 마다 1씩 증가
export const write = (card) => ({
  type: WRITE,
  card: {
    card_id: card_id++,
    image: card.image,
    text: card.text,
  },
});

export const delete_on = () => ({
  type: DELETE_ON,
});

export const delete_off = () => ({
  type: DELETE_OFF,
});

export const update_music = (music) => ({
  type: UPDATE_MUSIC,
  music,
});

export const remove = (id) => ({
  type: REMOVE,
  id,
});

export const send = ({ cards, music_url, info, theme }) => ({
  type: SEND,
  capsule: {
    writer: info.writer,
    writtendate: info.writtendate,
    arrivaldate: info.arrivaldate,
    cards,
    music_url,
    theme,
    isChecked: false,
  },
});

export const post_capsule_request = () => ({ type: POST_CAPSULE_REQUEST });
export const post_capsule_success = (payload) => ({
  type: POST_CAPSULE_SUCCESS,
  payload,
});
export const post_capsule_failure = (err) => ({
  type: POST_CAPSULE_FAILURE,
  payload: err,
  error: true,
});
// Thunk Creators
export const post_capsule = () => async (dispatch, getState) => {
  dispatch(post_capsule_request()); // 요청 시작을 알림

  try {
    const { capsule } = getState();
    const res = await api.postCapsule(capsule);
    dispatch(post_capsule_success(res));
  } catch (err) {
    dispatch(post_capsule_failure(err));
  }
};

// Reducer
function capsule(state = initialState, action) {
  switch (action.type) {
    case WRITE:
      return {
        ...state,
        capsule: {
          ...state.capsule,
          cards: [...state.capsule.cards, action.card],
        },
      };
    case DELETE_ON:
      return {
        ...state,
        delete_mode: true,
      };

    case DELETE_OFF:
      return {
        ...state,
        delete_mode: false,
      };

    case UPDATE_MUSIC:
      return {
        ...state,
        capsule: {
          ...state.capsule,
          music: action.music,
        },
      };

    case REMOVE:
      const updatedCards = state.capsule.cards.filter(
        (card) => card.card_id !== action.id
      );
      return {
        ...state,
        capsule: {
          ...state.capsule,
          cards: updatedCards,
        },
      };
    case SEND:
      return {
        ...state,
        capsule: action.capsule,
      };
    case POST_CAPSULE_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          POST_CAPSULE: true, // 요청 시작
        },
      };
    case POST_CAPSULE_SUCCESS:
      return {
        ...initialState,
        loading: {
          ...state.loading,
          POST_CAPSULE: false, // 요청 완료
        },
      };
    case POST_CAPSULE_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          POST_CAPSULE: false, // 요청 완료
        },
        error: action.payload,
      };
    default:
      return state;
  }
}

export default capsule;
