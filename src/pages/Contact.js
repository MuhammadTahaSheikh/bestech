import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTelegram
} from 'react-icons/fa';

const ContactContainer = styled.div`
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

const ContactSection = styled.section`
  padding: 6rem 0;
  background: white;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.dark};
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const ContactCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ContactCard = styled(motion.div)`
  background: ${props => props.theme.colors.light};
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.gray[200]};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #3730a3, #581c87);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ContactDetails = styled.div`
  h4 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${props => props.theme.colors.dark};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${props => props.theme.colors.gray[600]};
    margin: 0;
  }
`;

const SocialLinks = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => props.theme.colors.dark};
    margin-bottom: 1.5rem;
  }
`;

const SocialGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.gray[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.gray[600]};
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.25rem;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled.form`
  background: ${props => props.theme.colors.light};
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme.colors.gray[200]};
`;

const FormTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3730a3, #581c87);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #10b981;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const MapSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.light};
`;

const MapContainer = styled.div`
  height: 400px;
  background: ${props => props.theme.colors.gray[200]};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.gray[600]};
  font-size: 1.2rem;
  border: 1px solid ${props => props.theme.colors.gray[300]};
`;

const FAQSection = styled.section`
  padding: 6rem 0;
  background: white;
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FAQItem = styled(motion.div)`
  background: ${props => props.theme.colors.light};
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FAQQuestion = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 1rem;
`;

const FAQAnswer = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Office Address',
      details: '375 Airline Housing Society, Lahore, Pakistan'
    },
    {
      icon: <FaPhone />,
      title: 'Phone Number',
      details: '03114315611'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Address',
      details: 'contact@bestechsolz.com'
    },
    {
      icon: <FaClock />,
      title: 'Business Hours',
      details: 'Monday - Friday: 9:00 AM - 6:00 PM PKT'
    }
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/company/bestechsolz', label: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://www.twitter.com/bestechsolz', label: 'Twitter' },
    { icon: <FaFacebook />, url: 'https://www.facebook.com/bestechsolz/', label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/bestechsolz/', label: 'Instagram' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/923114315611', label: 'WhatsApp' },
    { icon: <FaTelegram />, url: 'https://t.me/bestechsolz', label: 'Telegram' }
  ];

  const faqs = [
    {
      question: 'What is your typical enterprise project timeline?',
      answer: 'Enterprise projects typically range from 6-18 months depending on complexity. We provide detailed project roadmaps with milestone-based delivery schedules during our initial consultation and discovery phase.'
    },
    {
      question: 'Do you provide 24/7 support for enterprise clients?',
      answer: 'Yes, we offer comprehensive enterprise support packages including 24/7 monitoring, dedicated account management, and priority technical support. Our enterprise clients receive guaranteed response times and dedicated support teams.'
    },
    {
      question: 'What enterprise technologies and platforms do you specialize in?',
      answer: 'We specialize in enterprise-grade technologies including microservices architecture, cloud platforms (AWS, Azure, GCP), enterprise databases, security frameworks, and compliance solutions. Our team holds advanced certifications in major enterprise platforms.'
    },
    {
      question: 'Can you integrate with our existing enterprise systems?',
      answer: 'Absolutely. We have extensive experience integrating with enterprise systems including SAP, Oracle, Salesforce, and custom legacy systems. We follow enterprise integration patterns and maintain strict security and compliance standards.'
    },
    {
      question: 'What enterprise pricing models do you offer?',
      answer: 'We offer flexible enterprise pricing including fixed-price contracts, time & materials, and dedicated team models. We also provide volume discounts and multi-year agreements for large-scale engagements.'
    },
    {
      question: 'How do you ensure enterprise-grade security and compliance?',
      answer: 'We maintain SOC 2 Type II certification and follow enterprise security frameworks. All team members undergo background checks, and we implement end-to-end encryption, secure development practices, and regular security audits.'
    }
  ];

  return (
    <ContactContainer>
      <HeroSection>
        <HeroBackground />
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get In Touch
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to start your next project? Let's discuss how we can help you achieve your goals.
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <ContactSection>
        <Container>
          <ContactGrid>
            <ContactInfo>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Let's Start a Conversation
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                We're here to help you transform your ideas into reality. 
                Get in touch with us and let's discuss your project requirements.
              </motion.p>

              <ContactCards>
                {contactInfo.map((info, index) => (
                  <ContactCard
                    key={info.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <ContactIcon>{info.icon}</ContactIcon>
                    <ContactDetails>
                      <h4>{info.title}</h4>
                      <p>{info.details}</p>
                    </ContactDetails>
                  </ContactCard>
                ))}
              </ContactCards>

              <SocialLinks>
                <motion.h3
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Follow Us
                </motion.h3>
                <SocialGrid>
                  {socialLinks.map((social, index) => (
                    <SocialLink
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {social.icon}
                    </SocialLink>
                  ))}
                </SocialGrid>
              </SocialLinks>
            </ContactInfo>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ContactForm onSubmit={handleSubmit}>
                <FormTitle>Send us a Message</FormTitle>
                
                {isSubmitted && (
                  <SuccessMessage
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaCheckCircle />
                    Thank you! Your message has been sent successfully.
                  </SuccessMessage>
                )}

                <FormGrid>
                  <FormGroup>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </FormGroup>
                </FormGrid>

                <FormGrid>
                  <FormGroup>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </FormGroup>
                </FormGrid>

                <FormGrid>
                  <FormGroup>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="service">Service Interested In</Label>
                    <Select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-apps">Mobile Apps</option>
                      <option value="cloud-solutions">Cloud Solutions</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="consulting">IT Consulting</option>
                      <option value="digital-transformation">Digital Transformation</option>
                    </Select>
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <Label htmlFor="message">Message *</Label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project requirements..."
                    required
                  />
                </FormGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </SubmitButton>
              </ContactForm>
            </motion.div>
          </ContactGrid>
        </Container>
      </ContactSection>

      <MapSection>
        <Container>
          <motion.h2
            style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Find Us
          </motion.h2>
          <motion.p
            style={{ textAlign: 'center', fontSize: '1.2rem', color: '#6b7280', marginBottom: '3rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Visit our office or get directions
          </motion.p>
          <MapContainer>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.8665921632!2d74.25909387638207!3d31.445339474248406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919019ef46a8b83%3A0xac7173a28804fd26!2s375%2C%20Airline%20Society%2C%20Lahore%2C%2054782%2C%20Pakistan!5e0!3m2!1sen!2s!4v1760126024801!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapContainer>
        </Container>
      </MapSection>

      <FAQSection>
        <Container>
          <motion.h2
            style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            style={{ textAlign: 'center', fontSize: '1.2rem', color: '#6b7280', marginBottom: '3rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Common questions about our services and process
          </motion.p>
          <FAQGrid>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <FAQQuestion>{faq.question}</FAQQuestion>
                <FAQAnswer>{faq.answer}</FAQAnswer>
              </FAQItem>
            ))}
          </FAQGrid>
        </Container>
      </FAQSection>
    </ContactContainer>
  );
};

export default Contact;
