import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaUsers, 
  FaBullseye, 
  FaLightbulb, 
  FaHandshake, 
  FaAward,
  FaCode,
  FaChartLine,
  FaGlobe,
  FaShieldAlt,
  FaHeart
} from 'react-icons/fa';

const AboutContainer = styled.div`
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

const ContentSection = styled.section`
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

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  h3 {
    font-size: 2rem;
    font-weight: 600;
    color: ${props => props.theme.colors.dark};
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: ${props => props.theme.colors.gray[600]};
    margin-bottom: 1.5rem;
  }
`;

const VisualContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.colors.light};
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
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

const FeatureTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
`;

const ValuesSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.light};
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ValueIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #3730a3, #581c87);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2.5rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
`;

const StatsSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.primary};
  color: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  h3 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const TimelineSection = styled.section`
  padding: 6rem 0;
  background: white;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${props => props.theme.colors.primary};
    transform: translateX(-50%);

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      left: 2rem;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;

  &:nth-child(odd) {
    flex-direction: row;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      flex-direction: column;
      align-items: flex-start;
      margin-left: 4rem;
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      flex-direction: column;
      align-items: flex-start;
      margin-left: 4rem;
    }
  }
`;

const TimelineContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 45%;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    transform: translateY(-50%);

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }

  &:nth-child(odd) &::before {
    right: -30px;
    border-left-color: white;
  }

  &:nth-child(even) &::before {
    left: -30px;
    border-right-color: white;
  }
`;

const TimelineYear = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    left: 2rem;
    transform: translateX(-50%);
  }
`;

const TimelineTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.5rem;
`;

const TimelineDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
`;

const About = () => {
  const values = [
    {
      icon: <FaRocket />,
      title: 'Innovation',
      description: 'We constantly push the boundaries of technology to deliver cutting-edge solutions that drive business growth.'
    },
    {
      icon: <FaUsers />,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners, ensuring their vision becomes our mission.'
    },
    {
      icon: <FaBullseye />,
      title: 'Excellence',
      description: 'We strive for perfection in every project, delivering high-quality solutions that exceed expectations.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Creativity',
      description: 'We approach every challenge with fresh thinking and creative problem-solving techniques.'
    },
    {
      icon: <FaHandshake />,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our business relationships and practices.'
    },
    {
      icon: <FaAward />,
      title: 'Quality',
      description: 'We are committed to delivering exceptional quality in every aspect of our work.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Delivered' },
    { number: '200+', label: 'Satisfied Clients' },
    { number: '50+', label: 'Expert Team Members' },
    { number: '99%', label: 'Client Satisfaction' }
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Company Founded',
      description: 'BestechSolz Vision was established with a vision to revolutionize the IT industry through innovative solutions.'
    },
    {
      year: '2020',
      title: 'First Major Project',
      description: 'Successfully delivered our first enterprise-level web application, establishing our reputation in the market.'
    },
    {
      year: '2021',
      title: 'Team Expansion',
      description: 'Grew our team to 25+ professionals and expanded our service offerings to include mobile app development.'
    },
    {
      year: '2022',
      title: 'Cloud Solutions Launch',
      description: 'Launched our cloud migration and infrastructure services, helping businesses modernize their IT infrastructure.'
    },
    {
      year: '2023',
      title: 'International Recognition',
      description: 'Received industry awards and expanded our client base to include international companies.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Integrated AI and machine learning capabilities into our solutions, staying ahead of technological trends.'
    }
  ];

  return (
    <AboutContainer>
      <HeroSection>
        <HeroBackground />
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About BestechSolz Vision
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A leading IT services company specializing in software development, infrastructure 
            management, and technology consulting that empowers organizations to achieve their 
            digital transformation goals through innovative IT solutions.
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <TwoColumnGrid>
            <TextContent
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>Our Story</h3>
              <p>
                Founded in 2019 by seasoned IT professionals with over 25 years of combined experience 
                in software development, system administration, and IT consulting. BestechSolz Vision 
                was established to bridge the gap between complex technology requirements and practical 
                business solutions, bringing expertise from leading IT companies including IBM, Oracle, and Cisco.
              </p>
              <p>
                Today, we serve enterprise clients across diverse industries including financial services, 
                healthcare, manufacturing, and government sectors. Our success is built on a foundation of 
                technical excellence, industry certifications, and a deep understanding of IT infrastructure 
                and software development best practices.
              </p>
            </TextContent>
            <VisualContent
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <FeatureIcon>
                  <FaCode />
                </FeatureIcon>
                <FeatureTitle>Technical Excellence</FeatureTitle>
                <FeatureDescription>
                  Our team of certified professionals brings years of experience 
                  in cutting-edge technologies and industry best practices.
                </FeatureDescription>
              </FeatureCard>
            </VisualContent>
          </TwoColumnGrid>

          <TwoColumnGrid>
            <VisualContent
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <FeatureIcon>
                  <FaChartLine />
                </FeatureIcon>
                <FeatureTitle>Proven Results</FeatureTitle>
                <FeatureDescription>
                  We've helped over 200 businesses achieve their digital transformation 
                  goals with measurable ROI and improved efficiency.
                </FeatureDescription>
              </FeatureCard>
            </VisualContent>
            <TextContent
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>Our Mission</h3>
              <p>
                To deliver comprehensive IT solutions that enable organizations to leverage technology 
                for competitive advantage. We are committed to providing expert software development, 
                infrastructure management, and IT consulting services that drive operational efficiency 
                and business growth.
              </p>
              <p>
                Our mission encompasses not just delivering cutting-edge IT solutions, but also 
                providing ongoing support, maintenance, and strategic guidance that ensures our 
                clients' technology investments continue to deliver value and support their 
                long-term business objectives.
              </p>
            </TextContent>
          </TwoColumnGrid>
        </Container>
      </ContentSection>

      <ValuesSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            The principles that guide everything we do
          </SectionSubtitle>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ValueIcon>{value.icon}</ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </Container>
      </ValuesSection>

      <StatsSection>
        <Container>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </StatItem>
            ))}
          </StatsGrid>
        </Container>
      </StatsSection>

      <TimelineSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Journey
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Key milestones in our company's growth
          </SectionSubtitle>
          <Timeline>
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TimelineYear>{item.year}</TimelineYear>
                <TimelineContent>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDescription>{item.description}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </TimelineSection>
    </AboutContainer>
  );
};

export default About;
