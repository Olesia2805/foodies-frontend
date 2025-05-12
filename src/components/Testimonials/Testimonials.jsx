import { useState, useEffect, useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import axiosInstance from '../../api/axiosInstance';
import Container from '../Container/Container';
import styles from './Testimonials.module.css';
import Icon from '../Icon/Icon';
import toast from 'react-hot-toast';

const AUTOPLAY_INTERVAL = 20000;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const fetchTestimonials = async () => {
    try {
      const response = await axiosInstance.get('/testimonials?page=1');
      const fetchedTestimonials = response.data.data.map((item) => ({
        id: item._id,
        text: item.testimonial,
        author: item.user?.name?.toUpperCase() || 'ANONYMOUS',
      }));
      setTestimonials(fetchedTestimonials);
    } catch (error) {
      toast.error('Error fetching testimonials');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const goToSlide = useCallback((index) => {
    setActiveIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  }, []);

  const goToNextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => {
      const next = (prevIndex + 1) % testimonials.length;
      if (swiperRef.current) {
        swiperRef.current.slideTo(next);
      }
      return next;
    });
  }, [testimonials]);

  useEffect(() => {
    const interval = setInterval(goToNextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [goToNextSlide]);

  if (testimonials.length === 0) return null;

  return (
    <section className={styles.testimonials}>
      <Container>
        <div className={styles.content}>
          <p className={styles.subtitle}>What our customer say</p>
          <h2 className={styles.title}>TESTIMONIALS</h2>
          <Icon name="quotes" className={styles.quoteMark} />

          <Swiper
            className={styles.slider}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            slidesPerView={1}
            allowTouchMove={true}
          >
            {testimonials.map(({ id, text, author }) => (
              <SwiperSlide key={id}>
                <p className={styles.testimonialText}>{text}</p>
                <p className={styles.testimonialAuthor}>{author}</p>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.pagination}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.paginationDot} ${
                  index === activeIndex ? styles.active : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
