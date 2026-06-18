import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Page = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 1rem 4rem;
  background: ${(p) => p.theme.colors.gray[100]};
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 0.35rem;
`;

const Sub = styled.p`
  color: ${(p) => p.theme.colors.gray[600]};
  margin-bottom: 1.75rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
`;

const Card = styled(Link)`
  background: ${(p) => p.theme.colors.white};
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: ${(p) => p.theme.shadows.md};
  font-weight: 600;
  color: ${(p) => p.theme.colors.dark};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(p) => p.theme.shadows.lg};
  }
`;

const Out = styled.button`
  margin-top: 2rem;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  border: none;
  background: ${(p) => p.theme.colors.gray[700]};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <Page>
      <Container>
        <Title>Admin</Title>
        <Sub>
          Signed in as <strong>{user?.username}</strong>. Choose a section to manage content stored in MySQL.
        </Sub>
        <Grid>
          <Card to="/admin/blog">Blog posts</Card>
          <Card to="/admin/team">Team members</Card>
          <Card to="/admin/testimonials">Testimonials</Card>
          <Card to="/admin/portfolio">Portfolio projects</Card>
          <Card to="/admin/services">Services</Card>
        </Grid>
        <Out type="button" onClick={() => logout()}>
          Sign out
        </Out>
      </Container>
    </Page>
  );
}
