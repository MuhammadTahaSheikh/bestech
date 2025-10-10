import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaChevronUp
} from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.dark};
  color: white;
  padding: 4rem 0 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled(motion.div)`
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.white};
  }

  p {
    color: ${props => props.theme.colors.gray[300]};
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.gray[300]};
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.theme.colors.gray[300]};
  font-size: 0.95rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.gray[700]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.gray[700]};
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.gray[400]};
  font-size: 0.9rem;
`;

const BackToTop = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 6px;
`;

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/team' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Web Development', path: '/services#web-development' },
        { name: 'Mobile Apps', path: '/services#mobile-apps' },
        { name: 'Cloud Solutions', path: '/services#cloud-solutions' },
        { name: 'IT Consulting', path: '/services#consulting' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Blog', path: '/blog' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Support', path: '/support' }
      ]
    }
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Logo>
              <LogoImage src="/bestech.png" alt="Bestech Vision" />
              Bestech Vision
            </Logo>
            <p>
              BestechSolz Vision is a premier technology consulting firm specializing in 
              enterprise-grade solutions that drive digital transformation and accelerate 
              business growth for Fortune 500 companies worldwide.
            </p>
            <SocialLinks>
              <SocialLink href="https://www.facebook.com/bestechsolz/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </SocialLink>
              <SocialLink href="https://www.twitter.com/bestechsolz" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/company/bestechsolz" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/bestechsolz/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          {footerSections.map((section, index) => (
            <FooterSection
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3>{section.title}</h3>
              <FooterLinks>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <FooterLink to={link.path}>
                      {link.name}
                    </FooterLink>
                  </li>
                ))}
              </FooterLinks>
            </FooterSection>
          ))}

          <FooterSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Contact Info</h3>
            <ContactInfo>
              <ContactItem>
                <FaMapMarkerAlt />
                <span>375 Airline Housing Society, Lahore, Pakistan</span>
              </ContactItem>
              <ContactItem>
                <FaPhone />
                <span>03114315611</span>
              </ContactItem>
              <ContactItem>
                <FaEnvelope />
                <span>contact@bestechsolz.com</span>
              </ContactItem>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © {currentYear} Bestech Vision. All rights reserved.
          </Copyright>
          <BackToTop onClick={scrollToTop} aria-label="Back to top">
            <FaChevronUp />
          </BackToTop>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
