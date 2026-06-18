import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBriefcase, FaLaptopCode, FaUsers, FaPaperclip } from 'react-icons/fa';
import { submitCareer } from '../utils/formApi';

const Page = styled.div`
  min-height: 100vh;
  padding-top: 2rem;
`;

const Hero = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  color: ${props => props.theme.colors.white};
  text-align: center;
  padding: 5rem 0;
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
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
`;

const Card = styled(motion.div)`
  border-radius: 14px;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  background: ${props => props.theme.colors.white};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const Icon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  margin-bottom: 0.9rem;
  color: ${props => props.theme.colors.white};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
`;

const CardTitle = styled.h3`
  margin-bottom: 0.6rem;
`;

const CardText = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin-bottom: 0;
`;

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  border-radius: 14px;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  background: ${props => props.theme.colors.white};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const JobList = styled.ul`
  margin: 1rem 0 0;
  padding-left: 1.1rem;
  color: ${props => props.theme.colors.gray[700]};
`;

const FormCard = styled.form`
  border-radius: 14px;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  background: ${props => props.theme.colors.white};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.sm};
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[800]};
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 10px;
  padding: 0.72rem 0.8rem;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: 1px solid ${props => props.theme.colors.gray[300]};
  border-radius: 10px;
  padding: 0.72rem 0.8rem;
  font-size: 0.95rem;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FileHint = styled.p`
  margin: 0.45rem 0 0;
  color: ${props => props.theme.colors.gray[600]};
  font-size: 0.84rem;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 0.82rem 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const MessageBox = styled.div`
  margin-top: 1rem;
  border-radius: 10px;
  padding: 0.75rem 0.9rem;
  font-size: 0.92rem;
  background: ${props => props.$error ? '#fef2f2' : '#ecfdf5'};
  color: ${props => props.$error ? '#991b1b' : '#065f46'};
  border: 1px solid ${props => props.$error ? '#fecaca' : '#a7f3d0'};
`;

const culturePoints = [
  {
    icon: <FaBriefcase />,
    title: 'Meaningful Projects',
    text: 'Work on products and platforms that solve real business and user challenges.'
  },
  {
    icon: <FaLaptopCode />,
    title: 'Growth-Focused Team',
    text: 'Learn continuously with mentorship, modern tooling, and practical ownership.'
  },
  {
    icon: <FaUsers />,
    title: 'Collaborative Culture',
    text: 'Join an inclusive environment where ideas are valued and impact is shared.'
  }
];

const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  coverLetter: ''
};

const Careers = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [cvFile, setCvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [resultError, setResultError] = useState(false);

  const cvName = useMemo(() => (cvFile ? cvFile.name : ''), [cvFile]);

  const onFieldChange = event => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const onCvChange = event => {
    const file = event.target.files?.[0] || null;
    setCvFile(file);
  };

  const onSubmit = async event => {
    event.preventDefault();

    if (!cvFile) {
      setResultError(true);
      setResultMessage('Please attach your CV before submitting.');
      return;
    }

    setIsSubmitting(true);
    setResultMessage('');
    setResultError(false);

    try {
      const payload = new FormData();
      payload.append('fullName', formValues.fullName.trim());
      payload.append('email', formValues.email.trim());
      payload.append('phone', formValues.phone.trim());
      payload.append('position', formValues.position.trim());
      payload.append('experience', formValues.experience.trim());
      payload.append('coverLetter', formValues.coverLetter.trim());
      payload.append('cv', cvFile);

      await submitCareer(payload);
      setResultError(false);
      setResultMessage('Application submitted successfully. Our team will review and contact you soon.');
      setFormValues(initialFormState);
      setCvFile(null);
      event.target.reset();
    } catch (error) {
      setResultError(true);
      setResultMessage(error?.message || 'Unable to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <Hero>
        <Container>
          <HeroTitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Careers at Bestech Vision
          </HeroTitle>
          <HeroSubtitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Build your future with a team that values innovation, ownership, and continuous learning.
          </HeroSubtitle>
        </Container>
      </Hero>

      <Section>
        <Container>
          <SectionTitle initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Why Join Us
          </SectionTitle>
          <Grid>
            {culturePoints.map((item, index) => (
              <Card key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }}>
                <Icon>{item.icon}</Icon>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.text}</CardText>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section $alt>
        <Container>
          <SectionTitle initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Apply Now
          </SectionTitle>
          <TwoColumn>
            <InfoCard>
              <h3>Build your future with us</h3>
              <p>
                We are hiring motivated professionals across development, design, and digital strategy roles.
                Share your profile and CV, and we will get back to you for suitable opportunities.
              </p>
              <JobList>
                <li>Frontend and Full-Stack Developers</li>
                <li>UI/UX Designers</li>
                <li>SEO and Digital Marketing Specialists</li>
                <li>WordPress and Ecommerce Experts</li>
              </JobList>
              <p style={{ marginTop: '1rem', marginBottom: 0 }}>
                Applications are sent directly to <strong>info@bestechvision.com</strong>.
              </p>
            </InfoCard>

            <FormCard onSubmit={onSubmit}>
              <FieldGrid>
                <Field>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formValues.fullName}
                    onChange={onFieldChange}
                    required
                  />
                </Field>
                <Field>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={onFieldChange}
                    required
                  />
                </Field>
              </FieldGrid>

              <FieldGrid>
                <Field>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formValues.phone}
                    onChange={onFieldChange}
                    required
                  />
                </Field>
                <Field>
                  <Label htmlFor="position">Position Applied For *</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formValues.position}
                    onChange={onFieldChange}
                    required
                  />
                </Field>
              </FieldGrid>

              <Field>
                <Label htmlFor="experience">Experience (years)</Label>
                <Input
                  id="experience"
                  name="experience"
                  value={formValues.experience}
                  onChange={onFieldChange}
                  placeholder="e.g. 2 years"
                />
              </Field>

              <Field>
                <Label htmlFor="coverLetter">Cover Letter / Message</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formValues.coverLetter}
                  onChange={onFieldChange}
                  placeholder="Tell us about your skills, projects, and interest in joining Bestech Vision."
                />
              </Field>

              <Field>
                <Label htmlFor="cv">
                  <FaPaperclip style={{ marginRight: '0.35rem' }} />
                  Upload CV *
                </Label>
                <Input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" onChange={onCvChange} required />
                <FileHint>
                  Accepted formats: PDF, DOC, DOCX (max 5MB). {cvName ? `Selected: ${cvName}` : ''}
                </FileHint>
              </Field>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Apply Now'}
              </SubmitButton>

              {resultMessage ? <MessageBox $error={resultError}>{resultMessage}</MessageBox> : null}
            </FormCard>
          </TwoColumn>
        </Container>
      </Section>
    </Page>
  );
};

export default Careers;
