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
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(20px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.scrolled ? 'blur(20px)' : 'none'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: ${props => props.scrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
  box-shadow: ${props => props.scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 6px;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    gap: ${props => props.theme.spacing.lg};
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
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.primary};
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.gray[100]};
  }
`;

const CTAButton = styled(Link)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.dark};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
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
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  display: none;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

const MobileNavLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileNavLink = styled(Link)`
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
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
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  min-width: 200px;
  z-index: 1001;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.5rem;
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.primary};
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
        { name: 'Web Development', path: '/services#web-development' },
        { name: 'Mobile Apps', path: '/services#mobile-apps' },
        { name: 'Cloud Solutions', path: '/services#cloud-solutions' },
        { name: 'Consulting', path: '/services#consulting' }
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
          <LogoImage src="/bestech.jpeg" alt="Bestech Vision" />
          Bestech Vision
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

        <CTAButton to="/appointment">
          Book Meeting
        </CTAButton>

        <MobileMenuButton 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
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
