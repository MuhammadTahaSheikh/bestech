import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaCode, 
  FaMobile, 
  FaCloud, 
  FaShieldAlt, 
  FaUsers, 
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft
} from 'react-icons/fa';
import WebsiteAuditModal from '../components/WebsiteAuditModal';
import TestimonialCarousel from '../components/TestimonialCarousel';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: white;
`;

const HeroSection = styled.section`
  padding: 6rem 0;
  background: #0f172a;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin: 2rem;
  border-radius: 24px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
`;

const TechGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.5;
`;

const FloatingShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const Shape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  filter: blur(1px);
`;

const CodeLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0.1;
`;

const CodeLine = styled(motion.div)`
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #3b82f6;
  white-space: nowrap;
`;

const HeroContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
    padding: 2rem;
  }
`;

const HeroLeft = styled.div`
  flex: 1;
  max-width: 600px;
  z-index: 3;
`;

const HeroRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 3;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    order: -1;
  }
`;

const HeroText = styled.div`
  color: white;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #60a5fa 30%, #a78bfa 70%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.03em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  max-width: 500px;
`;

const HighlightText = styled.span`
  color: #60a5fa;
  font-weight: 600;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(Link)`
  background: linear-gradient(135deg, #3730a3 0%, #581c87 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 25px rgba(55, 48, 163, 0.4),
    0 4px 12px rgba(88, 28, 135, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 15px 35px rgba(55, 48, 163, 0.5),
      0 8px 20px rgba(88, 28, 135, 0.4);
    background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
  }
`;

const PrimaryButtonAsButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  border: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 15px 35px rgba(55, 48, 163, 0.5),
      0 8px 20px rgba(88, 28, 135, 0.4);
    background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: white;
  padding: 1rem 2rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }
`;

const TechVisualization = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 300px;
    height: 300px;
  }
`;

const CentralHub = styled(motion.div)`
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 50%;
    opacity: 0.8;
  }
`;

const HubIcon = styled.div`
  font-size: 3rem;
  color: white;
  z-index: 2;
  position: relative;
`;

const OrbitingElement = styled(motion.div)`
  position: absolute;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
`;

const ElementIcon = styled.div`
  font-size: 1.5rem;
  color: #10b981;
`;

const ConnectionLine = styled(motion.div)`
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  opacity: 0.3;
`;

const TechCard = styled(motion.div)`
  position: absolute;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  min-width: 120px;
`;

const ServicesSection = styled.section`
  padding: 6rem 0;
  background: 
    linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ServicesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 4rem;
  justify-content: center;
  align-items: stretch;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 16px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
`;

const ServiceIcon = styled.div`
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.8rem;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), transparent);
    border-radius: 16px;
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 0.8rem;
  line-height: 1.3;
`;

const ServiceDescription = styled.p`
  color: rgba(0, 0, 0, 0.5);
  line-height: 1.5;
  font-size: 0.95rem;
`;

const StatsSection = styled.section`
  padding: 6rem 0;
  background: white;
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  align-items: center;
`;

const StatCard = styled(motion.div)`
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e9ecef;
  }
`;

const StatNumber = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
`;

const StatSubLabel = styled.p`
  font-size: 0.9rem;
  color: #9ca3af;
  margin: 0.25rem 0 0 0;
`;

const RatingCard = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const RatingNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-bottom: 0.5rem;
`;

const Star = styled.span`
  color: #fbbf24;
  font-size: 1.2rem;
`;

const PlatformName = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
`;

const AwardCard = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const AwardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #1f2937;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

const AwardTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
`;

const AwardPlatform = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
`;


const CTA = styled(motion.div)`
  background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%);
  padding: 4rem 2rem;
  border-radius: 24px;
  text-align: center;
  color: white;
  margin: 4rem 0;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 20px 40px rgba(30, 58, 138, 0.4),
    0 8px 16px rgba(55, 48, 163, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.95;
    position: relative;
    z-index: 1;
  }
`;


