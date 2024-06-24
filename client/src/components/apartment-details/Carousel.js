import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <h2>Карусель зображень</h2>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
