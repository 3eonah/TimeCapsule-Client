import React, { useEffect, useState } from 'react';
import themeImage1 from '../assets/theme_1.png';
import themeImage2 from '../assets/theme_2.png';
import themeImage3 from '../assets/theme_3.png';
import themeImage4 from '../assets/theme_4.png';
import themeImage5 from '../assets/theme_5.png';
import themeIcon1 from '../assets/theme_icon_1.png';
import themeIcon2 from '../assets/theme_icon_2.png';
import themeIcon3 from '../assets/theme_icon_3.png';
import themeIcon4 from '../assets/theme_icon_4.png';
import themeIcon5 from '../assets/theme_icon_5.png';
import rightArrowRetro from '../assets/ ic_arrow_right_retro.svg';
import BasicButton from '../components/common/BasicButton';
import '../styles/style-theme.css';
import ThemeSwiper from '../components/ThemeSwiper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { update_theme } from '../redux/modules/capsule';

// 테마 리스트
const themes = [
  { name: '기본', icon: themeIcon1, image: themeImage1 },

  {
    name: '설날',
    icon: themeIcon3,
    image: themeImage3,
  },
  {
    name: '레트로 게임',
    icon: themeIcon4,
    image: themeImage4,
  },
  {
    name: '크리스마스',
    icon: themeIcon2,
    image: themeImage2,
  },
  {
    name: '어쩌면..진짜 과거',
    icon: themeIcon5,
    image: themeImage5,
  },
];

const ThemeList = () => {
  const navigate = useNavigate();

  const [styleClassName, setStyleClassName] = useState('');
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const handleThemeChange = (index) => {
    setCurrentThemeIndex(index);
    setStyleClassName(`theme-style-${index}`);
  };

  const currentTheme = themes[currentThemeIndex];

  // handle capsule theme redux store state
  const dispatch = useDispatch();
  const handleNextBtn = (currentThemeIndex) => {
    switch (currentThemeIndex) {
      case 0:
        dispatch(update_theme('default'));
        break;
      case 1:
        dispatch(update_theme('newyear'));
        break;
      case 2:
        dispatch(update_theme('retro'));
        break;
      default:
        return;
    }
    navigate('/create/add');
  };

  return (
    <div className={styleClassName}>
      <div className={`theme-list-container`}>
        <h2>새로운 캡슐 보내기</h2>
        <div>
          <h4>캡슐 테마를 선택해 주세요</h4>
          {/* --- 테마선택 스크롤 ----*/}
          <div className="theme-swiper">
            <ThemeSwiper
              onClick={handleThemeChange}
              themes={themes}
              currentThemeIndex={currentThemeIndex}
            />
          </div>

          {/* ---- 테마 미리보기 ---- */}
          <div className="theme-main-image">
            <p className="theme-title">{currentTheme.name}</p>
            <img
              className="theme-image"
              src={currentTheme.image}
              alt={currentTheme.name}
            />
          </div>
        </div>
        {/* ---- 다음 단계로 --- */}
        <div className="theme-button-container">
          {currentThemeIndex < 2 && (
            <BasicButton
              onClick={() => handleNextBtn(currentThemeIndex)}
              buttonWidth="100%"
              fontSize="20px"
            >
              <p>다음 단계로 &gt;</p>
            </BasicButton>
          )}
          {currentThemeIndex === 2 && (
            <div
              className={`next-button }`}
              onClick={() => handleNextBtn(currentThemeIndex)}
            >
              <p>
                다음 단계로 <img src={rightArrowRetro} alt="오른쪽 화살표" />
              </p>
            </div>
          )}

          {/* {currentThemeIndex === 4 && (
            <div className="next-button">
              <p>다음 단계로</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ThemeList;
