import React, { useEffect, useRef } from 'react';
import '../styles/style-card.css';
import useCardDeleteHandler from '../hooks/useCardDeleteHandler';
import { useSelector } from 'react-redux';

const AddedCard = ({ cardId, image, text }) => {
  const cardRef = useRef(null);
  const { handlers } = useCardDeleteHandler(cardId);
  const deleteMode = useSelector((state) => state.capsule.delete_mode);

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
      className="card-container"
      ref={cardRef}
      onClick={() => handlers.onClick()}
      onMouseDown={() => handlers.onMouseDown(cardRef.current)}
      onMouseUp={() => handlers.onMouseUp(cardRef.current)}
      onTouchStart={() => handlers.onTouchStart(cardRef.current)}
      onTouchEnd={() => handlers.onTouchEnd(cardRef.current)}
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
