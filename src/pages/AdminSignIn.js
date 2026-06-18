import React, { useState } from 'react';
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Page = styled.div`
  min-height: calc(100vh - 80px);
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
  background: ${(p) => p.theme.colors.gray[100]};
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${(p) => p.theme.colors.white};
  border-radius: 14px;
  box-shadow: ${(p) => p.theme.shadows.lg};
  padding: 2rem 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.35rem;
`;

const Sub = styled.p`
  margin: 0 0 1.25rem;
  color: ${(p) => p.theme.colors.gray[600]};
  font-size: 0.95rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${(p) => p.theme.colors.gray[700]};
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${(p) => p.theme.colors.gray[300]};
  border-radius: 8px;
  padding: 0.7rem 0.85rem;
  margin-top: 0.35rem;
  color: ${(p) => p.theme.colors.gray[900]};
`;

const Button = styled.button`
  background: ${(p) => p.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem;
  font-weight: 600;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(p) => (p.$error ? '#b91c1c' : '#166534')};
`;

const Back = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  color: ${(p) => p.theme.colors.primary};
  font-weight: 600;
`;

export default function AdminSignIn() {
  const { user, booting, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);

  if (!booting && user) {
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    setError(false);
    try {
      await login(username.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(true);
      setMsg(err.message || 'Sign in failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Page>
      <Card>
        <Title>Admin sign in</Title>
        <Sub>Use the account you created with the server setup (see seed_admin.php).</Sub>
        <Form onSubmit={onSubmit}>
          <div>
            <Label htmlFor="user">Username</Label>
            <Input
              id="user"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="pass">Password</Label>
            <Input
              id="pass"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </Button>
          {msg ? <Message $error={error}>{msg}</Message> : null}
        </Form>
        <Back to="/">← Back to site</Back>
      </Card>
    </Page>
  );
}
