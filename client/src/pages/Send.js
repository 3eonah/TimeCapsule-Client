import React, { useRef, useState } from 'react';
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
  const myId = '1234'; // 접속한 사용자 아이디 가져오기
  const handleSendToMeBtn = () => {
    if (!isSendToMe) {
      setIsSendToMe(true);
      if (meRef) {
        meRef.current.style.color = '#363636';
        meRef.current.style.border = '1px solid rgba(255, 255, 255, 0.0)';
      }
      // receivers에 내 아이디 추가
      setAddedList([...addedList, myId]);
    } else {
      setIsSendToMe(false);
      if (meRef) {
        meRef.current.style.color = '#fff';
        meRef.current.style.border = '1px solid rgba(255, 255, 255, 0.4)';
      }
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

  // 입력값 서버 전송 제어
  const sendData = () => {
    console.log(dateValues, addedList);
  };

  return (
    <div className="container padded">
      <h2>전송 상세 설정</h2>
      <div className="form-div">
        <p className="form-div-title">언제 도착하길 바라나요?</p>
        <div className="input-div">
          <input
            type="text"
            value={dateValues.year}
            onChange={(e) => handleDateChange('year', e.target.value)}
          />
          <span>년</span>
        </div>
        <div className="input-div">
          <input
            type="text"
            value={dateValues.month}
            onChange={(e) => handleDateChange('month', e.target.value)}
          />
          <span>월</span>
          <input
            type="text"
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
            placeholder="카카오톡 아이디 입력"
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
              {val !== myId && (
                <>
                  {val}
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
