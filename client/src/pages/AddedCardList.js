import React, { useEffect, useRef, useState } from 'react';
import { AddedCard, BasicButton, Modal } from '../components';
import { useSelector } from 'react-redux';
import { ic_add, ic_caution } from '../assets';
import { css, styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';

const AddedCardList = () => {
  const navigate = useNavigate();

  const cards = useSelector((state) => state.capsule.capsule.cards);

  // 드롭다운 메뉴
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handlAddBtn = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = (isOpen) => {
    setIsModalOpen(isOpen);
    setIsDropdownOpen(false);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 특정 카드 삭제
  const isDeleteMode = useSelector((state) => state.capsule.delete_mode);

  useEffect(() => {
    // 드롭다운 외부 영역 클릭 이벤트
    const clickDropdownOutside = (e) => {
      // 드롭다운이 열려 있고, dropdownRef를 클릭한게 아니라면 드롭다운 닫기
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', clickDropdownOutside);

    // 삭제모드가 활성화 됐을 때 스타일 조정
    console.log(isDeleteMode);
    if (isDeleteMode) {
      //   if (deleteModeRef.current) {
      //     deleteModeRef.current.style.zIndex = 1000;
      //   }
      // } else {
      //   if (deleteModeRef.current) {
      //     deleteModeRef.current.style.zIndex = ''; // Reset to default value or remove this line
      //   }
    }

    return () => {
      // 언마운트
      document.removeEventListener('mousedown', clickDropdownOutside);
    };
  }, [isDropdownOpen, dropdownRef, isDeleteMode]);

  return (
    <div className="container" onMouseDown={(e) => e.preventDefault()}>
      <Modal icSrc={ic_caution} isOpen={isModalOpen} close={handleModalClose}>
        <div>
          카드는 최대 5장까지 <br /> 추가 가능합니다.
        </div>
      </Modal>
      <h2>새로운 캡슐 보내기</h2>
      <p style={{ fontSize: '1rem', margin: '0.5rem 0 2.5rem' }}>최대 5장</p>
      <MappedDiv cardNum={cards.length}>
        {cards.map((card) => (
          <AddedCard
            key={card.card_id}
            cardId={card.card_id}
            image={card.image}
            text={card.text}
          />
        ))}
      </MappedDiv>
      {isDropdownOpen ? (
        <Dropdown
          ref={dropdownRef}
          cardsLength={cards.length}
          handleModal={handleModal}
        />
      ) : (
        <BasicButton isCardAddBtn={true} onClick={handlAddBtn}>
          <img src={ic_add}></img>
        </BasicButton>
      )}
      <BasicButton
        buttonWidth="311px"
        verticalPadding="1.25rem"
        fontSize="1.25rem"
        onClick={() => navigate('/send')}
      >
        다음 단계로 &gt;
      </BasicButton>
      {isDeleteMode && <DeleteModeContainer></DeleteModeContainer>}
    </div>
  );
};

export default AddedCardList;

const MappedDiv = styled.div`
  width: 100%;
  height: 72%;

  ${(props) =>
    props.cardNum === 1 &&
    css`
      display: flex;
      justify-content: center;
    `}

  ${(props) =>
    props.cardNum === 2 &&
    css`
      position: relative;
      & > div:nth-of-type(1) {
        position: absolute;
        left: 0%;
        transform: rotate(-7deg);
      }
      & > div:nth-of-type(2) {
        position: absolute;
        top: 10%;
        right: 3%;
      }
    `}

    ${(props) =>
    props.cardNum === 3 &&
    css`
      position: relative;
      & > div:nth-of-type(1) {
        position: absolute;
        top: -3%;
        left: -8%;
        transform: rotate(-7deg);
      }
      & > div:nth-of-type(2) {
        position: absolute;
        top: 4%;
        right: -3%;
        transform: rotate(12deg);

        .delete-btn {
          top: -3%;
          left: -3%;
        }
      }
      & > div:nth-of-type(3) {
        position: absolute;
        top: 13%;
        left: 8%;
      }
    `}

    ${(props) =>
    props.cardNum === 4 &&
    css`
      position: relative;
      & > div:nth-of-type(1) {
        position: absolute;
        top: -5%;
        left: -13%;
        transform: rotate(-2deg);
      }
      & > div:nth-of-type(2) {
        position: absolute;
        top: 0%;
        right: -7%;
        transform: rotate(7deg);
      }
      & > div:nth-of-type(3) {
        position: absolute;
        top: 5%;
        left: 0%;
        transform: rotate(-8deg);
      }

      & > div:nth-of-type(4) {
        position: absolute;
        top: 13%;
        right: 8%;
      }
    `}

    ${(props) =>
    props.cardNum === 5 &&
    css`
      position: relative;
      & > div:nth-of-type(1) {
        position: absolute;
        top: -5%;
        left: -3%;
        transform: rotate(-11deg);
        z-index: -1;
      }
      & > div:nth-of-type(2) {
        position: absolute;
        top: 0%;
        right: -23%;
        transform: rotate(13deg);
      }
      & > div:nth-of-type(3) {
        position: absolute;
        top: 8%;
        left: -25%;
        transform: rotate(-17deg);
      }

      & > div:nth-of-type(4) {
        position: absolute;
        top: 11%;
        right: -2%;
        transform: rotate(10deg);
      }

      & > div:nth-of-type(5) {
        position: absolute;
        top: 18%;
        right: 8%;
      }
    `}
`;

const DeleteModeContainer = styled.div`
  width: inherit;
  height: inherit;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
`;
