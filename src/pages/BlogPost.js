import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { assetUrl, fetchBlogs } from '../utils/blogApi';

const Page = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem 4rem;
  background: ${(props) => props.theme.colors.gray[50]};
`;

const Container = styled.article`
  max-width: 760px;
  margin: 0 auto;
  background: ${(props) => props.theme.colors.white};
  border-radius: 16px;
  box-shadow: ${(props) => props.theme.shadows.md};
  overflow: hidden;
`;

const Back = styled(Link)`
  display: inline-block;
  margin: 0 0 1rem;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
`;

const Cover = styled.img`
  width: 100%;
  height: auto;
  display: block;
  background: ${(props) => props.theme.colors.gray[100]};
`;

const Body = styled.div`
  padding: 1.5rem 1.5rem 2.25rem;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 2rem 2.25rem 2.75rem;
  }
`;

const Meta = styled.p`
  margin: 0 0 0.75rem;
  color: ${(props) => props.theme.colors.gray[500]};
  font-size: 0.95rem;
`;

const Title = styled.h1`
  margin-bottom: 1.25rem;
  font-size: clamp(1.75rem, 4vw, 2.4rem);
`;

const Paragraph = styled.p`
  color: ${(props) => props.theme.colors.gray[800]};
  margin-bottom: 1rem;
  white-space: pre-wrap;
`;

const Heading = styled.h2`
  margin: 1.6rem 0 0.7rem;
  font-size: 1.35rem;
`;

const Subheading = styled.h3`
  margin: 1.25rem 0 0.55rem;
  font-size: 1.1rem;
`;

const List = styled.ul`
  margin: 0 0 1rem 1.1rem;
  color: ${(props) => props.theme.colors.gray[800]};

  li {
    margin-bottom: 0.45rem;
    line-height: 1.7;
  }
`;

const Wrap = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

const Message = styled.p`
  text-align: center;
  color: ${(props) => (props.$error ? '#b91c1c' : props.theme.colors.gray[600])};
  background: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

const getDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

const isBulletLine = (line) => /^[•\-*]\s+/.test(line);

function headingLevel(line) {
  if (!line || isBulletLine(line) || line.length > 110) return 0;
  if (/^Way \d+\b/.test(line)) return 2;
  if (/^(Before you export|Frequently asked questions|Final thoughts)\b/.test(line)) return 2;
  if (line.endsWith(':') && line.length <= 80) return 3;
  if (line.endsWith('?') && line.length <= 90 && !line.includes('. ')) return 3;
  return 0;
}

function renderContent(content) {
  const lines = String(content || '').replace(/\r\n/g, '\n').split('\n');
  const nodes = [];
  let index = 0;
  let key = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    if (isBulletLine(line)) {
      const items = [];
      while (index < lines.length && isBulletLine(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[•\-*]\s+/, ''));
        index += 1;
      }
      nodes.push(
        <List key={key}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </List>
      );
      key += 1;
      continue;
    }

    const level = headingLevel(line);
    if (level === 2) {
      nodes.push(<Heading key={key}>{line}</Heading>);
      key += 1;
      index += 1;
      continue;
    }
    if (level === 3) {
      nodes.push(<Subheading key={key}>{line}</Subheading>);
      key += 1;
      index += 1;
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trim();
      if (!next || isBulletLine(next) || headingLevel(next)) break;
      paragraph.push(next);
      index += 1;
    }
    nodes.push(<Paragraph key={key}>{paragraph.join(' ')}</Paragraph>);
    key += 1;
  }

  return nodes;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchBlogs();
        const match = (Array.isArray(data) ? data : []).find((item) => item.slug === slug);
        if (!cancelled) {
          setPost(match || null);
          setError(match ? '' : 'This post is not available.');
        }
      } catch (e) {
        if (!cancelled) {
          setPost(null);
          setError(e.message || 'Could not load this post.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <Page>
      <Wrap>
        <Back to="/blog">← Back to blog</Back>
      </Wrap>
      {loading ? <Message>Loading post…</Message> : null}
      {!loading && error ? <Message $error>{error}</Message> : null}
      {!loading && post ? (
        <Container>
          {post.coverImage ? <Cover src={assetUrl(post.coverImage)} alt={post.title} /> : null}
          <Body>
            <Meta>
              {post.category} · {post.author} · {getDate(post.createdAt)}
            </Meta>
            <Title>{post.title}</Title>
            {renderContent(post.content)}
          </Body>
        </Container>
      ) : null}
    </Page>
  );
};

export default BlogPost;
