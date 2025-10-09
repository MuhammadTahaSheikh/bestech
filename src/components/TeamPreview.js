import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TeamSection = styled.section`
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
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
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

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing['3xl']};
  justify-items: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${props => props.theme.breakpoints.xl}) {
    max-width: 1000px;
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 900px;
    grid-template-columns: repeat(3, 1fr);
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 700px;
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 500px;
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    max-width: 400px;
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const TeamMember = styled(motion.div)`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberPhoto = styled(motion.div)`
  width: 150px;
  height: 150px;
  border-radius: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 
      0 12px 35px rgba(0, 0, 0, 0.3),
      0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: rotate(45deg);
    transition: all 0.5s ease;
  }

  ${TeamMember}:hover &::before {
    animation: shine 0.8s ease-in-out;
  }

  @keyframes shine {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 130px;
    height: 130px;
    font-size: 1.8rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 120px;
    height: 120px;
    font-size: 1.6rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100px;
    height: 100px;
    font-size: 1.4rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 120px;
    height: 120px;
    font-size: 1.6rem;
  }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const MemberName = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 0.5rem;
  text-align: center;
  line-height: 1.2;

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
    font-size: 0.8rem;
  }
`;

// Cloud Tooltip Styles - Multiple bubbles like CodePen
const CloudTooltip = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 150px;
  z-index: 10;
  pointer-events: none;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 130px;
    height: 130px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 120px;
    height: 120px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 120px;
    height: 120px;
  }
`;

const Bubble = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: white;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4pt;
  text-align: center;
  line-height: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:nth-child(1) {
    top: -30px;
    right: 0;
  }

  &:nth-child(2) {
    top: -50px;
    right: -30px;
    transform: scale(1.2);
  }

  &:nth-child(3) {
    top: -65px;
    right: -70px;
    transform: scale(1.5);
  }

  &:nth-child(4) {
    top: -85px;
    right: -150px;
    transform: scale(8);
    width: 160px;
    height: 160px;
    border-radius: 80px;
    font-size: 8pt;
    font-weight: 600;
    color: #333;
    padding: 20px;
    box-sizing: border-box;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    &:nth-child(1) {
      top: -25px;
      right: 0;
    }

    &:nth-child(2) {
      top: -45px;
      right: -25px;
    }

    &:nth-child(3) {
      top: -60px;
      right: -60px;
    }

    &:nth-child(4) {
      top: -80px;
      right: -130px;
      width: 140px;
      height: 140px;
      border-radius: 70px;
      font-size: 7pt;
      padding: 15px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    &:nth-child(1) {
      top: -20px;
      right: 0;
    }

    &:nth-child(2) {
      top: -40px;
      right: -20px;
    }

    &:nth-child(3) {
      top: -55px;
      right: -50px;
    }

    &:nth-child(4) {
      top: -75px;
      right: -110px;
      width: 120px;
      height: 120px;
      border-radius: 60px;
      font-size: 6pt;
      padding: 12px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    &:nth-child(1) {
      top: -15px;
      right: 0;
    }

    &:nth-child(2) {
      top: -35px;
      right: -15px;
    }

    &:nth-child(3) {
      top: -50px;
      right: -40px;
    }

    &:nth-child(4) {
      top: -70px;
      right: -90px;
      width: 100px;
      height: 100px;
      border-radius: 50px;
      font-size: 5pt;
      padding: 10px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    &:nth-child(1) {
      top: -20px;
      right: 0;
    }

    &:nth-child(2) {
      top: -40px;
      right: -20px;
    }

    &:nth-child(3) {
      top: -55px;
      right: -50px;
    }

    &:nth-child(4) {
      top: -75px;
      right: -110px;
      width: 120px;
      height: 120px;
      border-radius: 60px;
      font-size: 6pt;
      padding: 12px;
    }
  }
`;

const TeamPreview = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CTO',
      avatar: 'SJ',
      image: '/60506EF5-1F49-4E42-AC62-034FAD4B3B34.png',
      shortName: 'Sarah',
      description: '20+ years in software engineering and IT leadership. Former IBM Distinguished Engineer with expertise in enterprise architecture and cloud computing.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'VP Development',
      avatar: 'MC',
      image: null,
      shortName: 'Michael',
      description: '15+ years in software engineering and team leadership. Former Microsoft Senior Principal Engineer with expertise in full-stack development.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Cloud Director',
      avatar: 'ER',
      image: null,
      shortName: 'Emily',
      description: '12+ years in cloud computing and infrastructure management. AWS and Azure certified architect specializing in enterprise cloud migration.'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'CISO',
      avatar: 'DK',
      image: null,
      shortName: 'David',
      description: '18+ years in cybersecurity and IT risk management. CISSP, CISM certified with extensive experience in enterprise security architecture.'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'IT Operations',
      avatar: 'LT',
      image: null,
      shortName: 'Lisa',
      description: '14+ years in IT operations and system administration. Expert in enterprise infrastructure management and IT service delivery.'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Database Head',
      avatar: 'JW',
      image: null,
      shortName: 'James',
      description: '16+ years in database administration and system integration. Oracle and Microsoft SQL Server certified with expertise in data architecture.'
    }
  ];

  return (
    <TeamSection>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Meet Our Team
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Talented professionals dedicated to delivering exceptional IT solutions
        </SectionSubtitle>
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredMember(member)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <MemberPhoto
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {member.image ? (
                  <MemberImage 
                    src={member.image} 
                    alt={member.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  member.avatar
                )}
              </MemberPhoto>
              <MemberName>{member.name}</MemberName>

              <AnimatePresence>
                {hoveredMember && hoveredMember.id === member.id && (
                  <CloudTooltip>
                    <Bubble
                      initial={{ opacity: 0, rotate: 40, y: 10, scale: 0 }}
                      animate={{ opacity: 1, rotate: 0, y: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 40, y: 10, scale: 0 }}
                      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55], delay: 0 }}
                    />
                    <Bubble
                      initial={{ opacity: 0, rotate: 40, y: 10, scale: 0 }}
                      animate={{ opacity: 1, rotate: 0, y: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 40, y: 10, scale: 0 }}
                      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55], delay: 0.1 }}
                    />
                    <Bubble
                      initial={{ opacity: 0, rotate: 40, y: 10, scale: 0 }}
                      animate={{ opacity: 1, rotate: 0, y: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 40, y: 10, scale: 0 }}
                      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55], delay: 0.2 }}
                    />
                    <Bubble
                      initial={{ opacity: 0, rotate: 40, y: 10, scale: 0 }}
                      animate={{ opacity: 1, rotate: 0, y: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 40, y: 10, scale: 0 }}
                      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55], delay: 0.3 }}
                    >
                      {member.shortName}
                    </Bubble>
                  </CloudTooltip>
                )}
              </AnimatePresence>
            </TeamMember>
          ))}
        </TeamGrid>
      </Container>
    </TeamSection>
  );
};

export default TeamPreview;
