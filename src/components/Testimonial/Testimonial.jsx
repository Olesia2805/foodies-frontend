import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts.css';
import './Testimonial.css';

const Testimonial = ({
  testimonials,
  headerText = 'What our customer say',
  title = 'TESTIMONIALS',
  quoteIconSrc,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = index => {
    setActiveIndex(index);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div className="testimonial-container">
      <p className="testimonial-header">{headerText}</p>
      <h2 className="testimonial-title">{title}</h2>

      <img src={quoteIconSrc} alt="Quote" className="quote-icon" />
      <div className="quote-container">
        <p className="testimonial-quote">{activeTestimonial.quote}</p>
      </div>

      <p className="testimonial-author">{activeTestimonial.author}</p>

      <div className="pagination-container">
        {testimonials.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`pagination-dot ${index === activeIndex ? 'pagination-dot-active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

Testimonial.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }),
  ).isRequired,
  headerText: PropTypes.string,
  title: PropTypes.string,
  quoteIconSrc: PropTypes.string.isRequired,
};

export default Testimonial;
