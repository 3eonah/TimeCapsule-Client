import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ic_delete } from '../assets';
import { delete_off, delete_on, remove } from '../redux/modules/capsule';

const useCardDeleteHandler = (cardId) => {
  const dispatch = useDispatch();
  const deleteMode = useSelector((state) => state.capsule.delete_mode);

  const handleDeleteBtn = (ref) => {
    dispatch(delete_on());

    if (ref) {
      // 버튼 노드 생성
      const deleteElement = document.createElement('div');
      deleteElement.className = 'delete-btn';
      const icElement = document.createElement('img');
      icElement.src = ic_delete;
      deleteElement.appendChild(icElement);

      // 버튼 이벤트 핸들러
      deleteElement.addEventListener('click', () => {
        dispatch(remove(cardId));
        dispatch(delete_off());
      });

      // 카드에 버튼 노드 추가
      ref.appendChild(deleteElement);
      ref.style.zIndex = '900';
    }
  };

  const handleClickOutside = (ref, target) => {
    if (deleteMode && ref && !ref.contains(target)) {
      const deleteBtn = ref.querySelector('.delete-btn');
      if (deleteBtn) {
        ref.removeChild(deleteBtn);
        ref.style.zIndex = '';
      }
      dispatch(delete_off());
    }
  };

  return { handleDeleteBtn, handleClickOutside };
};

export default useCardDeleteHandler;
