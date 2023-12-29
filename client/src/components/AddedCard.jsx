import React, { useEffect, useRef } from 'react';
import '../styles/style-card.css';
import useCardDeleteHandler from '../hooks/useCardDeleteHandler';
import { useSelector } from 'react-redux';

const AddedCard = ({ cardId, image, text }) => {
  const cardRef = useRef(null);
  const { handleDeleteBtn, handleClickOutside } = useCardDeleteHandler(cardId);
  const deleteMode = useSelector((state) => state.capsule.delete_mode);

  useEffect(() => {
    console.log('is Delete Mode:', deleteMode);
    const clickOutside = (e) => {
      handleClickOutside(cardRef.current, e.target);
    };
    document.addEventListener('mousedown', clickOutside);
  }, [deleteMode]);

  return (
    <div
      className="card-container"
      ref={cardRef}
      onClick={() => {
        handleDeleteBtn(cardRef.current);
      }}
    >
      <div className="txt-area" style={{ background: 'transparent' }}>
        {text}
      </div>
      <div className="img-area" style={{ backgroundImage: `url(${image})` }}>
        <div className="gradient-area"></div>
      </div>
    </div>
  );
};

export default AddedCard;
