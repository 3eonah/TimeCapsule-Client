import React, { useEffect, useRef, useState } from 'react';
import '../../styles/style-modal.css';
import { ic_close } from '../../assets';

const Modal = (props) => {
  const { isOpen, close, icSrc, isSendModal } = props;

  const [visible, setVisible] = useState(isOpen);
  const [onAnimation, setOnAnimation] = useState(false);
  const [closeBtnName, setCloseBtnName] = useState('close-btn');
  const [icName, setIcName] = useState('modal-ic-div');

  useEffect(() => {
    setVisible(isOpen);

    // 모달창이 열려있다가 닫힐 때
    if (visible && !isOpen) {
      setOnAnimation(true);
      setTimeout(() => setOnAnimation(false), 500);
    }

    // /send페이지의 모달일 때
    if (isSendModal) {
      setCloseBtnName('close-btn send');
      setIcName('send-modal-ic');
    }
    return () => {
      setVisible(false);
    };
  }, [visible, isOpen]);

  if (!visible && !onAnimation) return null;

  return (
    <div className={isSendModal ? 'modal-container' : ''}>
      <div className={isOpen ? 'modal-content open' : 'modal-content'}>
        <button className={closeBtnName} onClick={close}>
          <img src={ic_close} />
        </button>
        <div className={icName}>
          <img src={icSrc} />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
