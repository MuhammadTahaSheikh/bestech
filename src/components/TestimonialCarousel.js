import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import LazyImage from './LazyImage';

const TestimonialCarouselContainer = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%);
  position: relative;
  overflow: hidden;
  min-height: 80vh;
  display: flex;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.spacing['3xl']} 0;
    min-height: 70vh;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing['2xl']} 0;
    min-height: 60vh;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.xl} 0;
    min-height: 50vh;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: ${props => props.theme.spacing.lg} 0;
    min-height: 45vh;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.2) 0%, transparent 50%);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.08) 50%, transparent 70%),
      linear-gradient(-45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%),
      radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.1) 0%, transparent 30%),
      radial-gradient(circle at 90% 90%, rgba(139, 92, 246, 0.1) 0%, transparent 30%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.md};
  background: linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const SectionSubtitle = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  line-height: 1.6;
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: visible;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl} ${props => props.theme.spacing['3xl']} ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.md} ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.md};
  }
`;

const TestimonialCard = styled(motion.div)`
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 8px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  width: 100%;
  min-height: 500px;
  margin: 0;
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    border-radius: 24px;
    pointer-events: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    min-height: 450px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    min-height: 600px;
    overflow: visible;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-height: 550px;
    border-radius: 20px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    min-height: 500px;
    border-radius: 16px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 1.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1.5rem;
    min-height: 300px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1.25rem;
    min-height: 250px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1rem;
    min-height: 200px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(59, 130, 246, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
    z-index: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 280px;
    height: 280px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 200px;
    height: 200px;
  }
`;

const CustomerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const TestimonialSection = styled.div`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  position: relative;
  z-index: 10;
  min-height: 500px;
  border-radius: 0 24px 24px 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    border-radius: 0 24px 24px 0;
    pointer-events: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 2.5rem;
    min-height: 450px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 2rem;
    min-height: 400px;
    border-radius: 0 0 24px 24px;
    
    &::before {
      border-radius: 0 0 24px 24px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1.75rem;
    min-height: 350px;
    border-radius: 0 0 20px 20px;
    
    &::before {
      border-radius: 0 0 20px 20px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1.5rem;
    min-height: 300px;
    border-radius: 0 0 16px 16px;
    
    &::before {
      border-radius: 0 0 16px 16px;
    }
  }
`;

const CustomerName = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.8rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.6rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.4rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: 1.2rem;
  }
`;

const CustomerTitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  font-weight: 400;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.95rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.9rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: 0.85rem;
  }
`;

const TestimonialContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: white;
  margin-bottom: 2rem;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.01em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  flex: 1;
  overflow-y: auto;
  max-height: 200px;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.15rem;
    line-height: 1.75;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
    line-height: 1.7;
    max-height: 150px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
    line-height: 1.6;
    max-height: 120px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: 0.95rem;
    line-height: 1.5;
    max-height: 100px;
  }
`;

const TestimonialRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 1rem;
`;

const Star = styled.span`
  color: #fbbf24;
  font-size: 1.3rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.3));
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  position: relative;
  z-index: 20;
`;

const NavigationButton = styled.button`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(59, 130, 246, 0.6);
  border-radius: 12px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    0 0 10px rgba(59, 130, 246, 0.2);
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%);
    border-color: rgba(59, 130, 246, 0.9);
    color: white;
    transform: scale(1.05);
    box-shadow: 
      0 6px 20px rgba(59, 130, 246, 0.4),
      0 0 15px rgba(139, 92, 246, 0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(59, 130, 246, 0.2);
    color: rgba(96, 165, 250, 0.3);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 48px;
    height: 48px;
    font-size: 1.1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 42px;
    height: 42px;
    font-size: 0.95rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }
`;


const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      text: "Honestly, I was skeptical at first but these guys really know their stuff. They fixed our entire IT mess and saved us a ton of money. The team was always available when we needed them and explained everything in simple terms.",
      author: "Nic Christofis",
      position: "IT Manager, Local Business Solutions",
      avatar: "/client1.jpeg",
      rating: 5
    },
    {
      text: "Working with this team was amazing! They built our custom software exactly how we wanted it, and it actually works better than we expected. The whole process was smooth and they kept us updated every step of the way.",
      author: "Voila",
      position: "Project Manager, Tech Startup",
      avatar: "/client2.jpeg",
      rating: 5
    },
    {
      text: "I can't recommend them enough! They helped us get our security up to standard and made sure we were compliant. The team was professional, patient, and really understood our needs. Worth every penny!",
      author: "Negin",
      position: "Operations Director, Healthcare Services",
      avatar: "/client3.jpeg",
      rating: 5
    },
    {
      text: "These guys are absolutely amazing! They took our outdated systems and completely modernized everything. The transformation was incredible and our productivity has skyrocketed. Couldn't be happier!",
      author: "Xavien",
      position: "IT Director, Tech Solutions Inc",
      avatar: "/client4.jpeg",
      rating: 5
    },
    {
      text: "The digital transformation initiative led by BestechSolz Vision revolutionized our customer experience. Their innovative solutions and dedicated support team delivered results that exceeded our KPIs by 60%.",
      author: "James Wilson",
      position: "CEO, E-commerce Solutions Inc",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5
    },
    {
      text: "Working with BestechSolz Vision was a game-changer for our startup. Their technical expertise and strategic guidance helped us scale from 10 to 1000+ users in just 6 months.",
      author: "Emily Johnson",
      position: "Founder & CTO, TechStart Innovations",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };


  console.log('Current testimonial:', testimonials[currentIndex]);
  console.log('Current index:', currentIndex);

  return (
    <TestimonialCarouselContainer>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover how we've helped businesses transform their technology landscape
        </SectionSubtitle>

        <CarouselWrapper>
          <TestimonialCard
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ImageSection>
              <ImageContainer>
                <LazyImage
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  borderRadius="20px"
                  placeholder="Loading image..."
                  onError={() => {
                    // Fallback to generated avatar
                    return `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonials[currentIndex].author)}&size=300&background=3b82f6&color=ffffff&bold=true`;
                  }}
                />
              </ImageContainer>
            </ImageSection>
            
            <TestimonialSection>
              <CustomerName>{testimonials[currentIndex].author}</CustomerName>
              <CustomerTitle>{testimonials[currentIndex].position}</CustomerTitle>
              <TestimonialText>"{testimonials[currentIndex].text}"</TestimonialText>
              <TestimonialRating>
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i}>★</Star>
                ))}
              </TestimonialRating>
              
              <NavigationContainer>
                <NavigationButton
                  onClick={prevTestimonial}
                  disabled={currentIndex === 0}
                >
                  <FaChevronLeft />
                </NavigationButton>
                <NavigationButton
                  onClick={nextTestimonial}
                  disabled={currentIndex === testimonials.length - 1}
                >
                  <FaChevronRight />
                </NavigationButton>
              </NavigationContainer>
            </TestimonialSection>
          </TestimonialCard>
        </CarouselWrapper>
      </Container>
    </TestimonialCarouselContainer>
  );
};

export default TestimonialCarousel;
