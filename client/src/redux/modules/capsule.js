import * as api from '../../api/Axios';

const initialState = {
  delete_mode: false,
  capsule: {
    writer: '',
    writtendate: '',
    arrivaldate: {
      year: '',
      month: '',
      day: '',
    },
    cards: [],
    music: '',
    theme: '',
  },
  loading: {
    POST_CAPSULE_REQUEST: false,
  },
};

// Action Types
const WRITE = 'capsule/WRITE'; // 새로운 카드 작성
const DELETE_ON = 'capsule/DELETE_ON'; //카드 삭제 모드 켜기
const DELETE_OFF = 'capsule/DELETE_OFF'; //카드 삭제 모드 끄기
const REMOVE = 'capsule/REMOVE'; // 카드 삭제
const UPDATE_MUSIC = 'capsule/update_music'; // 음악 상태 변경
const UPDATE_ARRIVALINFO = 'capsule/update_arrivalinfo'; // 도착 날짜, 받는 사람 변경

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

export const update_arrivalinfo = (date, writerInfo) => ({
  type: UPDATE_ARRIVALINFO,
  date,
  writerInfo,
});

export const post_capsule_request = () => ({ type: POST_CAPSULE_REQUEST });
export const post_capsule_success = (res) => ({
  type: POST_CAPSULE_SUCCESS,
  payload: res,
});
export const post_capsule_failure = (err) => ({
  type: POST_CAPSULE_FAILURE,
  payload: err,
  error: true,
});

// Thunk Creators - POST
export const post_capsule = (formData) => async (dispatch) => {
  dispatch(post_capsule_request()); // 요청 시작을 알림

  try {
    const res = await api.postCapsule(formData);
    dispatch(post_capsule_success(res));
  } catch (err) {
    dispatch(post_capsule_failure(err));
    throw err; // 컴포넌트단에서 에러를 조회할 수 있도록
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
    case UPDATE_ARRIVALINFO:
      return {
        ...state,
        capsule: {
          ...state.capsule,
          writer: action.writerInfo.writer,
          writtendate: action.writerInfo.writtendate,
          arrivaldate: {
            year: action.date.year,
            month: action.date.month,
            day: action.date.day,
          },
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

    case POST_CAPSULE_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          POST_CAPSULE_REQUEST: true, // 요청 시작
        },
      };
    case POST_CAPSULE_SUCCESS:
      return {
        ...initialState,
        loading: {
          ...state.loading,
          POST_CAPSULE_REQUEST: false, // 요청 완료
        },
        postedData: action.payload,
      };
    case POST_CAPSULE_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          POST_CAPSULE_REQUEST: false, // 요청 완료
        },
        error: action.payload,
      };
    default:
      return state;
  }
}

export default capsule;
