import React, { useEffect, useState, memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SumairImage from '../assets/Sumair.jpg';
import AsifImage from '../assets/Asif.jpg';
import SalarImage from '../assets/Salar.jpg';
import MubsherImage from '../assets/Mubsher Saeed.jpg';
import AbdulRafayImage from '../assets/Abdul Rafay Razzaq.jpg';
import AqibImage from '../assets/Aqib.jpg';
import HassanImage from '../assets/Hassan Shoail.jpg';
import AhmadImage from '../assets/Ahmad.jpg';
import HumayunImage from '../assets/Humayun.jpg';
import ArslanImage from '../assets/Arslan.jpg';
import HamzaImage from '../assets/M Hamza.jpg';
import MutahirImage from '../assets/Mutahir-ul-haq.jpg';
import OsamaImage from '../assets/Osama Razzaq.jpg';
import { fetchTeamMembers, normalizeTeamMemberForPreview } from '../utils/cmsApi';

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
    background: rgba(255, 255, 255, 0.5);
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
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
    grid-template-columns: repeat(2, minmax(240px, 1fr));
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 700px;
    grid-template-columns: repeat(2, minmax(220px, 1fr));
    gap: ${props => props.theme.spacing.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 500px;
    grid-template-columns: 1fr;
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
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberPhoto = styled(motion.div)`
  width: 290px;
  height: 360px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  background: #f4f4f4;

  &::before {
    content: '';
    position: absolute;
    inset: -22px;
    z-index: 0;
    pointer-events: none;
    background:
      linear-gradient(135deg, #2f6fd8 0%, #2f6fd8 48%, transparent 48%, transparent 100%) top left / 95px 95px no-repeat,
      linear-gradient(315deg, #2f6fd8 0%, #2f6fd8 48%, transparent 48%, transparent 100%) bottom right / 95px 95px no-repeat;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 270px;
    height: 335px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 250px;
    height: 315px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 270px;
    height: 330px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: min(90vw, 280px);
    height: min(112vw, 340px);
  }

  @media (max-width: 360px) {
    width: min(90vw, 255px);
    height: min(112vw, 310px);
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
  z-index: 1;
  background: transparent;
  filter: 
    contrast(1.2) 
    brightness(1.1) 
    saturate(1.1)
    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  mix-blend-mode: normal;
`;

const MemberName = styled.h4`
  font-size: 2rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 1.3rem;
  text-align: center;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.7rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.45rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    font-size: 1.35rem;
  }

  @media (max-width: 360px) {
    font-size: 1.2rem;
  }
`;

const MemberOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(14, 31, 66, 0.08) 0%,
    rgba(24, 56, 121, 0.62) 34%,
    rgba(18, 41, 90, 0.84) 100%
  );
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.26s ease;

  ${TeamMember}:hover ${MemberPhoto} & {
    opacity: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.65rem;
    gap: 0.25rem;
  }
`;

const OverlayName = styled.div`
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.22;
  margin-bottom: 0.45rem;
`;

const OverlayRole = styled.div`
  font-size: 1.05rem;
  font-weight: 600;
  color: rgba(249, 250, 251, 0.92);
  line-height: 1.35;
`;

const OverlayDescription = styled.p`
  margin: 0.55rem 0 0;
  font-size: 0.98rem;
  line-height: 1.5;
  color: rgba(249, 250, 251, 0.9);
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const OverlayInner = styled.div`
  width: 92%;
  max-width: 245px;
  background: rgba(46, 99, 200, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 30px rgba(10, 22, 52, 0.28);
  padding: 1rem 0.9rem;
  border-radius: 4px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 235px;
    padding: 0.95rem 0.85rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 240px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    max-width: 225px;
  }
`;

const OverlayDetails = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    ${OverlayName} {
      font-size: 1.28rem;
    }

    ${OverlayRole} {
      font-size: 0.98rem;
    }

    ${OverlayDescription} {
      font-size: 0.92rem;
      -webkit-line-clamp: 7;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    ${OverlayName} {
      font-size: 1.16rem;
    }

    ${OverlayRole} {
      font-size: 0.9rem;
    }

    ${OverlayDescription} {
      font-size: 0.86rem;
      line-height: 1.45;
      -webkit-line-clamp: 6;
    }
  }
`;

const TeamPreview = () => {
  const [cmsMembers, setCmsMembers] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchTeamMembers();
        if (!cancelled && Array.isArray(rows) && rows.length > 0) {
          setCmsMembers(rows.map(normalizeTeamMemberForPreview));
        }
      } catch {
        /* static */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const staticTeamMembers = [
    {
      id: 1,
      name: 'Salar Kamran',
      role: 'Social Media Manager',
      avatar: 'SK',
      image: SalarImage,
      shortName: 'Salar',
      description: 'Social media manager responsible for digital marketing and brand presence across platforms.'
    },
    {
      id: 2,
      name: 'Sumair Fraz',
      role: 'CRM Specialist',
      avatar: 'SF',
      image: SumairImage,
      shortName: 'Sumair',
      description: 'CRM specialist focused on customer relationship management and business process optimization.'
    },
    {
      id: 3,
      name: 'Asif Saeed',
      role: 'CRM Specialist',
      avatar: 'AS',
      image: AsifImage,
      shortName: 'Asif',
      description: 'CRM specialist with expertise in customer data management and sales automation systems.'
    },
   
    {
      id: 5,
      name: 'Hafiz Mubsher',
      role: 'App Developer',
      avatar: 'HM',
      image: MubsherImage,
      shortName: 'Hafiz',
      description: 'Mobile app developer specializing in cross-platform applications and user experience design.'
    },
    {
      id: 6,
      name: 'Abdul Rafay',
      role: 'Full Stack Developer',
      avatar: 'AR',
      image: AbdulRafayImage,
      shortName: 'Abdul',
      description: 'Full stack developer with expertise in both frontend and backend technologies.'
    },
    {
      id: 8,
      name: 'Aqib Saeed',
      role: 'Social Media',
      avatar: 'AQ',
      image: AqibImage,
      shortName: 'Aqib',
      description: 'Social media specialist focused on content creation and community engagement.'
    },
    {
      id: 7,
      name: 'Hasan Suhail',
      role: 'CRM Developer',
      avatar: 'HS',
      image: HassanImage,
      shortName: 'Hasan',
      description: 'CRM developer specializing in custom CRM solutions and database integration.'
    }, 
    {
      id: 9,
      name: 'Ahmed Niaz',
      role: 'Software Engineer',
      avatar: 'AN',
      image: AhmadImage,
      shortName: 'Ahmed',
      description: 'Software engineer with expertise in system development and technical problem solving.'
    },
    {
      id: 10,
      name: 'Humayun Shahid',
      role: 'Business Executive',
      avatar: 'HS',
      image: HumayunImage,
      shortName: 'Humayun',
      description: 'Business executive responsible for strategic planning and client relationship management.'
    },
    {
      id: 11,
      name: 'Arslan',
      role: 'Software Engineer',
      avatar: 'AR',
      image: ArslanImage,
      shortName: 'Arslan',
      description: 'Software engineer focused on building reliable and scalable web solutions.'
    },
    {
      id: 12,
      name: 'M Hamza',
      role: 'Developer',
      avatar: 'MH',
      image: HamzaImage,
      shortName: 'Hamza',
      description: 'Developer supporting modern web application development and feature delivery.'
    },
    {
      id: 13,
      name: 'Mutahir-ul-haq',
      role: 'Team Member',
      avatar: 'MU',
      image: MutahirImage,
      shortName: 'Mutahir',
      description: 'Team member contributing to project execution and day-to-day technical operations.'
    },
    {
      id: 14,
      name: 'Osama Razzaq',
      role: 'Team Member',
      avatar: 'OR',
      image: OsamaImage,
      shortName: 'Osama',
      description: 'Team member helping deliver client-focused solutions across ongoing projects.'
    }
  ];

  const teamMembers =
    cmsMembers && cmsMembers.length > 0 ? cmsMembers : staticTeamMembers;

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
            >
              <MemberPhoto>
                {member.image ? (
                  <MemberImage 
                    src={member.image} 
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  member.avatar
                )}
                <MemberOverlay>
                  <OverlayInner>
                    <OverlayDetails>
                      <OverlayName>{member.name}</OverlayName>
                      <OverlayRole>{member.role}</OverlayRole>
                      <OverlayDescription>
                        {member.description || `${member.name} is a valued member of our team.`}
                      </OverlayDescription>
                    </OverlayDetails>
                  </OverlayInner>
                </MemberOverlay>
              </MemberPhoto>
              <MemberName>{member.name}</MemberName>
            </TeamMember>
          ))}
        </TeamGrid>
      </Container>
    </TeamSection>
  );
};

export default memo(TeamPreview);
