import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';

const Dropdown = forwardRef(({ cardsLength, handleModal }, ref) => {
  const navigate = useNavigate();
  const handleAddCard = () => {
    if (cardsLength < 5) navigate('/create/add');
    else {
      handleModal(true);
    }
  };
  return (
    <DropdownContainer ref={ref}>
      <li onClick={handleAddCard}>카드 추가</li>
      <li onClick={() => navigate('/create/music')}>음악 삽입</li>
    </DropdownContainer>
  );
});

export default Dropdown;

const DropdownContainer = styled.ul`
  background: rgba(255, 255, 255, 0.35);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.1px);
  -webkit-backdrop-filter: blur(10.1px);

  width: 149px;
  // position: absolute;
  // bottom: 17%;
  // right: 10%;
  align-self: flex-end;
  margin-bottom: 1.3rem;

  display: flex;
  flex-direction: column;

  list-style: none;
  z-index: 1000;
  overflow: hidden;

  li {
    padding: 1.5rem 2rem;
    box-sizing: border-box;
    text-align: center;
    font-weight: 700;
  }

  li:hover {
    background: rgba(255, 255, 255, 0.55);
    cursor: pointer;
  }

  & > li:nth-of-type(1) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.85);
  }
`;
