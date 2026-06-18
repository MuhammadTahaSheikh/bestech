import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Center = styled.div`
  min-height: 60vh;
  display: grid;
  place-items: center;
  color: ${(p) => p.theme.colors.gray[600]};
  font-weight: 600;
`;

export default function ProtectedRoute({ children }) {
  const { user, booting } = useAuth();
  const location = useLocation();

  if (booting) {
    return <Center>Checking session…</Center>;
  }

  if (!user) {
    return <Navigate to="/admin/signin" replace state={{ from: location.pathname }} />;
  }

  return children;
}
