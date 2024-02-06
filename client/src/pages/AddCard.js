import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicButton, EditCard } from '../components/index';
import { useDispatch } from 'react-redux';
import { write } from '../redux/modules/capsule';
import '../styles/style-addcard.css';

const AddCard = () => {
  const [card, setCard] = useState();
  const ref = useRef();
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardState = (cardData, cardRef) => {
    setCard(cardData);
    ref.current = cardRef;
    if (cardData.image) {
      ref.current.style.border = 'none';
      setIsEmpty(false);
    }
  };

  const handleAddBtn = () => {
    if (card.image) {
      // 유효성 검사
      dispatch(write(card));
      navigate('/create/addedlist');
    } else {
      setIsEmpty(true);
      ref.current.style.border = '1px solid red';
    }
  };

  return (
    <div className="addcard-container">
      <h2>새로운 캡슐 보내기</h2>
      <div className="edit-card-div">
        {isEmpty ? (
          <div className="alert-txt">사진을 추가해주세요</div>
        ) : (
          <div style={{ visibility: 'hidden' }}>사진을 추가해주세요</div>
        )}
        <EditCard onCardValueChange={handleCardState} ref={ref} />
      </div>
      <BasicButton
        onClick={handleAddBtn}
        // onClick={cardContentValidate(card, ref.current)}
        buttonWidth="311px"
        verticalPadding="1.25rem"
        fontSize="1.25rem"
        className="add-btn"
      >
        추가하기
      </BasicButton>
    </div>
  );
};

export default AddCard;
