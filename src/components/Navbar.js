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
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: relative;

  @media (max-width: 1440px) {
    padding: 0 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 1.25rem;
  }

  @media (max-width: 1024px) {
    padding: 0 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 1rem;
    justify-content: space-between;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 0.75rem;
    justify-content: space-between;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
  min-width: 200px;
  justify-content: flex-end;

  @media (max-width: 1440px) {
    gap: 1.2rem;
    min-width: 180px;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    gap: 1rem;
    min-width: 160px;
  }

  @media (max-width: 1024px) {
    gap: 0.8rem;
    min-width: 140px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 0.6rem;
    min-width: 120px;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;

  &:hover {
    transform: none;
  }

  &:focus {
    outline: none !important;
    border: none !important;
  }
`;

const LogoImage = styled.img`
  width: 180px;
  height: 60px;
  object-fit: contain;
  border-radius: 8px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  border: none !important;
  outline: none !important;

  &:hover {
    transform: none;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 160px;
    height: 55px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 140px;
    height: 50px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 120px;
    height: 45px;
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
  margin-left: 2rem;
  min-width: 0;

  @media (max-width: 1440px) {
    gap: 1.8rem;
    margin-left: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    gap: 1.6rem;
    margin-left: 1rem;
  }

  @media (max-width: 1024px) {
    gap: 1.4rem;
    margin-left: 0.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
    margin-left: 0;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
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

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ActiveNavLink = styled(NavLink)`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  background: transparent;
  border: none;
  box-shadow: none;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    border-radius: 1px;
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
  min-width: fit-content;

  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.secondary} 0%, ${props => props.theme.colors.primary} 100%);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: 1440px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  @media (max-width: 1024px) {
    padding: 0.55rem 0.9rem;
    font-size: 0.8rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0.5rem 0.8rem;
    font-size: 0.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.4rem 0.7rem;
    font-size: 0.7rem;
    border-radius: 6px;
  }

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding: 0.35rem 0.6rem;
    font-size: 0.65rem;
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
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-width: 44px;
  min-height: 44px;

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
    padding: 1.5rem 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1.25rem 1.5rem;
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

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ActiveMobileNavLink = styled(MobileNavLink)`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  background: transparent;
  border: none;
  box-shadow: none;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    border-radius: 1px;
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
          <LogoImage src="/logo.jpeg" alt="Bestech Vision" />
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
                location.pathname === item.path ? (
                  <ActiveNavLink to={item.path}>
                    {item.name}
                  </ActiveNavLink>
                ) : (
                  <NavLink to={item.path}>
                    {item.name}
                  </NavLink>
                )
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
                  {location.pathname === item.path ? (
                    <ActiveMobileNavLink to={item.path}>
                      {item.name}
                    </ActiveMobileNavLink>
                  ) : (
                    <MobileNavLink to={item.path}>
                      {item.name}
                    </MobileNavLink>
                  )}
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
