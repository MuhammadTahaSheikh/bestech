import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { 
  FaRocket, 
  FaCode, 
  FaMobile, 
  FaUsers, 
  FaArrowRight,
  FaCheckCircle,
  FaDatabase,
  FaChartLine,
  FaRobot
} from 'react-icons/fa';
import WebsiteAuditModal from '../components/WebsiteAuditModal';
import TestimonialCarousel from '../components/TestimonialCarousel';
import TeamPreview from '../components/TeamPreview';
import { fetchCmsServices } from '../utils/cmsApi';

const HOME_SERVICE_ICON_MAP = {
  code: FaCode,
  rocket: FaRocket,
  mobile: FaMobile,
  users: FaUsers,
  database: FaDatabase,
  chart: FaChartLine,
  robot: FaRobot
};

const HERO_FEATURES = [
  'Custom software & web development',
  'Cloud infrastructure & IT consulting',
  'Dedicated support for enterprise clients'
];

function decorateHomeServiceFromApi(row) {
  const Icon = HOME_SERVICE_ICON_MAP[row.iconKey] || FaCode;
  return {
    id: row.slug || row.id || row.title,
    icon: <Icon />,
    title: row.title,
    description: row.description
  };
}

const HomeContainer = styled.div`
  min-height: 100vh;
  background: white;
`;

const HeroSection = styled.section`
  background: #0f172a;
  padding: 5rem 0 4.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 3rem 0 2.5rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
    padding: 0 ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const HeroEyebrow = styled.span`
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #60a5fa;
  margin-bottom: 1rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;

  span {
    color: #60a5fa;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.0625rem;
  line-height: 1.7;
  color: #94a3b8;
  margin-bottom: 1.75rem;
  max-width: 520px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeroFeatureList = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    align-items: center;
  }
`;

const HeroFeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.9375rem;
  color: #cbd5e1;

  svg {
    color: #3b82f6;
    flex-shrink: 0;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PrimaryButtonAsButton = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background: #1d4ed8;
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: #e2e8f0;
  padding: 0.875rem 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const HeroStatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 480px;
    margin: 0 auto;
  }
`;

const HeroStatCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem 1.25rem;
  text-align: center;
`;

const HeroStatNumber = styled.div`
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
  line-height: 1;
`;

const HeroStatLabel = styled.div`
  font-size: 0.8125rem;
  color: #94a3b8;
  line-height: 1.4;
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
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 15px 35px rgba(55, 48, 163, 0.5),
      0 8px 20px rgba(88, 28, 135, 0.4);
    background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
`;

const HERO_STATS = [
  { number: '500+', label: 'Projects Delivered' },
  { number: '99.9%', label: 'Uptime Guarantee' },
  { number: '13', label: 'Countries Served' },
  { number: '4.9', label: 'Client Rating' }
];

const ServicesSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
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
    background: rgba(255, 255, 255, 0.6);
    z-index: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.spacing['3xl']} 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing['2xl']} 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(1.875rem, 4vw, 2.5rem);
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: ${props => props.theme.spacing['3xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing['3xl']};
  align-items: stretch;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    gap: ${props => props.theme.spacing.sm};
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.88);
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

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 1.75rem;
    min-width: 260px;
    max-width: 320px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1.5rem;
    min-width: 240px;
    max-width: 300px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1.25rem;
    min-width: 100%;
    max-width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1rem;
  }
`;

const ServiceIcon = styled.div`
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.9);
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

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 65px;
    height: 65px;
    font-size: 1.6rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 60px;
    height: 60px;
    font-size: 1.4rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 55px;
    height: 55px;
    font-size: 1.3rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 0.8rem;
  line-height: 1.3;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: 0.95rem;
  }
`;

const ServiceDescription = styled.p`
  color: rgba(0, 0, 0, 0.5);
  line-height: 1.5;
  font-size: 0.95rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 0.9rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.85rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.8rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: 0.75rem;
  }
`;

const StatsSection = styled.section`
  padding: 6rem 0;
  background: white;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 4rem 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 3rem 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem 0;
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 0.75rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  align-items: stretch;
  padding: 1rem 0;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

const StatCard = styled(motion.div)`
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  min-height: 220px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e9ecef;
  }

  /* Hide customer count card on mobile */
  &.hide-on-mobile {
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      display: none;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 1.25rem;
    width: 180px;
    height: 150px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1rem;
    width: 160px;
    height: 140px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.875rem;
    width: 140px;
    height: 130px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 0.75rem;
    width: 120px;
    height: 120px;
  }
`;

const StatNumber = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 2.2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.8rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: 1.6rem;
  }
`;

const StatLabel = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 0.95rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.9rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.85rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: 0.8rem;
  }
`;

const StatSubLabel = styled.p`
  font-size: 0.9rem;
  color: #9ca3af;
  margin: 0.25rem 0 0 0;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 0.85rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.8rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: 0.7rem;
  }
