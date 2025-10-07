import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaMobile, 
  FaCloud, 
  FaShieldAlt, 
  FaUsers, 
  FaRocket,
  FaCheckCircle,
  FaArrowRight,
  FaCog,
  FaDatabase,
  FaNetworkWired,
  FaLaptopCode,
  FaServer,
  FaLock,
  FaChartLine
} from 'react-icons/fa';

const ServicesContainer = styled.div`
  min-height: 100vh;
  padding-top: 2rem;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
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

const ServicesSection = styled.section`
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: repeat(auto-fit, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  align-items: stretch;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;

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
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  }
`;

const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  justify-content: space-between;
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 2rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`;

const ServiceFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.gray[600]};
  font-size: 0.95rem;
`;

const ServiceCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    gap: 0.75rem;
  }
`;

const ProcessSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.light};
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ProcessStep = styled(motion.div)`
  text-align: center;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 40px;
    right: -1rem;
    width: 2rem;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    z-index: 1;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  position: relative;
  z-index: 2;
`;

const StepTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
`;

const TechnologySection = styled.section`
  padding: 6rem 0;
  background: white;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TechCard = styled(motion.div)`
  background: ${props => props.theme.colors.light};
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.gray[200]};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const TechIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const TechName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
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

const CTAButton = styled(Link)`
  background: linear-gradient(135deg, #3730a3 0%, #581c87 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 25px rgba(55, 48, 163, 0.4),
    0 4px 12px rgba(88, 28, 135, 0.3);
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 15px 35px rgba(55, 48, 163, 0.5),
      0 8px 20px rgba(88, 28, 135, 0.4);
    background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
  }
`;

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 'software-development',
      icon: <FaCode />,
      title: 'Custom Software Development',
      description: 'Full-stack software development services using modern programming languages, frameworks, and methodologies to build scalable enterprise applications.',
      features: [
        'Web Application Development',
        'Desktop Software Solutions',
        'API Development & Integration',
        'Database Design & Optimization',
        'Microservices Architecture',
        'Code Review & Quality Assurance'
      ]
    },
    {
      id: 'mobile-development',
      icon: <FaMobile />,
      title: 'Mobile Application Development',
      description: 'Native and cross-platform mobile app development for iOS and Android with enterprise-grade security and performance optimization.',
      features: [
        'Native iOS & Android Development',
        'React Native & Flutter Apps',
        'Mobile UI/UX Design',
        'App Store Deployment',
        'Mobile Security Implementation',
        'Performance Optimization'
      ]
    },
    {
      id: 'cloud-infrastructure',
      icon: <FaCloud />,
      title: 'Cloud Infrastructure & DevOps',
      description: 'Cloud migration, infrastructure automation, and DevOps implementation using AWS, Azure, and Google Cloud Platform.',
      features: [
        'Cloud Migration & Strategy',
        'Infrastructure as Code (IaC)',
        'CI/CD Pipeline Implementation',
        'Container Orchestration (Kubernetes)',
        'Cloud Security & Compliance',
        '24/7 Infrastructure Monitoring'
      ]
    },
    {
      id: 'cybersecurity',
      icon: <FaShieldAlt />,
      title: 'IT Security & Compliance',
      description: 'Comprehensive cybersecurity services including vulnerability assessments, penetration testing, and compliance management.',
      features: [
        'Security Risk Assessment',
        'Penetration Testing & Auditing',
        'Security Architecture Design',
        'Compliance Management (SOC 2, ISO 27001)',
        'Incident Response Planning',
        'Security Training & Awareness'
      ]
    },
    {
      id: 'it-consulting',
      icon: <FaUsers />,
      title: 'IT Strategy & Consulting',
      description: 'Strategic IT consulting services to help organizations optimize their technology investments and align IT with business goals.',
      features: [
        'IT Strategy Development',
        'Technology Roadmap Planning',
        'System Architecture Design',
        'Vendor Selection & Management',
        'IT Governance & Best Practices',
        'Digital Transformation Planning'
      ]
    },
    {
      id: 'system-integration',
      icon: <FaRocket />,
      title: 'System Integration & Modernization',
      description: 'Legacy system modernization, enterprise integration, and data migration services to improve operational efficiency.',
      features: [
        'Legacy System Modernization',
        'Enterprise System Integration',
        'Data Migration & ETL Services',
        'API Development & Management',
        'Workflow Automation',
        'System Performance Optimization'
      ]
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements and create a detailed project plan tailored to your business goals.'
    },
    {
      number: '02',
      title: 'Design & Development',
      description: 'Our team designs and develops your solution using cutting-edge technologies and best practices.'
    },
    {
      number: '03',
      title: 'Testing & Quality Assurance',
      description: 'Comprehensive testing ensures your solution is robust, secure, and performs flawlessly.'
    },
    {
      number: '04',
      title: 'Deployment & Launch',
      description: 'We handle the deployment process and ensure a smooth launch with minimal downtime.'
    },
    {
      number: '05',
      title: 'Support & Maintenance',
      description: 'Ongoing support and maintenance to keep your solution running smoothly and efficiently.'
    }
  ];

  const technologies = [
    { name: 'React', icon: <FaLaptopCode /> },
    { name: 'Node.js', icon: <FaServer /> },
    { name: 'Python', icon: <FaCode /> },
    { name: 'AWS', icon: <FaCloud /> },
    { name: 'Docker', icon: <FaCog /> },
    { name: 'MongoDB', icon: <FaDatabase /> },
    { name: 'Kubernetes', icon: <FaNetworkWired /> },
    { name: 'Security', icon: <FaLock /> },
    { name: 'Analytics', icon: <FaChartLine /> }
  ];

  return (
    <ServicesContainer>
      <HeroSection>
        <HeroBackground />
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Comprehensive IT Services & Solutions
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Full-spectrum IT services including software development, infrastructure management, 
            cybersecurity, and technology consulting designed to optimize your IT operations 
            and drive business success.
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <ServicesSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What We Offer
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            From web development to cloud solutions, we provide end-to-end IT services
          </SectionSubtitle>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <ServiceContent>
                  <ServiceIcon>{service.icon}</ServiceIcon>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <ServiceFeatures>
                    {service.features.map((feature, featureIndex) => (
                      <ServiceFeature key={featureIndex}>
                        <FaCheckCircle size={16} color={props => props.theme.colors.primary} />
                        {feature}
                      </ServiceFeature>
                    ))}
                  </ServiceFeatures>
                  <ServiceCTA to="/contact">
                    Learn More
                    <FaArrowRight />
                  </ServiceCTA>
                </ServiceContent>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </Container>
      </ServicesSection>

      <ProcessSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Process
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            A proven methodology that ensures successful project delivery
          </SectionSubtitle>
          <ProcessGrid>
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StepNumber>{step.number}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </ProcessStep>
            ))}
          </ProcessGrid>
        </Container>
      </ProcessSection>

      <TechnologySection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Technologies We Use
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Cutting-edge technologies and tools for modern solutions
          </SectionSubtitle>
          <TechGrid>
            {technologies.map((tech, index) => (
              <TechCard
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <TechIcon>{tech.icon}</TechIcon>
                <TechName>{tech.name}</TechName>
              </TechCard>
            ))}
          </TechGrid>
        </Container>
      </TechnologySection>

      <Container>
        <CTA
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Start Your Project?</h2>
          <p>Let's discuss how we can help transform your business with technology.</p>
          <CTAButton to="/appointment">
            Schedule a Meeting
            <FaArrowRight />
          </CTAButton>
        </CTA>
      </Container>
    </ServicesContainer>
  );
};

export default Services;
