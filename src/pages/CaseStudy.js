import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChartLine, FaClock, FaUsers } from 'react-icons/fa';

const Page = styled.div`
  min-height: 100vh;
  padding-top: 2rem;
`;

const Hero = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: ${props => props.theme.colors.white};
  padding: 5rem 0;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroTitle = styled(motion.h1)`
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled(motion.p)`
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.95;
`;

const Section = styled.section`
  padding: 5rem 0;
  background: ${props => props.$alt ? props.theme.colors.light : props.theme.colors.white};
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const CaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const CaseCard = styled(motion.article)`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const CaseTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
`;

const CaseText = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: 1rem;
`;

const StatRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Stat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: ${props => props.theme.colors.gray[100]};
  color: ${props => props.theme.colors.gray[700]};
`;

const CTA = styled(Link)`
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const sampleCases = [
  {
    title: 'Enterprise CRM Revamp',
    description: 'Redesigned a legacy CRM into a cloud-first platform with role-based workflows and analytics.',
    growth: '+42% productivity',
    timeline: '14 weeks',
    team: '8 specialists'
  },
  {
    title: 'Healthcare Appointment Platform',
    description: 'Built a secure booking portal with automated reminders and integration with internal systems.',
    growth: '+65% bookings',
    timeline: '10 weeks',
    team: '6 specialists'
  },
  {
    title: 'eCommerce Mobile Experience',
    description: 'Delivered a fast, conversion-focused mobile app with personalized product recommendations.',
    growth: '+31% conversion',
    timeline: '12 weeks',
    team: '7 specialists'
  }
];

const CaseStudy = () => {
  return (
    <Page>
      <Hero>
        <Container>
          <HeroTitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Case Studies
          </HeroTitle>
          <HeroSubtitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Real project outcomes that show how our strategy, product, and engineering teams deliver business impact.
          </HeroSubtitle>
        </Container>
      </Hero>

      <Section>
        <Container>
          <SectionTitle initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Featured Success Stories
          </SectionTitle>
          <CaseGrid>
            {sampleCases.map((item, idx) => (
              <CaseCard key={item.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} viewport={{ once: true }}>
                <CaseTitle>{item.title}</CaseTitle>
                <CaseText>{item.description}</CaseText>
                <StatRow>
                  <Stat><FaChartLine /> {item.growth}</Stat>
                  <Stat><FaClock /> {item.timeline}</Stat>
                  <Stat><FaUsers /> {item.team}</Stat>
                </StatRow>
              </CaseCard>
            ))}
          </CaseGrid>
          <CTA to="/contact">
            Discuss a Similar Project <FaArrowRight />
          </CTA>
        </Container>
      </Section>

      <Section $alt>
        <Container>
          <SectionTitle initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Need a Detailed Breakdown?
          </SectionTitle>
          <p style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
            Contact us to get industry-specific references, architecture details, and rollout plans for projects similar to yours.
          </p>
        </Container>
      </Section>
    </Page>
  );
};

export default CaseStudy;
