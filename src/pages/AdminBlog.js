import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { createBlog, deleteBlogBySlug, fetchBlogs, updateBlog } from '../utils/blogApi';

const Page = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem 4rem;
  background: ${(props) => props.theme.colors.gray[100]};
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
`;

const Panel = styled.section`
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.shadows.md};
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
  color: ${(props) => props.theme.colors.gray[700]};
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-radius: 8px;
  padding: 0.7rem 0.8rem;
  color: ${(props) => props.theme.colors.gray[900]};
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-radius: 8px;
  padding: 0.7rem 0.8rem;
  color: ${(props) => props.theme.colors.gray[900]};
  min-height: 120px;
  resize: vertical;
`;

const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
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

const Secondary = styled(Button)`
  background: ${(props) => props.theme.colors.gray[600]};
`;

const Danger = styled(Button)`
  background: #dc2626;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Message = styled.p`
  margin: 0;
  color: ${(props) => (props.$error ? '#b91c1c' : '#166534')};
  font-weight: 600;
`;

const ImagePreview = styled.img`
  max-width: 280px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
`;

const BlogList = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const BlogCard = styled.div`
  border: 1px solid ${(props) => props.theme.colors.gray[200]};
  border-radius: 10px;
  padding: 0.8rem;
  display: grid;
  gap: 0.4rem;
`;

const Small = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.gray[600]};
  font-size: 0.9rem;
`;

const Hint = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.gray[500]};
  font-size: 0.85rem;
`;

const initialForm = {
  title: '',
  excerpt: '',
  content: '',
  author: '',
  category: ''
};

function revokePreview(url) {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

const AdminBlog = () => {
  const [form, setForm] = useState(initialForm);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [editingSlug, setEditingSlug] = useState('');

  const reloadBlogs = useCallback(async () => {
    const data = await fetchBlogs();
    setBlogs(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await reloadBlogs();
        if (!cancelled) setMessage('');
      } catch (e) {
        if (!cancelled) {
          setError(true);
          setMessage(e.message || 'Could not load blogs. Start the API and check MySQL.');
        }
      } finally {
        if (!cancelled) setLoadingList(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reloadBlogs]);

  useEffect(
    () => () => {
      revokePreview(coverPreview);
    },
    [coverPreview]
  );

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError(true);
      setMessage('Please upload a valid image file.');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(true);
      setMessage('Image size should be 5MB or less.');
      return;
    }

    setCoverFile(file);
    setCoverPreview((prev) => {
      revokePreview(prev);
      return URL.createObjectURL(file);
    });
    setError(false);
    setMessage('Image ready to publish with the post.');
  };

  const clearFormAndImage = () => {
    setForm(initialForm);
    setCoverFile(null);
    setEditingSlug('');
    setCoverPreview((prev) => {
      revokePreview(prev);
      return '';
    });
  };

  const startEdit = (blog) => {
    setForm({
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      author: blog.author || '',
      category: blog.category || ''
    });
    setCoverFile(null);
    setEditingSlug(blog.slug || '');
    setCoverPreview((prev) => {
      revokePreview(prev);
      return blog.coverImage ? blog.coverImage : '';
    });
    setError(false);
    setMessage('Editing selected blog. Upload a new image only if you want to replace current one.');
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();

    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim()) {
      setError(true);
      setMessage('Title, excerpt, and content are required.');
      return;
    }

    setSubmitting(true);
    setError(false);
    setMessage('');
    try {
      const fd = new FormData();
      fd.append('title', form.title.trim());
      fd.append('excerpt', form.excerpt.trim());
      fd.append('content', form.content.trim());
      fd.append('author', (form.author || 'Admin').trim() || 'Admin');
      fd.append('category', (form.category || 'General').trim() || 'General');
      if (coverFile) {
        fd.append('coverImage', coverFile);
      }
      if (editingSlug) {
        fd.append('slug', editingSlug);
        await updateBlog(fd);
      } else {
        await createBlog(fd);
      }
      await reloadBlogs();
      clearFormAndImage();
      setMessage(editingSlug ? 'Blog updated successfully.' : 'Blog published successfully.');
    } catch (e) {
      setError(true);
      setMessage(e.message || 'Failed to publish.');
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (slug) => {
    if (!window.confirm('Delete this blog post permanently?')) {
      return;
    }
    try {
      await deleteBlogBySlug(slug);
      await reloadBlogs();
      setError(false);
      setMessage('Blog deleted.');
    } catch (e) {
      setError(true);
      setMessage(e.message || 'Failed to delete.');
    }
  };

  return (
    <Page>
      <Container>
        <Panel>
          <Title>Blog Admin Panel</Title>
          <Small>Posts are stored in MySQL via the Blog API.</Small>
          <Hint>
            Blog create/delete require signing in at /admin/signin. Run backend/api/cms_schema.sql on MySQL, create an admin with seed_admin.php (then delete it), and keep REACT_APP_API_BASE pointed at your PHP host.
          </Hint>
          <Small>
            <Link to="/admin">Admin home</Link>
          </Small>
          <Small>
            Public view: <Link to="/blog">Blog Page</Link>
          </Small>
        </Panel>

        <Panel>
          <Title>{editingSlug ? 'Edit Blog' : 'Create New Blog'}</Title>
          <Form onSubmit={onSubmit}>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Short Excerpt</Label>
              <TextArea
                id="excerpt"
                value={form.excerpt}
                onChange={(e) => updateField('excerpt', e.target.value)}
                placeholder="Short preview text"
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <TextArea
                id="content"
                value={form.content}
                onChange={(e) => updateField('content', e.target.value)}
                placeholder="Write full blog content"
                style={{ minHeight: 220 }}
              />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={form.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="Author name"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                placeholder="Example: Web Development"
              />
            </div>

            <div>
              <Label htmlFor="coverImage">Cover Image</Label>
              <Input id="coverImage" type="file" accept="image/*" onChange={onImageChange} />
              {coverPreview ? <ImagePreview src={coverPreview} alt="" /> : null}
            </div>

            <Actions>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving…' : editingSlug ? 'Update Blog' : 'Publish Blog'}
              </Button>
              <Secondary type="button" onClick={clearFormAndImage} disabled={submitting}>
                Clear Form
              </Secondary>
            </Actions>
            {message ? <Message $error={error}>{message}</Message> : null}
          </Form>
        </Panel>

        <Panel>
          <Title>Published Blogs</Title>
          {loadingList ? <Small>Loading…</Small> : null}
          {!loadingList && blogs.length === 0 ? (
            <Small>No blogs available.</Small>
          ) : null}
          {!loadingList && blogs.length > 0 ? (
            <BlogList>
              {blogs.map((blog) => (
                <BlogCard key={blog.slug}>
                  <strong>{blog.title}</strong>
                  <Small>
                    {blog.category} · {blog.author}
                  </Small>
                  <Small>{blog.excerpt}</Small>
                  <Actions>
                    <Secondary type="button" onClick={() => startEdit(blog)}>
                      Edit
                    </Secondary>
                    <Danger type="button" onClick={() => onDelete(blog.slug)}>
                      Delete
                    </Danger>
                  </Actions>
                </BlogCard>
              ))}
            </BlogList>
          ) : null}
        </Panel>
      </Container>
    </Page>
  );
};

export default AdminBlog;
