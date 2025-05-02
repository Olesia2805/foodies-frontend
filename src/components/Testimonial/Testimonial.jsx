import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts.css';
import {
  testimonialContainerStyles,
  testimonialHeaderStyles,
  testimonialTitleStyles,
  testimonialQuoteStyles,
  testimonialAuthorStyles,
  quoteIconStyles,
  quoteContainerStyles,
  paginationContainerStyles,
  paginationDotStyles,
  paginationDotActiveStyles,
} from './Testimonial.styles';

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
    <div style={testimonialContainerStyles}>
      <p style={testimonialHeaderStyles}>{headerText}</p>
      <h2 style={testimonialTitleStyles}>{title}</h2>

      <img src={quoteIconSrc} alt="Quote" style={quoteIconStyles} />
      <div style={quoteContainerStyles}>
        <p style={testimonialQuoteStyles}>{activeTestimonial.quote}</p>
      </div>

      <p style={testimonialAuthorStyles}>{activeTestimonial.author}</p>

      <div style={paginationContainerStyles}>
        {testimonials.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              ...paginationDotStyles,
              ...(index === activeIndex ? paginationDotActiveStyles : {}),
            }}
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
