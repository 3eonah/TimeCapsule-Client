import React, { useEffect, useRef, useState } from 'react';
import '../styles/style-send.css';
import { BasicButton, Modal } from '../components';
import {
  ic_confirm,
  ic_colored_check,
  ic_empty_check,
  ic_add,
  ic_delete,
  ic_close,
  ic_deletelist,
} from '../assets/';
import { useDispatch, useSelector } from 'react-redux';
import { post_capsule, update_arrivalinfo } from '../redux/modules/capsule';
import useValidate from '../hooks/useValidate';
import { useNavigate } from 'react-router-dom';

const Send = () => {
  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 날짜 인풋 제어
  const [dateValues, setDateValues] = useState({
    year: '',
    month: '',
    day: '',
  });
  const handleDateChange = (name, val) => {
    setDateValues({
      ...dateValues,
      [name]: val,
    });
  };

  // 나에게 보내기 버튼 제어
  const [isSendToMe, setIsSendToMe] = useState(false);
  const meRef = useRef(null);
  // TODO: 접속한 사용자 아이디 져오기
  const { email } = useSelector((state) => state.user);

  const handleSendToMeBtn = () => {
    if (!isSendToMe) {
      setIsSendToMe(true);
      if (meRef) {
        meRef.current.style.color = '#363636';
        meRef.current.style.border = '1px solid rgba(255, 255, 255, 0.0)';
      }
      // receivers에 내 아이디 추가
      setAddedList([...addedList, email]);
    } else {
      setIsSendToMe(false);
      if (meRef) {
        meRef.current.style.color = '#fff';
        meRef.current.style.border = '1px solid rgba(255, 255, 255, 0.4)';
      }
      // receivers에 내 아이디 삭제
      const updatedList = addedList.filter((id) => id !== email);
      setAddedList(updatedList);
    }
  };

  // 아이디 입력 제어
  const [inputValue, setInputValue] = useState('');
  const [addedList, setAddedList] = useState([]);
  const handleAdd = () => {
    if (inputValue.trim() !== '') {
      setAddedList([...addedList, inputValue]);
      setInputValue('');
    }
  };
  const handleDelete = (idx) => {
    const updatedList = [...addedList];
    updatedList.splice(idx, 1); //idx 1개 삭제
    setAddedList(updatedList);
  };

  // 카드 전송 상세 정보 전송
  // 도착 날짜, 작성자 정보
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(
    today.getMonth() + 1
  ).padStart(2, 0)}.${String(today.getDate()).padStart(2, 0)}`;
  const writerInfo = useSelector((state) => ({
    writer: state.user.name,
    writtendate: formattedDate,
  }));

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const inputRef = useRef([]);
  const [isSendClicked, setIsSendClicked] = useState(false);
  const { capsule } = useSelector((state) => state.capsule);
  // 유효성 검사 custom hooks
  const { handleDateInput, handleListInput } = useValidate(
    {
      dateValues,
      addedList,
    },
    inputRef.current
  );

  const navigate = useNavigate();
  const sendData = () => {
    // 올바른 입력값이나 입력값이 있을 때
    const isDateValidate = handleDateInput();
    const isAddedListValidate = handleListInput();
    if (isDateValidate && isAddedListValidate) {
      // 캡슐 도착 날짜, 전송자 정보 업데이트
      dispatch(update_arrivalinfo(dateValues, writerInfo));

      dispatch(post_capsule(addedList, token));
    } else {
      console.log('something is invalidate');
    }
    handleModalClose();
    setIsSendClicked(true);
  };

  useEffect(() => {
    if (isSendClicked) {
      if (dateValues.year.length === 4 && Number(dateValues.year) > 2023) {
        inputRef.current[0].style.outline = 'none';
      }
      if (Number(dateValues.month) > 0 && Number(dateValues.month) <= 12) {
        console.log('month deteced', Number(dateValues.month));
        inputRef.current[1].style.outline = 'none';
      }
      if (Number(dateValues.day) > 0 && Number(dateValues.day) <= 31) {
        console.log('day deteced', Number(dateValues.day));
        inputRef.current[2].style.outline = 'none';
      }
      if (addedList.length > 0 || isSendToMe) {
        inputRef.current[3].style.outline = 'none';
      }
    }
  }, [isSendClicked, dateValues, addedList]);

  return (
    <div className="container padded">
      <h2>전송 상세 설정</h2>
      <div className="form-div">
        <p className="form-div-title">언제 도착하길 바라나요?</p>
        <div className="input-div">
          <input
            type="text"
            ref={(element) => (inputRef.current[0] = element)}
            value={dateValues.year}
            onChange={(e) => handleDateChange('year', e.target.value)}
          />
          <span>년</span>
        </div>
        <div className="input-div">
          <input
            type="text"
            ref={(element) => (inputRef.current[1] = element)}
            value={dateValues.month}
            onChange={(e) => handleDateChange('month', e.target.value)}
          />
          <span>월</span>
          <input
            type="text"
            ref={(element) => (inputRef.current[2] = element)}
            value={dateValues.day}
            onChange={(e) => handleDateChange('day', e.target.value)}
          />
          <span>일</span>
        </div>
      </div>
      <div className="form-div">
        <p className="form-div-title">누구에게 보낼 건가요?</p>
        <div className="sendme-btn-div">
          <button ref={meRef} onClick={() => handleSendToMeBtn()}>
            나에게 보내기
          </button>
          {isSendToMe ? (
            <img src={ic_colored_check}></img>
          ) : (
            <img src={ic_empty_check}></img>
          )}
        </div>
        <div className="add-div">
          <input
            type="text"
            placeholder="카카오계정 (이메일) 입력"
            ref={(element) => (inputRef.current[3] = element)}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={() => handleAdd()}>
            <img src={ic_add}></img>
          </button>
        </div>
        <ul className="added-list">
          {addedList.map((val, idx) => (
            <li key={idx}>
              {val !== email && (
                <>
                  <div className="li-txt">{val}</div>
                  <button onClick={() => handleDelete(idx)}>
                    <img src={ic_deletelist} alt="Delete" />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <BasicButton
        buttonWidth="100%"
        fontSize="1.25rem"
        verticalPadding="1.3rem"
        onClick={() => setIsModalOpen(true)}
      >
        전송하기
      </BasicButton>
      <Modal
        icSrc={ic_confirm}
        isOpen={isModalOpen}
        close={handleModalClose}
        isSendModal={true}
      >
        <div>
          <div className="send-modal-txt">
            전송 완료 후에는 내용 수정 및 재확인이 불가능합니다. <br />
            <br />
            그래도 전송하시겠습니까?
          </div>
          <div className="send-modal-btn-div">
            <button onClick={() => setIsModalOpen(false)}>돌아가기</button>
            <button onClick={() => sendData()}>전송하기</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Send;
