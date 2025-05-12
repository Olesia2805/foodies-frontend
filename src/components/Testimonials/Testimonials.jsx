import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import axiosInstance from '../../api/axiosInstance';
import Container from '../Container/Container';
import styles from './Testimonials.module.css';
import Icon from '../Icon/Icon';
import toast from 'react-hot-toast';

const AUTOPLAY_INTERVAL = 20000;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
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

    fetchTestimonials();
  }, []);

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
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: AUTOPLAY_INTERVAL, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
          >
            {testimonials.map(({ id, text, author }) => (
              <SwiperSlide key={id}>
                <p className={styles.testimonialText}>{text}</p>
                <p className={styles.testimonialAuthor}>{author}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
