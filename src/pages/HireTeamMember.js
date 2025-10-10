import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaQuestionCircle, 
  FaPaperPlane,
  FaArrowLeft,
  FaBriefcase,
  FaCheckCircle
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BackButton = styled(motion.button)`
  background: white;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  color: ${props => props.theme.colors.gray[600]};
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme.colors.gray[200]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(135deg, #3730a3, #581c87);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 2rem;
    border-radius: 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const TeamMemberCard = styled.div`
  background: ${props => props.theme.colors.light};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  position: relative;
  overflow: hidden;

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
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #3730a3, #581c87);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 2.5rem;
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

  &:hover::before {
    animation: shine 0.8s ease-in-out;
  }

  @keyframes shine {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }
`;

const MemberName = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const MemberBio = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 1rem 1.25rem;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(55, 48, 163, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }

  &:disabled {
    background: ${props => props.theme.colors.gray[50]};
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem 1.25rem;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(55, 48, 163, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }

  &:disabled {
    background: ${props => props.theme.colors.gray[50]};
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #3730a3, #581c87);
  color: white;
  border: none;
  padding: 1.25rem 2.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  box-shadow: 0 8px 25px rgba(55, 48, 163, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(55, 48, 163, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 8px 25px rgba(55, 48, 163, 0.3);
  }
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid transparent;
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.1rem;
`;

const ErrorMessage = styled(motion.div)`
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.1rem;
`;

const RequiredNote = styled.p`
  color: ${props => props.theme.colors.gray[500]};
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
  font-style: italic;
`;

const HireTeamMember = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    question: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Get team member data from location state
  const teamMember = location.state?.teamMember;

  // Debug logging
  console.log('Location state:', location.state);
  console.log('Team member from state:', teamMember);

  // Default team member data if none provided
  const defaultTeamMember = {
    id: 0,
    name: 'Our Team',
    role: 'Expert Professional',
    bio: 'Our team of experienced professionals is ready to help you with your project. Please fill out the form below and we\'ll connect you with the right expert.',
    avatar: 'OT'
  };

  const selectedTeamMember = teamMember || defaultTeamMember;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Hiring inquiry submitted:', {
        ...formData,
        teamMember: selectedTeamMember?.name,
        teamMemberRole: selectedTeamMember?.role
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', question: '' });
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/team');
  };

  // Remove the redirect check since we now have a fallback

  return (
    <PageContainer>
      <Container>
        <BackButton
          onClick={handleBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaArrowLeft />
          Back to Team
        </BackButton>

        <Card
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Header>
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Hire {selectedTeamMember.name}
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get in touch to discuss your project requirements and how we can help bring your vision to life.
            </Subtitle>
          </Header>

          <TeamMemberCard>
            <MemberAvatar>{selectedTeamMember.avatar}</MemberAvatar>
            <MemberName>{selectedTeamMember.name}</MemberName>
            <MemberRole>{selectedTeamMember.role}</MemberRole>
            <MemberBio>{selectedTeamMember.bio}</MemberBio>
          </TeamMemberCard>

          {submitStatus === 'success' && (
            <SuccessMessage
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaCheckCircle />
              Thank you! We'll get back to you within 24 hours.
            </SuccessMessage>
          )}

          {submitStatus === 'error' && (
            <ErrorMessage
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Something went wrong. Please try again or contact us directly.
            </ErrorMessage>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">
                <FaUser />
                Full Name *
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                disabled={isSubmitting}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">
                <FaEnvelope />
                Email Address *
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
                disabled={isSubmitting}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">
                <FaPhone />
                Phone Number *
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
                disabled={isSubmitting}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="question">
                <FaQuestionCircle />
                Project Details & Questions
              </Label>
              <TextArea
                id="question"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Tell us about your project, timeline, budget, and any specific requirements. The more details you provide, the better we can assist you."
                disabled={isSubmitting}
              />
            </FormGroup>

            <SubmitButton 
              type="submit" 
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner />
                  Sending Inquiry...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Inquiry
                </>
              )}
            </SubmitButton>

            <RequiredNote>
              * Required fields. We'll use this information to contact you about your project.
            </RequiredNote>
          </Form>
        </Card>
      </Container>
    </PageContainer>
  );
};

export default HireTeamMember;
