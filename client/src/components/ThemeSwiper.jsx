// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import '../styles/style-swiper.css';

export default ({ themes, onClick, currentThemeIndex }) => {
  return (
    <Swiper
      spaceBetween={24}
      slidesPerView={'auto'}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      centeredSlides={false}
      className="mySwiper"
    >
      {themes.map((theme, index) => {
        return (
          <SwiperSlide
            onClick={() => {
              onClick(index);
            }}
          >
            <div
              className={`theme-item ${
                currentThemeIndex === index ? 'active-button' : ''
              }`}
            >
              <img className="theme-icon" src={theme.icon} alt={''} />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
