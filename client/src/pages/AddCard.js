import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicButton, EditCard } from '../components/index';
import { useDispatch } from 'react-redux';
import { write } from '../redux/modules/capsule';

const AddCard = () => {
  const [card, setCard] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCardState = (cardData) => {
    setCard(cardData);
  };

  const handleAddBtn = () => {
    dispatch(write(card));
    navigate('/create/addedlist');
  };

  return (
    <div className="container">
      <h2>새로운 캡슐 보내기</h2>
      <div style={{ margin: '4rem 0' }}>
        <EditCard onCardValueChange={handleCardState} />
      </div>
      <BasicButton
        onClick={handleAddBtn}
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
