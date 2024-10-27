import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carusel.scss';
import Image from 'next/image';

interface CarouselProps {
  images: string[];
}

const activeDotStyle = {
  color: '#e74c3c', // Цвет активной точки
};

const inactiveDotStyle = {
  color: '#3498db', // Цвет неактивной точки
};

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/';

const Carousel: FC<CarouselProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    customPaging: (index: number) => {
      return (
        <button style={index === 0 ? activeDotStyle : inactiveDotStyle}>
          {index + 1}
        </button>
      );
    },
  };

  return (
    <div className="carouselContainer">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="slideCarusel">
            <Image
              quality={100}
              height={200}
              width={200}
              src={`${API}${image}`}
              alt={`Slide ${index + 1}`}
              className="imageSlide"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
