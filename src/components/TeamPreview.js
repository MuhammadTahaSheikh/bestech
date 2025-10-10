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

  @media (max-width: 360px) {
    max-width: 320px;
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.sm};
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
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  overflow: hidden;
 

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

  @media (max-width: 360px) {
    width: 100px;
    height: 100px;
    font-size: 1.4rem;
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
  background: transparent;
  filter: 
    contrast(1.2) 
    brightness(1.1) 
    saturate(1.1)
    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  mix-blend-mode: normal;
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

  @media (max-width: 360px) {
    font-size: 0.75rem;
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
      name: 'Muhammad Taha',
      role: 'Software Engineer',
      avatar: 'MT',
      image: '/taha.png',
      shortName: 'Muhammad Taha',
      description: 'Experienced software engineer with expertise in full-stack development and system architecture.'
    },
    {
      id: 2,
      name: 'Sumair Fraz',
      role: 'CRM Specialist',
      avatar: 'SF',
      image: '/60506EF5-1F49-4E42-AC62-034FAD4B3B34.png',
      shortName: 'Sumair',
      description: 'CRM specialist focused on customer relationship management and business process optimization.'
    },
    {
      id: 3,
      name: 'Asif Saeed',
      role: 'CRM Specialist',
      avatar: 'AS',
      image: null,
      shortName: 'Asif',
      description: 'CRM specialist with expertise in customer data management and sales automation systems.'
    },
    {
      id: 4,
      name: 'Salar Kamran',
      role: 'Social Media Manager',
      avatar: 'SK',
      image: null,
      shortName: 'Salar',
      description: 'Social media manager responsible for digital marketing and brand presence across platforms.'
    },
    {
      id: 5,
      name: 'Hafiz Mubsher',
      role: 'App Developer',
      avatar: 'HM',
      image: null,
      shortName: 'Hafiz',
      description: 'Mobile app developer specializing in cross-platform applications and user experience design.'
    },
    {
      id: 6,
      name: 'Abdul Rafay',
      role: 'Full Stack Developer',
      avatar: 'AR',
      image: null,
      shortName: 'Abdul',
      description: 'Full stack developer with expertise in both frontend and backend technologies.'
    },
    {
      id: 7,
      name: 'Aqib Saeed',
      role: 'Social Media',
      avatar: 'AQ',
      image: null,
      shortName: 'Aqib',
      description: 'Social media specialist focused on content creation and community engagement.'
    },
    {
      id: 8,
      name: 'Hasan Suhail',
      role: 'CRM Developer',
      avatar: 'HS',
      image: null,
      shortName: 'Hasan',
      description: 'CRM developer specializing in custom CRM solutions and database integration.'
    },
    {
      id: 9,
      name: 'Ahmed Niaz',
      role: 'Software Engineer',
      avatar: 'AN',
      image: null,
      shortName: 'Ahmed',
      description: 'Software engineer with expertise in system development and technical problem solving.'
    },
    {
      id: 10,
      name: 'Humayun Shahid',
      role: 'Business Executive',
      avatar: 'HS',
      image: null,
      shortName: 'Humayun',
      description: 'Business executive responsible for strategic planning and client relationship management.'
    },
    {
      id: 11,
      name: 'Muhammad Rameez',
      role: 'Business Executive',
      avatar: 'MR',
      image: null,
      shortName: 'Rameez',
      description: 'Business executive focused on business development and operational excellence.'
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
          Meet Our Key Players
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Expert professionals delivering exceptional IT solutions
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
              <MemberPhoto>
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
