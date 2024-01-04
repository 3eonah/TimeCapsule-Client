import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ic_delete } from '../assets';
import { delete_off, delete_on, remove } from '../redux/modules/capsule';

const useCardDeleteHandler = (cardId) => {
  const dispatch = useDispatch();
  const deleteMode = useSelector((state) => state.capsule.delete_mode);

  // long press 참고자료: https://spacejelly.dev/posts/how-to-detect-long-press-gestures-in-javascript-events-in-react/
  const timerRef = useRef();
  const isLongPress = useRef(false);

  const handleContextMenu = (event) => {
    // Prevent the default context menu (right-click menu)
    event.preventDefault();
  };

  const startPressTimer = (cardRef) => {
    // long press가 아닌 경우
    isLongPress.current = false;
    window.addEventListener('contextmenu', handleContextMenu);

    // long press인 경우
    timerRef.current = setTimeout(() => {
      // 0.7초가 지났을 때
      isLongPress.current = true;
      handleDeleteBtn(cardRef);
    }, 700);
  };

  const handleOnClick = () => {
    // long press event가 아닌 경우 click 이벤트 방지
    if (isLongPress.current) return;
  };

  const handleOncMouseDown = (cardRef) => {
    console.log('onMouseDown');
    startPressTimer(cardRef);
  };

  const handleOnMouseUp = (cardRef) => {
    console.log('onMouseUp');
    clearTimeout(timerRef.current);
    window.removeEventListener('contextmenu', handleContextMenu);
  };

  const handelOnTouchStart = (cardRef) => {
    console.log('onTouchStart');
    startPressTimer(cardRef);
  };

  const handleOnTouchEnd = (cardRef) => {
    console.log('onTouchEnd');
    clearTimeout(timerRef.current);
    window.removeEventListener('contextmenu', handleContextMenu);
  };

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

  return {
    handlers: {
      handleClickOutside,
      onClick: handleOnClick,
      onMouseDown: handleOncMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handelOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
    },
  };
};

export default useCardDeleteHandler;
