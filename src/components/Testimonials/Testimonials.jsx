import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../api/axiosInstance'; // шлях залежить від структури
import Container from '../Container/Container';
import styles from './Testimonials.module.css';
import Icon from '../Icon/Icon';
import toast from 'react-hot-toast';

const AUTOPLAY_INTERVAL = 20000;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

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
  }, []);

  const goToNextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
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

          <div className={styles.slider}>
            <p className={styles.testimonialText}>
              {testimonials[activeIndex].text}
            </p>

            <p className={styles.testimonialAuthor}>
              {testimonials[activeIndex].author}
            </p>

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
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