const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log('Opening modal...');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const services = [
    {
      icon: <FaCode />,
      title: 'Custom Software Development',
      description: 'Full-stack application development using modern frameworks, microservices architecture, and agile methodologies for scalable enterprise solutions.'
    },
    {
      icon: <FaMobile />,
      title: 'Mobile & Cross-Platform Development',
      description: 'Native iOS/Android and cross-platform mobile applications with enterprise security, offline capabilities, and seamless integration.'
    },
    {
      icon: <FaCloud />,
      title: 'Cloud Computing & DevOps Cloud Solutions',
      description: 'AWS, Azure, and GCP cloud solutions with automated CI/CD pipelines, containerization, and infrastructure as code implementation.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'IT Security & Risk Management',
      description: 'Comprehensive cybersecurity services including penetration testing, vulnerability assessments, compliance audits, and security design.'
    },
    {
      icon: <FaUsers />,
      title: 'IT Strategy & IT Development Consulting',
      description: 'Technology roadmap development, system architecture design, IT governance, and digital transformation strategy for enterprise organizations.'
    },
    {
      icon: <FaRocket />,
      title: 'System Integration & Modernization',
      description: 'Legacy system modernization, API development, data migration, and enterprise system integration using industry best practices.'
    }
  ];

  const stats = [
    { 
      type: 'card',
      number: '500+', 
      label: 'Customers',
      subLabel: '13 countries'
    },
    { 
      type: 'award',
      title: 'Global Leader 2023',
      platform: 'Clutch',
      icon: '#1'
    },
    { 
      type: 'rating',
      number: '4.9',
      platform: 'G2',
      stars: 5
    },
    { 
      type: 'rating',
      number: '4.8',
      platform: 'Trustpilot',
      stars: 5
    },
    { 
      type: 'rating',
      number: '4.9',
      platform: 'Clutch',
      stars: 5
    }
  ];


  return (
    <>
    <HomeContainer>
      <HeroSection>
        <HeroBackground />
        <TechGrid />
        <FloatingShapes>
          <Shape
            style={{ top: '20%', left: '10%', width: '60px', height: '60px' }}
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <Shape
            style={{ top: '60%', right: '15%', width: '40px', height: '40px' }}
            animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <Shape
            style={{ bottom: '30%', left: '20%', width: '80px', height: '80px' }}
            animate={{ y: [0, -15, 0], rotate: [0, 90, 180] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </FloatingShapes>
        <CodeLines>
          <CodeLine
            style={{ top: '10%', left: '5%' }}
            animate={{ x: [0, 100, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            &lt;div&gt;IT Solutions&lt;/div&gt;
          </CodeLine>
          <CodeLine
            style={{ top: '30%', right: '10%' }}
            animate={{ x: [0, -80, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            function innovate() &#123; return "future"; &#125;
          </CodeLine>
          <CodeLine
            style={{ bottom: '20%', left: '15%' }}
            animate={{ x: [0, 120, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            const technology = "cutting-edge";
          </CodeLine>
        </CodeLines>
        <HeroContent>
          <HeroLeft>
            <HeroText>
              <HeroTitle
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Premier IT Solutions
                <br />
                <HighlightText>Empowering Digital Future</HighlightText>
              </HeroTitle>
              <HeroSubtitle
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                BestechSolz Vision delivers cutting-edge IT infrastructure, software development, 
                and technology consulting services that drive innovation and operational excellence 
                for enterprise clients worldwide.
              </HeroSubtitle>
              <HeroButtons
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <PrimaryButtonAsButton onClick={openModal}>
                  Get Free Website Audit
                  <FaArrowRight />
                </PrimaryButtonAsButton>
                <SecondaryButton to="/portfolio">
                  View Our Work
                </SecondaryButton>
              </HeroButtons>
            </HeroText>
          </HeroLeft>
          <HeroRight>
            <TechVisualization>
              <CentralHub
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  rotate: 360
                }}
                transition={{ 
                  scale: { duration: 0.8, delay: 0.6 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear", delay: 1 }
                }}
              >
                <HubIcon>
                  <FaRocket />
                </HubIcon>
              </CentralHub>
              
              <OrbitingElement
                style={{ top: '10%', left: '50%', transform: 'translateX(-50%)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.8 },
                  scale: { duration: 0.8, delay: 0.8 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                }}
              >
                <ElementIcon><FaCode /></ElementIcon>
              </OrbitingElement>
              
              <OrbitingElement
                style={{ top: '50%', right: '10%', transform: 'translateY(-50%)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: [0, 10, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 1.0 },
                  scale: { duration: 0.8, delay: 1.0 },
                  x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                }}
              >
                <ElementIcon><FaCloud /></ElementIcon>
              </OrbitingElement>
              
              <OrbitingElement
                style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, 10, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 1.2 },
                  scale: { duration: 0.8, delay: 1.2 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                }}
              >
                <ElementIcon><FaShieldAlt /></ElementIcon>
              </OrbitingElement>
              
              <OrbitingElement
                style={{ top: '50%', left: '10%', transform: 'translateY(-50%)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: [0, -10, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 1.4 },
                  scale: { duration: 0.8, delay: 1.4 },
                  x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                }}
              >
                <ElementIcon><FaMobile /></ElementIcon>
              </OrbitingElement>

              <TechCard
                style={{ top: '5%', right: '5%' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <div>1000+ Projects</div>
              </TechCard>
              
              <TechCard
                style={{ bottom: '5%', left: '5%' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                <div>99.9% Uptime</div>
              </TechCard>
            </TechVisualization>
          </HeroRight>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsContainer>
          <StatsGrid>
            {stats.map((stat, index) => {
              if (stat.type === 'card') {
                return (
                  <StatCard
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <StatNumber>{stat.number}</StatNumber>
                    <StatLabel>{stat.label}</StatLabel>
                    <StatSubLabel>{stat.subLabel}</StatSubLabel>
                  </StatCard>
                );
              } else if (stat.type === 'award') {
                return (
                  <AwardCard
                    key={stat.title}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <AwardIcon>{stat.icon}</AwardIcon>
                    <AwardTitle>{stat.title}</AwardTitle>
                    <AwardPlatform>{stat.platform}</AwardPlatform>
                  </AwardCard>
                );
              } else if (stat.type === 'rating') {
                return (
                  <RatingCard
                    key={stat.platform}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <RatingNumber>{stat.number}</RatingNumber>
                    <StarsContainer>
                      {[...Array(stat.stars)].map((_, i) => (
                        <Star key={i}>★</Star>
                      ))}
                    </StarsContainer>
                    <PlatformName>{stat.platform}</PlatformName>
                  </RatingCard>
                );
              }
              return null;
            })}
          </StatsGrid>
        </StatsContainer>
      </StatsSection>

      <ServicesSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Services
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Comprehensive IT solutions tailored to your business needs
          </SectionSubtitle>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </ServicesSection>

      <TestimonialCarousel />

      <Container>
        <CTA
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Start Your Project?</h2>
          <p>Let's discuss how we can help transform your business with technology.</p>
          <PrimaryButton to="/appointment">
            Schedule a Meeting
            <FaArrowRight />
          </PrimaryButton>
        </CTA>
      </Container>
    </HomeContainer>

    {/* Website Audit Modal */}
    <WebsiteAuditModal 
      isOpen={isModalOpen} 
      onClose={closeModal} 
    />
    </>
  );
};

export default Home;
