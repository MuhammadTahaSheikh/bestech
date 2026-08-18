import React, { useState, useMemo, memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import LazyImage from './LazyImage';
import { loadTestimonials } from '../utils/testimonialsStorage';

const TestimonialCarouselContainer = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: #ffffff;
  border-top: 1px solid rgba(18, 19, 22, 0.06);
  border-bottom: 1px solid rgba(18, 19, 22, 0.06);

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing['3xl']} 0;
  }
`;

const Container = styled.div`
  max-width: ${props => props.theme.layout.containerMaxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.layout.containerPadding};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 0.75rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.dark};
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1rem;
  color: rgba(18, 19, 22, 0.55);
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CarouselWrapper = styled.div`
  position: relative;
  max-width: 760px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 2rem;
  background: #ffffff;
  border: 1px solid rgba(18, 19, 22, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(18, 19, 22, 0.04);
  min-height: 320px;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem 1.25rem;
    min-height: 280px;
  }
`;

const AvatarWrap = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 2px solid rgba(33, 11, 204, 0.12);
  flex-shrink: 0;
`;

const TestimonialText = styled.p`
  font-size: 1.0625rem;
  line-height: 1.75;
  color: rgba(18, 19, 22, 0.72);
  margin-bottom: 1.5rem;
  font-style: italic;
  max-width: 580px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const CustomerName = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.25rem;
`;

const CustomerTitle = styled.p`
  font-size: 0.875rem;
  color: rgba(18, 19, 22, 0.45);
  margin-bottom: 1rem;
`;

const TestimonialRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;

const Star = styled.span`
  color: #fbbf24;
  font-size: 0.95rem;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.75rem;
`;

const NavigationButton = styled.button`
  background: #ffffff;
  border: 1px solid rgba(18, 19, 22, 0.1);
  border-radius: 10px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(33, 11, 204, 0.06);
    border-color: rgba(33, 11, 204, 0.25);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = useMemo(() => loadTestimonials(), []);
  const current = testimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <TestimonialCarouselContainer>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          What Our Clients Say
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Trusted by teams who expect clarity, quality, and results.
        </SectionSubtitle>

        <CarouselWrapper>
          <TestimonialCard key={currentIndex}>
            <AvatarWrap>
              <LazyImage
                src={current.avatar}
                alt={current.author}
                width="100%"
                height="100%"
                objectFit="cover"
                borderRadius="50%"
                placeholder=""
              />
            </AvatarWrap>
            <TestimonialText>"{current.text}"</TestimonialText>
            <CustomerName>{current.author}</CustomerName>
            <CustomerTitle>{current.position}</CustomerTitle>
            <TestimonialRating>
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i}>★</Star>
              ))}
            </TestimonialRating>
          </TestimonialCard>

          <NavigationContainer>
            <NavigationButton
              onClick={prevTestimonial}
              disabled={currentIndex === 0}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </NavigationButton>
            <NavigationButton
              onClick={nextTestimonial}
              disabled={currentIndex === testimonials.length - 1}
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </NavigationButton>
          </NavigationContainer>
        </CarouselWrapper>
      </Container>
    </TestimonialCarouselContainer>
  );
};

export default memo(TestimonialCarousel);
