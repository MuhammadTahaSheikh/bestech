import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaLinkedin, 
  FaTwitter, 
  FaGithub, 
  FaEnvelope,
  FaCode,
  FaMobile,
  FaCloud,
  FaShieldAlt,
  FaUsers,
  FaRocket,
  FaDatabase,
  FaNetworkWired,
  FaLaptopCode,
  FaServer,
  FaLock,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
  FaBriefcase
} from 'react-icons/fa';

const TeamContainer = styled.div`
  min-height: 100vh;
  padding-top: 2rem;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="700" r="120" fill="url(%23a)"/></svg>');
  opacity: 0.3;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TeamSection = styled.section`
  padding: 6rem 0;
  background: white;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const TeamCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #3730a3, #581c87);
  }
`;

const MemberAvatar = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #3730a3, #581c87);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 3rem;
  font-weight: 700;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: rotate(45deg);
    transition: all 0.5s ease;
  }

  ${TeamCard}:hover &::before {
    animation: shine 0.8s ease-in-out;
  }

  @keyframes shine {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
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

const MemberName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  margin-bottom: 1rem;
`;

const MemberBio = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
`;

const MemberSkills = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  max-width: 100%;
`;

const SkillTag = styled.span`
  background: ${props => props.theme.colors.gray[100]};
  color: ${props => props.theme.colors.gray[700]};
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.gray[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.gray[600]};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const HireNowButton = styled(motion.button)`
  background: linear-gradient(135deg, #3730a3, #581c87);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.5rem auto 0;
  min-width: 140px;
  box-shadow: 0 4px 15px rgba(55, 48, 163, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(55, 48, 163, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    min-width: 120px;
  }
`;

const LeadershipSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.light};
`;

const LeadershipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
`;

const LeadershipCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(135deg, #3730a3, #581c87);
  }
`;

const LeadershipAvatar = styled.div`
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #3730a3, #581c87);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  font-size: 4rem;
  font-weight: 700;
  position: relative;
  overflow: hidden;
`;

const LeadershipName = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.5rem;
  text-align: center;
`;

const LeadershipRole = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const LeadershipBio = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.7;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.1rem;
`;

const LeadershipStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: ${props => props.theme.colors.light};
  border-radius: 12px;

  h4 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.gray[600]};
  }
`;

const DepartmentsSection = styled.section`
  padding: 6rem 0;
  background: white;
`;

const DepartmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const DepartmentCard = styled(motion.div)`
  background: ${props => props.theme.colors.light};
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.gray[200]};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const DepartmentIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3730a3, #581c87);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;

const DepartmentTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
`;

const DepartmentDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const DepartmentMembers = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 1.1rem;
`;

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  const handleHireNow = (member) => {
    console.log('Navigating to hire page with member:', member);
    navigate('/hire', { 
      state: { teamMember: member } 
    });
  };

  const teamMembers = [
    {
      id: 1,
      name: 'Muhammad Taha',
      role: 'Software Engineer',
      bio: 'Experienced software engineer with expertise in full-stack development and system architecture. Passionate about creating efficient and scalable solutions.',
      avatar: 'MT',
      image: '/taha.png',
      skills: ['Enterprise Architecture', 'Cloud Computing', 'System Design', 'Team Leadership', 'Technical Strategy'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'muhammad@bestechsolz.com'
      }
    },
    {
      id: 2,
      name: 'Sumair Fraz',
      role: 'CRM Specialist',
      bio: 'CRM specialist focused on customer relationship management and business process optimization. Expert in streamlining customer workflows and improving business efficiency.',
      avatar: 'SF',
      skills: ['CRM Systems', 'Business Process', 'Customer Management', 'Data Analysis', 'Workflow Optimization'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'sumair@bestechsolz.com'
      }
    },
    {
      id: 3,
      name: 'Asif Saeed',
      role: 'CRM Specialist',
      bio: 'CRM specialist with expertise in customer data management and sales automation systems. Dedicated to improving customer experience through technology.',
      avatar: 'AS',
      skills: ['Customer Data', 'Sales Automation', 'CRM Development', 'Process Improvement', 'System Integration'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'asif@bestechsolz.com'
      }
    },
    {
      id: 4,
      name: 'Salar Kamran',
      role: 'Social Media Manager',
      bio: 'Social media manager responsible for digital marketing and brand presence across platforms. Creative strategist focused on engaging content and community building.',
      avatar: 'SK',
      skills: ['Social Media', 'Digital Marketing', 'Content Strategy', 'Brand Management', 'Community Engagement'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'salar@bestechsolz.com'
      }
    },
    {
      id: 5,
      name: 'Hafiz Mubsher',
      role: 'App Developer',
      bio: 'Mobile app developer specializing in cross-platform applications and user experience design. Passionate about creating intuitive and engaging mobile experiences.',
      avatar: 'HM',
      skills: ['Mobile Development', 'Cross-Platform', 'User Experience', 'App Design', 'Performance Optimization'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'hafiz@bestechsolz.com'
      }
    },
    {
      id: 6,
      name: 'Abdul Rafay',
      role: 'Full Stack Developer',
      bio: 'Full stack developer with expertise in both frontend and backend technologies. Committed to building robust and scalable web applications.',
      avatar: 'AR',
      skills: ['Full Stack', 'Web Development', 'Database Design', 'API Development', 'System Architecture'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'abdul@bestechsolz.com'
      }
    },
    {
      id: 7,
      name: 'Aqib Saeed',
      role: 'Social Media',
      bio: 'Social media specialist focused on content creation and community engagement. Expert in building brand awareness and driving user engagement.',
      avatar: 'AQ',
      skills: ['Content Creation', 'Social Media', 'Community Management', 'Digital Strategy', 'Brand Awareness'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'aqib@bestechsolz.com'
      }
    },
    {
      id: 8,
      name: 'Hasan Suhail',
      role: 'CRM Developer',
      bio: 'CRM developer specializing in custom CRM solutions and database integration. Focused on creating tailored solutions for business needs.',
      avatar: 'HS',
      skills: ['CRM Development', 'Database Integration', 'Custom Solutions', 'Business Logic', 'System Customization'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'hasan@bestechsolz.com'
      }
    },
    {
      id: 9,
      name: 'Ahmed Niaz',
      role: 'Software Engineer',
      bio: 'Software engineer with expertise in system development and technical problem solving. Dedicated to writing clean, efficient code and solving complex challenges.',
      avatar: 'AN',
      skills: ['Software Development', 'Problem Solving', 'Code Architecture', 'System Design', 'Technical Analysis'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'ahmed@bestechsolz.com'
      }
    },
    {
      id: 10,
      name: 'Humayun Shahid',
      role: 'Business Executive',
      bio: 'Business executive responsible for strategic planning and client relationship management. Focused on driving business growth and maintaining strong client partnerships.',
      avatar: 'HS',
      skills: ['Strategic Planning', 'Client Relations', 'Business Development', 'Project Management', 'Team Leadership'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'humayun@bestechsolz.com'
      }
    },
    {
      id: 11,
      name: 'Muhammad Rameez',
      role: 'Business Executive',
      bio: 'Business executive focused on business development and operational excellence. Committed to driving organizational success through strategic initiatives.',
      avatar: 'MR',
      skills: ['Business Development', 'Operational Excellence', 'Strategic Planning', 'Client Management', 'Performance Optimization'],
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
        email: 'rameez@bestechsolz.com'
      }
    }
  ];

  const leadership = [
    {
      name: 'Alexandra Martinez',
      role: 'CEO & Founder',
      bio: 'Former IBM Global Technology Services Executive with 22+ years in IT consulting and enterprise solutions. MBA from Wharton, led IT transformation initiatives for Fortune 500 companies. Founded BestechSolz Vision to deliver world-class IT services and solutions.',
      avatar: 'AM',
      experience: '22+ years',
      projects: '800+',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'alexandra@bestechsolz.com'
      }
    },
    {
      name: 'Robert Taylor',
      role: 'President & Co-Founder',
      bio: 'Former Oracle Senior Vice President with 20+ years in enterprise software and IT infrastructure. PhD in Computer Science from Stanford, holds 20+ patents in database systems and cloud computing. Leads our technical strategy and client engagement.',
      avatar: 'RT',
      experience: '20+ years',
      projects: '600+',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'robert@bestechsolz.com'
      }
    }
  ];

  const departments = [
    {
      icon: <FaCode />,
      title: 'Software Development',
      description: 'Full-stack development team creating enterprise-grade applications using modern programming languages and frameworks.',
      members: '25 Software Engineers'
    },
    {
      icon: <FaMobile />,
      title: 'Mobile Development',
      description: 'Specialized team developing native and cross-platform mobile applications for iOS and Android platforms.',
      members: '12 Mobile Developers'
    },
    {
      icon: <FaCloud />,
      title: 'Cloud & Infrastructure',
      description: 'Cloud architects and DevOps engineers managing enterprise infrastructure and cloud migration projects.',
      members: '15 Cloud Specialists'
    },
    {
      icon: <FaShieldAlt />,
      title: 'IT Security',
      description: 'Cybersecurity experts providing security assessments, compliance management, and incident response services.',
      members: '8 Security Professionals'
    },
    {
      icon: <FaUsers />,
      title: 'IT Operations',
      description: 'System administrators and IT support specialists ensuring reliable infrastructure and service delivery.',
      members: '18 IT Operations Staff'
    },
    {
      icon: <FaRocket />,
      title: 'System Integration',
      description: 'Integration specialists focused on enterprise system modernization and data migration projects.',
      members: '10 Integration Engineers'
    }
  ];

  return (
    <TeamContainer>
      <HeroSection>
        <HeroBackground />
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Meet Our Team
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Talented professionals dedicated to delivering exceptional results
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <TeamSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Experts
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Meet the talented individuals who make our success possible
          </SectionSubtitle>
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <MemberAvatar>
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
                </MemberAvatar>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberBio>{member.bio}</MemberBio>
                <MemberSkills>
                  {member.skills.map((skill, skillIndex) => (
                    <SkillTag key={skillIndex}>{skill}</SkillTag>
                  ))}
                </MemberSkills>
                <SocialLinks>
                  <SocialLink href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </SocialLink>
                  <SocialLink href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </SocialLink>
                  <SocialLink href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </SocialLink>
                  <SocialLink href={`mailto:${member.social.email}`}>
                    <FaEnvelope />
                  </SocialLink>
                </SocialLinks>
                <HireNowButton
                  onClick={() => handleHireNow(member)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaBriefcase />
                  Hire Now
                </HireNowButton>
              </TeamCard>
            ))}
          </TeamGrid>
        </Container>
      </TeamSection>

      {/* <LeadershipSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Leadership Team
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Visionary leaders driving our company's success
          </SectionSubtitle>
          <LeadershipGrid>
            {leadership.map((leader, index) => (
              <LeadershipCard
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <LeadershipAvatar>{leader.avatar}</LeadershipAvatar>
                <LeadershipName>{leader.name}</LeadershipName>
                <LeadershipRole>{leader.role}</LeadershipRole>
                <LeadershipBio>{leader.bio}</LeadershipBio>
                <LeadershipStats>
                  <StatItem>
                    <h4>{leader.experience}</h4>
                    <p>Experience</p>
                  </StatItem>
                  <StatItem>
                    <h4>{leader.projects}</h4>
                    <p>Projects Led</p>
                  </StatItem>
                </LeadershipStats>
                <SocialLinks>
                  <SocialLink href={leader.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </SocialLink>
                  <SocialLink href={leader.social.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </SocialLink>
                  <SocialLink href={`mailto:${leader.social.email}`}>
                    <FaEnvelope />
                  </SocialLink>
                </SocialLinks>
              </LeadershipCard>
            ))}
          </LeadershipGrid>
        </Container>
      </LeadershipSection> */}

      <DepartmentsSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Departments
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Specialized teams working together to deliver comprehensive solutions
          </SectionSubtitle>
          <DepartmentsGrid>
            {departments.map((department, index) => (
              <DepartmentCard
                key={department.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <DepartmentIcon>{department.icon}</DepartmentIcon>
                <DepartmentTitle>{department.title}</DepartmentTitle>
                <DepartmentDescription>{department.description}</DepartmentDescription>
                <DepartmentMembers>{department.members}</DepartmentMembers>
              </DepartmentCard>
            ))}
          </DepartmentsGrid>
        </Container>
      </DepartmentsSection>

    </TeamContainer>
  );
};

export default Team;
