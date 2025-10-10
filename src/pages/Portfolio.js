import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaExternalLinkAlt, 
  FaGithub, 
  FaCode, 
  FaMobile, 
  FaCloud, 
  FaShieldAlt,
  FaUsers,
  FaRocket,
  FaFilter,
  FaTimes
} from 'react-icons/fa';

const PortfolioContainer = styled.div`
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

const PortfolioSection = styled.section`
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
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.dark};
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.gray[200]};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.div`
  height: 250px;
  background: linear-gradient(135deg, #3730a3, #581c87);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  opacity: 0;
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ProjectLink = styled.a`
  width: 50px;
  height: 50px;
  background: white;
  color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 2rem;
`;

const ProjectCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.gray[100]};
  color: ${props => props.theme.colors.gray[700]};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
`;

const ProjectStat = styled.div`
  text-align: center;

  h4 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.gray[600]};
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.theme.colors.gray[200]};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.dark};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[300]};
  }
`;

const ModalImage = styled.div`
  height: 300px;
  background: linear-gradient(135deg, #3730a3, #581c87);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4rem;
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
`;

const ModalDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ModalTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ModalLink = styled.a`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: 'all', label: 'All Projects', icon: <FaFilter /> },
    { id: 'web', label: 'Web Development', icon: <FaCode /> },
    { id: 'realestate', label: 'Real Estate', icon: <FaUsers /> },
    { id: 'extension', label: 'Chrome Extensions', icon: <FaRocket /> },
    { id: 'automation', label: 'RPA/AI', icon: <FaCloud /> }
  ];

  const projects = [
    {
      id: 1,
      title: 'Stop ShopREI - Real Estate Lead Generation Platform',
      category: 'realestate',
      categoryLabel: 'Real Estate Web Development',
      description: 'A comprehensive lead generation platform for real estate investors, featuring appointment booking, lead management, and ROI tracking with guaranteed results.',
      image: <FaUsers />,
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Calendly API', 'Email Marketing'],
      duration: '6 months',
      team: '5 developers',
      features: [
        'Advanced appointment booking system with Calendly integration',
        'Lead qualification and management dashboard',
        'ROI tracking and analytics',
        'Automated email and SMS campaigns',
        'Payment processing with Stripe',
        'Responsive design for all devices'
      ],
      liveUrl: 'https://stopshoprei.com/',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Bobby & Afton Real Estate Group Website',
      category: 'realestate',
      categoryLabel: 'Real Estate Web Development',
      description: 'Professional real estate website for Bobby & Afton Peterson Real Estate Group, featuring property listings, team profiles, and client testimonials.',
      image: <FaCode />,
      technologies: ['React', 'Styled Components', 'Framer Motion', 'Responsive Design'],
      duration: '3 months',
      team: '3 developers',
      features: [
        'Modern, responsive design with smooth animations',
        'Team member profiles and testimonials',
        'Property search and filtering',
        'Contact forms and lead capture',
        'SEO optimized for local search',
        'Mobile-first approach'
      ],
      liveUrl: 'https://www.bobbyandafton.com/',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Stupid Cheap Houses - Investment Property Platform',
      category: 'realestate',
      categoryLabel: 'Real Estate Web Development',
      description: 'Investment property listing platform for real estate investors, featuring off-market properties, lead capture forms, and investor-focused design.',
      image: <FaRocket />,
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Email Marketing', 'Lead Capture'],
      duration: '4 months',
      team: '4 developers',
      features: [
        'Property listing management system',
        'Advanced lead capture forms',
        'Email marketing integration',
        'Investor-focused user experience',
        'Property search and filtering',
        'Mobile responsive design'
      ],
      liveUrl: 'https://www.stupidcheaphouses.com/',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'AutoRei Chrome Extension - Real Estate Dashboard',
      category: 'extension',
      categoryLabel: 'Chrome Extension Development',
      description: 'Comprehensive Chrome extension for real estate professionals, featuring lead management, appointment tracking, and business analytics dashboard.',
      image: <FaRocket />,
      technologies: ['Chrome Extension API', 'JavaScript', 'HTML/CSS', 'Chrome Storage', 'REST APIs'],
      duration: '5 months',
      team: '3 developers',
      features: [
        'Lead temperature tracking (Hot, Warm, Cold)',
        'Appointment management and scheduling',
        'SMS and call tracking analytics',
        'Marketing campaign success metrics',
        'Real-time dashboard updates',
        'Integration with real estate platforms'
      ],
      liveUrl: 'https://drive.google.com/file/u/0/d/1mR2xGoPckYn91hHxxruw-qwkDR9lIfdQ/view?usp=drive_link&pli=1',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'RPA Solutions - Robotic Process Automation Platform',
      category: 'automation',
      categoryLabel: 'RPA/AI Development',
      description: 'Advanced Robotic Process Automation platform specializing in AI-powered solutions for business process optimization and automation.',
      image: <FaCloud />,
      technologies: ['Python', 'AI/ML', 'Automation Tools', 'Cloud Computing', 'Process Mining'],
      duration: '8 months',
      team: '6 developers',
      features: [
        'AI-powered process automation',
        'Machine learning model integration',
        'Cloud-based deployment',
        'Process optimization algorithms',
        'Real-time monitoring and analytics',
        'Scalable automation solutions'
      ],
      liveUrl: 'https://roboticprocessautomation.us/',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Seven Pines Investment Platform',
      category: 'web',
      categoryLabel: 'Web Development',
      description: 'Investment management platform for Seven Pines, featuring portfolio management, investment tracking, and client dashboard.',
      image: <FaCode />,
      technologies: ['React', 'Node.js', 'Financial APIs', 'Data Visualization', 'Security'],
      duration: '4 months',
      team: '4 developers',
      features: [
        'Portfolio management dashboard',
        'Investment tracking and analytics',
        'Client portal and reporting',
        'Financial data integration',
        'Secure authentication system',
        'Real-time market data updates'
      ],
      liveUrl: 'https://sevenpinesinvest.com/',
      githubUrl: '#'
    }
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <PortfolioContainer>
      <HeroSection>
        <HeroBackground />
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Portfolio
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Showcasing our successful projects and innovative solutions
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <PortfolioSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Explore our diverse portfolio of successful projects across different industries
          </SectionSubtitle>

          <FilterSection>
            {filters.map((filter) => (
              <FilterButton
                key={filter.id}
                active={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.icon}
                {filter.label}
              </FilterButton>
            ))}
          </FilterSection>

          <ProjectsGrid>
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <ProjectImage>
                    {project.image}
                    <ProjectOverlay>
                      <ProjectLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt />
                      </ProjectLink>
                      <ProjectLink href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                      </ProjectLink>
                    </ProjectOverlay>
                  </ProjectImage>
                  <ProjectContent>
                    <ProjectCategory>
                      {filters.find(f => f.id === project.category)?.icon}
                      {project.categoryLabel}
                    </ProjectCategory>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <ProjectTech>
                      {project.technologies.map((tech, techIndex) => (
                        <TechTag key={techIndex}>{tech}</TechTag>
                      ))}
                    </ProjectTech>
                    <ProjectStats>
                      <ProjectStat>
                        <h4>{project.duration}</h4>
                        <p>Duration</p>
                      </ProjectStat>
                      <ProjectStat>
                        <h4>{project.team}</h4>
                        <p>Team Size</p>
                      </ProjectStat>
                    </ProjectStats>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </AnimatePresence>
          </ProjectsGrid>
        </Container>
      </PortfolioSection>

      <AnimatePresence>
        {selectedProject && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalClose onClick={() => setSelectedProject(null)}>
                <FaTimes />
              </ModalClose>
              <ModalImage>
                {selectedProject.image}
              </ModalImage>
              <ModalBody>
                <ModalTitle>{selectedProject.title}</ModalTitle>
                <ModalDescription>{selectedProject.description}</ModalDescription>
                <ModalTech>
                  {selectedProject.technologies.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </ModalTech>
                <ModalLinks>
                  <ModalLink href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                    View Live
                  </ModalLink>
                  <ModalLink href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                    View Code
                  </ModalLink>
                </ModalLinks>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </PortfolioContainer>
  );
};

export default Portfolio;
