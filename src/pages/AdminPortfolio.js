import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createPortfolioProject, deletePortfolioProject, fetchPortfolioProjects } from '../utils/cmsApi';

const Page = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem 4rem;
  background: ${(p) => p.theme.colors.gray[100]};
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
`;

const Panel = styled.section`
  background: ${(p) => p.theme.colors.white};
  border-radius: 12px;
  box-shadow: ${(p) => p.theme.shadows.md};
  padding: 1.25rem;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 0.9rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${(p) => p.theme.colors.gray[700]};
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${(p) => p.theme.colors.gray[300]};
  border-radius: 8px;
  padding: 0.7rem 0.8rem;
  color: ${(p) => p.theme.colors.gray[900]};
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid ${(p) => p.theme.colors.gray[300]};
  border-radius: 8px;
  padding: 0.7rem 0.8rem;
  color: ${(p) => p.theme.colors.gray[900]};
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${(p) => p.theme.colors.gray[300]};
  border-radius: 8px;
  padding: 0.7rem 0.8rem;
  color: ${(p) => p.theme.colors.gray[900]};
  min-height: 120px;
  resize: vertical;
`;

const Button = styled.button`
  background: ${(p) => p.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-weight: 600;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Danger = styled(Button)`
  background: #dc2626;
`;

const Secondary = styled(Link)`
  display: inline-block;
  padding: 0.5rem 0;
  color: ${(p) => p.theme.colors.primary};
  font-weight: 600;
`;

const Hint = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${(p) => p.theme.colors.gray[600]};
`;

const List = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Row = styled.div`
  border: 1px solid ${(p) => p.theme.colors.gray[200]};
  border-radius: 10px;
  padding: 0.75rem;
`;

const Message = styled.p`
  margin: 0;
  font-weight: 600;
  color: ${(p) => (p.$error ? '#b91c1c' : '#166534')};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const initial = {
  title: '',
  category: 'web',
  categoryLabel: '',
  description: '',
  iconKey: 'code',
  technologies: '',
  duration: '',
  team: '',
  features: '',
  liveUrl: '#',
  githubUrl: '#'
};

export default function AdminPortfolio() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [form, setForm] = useState(initial);

  const load = useCallback(async () => {
    const data = await fetchPortfolioProjects();
    setRows(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        await load();
      } catch (e) {
        if (!c) {
          setError(true);
          setMessage(e.message || 'Could not load portfolio.');
        }
      } finally {
        if (!c) setLoading(false);
      }
    })();
    return () => {
      c = true;
    };
  }, [load]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    setMessage('');
    try {
      const fd = new FormData();
      fd.append('title', form.title.trim());
      fd.append('category', form.category);
      fd.append('categoryLabel', form.categoryLabel.trim());
      fd.append('description', form.description.trim());
      fd.append('iconKey', form.iconKey);
      fd.append('technologies', form.technologies.trim());
      fd.append('duration', form.duration.trim());
      fd.append('team', form.team.trim());
      fd.append('features', form.features.trim());
      fd.append('liveUrl', form.liveUrl.trim() || '#');
      fd.append('githubUrl', form.githubUrl.trim() || '#');
      await createPortfolioProject(fd);
      setForm(initial);
      await load();
      setMessage('Project added.');
    } catch (err) {
      setError(true);
      setMessage(err.message || 'Failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deletePortfolioProject(id);
      await load();
      setError(false);
      setMessage('Deleted.');
    } catch (err) {
      setError(true);
      setMessage(err.message || 'Delete failed.');
    }
  };

  return (
    <Page>
      <Container>
        <Panel>
          <Secondary to="/admin">← Admin home</Secondary>
          <Title>Portfolio</Title>
          <Hint>
            Category must match filters: web, realestate, extension, automation. Features: one per line. Technologies:
            comma-separated.
          </Hint>
        </Panel>

        <Panel>
          <Title>Add project</Title>
          <Form onSubmit={onSubmit}>
            <div>
              <Label>Title *</Label>
              <Input
                required
                value={form.title}
                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
              />
            </div>
            <div>
              <Label>Category *</Label>
              <Select
                value={form.category}
                onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
              >
                <option value="web">web</option>
                <option value="realestate">realestate</option>
                <option value="extension">extension</option>
                <option value="automation">automation</option>
              </Select>
            </div>
            <div>
              <Label>Category label (shown on cards)</Label>
              <Input
                placeholder="e.g. Web Development"
                value={form.categoryLabel}
                onChange={(e) => setForm((s) => ({ ...s, categoryLabel: e.target.value }))}
              />
            </div>
            <div>
              <Label>Card icon key</Label>
              <Select
                value={form.iconKey}
                onChange={(e) => setForm((s) => ({ ...s, iconKey: e.target.value }))}
              >
                <option value="code">code</option>
                <option value="users">users</option>
                <option value="rocket">rocket</option>
                <option value="cloud">cloud</option>
                <option value="mobile">mobile</option>
                <option value="shield">shield</option>
              </Select>
            </div>
            <div>
              <Label>Description *</Label>
              <TextArea
                required
                value={form.description}
                onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
              />
            </div>
            <div>
              <Label>Technologies (comma-separated)</Label>
              <Input
                value={form.technologies}
                onChange={(e) => setForm((s) => ({ ...s, technologies: e.target.value }))}
              />
            </div>
            <div>
              <Label>Duration</Label>
              <Input
                placeholder="e.g. 6 months"
                value={form.duration}
                onChange={(e) => setForm((s) => ({ ...s, duration: e.target.value }))}
              />
            </div>
            <div>
              <Label>Team size text</Label>
              <Input
                placeholder="e.g. 5 developers"
                value={form.team}
                onChange={(e) => setForm((s) => ({ ...s, team: e.target.value }))}
              />
            </div>
            <div>
              <Label>Features (one per line)</Label>
              <TextArea value={form.features} onChange={(e) => setForm((s) => ({ ...s, features: e.target.value }))} />
            </div>
            <div>
              <Label>Live URL</Label>
              <Input value={form.liveUrl} onChange={(e) => setForm((s) => ({ ...s, liveUrl: e.target.value }))} />
            </div>
            <div>
              <Label>GitHub URL</Label>
              <Input value={form.githubUrl} onChange={(e) => setForm((s) => ({ ...s, githubUrl: e.target.value }))} />
            </div>
            <Actions>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving…' : 'Add project'}
              </Button>
            </Actions>
            {message ? <Message $error={error}>{message}</Message> : null}
          </Form>
        </Panel>

        <Panel>
          <Title>Projects ({loading ? '…' : rows.length})</Title>
          <List>
            {rows.map((p) => (
              <Row key={p.id}>
                <strong>{p.title}</strong>
                <Hint>
                  {p.category} · {p.categoryLabel}
                </Hint>
                <Actions>
                  <Danger type="button" onClick={() => onDelete(p.id)}>
                    Delete
                  </Danger>
                </Actions>
              </Row>
            ))}
          </List>
        </Panel>
      </Container>
    </Page>
  );
}
