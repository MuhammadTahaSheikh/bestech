import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  createCmsService,
  deleteCmsService,
  fetchCmsServices,
  updateCmsService
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
  min-height: 140px;
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
  slug: '',
  title: '',
  iconKey: 'code',
  description: '',
  features: ''
};

export default function AdminServices() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [form, setForm] = useState(initial);
  const [editingDbId, setEditingDbId] = useState(null);

  const load = useCallback(async () => {
    const data = await fetchCmsServices();
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
          setMessage(e.message || 'Could not load services.');
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
      fd.append('slug', form.slug.trim());
      fd.append('title', form.title.trim());
      fd.append('iconKey', form.iconKey);
      fd.append('description', form.description.trim());
      fd.append('features', form.features.trim());
      if (editingDbId) {
        fd.append('dbId', String(editingDbId));
        await updateCmsService(fd);
      } else {
        await createCmsService(fd);
      }
      setForm(initial);
      setEditingDbId(null);
      await load();
      setMessage(editingDbId ? 'Service updated.' : 'Service added.');
    } catch (err) {
      setError(true);
      setMessage(err.message || 'Failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const onEdit = (service) => {
    setEditingDbId(service.dbId);
    setForm({
      slug: service.slug || '',
      title: service.title || '',
      iconKey: service.iconKey || 'code',
      description: service.description || '',
      features: Array.isArray(service.features) ? service.features.join('\n') : ''
    });
    setError(false);
    setMessage('Editing selected service.');
  };

  const onDelete = async (row) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await deleteCmsService(row.dbId, row.slug);
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
          <Title>Services</Title>
          <Hint>Slug is optional (generated from title). Features: one per line. Icon keys match the public Services page.</Hint>
        </Panel>

        <Panel>
          <Title>{editingDbId ? 'Edit service' : 'Add service'}</Title>
          <Form onSubmit={onSubmit}>
            <div>
              <Label>Slug (optional)</Label>
              <Input
                placeholder="e.g. custom-solutions"
                value={form.slug}
                onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))}
              />
            </div>
            <div>
              <Label>Title *</Label>
              <Input
                required
                value={form.title}
                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
              />
            </div>
            <div>
              <Label>Icon</Label>
              <Select
                value={form.iconKey}
                onChange={(e) => setForm((s) => ({ ...s, iconKey: e.target.value }))}
              >
                <option value="code">code</option>
                <option value="rocket">rocket</option>
                <option value="mobile">mobile</option>
                <option value="users">users</option>
                <option value="database">database</option>
                <option value="chart">chart</option>
                <option value="robot">robot</option>
                <option value="cog">cog</option>
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
              <Label>Features (one per line)</Label>
              <TextArea value={form.features} onChange={(e) => setForm((s) => ({ ...s, features: e.target.value }))} />
            </div>
            <Actions>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving…' : editingDbId ? 'Update service' : 'Add service'}
              </Button>
              {editingDbId ? (
                <Button
                  type="button"
                  disabled={submitting}
                  onClick={() => {
                    setEditingDbId(null);
                    setForm(initial);
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
          <Title>Services ({loading ? '…' : rows.length})</Title>
          <List>
            {rows.map((r) => (
              <Row key={r.slug}>
                <strong>{r.title}</strong>
                <Hint>{r.slug}</Hint>
                <Actions>
                  <Button type="button" onClick={() => onEdit(r)}>
                    Edit
                  </Button>
                  <Danger type="button" onClick={() => onDelete(r)}>
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
