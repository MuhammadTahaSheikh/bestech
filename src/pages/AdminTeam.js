import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  assetUrl,
  createTeamMember,
  deleteTeamMember,
  fetchTeamMembers,
  updateTeamMember
} from '../utils/cmsApi';

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

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${(p) => p.theme.colors.gray[300]};
  border-radius: 8px;
  padding: 0.7rem 0.8rem;
  color: ${(p) => p.theme.colors.gray[900]};
  min-height: 100px;
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

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const List = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Row = styled.div`
  border: 1px solid ${(p) => p.theme.colors.gray[200]};
  border-radius: 10px;
  padding: 0.75rem;
  display: grid;
  gap: 0.35rem;
`;

const Message = styled.p`
  margin: 0;
  font-weight: 600;
  color: ${(p) => (p.$error ? '#b91c1c' : '#166534')};
`;

export default function AdminTeam() {
  const initialForm = {
    name: '',
    role: '',
    bio: '',
    avatar: '',
    skills: '',
    linkedin: '#',
    twitter: '#',
    github: '#',
    email: '',
    photo: null
  };
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(initialForm);

  const load = useCallback(async () => {
    const rows = await fetchTeamMembers();
    setMembers(Array.isArray(rows) ? rows : []);
  }, []);

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        await load();
      } catch (e) {
        if (!c) {
          setError(true);
          setMessage(e.message || 'Could not load team.');
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
      fd.append('name', form.name.trim());
      fd.append('role', form.role.trim());
      fd.append('bio', form.bio.trim());
      fd.append('avatar', form.avatar.trim());
      fd.append('skills', form.skills.trim());
      fd.append('linkedin', form.linkedin.trim() || '#');
      fd.append('twitter', form.twitter.trim() || '#');
      fd.append('github', form.github.trim() || '#');
      fd.append('email', form.email.trim());
      if (form.photo) fd.append('photo', form.photo);
      if (editingId) {
        fd.append('id', String(editingId));
        await updateTeamMember(fd);
      } else {
        await createTeamMember(fd);
      }
      setForm(initialForm);
      setEditingId(null);
      await load();
      setMessage(editingId ? 'Team member updated.' : 'Team member saved.');
    } catch (err) {
      setError(true);
      setMessage(err.message || 'Failed to save.');
    } finally {
      setSubmitting(false);
    }
  };

  const onEdit = (member) => {
    const social = member.social || {};
    setEditingId(member.id);
    setForm({
      name: member.name || '',
      role: member.role || '',
      bio: member.bio || '',
      avatar: member.avatar || '',
      skills: Array.isArray(member.skills) ? member.skills.join(', ') : '',
      linkedin: social.linkedin || '#',
      twitter: social.twitter || '#',
      github: social.github || '#',
      email: social.email || '',
      photo: null
    });
    setError(false);
    setMessage('Editing selected team member.');
  };

  const onDelete = async (id) => {
    if (!window.confirm('Remove this team member from the database?')) return;
    try {
      await deleteTeamMember(id);
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
          <Title>Team</Title>
          <Hint>Skills: comma-separated. Photo optional (jpg/png/webp/gif, max 5MB). Public Team page loads from DB when rows exist.</Hint>
        </Panel>

        <Panel>
          <Title>{editingId ? 'Edit member' : 'Add member'}</Title>
          <Form onSubmit={onSubmit}>
            <div>
              <Label>Name *</Label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              />
            </div>
            <div>
              <Label>Role</Label>
              <Input
                value={form.role}
                onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
              />
            </div>
            <div>
              <Label>Bio *</Label>
              <TextArea
                required
                value={form.bio}
                onChange={(e) => setForm((s) => ({ ...s, bio: e.target.value }))}
              />
            </div>
            <div>
              <Label>Avatar initials (optional)</Label>
              <Input
                placeholder="e.g. SF"
                value={form.avatar}
                onChange={(e) => setForm((s) => ({ ...s, avatar: e.target.value }))}
              />
            </div>
            <div>
              <Label>Skills</Label>
              <Input
                placeholder="React, CRM, ..."
                value={form.skills}
                onChange={(e) => setForm((s) => ({ ...s, skills: e.target.value }))}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              />
            </div>
            <div>
              <Label>LinkedIn URL</Label>
              <Input
                value={form.linkedin}
                onChange={(e) => setForm((s) => ({ ...s, linkedin: e.target.value }))}
              />
            </div>
            <div>
              <Label>Twitter URL</Label>
              <Input
                value={form.twitter}
                onChange={(e) => setForm((s) => ({ ...s, twitter: e.target.value }))}
              />
            </div>
            <div>
              <Label>GitHub URL</Label>
              <Input
                value={form.github}
                onChange={(e) => setForm((s) => ({ ...s, github: e.target.value }))}
              />
            </div>
            <div>
              <Label>Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm((s) => ({ ...s, photo: e.target.files?.[0] || null }))
                }
              />
            </div>
            <Actions>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving…' : editingId ? 'Update member' : 'Add member'}
              </Button>
              {editingId ? (
                <Button
                  type="button"
                  disabled={submitting}
                  onClick={() => {
                    setEditingId(null);
                    setForm(initialForm);
                    setError(false);
                    setMessage('Edit cancelled.');
                  }}
                >
                  Cancel edit
                </Button>
              ) : null}
            </Actions>
            {message ? <Message $error={error}>{message}</Message> : null}
          </Form>
        </Panel>

        <Panel>
          <Title>Current members ({loading ? '…' : members.length})</Title>
          {loading ? <Hint>Loading…</Hint> : null}
          {!loading && members.length === 0 ? <Hint>No database rows yet — site falls back to static team.</Hint> : null}
          <List>
            {members.map((m) => (
              <Row key={m.id}>
                <strong>{m.name}</strong>
                <Hint>
                  {m.role} · {m.email}{' '}
                  {m.image ? (
                    <a href={assetUrl(m.image)} target="_blank" rel="noreferrer">
                      photo
                    </a>
                  ) : null}
                </Hint>
                <Actions>
                  <Button type="button" onClick={() => onEdit(m)}>
                    Edit
                  </Button>
                  <Danger type="button" onClick={() => onDelete(m.id)}>
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
