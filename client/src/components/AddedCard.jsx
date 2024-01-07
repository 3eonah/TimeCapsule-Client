import React, { useEffect, useRef, useState } from 'react';
import '../styles/style-card.css';
import useCardDeleteHandler from '../hooks/useCardDeleteHandler';
import { useSelector } from 'react-redux';

const AddedCard = ({ cardId, image, text }) => {
  const cardRef = useRef(null);
  const { handlers } = useCardDeleteHandler(cardId);
  const deleteMode = useSelector((state) => state.capsule.delete_mode);

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    console.log('is Delete Mode:', deleteMode);
    const clickOutside = (e) => {
      handlers.handleClickOutside(cardRef.current, e.target);
    };
    document.addEventListener('mousedown', clickOutside);
    document.addEventListener('touchdown', clickOutside);
  }, [deleteMode]);

  return (
    <div
      className={`card-container ${isSelected ? 'selected' : ''}`}
      ref={cardRef}
      onClick={() => handlers.onClick()}
      onMouseDown={() => {
        setIsSelected(true);
        handlers.onMouseDown(cardRef.current);
      }}
      onMouseUp={() => {
        setIsSelected(false);
        handlers.onMouseUp(cardRef.current);
      }}
      onTouchStart={() => {
        setIsSelected(true);
        handlers.onTouchStart(cardRef.current);
      }}
      onTouchEnd={() => {
        setIsSelected(false);
        handlers.onTouchEnd(cardRef.current);
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
