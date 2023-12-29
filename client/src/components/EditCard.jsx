import React, { useEffect, useRef, useState } from 'react';
import '../styles/style-card.css';
import { ic_addphoto, ic_editphoto } from '../assets/index';

const EditCard = ({ onCardValueChange }) => {
  const [cardData, setCardData] = useState({
    image: null,
    text: '',
  });

  // 이미지 삽입 제어
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardData({
          ...cardData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // 텍스트 제어
  const textRef = useRef(null);
  const handleTextChange = () => {
    setCardData({
      ...cardData,
      text: textRef.current.value,
    });
  };

  // 부모 컴포넌트로 image state와 textRef의 value를 전달
  const handleCardValueChange = () => {
    onCardValueChange(cardData);
  };

  const icBoxRef = useRef(null);
  useEffect(() => {
    const textareaStyle = textRef.current.style;
    const icBoxStyle = icBoxRef.current.style;
    // 이미지가 업로드 됐으면
    if (cardData.image !== null) {
      // 자동으로 텍스트 영역 포커스
      textRef.current.focus();
      textareaStyle.background = 'transparent';
      textareaStyle.color = '#fff';

      icBoxStyle.transform = 'translate(0%,0%)';
      icBoxStyle.top = '0%';
      icBoxStyle.left = '80%';
    }
    handleCardValueChange();
  }, [cardData]);

  return (
    <div className="card-container">
      <textarea
        className="txt-area"
        placeholder="최대 120자"
        maxLength={120}
        ref={textRef}
        onChange={handleTextChange}
      ></textarea>
      <div
        className="img-area"
        style={{ backgroundImage: `url(${cardData.image})` }}
      >
        {cardData.image ? <div className="gradient-area"></div> : null}
        <label className="ic-box" htmlFor="imageFileInput" ref={icBoxRef}>
          {cardData.image ? (
            <img src={ic_editphoto} className="ic-editphoto" />
          ) : (
            <img src={ic_addphoto} />
          )}
        </label>
        <input
          type="file"
          id="imageFileInput"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default EditCard;
