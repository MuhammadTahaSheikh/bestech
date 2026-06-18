import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLifeRing, FaPhoneAlt, FaQuestionCircle } from 'react-icons/fa';

const Page = styled.div`
  min-height: 100vh;
  padding-top: 2rem;
`;

const Hero = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.dark} 0%, ${props => props.theme.colors.primary} 100%);
  color: ${props => props.theme.colors.white};
  padding: 5rem 0;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroTitle = styled(motion.h1)`
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled(motion.p)`
  max-width: 680px;
  margin: 0 auto;
  opacity: 0.95;
`;

const Section = styled.section`
  padding: 5rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
`;

const Card = styled(motion.div)`
  border: 1px solid ${props => props.theme.colors.gray[200]};
  background: ${props => props.theme.colors.white};
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const Icon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  margin-bottom: 0.9rem;
  color: ${props => props.theme.colors.white};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
`;

const Title = styled.h3`
  margin-bottom: 0.55rem;
`;

const Desc = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: 0;
`;

const CTASection = styled.section`
  padding: 4rem 0 5rem;
  background: ${props => props.theme.colors.light};
  text-align: center;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  padding: 0.75rem 1.4rem;
  border-radius: 10px;
  font-weight: 600;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.primary};
`;

const supportItems = [
  {
    icon: <FaLifeRing />,
    title: 'Technical Assistance',
    description: 'Get direct help for product issues, integrations, and platform troubleshooting.'
  },
  {
    icon: <FaQuestionCircle />,
    title: 'General Inquiries',
    description: 'Ask about services, pricing, project planning, and implementation timelines.'
  },
  {
    icon: <FaEnvelope />,
    title: 'Email Support',
    description: 'Reach us at info@bestechvision.com and receive a response from our team quickly.'
  },
  {
    icon: <FaPhoneAlt />,
    title: 'Phone Support',
    description: 'Call us at 03114315611 for urgent matters and live guidance.'
  }
];

const Support = () => {
  return (
    <Page>
      <Hero>
        <Container>
          <HeroTitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Support Center
          </HeroTitle>
          <HeroSubtitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            We are here to help with technical issues, questions, and next-step planning for your business.
          </HeroSubtitle>
        </Container>
      </Hero>

      <Section>
        <Container>
          <Grid>
            {supportItems.map((item, idx) => (
              <Card key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} viewport={{ once: true }}>
                <Icon>{item.icon}</Icon>
                <Title>{item.title}</Title>
                <Desc>{item.description}</Desc>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <CTASection>
        <Container>
          <h2>Need Dedicated Help?</h2>
          <p>Book a quick call with our team and we will guide you through the best path forward.</p>
          <CTAButton to="/appointment">Book Free Meeting</CTAButton>
        </Container>
      </CTASection>
    </Page>
  );
};

export default Support;
