import React, { useEffect, useRef, useState } from 'react';
import '../../styles/style-modal.css';
import { ic_close } from '../../assets';

const Modal = (props) => {
  const { isOpen, close, icSrc } = props;

  const [visible, setVisible] = useState(isOpen);
  const [onAnimation, setOnAnimation] = useState(false);

  useEffect(() => {
    setVisible(isOpen);

    // 모달창이 열려있다가 닫힐 때
    if (visible && !isOpen) {
      setOnAnimation(true);
      setTimeout(() => setOnAnimation(false), 500);
    }
    return () => {
      setVisible(false);
    };
  }, [visible, isOpen]);

  if (!visible && !onAnimation) return null;

  return (
    <div>
      <div className={isOpen ? 'modal-content open' : 'modal-content'}>
        <button className="close-btn" onClick={close}>
          <img src={ic_close} />
        </button>
        <div className="modal-ic-div">
          <img src={icSrc} />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
