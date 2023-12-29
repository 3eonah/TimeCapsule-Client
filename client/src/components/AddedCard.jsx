import React, { useEffect, useRef } from 'react';
import '../styles/style-card.css';
import { ic_delete } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { delete_off, delete_on, remove } from '../redux/modules/capsule';

const AddedCard = ({ cardId, image, text }) => {
  const cardRef = useRef(null);
  const mouseTimestamp = useRef(0);
  const deleteMode = useSelector((state) => state.capsule.delete_mode);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(delete_on());
    if (cardRef.current) {
      // 노드 생성
      const deleteElement = document.createElement('div');
      deleteElement.className = 'delete-btn';
      const icElement = document.createElement('img');
      icElement.src = ic_delete;
      deleteElement.appendChild(icElement);

      // 이벤트 핸들러
      deleteElement.addEventListener('click', () => {
        dispatch(remove(cardId));
        dispatch(delete_off());
      });

      // 카드에 노드 추가
      cardRef.current.appendChild(deleteElement);
      cardRef.current.style.zIndex = '900';
    }
  };

  const handleMouseEnter = () => {
    mouseTimestamp.current = Date.now();
    setTimeout(() => {
      const currentTimestamp = Date.now();
      if (currentTimestamp - mouseTimestamp.current >= 2000) {
        handleDelete();
      }
    }, 2000);
  };

  const handleMouseLeave = () => {
    clearTimeout();
  };
  useEffect(() => {
    // deletemode인 카드 영역 밖을 클릭했을 때
    const handleClickOutside = (e) => {
      if (
        deleteMode &&
        cardRef.current &&
        !cardRef.current.contains(e.target)
      ) {
        const deleteBtn = cardRef.current.querySelector('.delete-btn');
        if (deleteBtn) {
          cardRef.current.removeChild(deleteBtn);
          cardRef.current.style.zIndex = '';
        }
        dispatch(delete_off());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    // Cleanup: Reset when component unmounts
    return () => {
      clearTimeout();
      // document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="card-container"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
