import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  defaultTestimonials,
  loadTestimonials,
  saveTestimonials
} from '../utils/testimonialsStorage';

const Page = styled.div`
  min-height: calc(100vh - 80px);
  padding: 2rem 1rem 4rem;
  background: ${(p) => p.theme.colors.gray[100]};
`;

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
  display: grid;
  gap: 1.25rem;
`;

const Panel = styled.section`
  background: ${(p) => p.theme.colors.white};
  border-radius: 12px;
  box-shadow: ${(p) => p.theme.shadows.md};
  padding: 1.5rem;
`;

const Title = styled.h1`
  margin-bottom: 0.25rem;
`;

const Sub = styled.p`
  color: ${(p) => p.theme.colors.gray[600]};
  margin-bottom: 0.5rem;
  line-height: 1.65;
`;

const Secondary = styled(Link)`
  display: inline-block;
  color: ${(p) => p.theme.colors.primary};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${(p) => p.theme.colors.gray[700]};
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${(p) => p.theme.colors.gray[300]};
  border-radius: 8px;
  padding: 0.65rem 0.75rem;
  color: ${(p) => p.theme.colors.gray[900]};
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${(p) => p.theme.colors.gray[300]};
  border-radius: 8px;
  padding: 0.65rem 0.75rem;
  color: ${(p) => p.theme.colors.gray[900]};
  min-height: 120px;
  resize: vertical;
`;

const Button = styled.button`
  background: ${(p) => p.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 0.9rem;
  font-weight: 600;
`;

const Danger = styled(Button)`
  background: #dc2626;
`;

const Muted = styled(Button)`
  background: ${(p) => p.theme.colors.gray[600]};
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
  padding: 0.8rem;
`;

const Message = styled.p`
  margin: 0;
  font-weight: 600;
  color: ${(p) => (p.$error ? '#b91c1c' : '#166534')};
`;

const initialForm = {
  author: '',
  position: '',
  text: '',
  avatar: '',
  rating: '5'
};

export default function AdminTestimonials() {
  const [rows, setRows] = useState(loadTestimonials());
  const [form, setForm] = useState(initialForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.author.trim() || !form.text.trim()) {
      setError(true);
      setMessage('Author and testimonial text are required.');
      return;
    }

    const rating = Math.min(5, Math.max(1, Number(form.rating) || 5));
    const row = {
      author: form.author.trim(),
      position: form.position.trim(),
      text: form.text.trim(),
      avatar: form.avatar.trim(),
      rating
    };

    const next = [...rows];
    if (editingIndex !== null) next[editingIndex] = row;
    else next.push(row);
    setRows(next);
    saveTestimonials(next);
    setForm(initialForm);
    setEditingIndex(null);
    setError(false);
    setMessage(editingIndex !== null ? 'Testimonial updated.' : 'Testimonial added.');
  };

  const onEdit = (index) => {
    const row = rows[index];
    setEditingIndex(index);
    setForm({
      author: row.author || '',
      position: row.position || '',
      text: row.text || '',
      avatar: row.avatar || '',
      rating: String(row.rating || 5)
    });
    setError(false);
    setMessage('Editing selected testimonial.');
  };

  const onDelete = (index) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const next = rows.filter((_, i) => i !== index);
    setRows(next);
    saveTestimonials(next.length > 0 ? next : defaultTestimonials);
    setError(false);
    setMessage('Testimonial deleted.');
  };

  const onReset = () => {
    setRows(defaultTestimonials);
    saveTestimonials(defaultTestimonials);
    setEditingIndex(null);
    setForm(initialForm);
    setError(false);
    setMessage('Testimonials reset to defaults.');
  };

  return (
    <Page>
      <Container>
        <Panel>
          <Secondary to="/admin">← Admin home</Secondary>
          <Title>Testimonials</Title>
          <Sub>
            Testimonials are editable here and saved in browser storage. The home page carousel loads these values.
          </Sub>
        </Panel>

        <Panel>
          <Title>{editingIndex !== null ? 'Edit testimonial' : 'Add testimonial'}</Title>
          <Form onSubmit={onSubmit}>
            <div>
              <Label>Author *</Label>
              <Input value={form.author} onChange={(e) => setForm((s) => ({ ...s, author: e.target.value }))} />
            </div>
            <div>
              <Label>Position</Label>
              <Input value={form.position} onChange={(e) => setForm((s) => ({ ...s, position: e.target.value }))} />
            </div>
            <div>
              <Label>Avatar URL / Path</Label>
              <Input value={form.avatar} onChange={(e) => setForm((s) => ({ ...s, avatar: e.target.value }))} />
            </div>
            <div>
              <Label>Rating (1-5)</Label>
              <Input
                type="number"
                min="1"
                max="5"
                value={form.rating}
                onChange={(e) => setForm((s) => ({ ...s, rating: e.target.value }))}
              />
            </div>
            <div>
              <Label>Testimonial *</Label>
              <TextArea value={form.text} onChange={(e) => setForm((s) => ({ ...s, text: e.target.value }))} />
            </div>
            <Actions>
              <Button type="submit">{editingIndex !== null ? 'Update testimonial' : 'Add testimonial'}</Button>
              {editingIndex !== null ? (
                <Muted
                  type="button"
                  onClick={() => {
                    setEditingIndex(null);
                    setForm(initialForm);
                    setMessage('Edit cancelled.');
                    setError(false);
                  }}
                >
                  Cancel edit
                </Muted>
              ) : null}
              <Danger type="button" onClick={onReset}>
                Reset defaults
              </Danger>
            </Actions>
            {message ? <Message $error={error}>{message}</Message> : null}
          </Form>
        </Panel>

        <Panel>
          <Title>Current testimonials ({rows.length})</Title>
          <List>
            {rows.map((row, index) => (
              <Row key={`${row.author}-${index}`}>
                <strong>{row.author}</strong>
                <Sub>{row.position}</Sub>
                <Sub>{row.text}</Sub>
                <Actions>
                  <Button type="button" onClick={() => onEdit(index)}>
                    Edit
                  </Button>
                  <Danger type="button" onClick={() => onDelete(index)}>
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
