import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const BAR_HEIGHT = '48px';

const Bar = styled.nav`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 999;
  min-height: ${BAR_HEIGHT};
  background: linear-gradient(
    135deg,
    ${(p) => p.theme.colors.secondary} 0%,
    ${(p) => p.theme.colors.primary} 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: ${BAR_HEIGHT};
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.5rem;
  flex: 1;
  min-width: 0;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    display: none;
  }
`;

const LinkStyled = styled(NavLink)`
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.4rem 0.65rem;
  border-radius: 6px;
  white-space: nowrap;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.12);
  }

  &.active {
    color: #fff;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const UserMeta = styled.span`
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.8rem;
  display: none;

  @media (min-width: ${(p) => p.theme.breakpoints.lg}) {
    display: inline;
    margin-right: 0.25rem;
  }
`;

const OutButton = styled.button`
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    display: none;
  }
`;

const Toggle = styled.button`
  display: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    display: flex;
  }
`;

const MobileSheet = styled.div`
  display: none;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    display: ${(p) => (p.$open ? 'flex' : 'none')};
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.75rem 1rem 1rem;
    background: ${(p) => p.theme.colors.secondary};
    border-top: 1px solid rgba(255, 255, 255, 0.12);
  }
`;

const MobileLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  font-weight: 600;
  padding: 0.65rem 0.5rem;
  border-radius: 6px;

  &.active {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const MobileOut = styled.button`
  margin-top: 0.35rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 600;
  padding: 0.65rem;
  border-radius: 6px;
  cursor: pointer;
`;

const adminLinks = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/team', label: 'Team', end: false },
  { to: '/admin/blog', label: 'Blog', end: false },
  { to: '/admin/testimonials', label: 'Testimonials', end: false },
  { to: '/admin/portfolio', label: 'Portfolio', end: false },
  { to: '/admin/services', label: 'Services', end: false }
];

export const ADMIN_SUBNAV_HEIGHT_PX = 48;

export default function AdminSubNavbar() {
  const { user, booting, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (booting || !user) return null;

  const handleSignOut = async () => {
    setOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <Bar role="navigation" aria-label="Admin content tools">
      <Inner>
        <Links>
          {adminLinks.map(({ to, label, end }) => (
            <LinkStyled key={to} to={to} end={end}>
              {label}
            </LinkStyled>
          ))}
        </Links>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UserMeta>Signed in: {user.username}</UserMeta>
          <OutButton type="button" onClick={handleSignOut}>
            Sign out
          </OutButton>
          <Toggle
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Close admin menu' : 'Open admin menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </Toggle>
        </div>
      </Inner>
      <MobileSheet $open={open}>
        {adminLinks.map(({ to, label, end }) => (
          <MobileLink key={to} to={to} end={end} onClick={() => setOpen(false)}>
            {label}
          </MobileLink>
        ))}
        <MobileOut type="button" onClick={handleSignOut}>
          Sign out
        </MobileOut>
      </MobileSheet>
    </Bar>
  );
}