`;

const RatingCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  background: white;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const PlatformIcon = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const AwardCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  background: white;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 3rem 1.5rem;
    margin: 3rem 0;

    h2 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 2.5rem 1.25rem;
    margin: 2.5rem 0;

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem 1rem;
    margin: 2rem 0;
    border-radius: 20px;

    h2 {
      font-size: 1.8rem;
    }

    p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 1.5rem 0.75rem;
    margin: 1.5rem 0;
    border-radius: 16px;

    h2 {
      font-size: 1.6rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;


// Counter component for mobile animation
const Counter = ({ end, duration = 2000, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const startCount = 0;
    const endCount = parseInt(end.replace('+', ''));

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startCount + (endCount - startCount) * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endCount);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span>{count}+</span>;
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cmsServices, setCmsServices] = useState(null);
  const statsRef = React.useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, threshold: 0.3 });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchCmsServices();
        if (!cancelled && Array.isArray(rows) && rows.length > 0) {
          setCmsServices(rows.map(decorateHomeServiceFromApi));
        }
      } catch {
        /* keep static services */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const services = [
    {
      icon: <FaCode />,
      title: 'Software Development',
      description: 'Custom software solutions built with modern technologies. From desktop applications to enterprise software, we create scalable and efficient solutions tailored to your business needs.'
    },
    {
      icon: <FaRocket />,
      title: 'Web Development',
      description: 'Responsive, modern websites and web applications. We build fast, SEO-optimized websites using the latest frameworks and technologies to enhance your online presence.'
    },
    {
      icon: <FaMobile />,
      title: 'App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android. We create user-friendly, feature-rich apps that engage your customers and drive business growth.'
    },
    {
      icon: <FaUsers />,
      title: 'Social Media Management',
      description: 'Complete social media strategy and management services. We help you build your brand, engage with your audience, and grow your social media presence across all platforms.'
    },
    {
      icon: <FaDatabase />,
      title: 'CRM Solutions',
      description: 'Customer Relationship Management systems to streamline your business processes. We implement and customize CRM solutions to improve customer satisfaction and sales efficiency.'
    },
    {
      icon: <FaChartLine />,
      title: 'Graphic Design',
      description: 'Creative visual solutions including logos, branding, marketing materials, and UI/UX design. We create compelling visuals that represent your brand and attract customers.'
    },
    {
      icon: <FaRobot />,
      title: 'AI Bot Development',
      description: 'Intelligent chatbots and AI-powered solutions to automate customer service, improve user experience, and streamline business operations with cutting-edge AI technology.'
    }
  ];

  const homepageServices =
    cmsServices && cmsServices.length > 0 ? cmsServices : services;

  // Function to get platform icon
  const getPlatformIcon = (platform) => {
    const iconMap = {
      'G2': '/icons/46D5A65F-973A-4EBC-BA61-33FCA8CB8DBD.png',
      'Trustpilot': '/icons/4229BD35-6CD4-44EE-BB47-A6B62E0AFE9B.png',
      'Clutch': '/icons/54C18EC2-8827-4474-83D7-0AEE57E3E2AF.png'
    };
    return iconMap[platform] || null;
  };

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
        <HeroContent>
          <div>
            <HeroEyebrow>Trusted IT Partner</HeroEyebrow>
            <HeroTitle>
              Premier IT Solutions for <span>Modern Business</span>
            </HeroTitle>
            <HeroSubtitle>
              Bestech Vision delivers IT infrastructure, software development,
              and technology consulting that drives innovation for enterprise clients worldwide.
            </HeroSubtitle>
            <HeroFeatureList>
              {HERO_FEATURES.map((feature) => (
                <HeroFeatureItem key={feature}>
                  <FaCheckCircle size={16} aria-hidden="true" />
                  {feature}
                </HeroFeatureItem>
              ))}
            </HeroFeatureList>
            <HeroButtons>
              <PrimaryButtonAsButton onClick={openModal}>
                Get Free Website Audit
                <FaArrowRight />
              </PrimaryButtonAsButton>
              <SecondaryButton to="/portfolio">
                View Our Work
              </SecondaryButton>
            </HeroButtons>
          </div>
          <HeroStatsGrid>
            {HERO_STATS.map((stat) => (
              <HeroStatCard key={stat.label}>
                <HeroStatNumber>{stat.number}</HeroStatNumber>
                <HeroStatLabel>{stat.label}</HeroStatLabel>
              </HeroStatCard>
            ))}
          </HeroStatsGrid>
        </HeroContent>
      </HeroSection>

      <StatsSection ref={statsRef}>
        <StatsContainer>
          <StatsGrid>
              {stats.map((stat, index) => {
              if (stat.type === 'card') {
                return (
                  <StatCard
                    key={stat.label}
                    className="hide-on-mobile"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <StatNumber>
                      <Counter end={stat.number} isVisible={isStatsInView} />
                    </StatNumber>
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
                    <AwardPlatform>
                      {getPlatformIcon(stat.platform) && (
                        <PlatformIcon 
                          src={getPlatformIcon(stat.platform)} 
                          alt={stat.platform}
                        />
                      )}
                    </AwardPlatform>
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
                    <PlatformName>
                      {getPlatformIcon(stat.platform) && (
                        <PlatformIcon 
                          src={getPlatformIcon(stat.platform)} 
                          alt={stat.platform}
                        />
                      )}
                    </PlatformName>
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
            Comprehensive IT solutions to your business needs
          </SectionSubtitle>
          <ServicesGrid>
            {homepageServices.map((service, index) => (
              <ServiceCard
                key={service.id || service.title}
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

      <TeamPreview />

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
