import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: ${props => props.scrolled ? 'blur(20px)' : 'blur(10px)'};
  -webkit-backdrop-filter: ${props => props.scrolled ? 'blur(20px)' : 'blur(10px)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: ${props => props.scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: relative;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 1rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 0.5rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-1px);
  }
`;

const LogoImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 12px;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 75px;
    height: 75px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 70px;
    height: 70px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 65px;
    height: 65px;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
  flex: 1;
  justify-content: center;
  margin: 0;
  padding: 0;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.gray[50]};
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.gray[100]};
    font-weight: 600;
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const CTAButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.secondary} 0%, ${props => props.theme.colors.primary} 100%);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    border-radius: 6px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 0.35rem 0.7rem;
    font-size: 0.75rem;
    border-radius: 5px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.dark};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: none;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1.5rem;
  }
`;

const MobileNavLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MobileNavLink = styled(Link)`
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  font-weight: 500;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: block;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:focus {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.primary};
    outline: none;
  }

  &:active {
    background: ${props => props.theme.colors.gray[200]};
    transform: scale(0.98);
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.gray[100]};
    font-weight: 600;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
  min-width: 200px;
  z-index: 1001;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.5rem;
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: -2px;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        { name: 'Software Development', path: '/services#software-development' },
        { name: 'Web Development', path: '/services#web-development' },
        { name: 'App Development', path: '/services#app-development' },
        { name: 'Social Media Management', path: '/services#social-media' },
        { name: 'CRM Solutions', path: '/services#crm-solutions' },
        { name: 'Graphic Design', path: '/services#graphic-design' },
        { name: 'AI Bot Development', path: '/services#ai-bot-development' }
      ]
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <Nav scrolled={scrolled} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <NavContainer>
        <Logo to="/">
          <LogoImage src="/bestech.png" alt="Bestech Vision" />
        </Logo>

        <NavLinks role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavItem key={item.name}>
              {item.dropdown ? (
                <div
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  onFocus={() => setServicesDropdownOpen(true)}
                  onBlur={() => setServicesDropdownOpen(false)}
                >
                  <NavLink 
                    to={item.path} 
                    className={location.pathname === item.path ? 'active' : ''}
                    aria-haspopup="true"
                    aria-expanded={servicesDropdownOpen}
                  >
                    {item.name}
                    <FaChevronDown size={12} aria-hidden="true" />
                  </NavLink>
                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <Dropdown
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        role="menu"
                        aria-label="Services submenu"
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <DropdownItem 
                            key={dropdownItem.name} 
                            to={dropdownItem.path}
                            role="menuitem"
                          >
                            {dropdownItem.name}
                          </DropdownItem>
                        ))}
                      </Dropdown>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                  {item.name}
                </NavLink>
              )}
            </NavItem>
          ))}
        </NavLinks>

        <RightSection>
          <CTAButton to="/appointment">
            Book Free Meeting
          </CTAButton>

          <MobileMenuButton 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </RightSection>
      </NavContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <MobileNavLinks>
              {navItems.map((item) => (
                <li key={item.name}>
                  <MobileNavLink to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                    {item.name}
                  </MobileNavLink>
                  {item.dropdown && (
                    <div style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
                      {item.dropdown.map((dropdownItem) => (
                        <MobileNavLink key={dropdownItem.name} to={dropdownItem.path}>
                          {dropdownItem.name}
                        </MobileNavLink>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </MobileNavLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;
