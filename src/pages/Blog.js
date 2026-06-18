import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { assetUrl, fetchBlogs } from '../utils/blogApi';

const Page = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem 4rem;
  background: ${(props) => props.theme.colors.gray[50]};
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  margin-bottom: 0.5rem;
`;

const SubText = styled.p`
  color: ${(props) => props.theme.colors.gray[600]};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
`;

const Card = styled.article`
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.shadows.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 190px;
  object-fit: cover;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dbeafe, #f1f5f9);
  color: ${(props) => props.theme.colors.gray[600]};
  font-weight: 600;
`;

const Body = styled.div`
  padding: 1rem;
`;

const Meta = styled.p`
  margin: 0 0 0.5rem;
  color: ${(props) => props.theme.colors.gray[500]};
  font-size: 0.9rem;
`;

const Title = styled.h3`
  margin-bottom: 0.6rem;
`;

const Excerpt = styled.p`
  color: ${(props) => props.theme.colors.gray[700]};
  margin-bottom: 0;
`;

const EmptyState = styled.div`
  padding: 2rem;
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  text-align: center;
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

const Message = styled.p`
  text-align: center;
  color: ${(props) => (props.$error ? '#b91c1c' : props.theme.colors.gray[600])};
`;

const getDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchBlogs();
        if (!cancelled) {
          setBlogs(Array.isArray(data) ? data : []);
          setError('');
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Could not load blogs. Is the blog API running?');
          setBlogs([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Page>
      <Container>
        <Header>
          <Heading>Our Blog</Heading>
          <SubText>Read technology insights and updates from our team.</SubText>
          <SubText>
            Admin can create posts at <Link to="/admin/blog">Admin Blog Panel</Link>.
          </SubText>
        </Header>

        {loading ? <Message>Loading posts…</Message> : null}
        {!loading && error ? <Message $error>{error}</Message> : null}
        {!loading && !error && blogs.length === 0 ? (
          <EmptyState>No blogs published yet.</EmptyState>
        ) : null}
        {!loading && !error && blogs.length > 0 ? (
          <Grid>
            {blogs.map((blog) => (
              <Card key={blog.slug}>
                {blog.coverImage ? (
                  <CoverImage src={assetUrl(blog.coverImage)} alt={blog.title} />
                ) : (
                  <Placeholder>No Image</Placeholder>
                )}
                <Body>
                  <Meta>
                    {blog.category} · {blog.author} · {getDate(blog.createdAt)}
                  </Meta>
                  <Title>{blog.title}</Title>
                  <Excerpt>{blog.excerpt}</Excerpt>
                </Body>
              </Card>
            ))}
          </Grid>
        ) : null}
      </Container>
    </Page>
  );
};

export default Blog;
