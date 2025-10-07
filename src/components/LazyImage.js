import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.gray[100]};
  border-radius: ${props => props.borderRadius || props.theme.borderRadius.md};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  min-height: ${props => props.minHeight || '200px'};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${props => props.loaded ? 1 : 0};
  transform: ${props => props.loaded ? 'scale(1)' : 'scale(1.05)'};
`;

const SkeletonLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.gray[200]} 25%, 
    ${props => props.theme.colors.gray[100]} 50%, 
    ${props => props.theme.colors.gray[200]} 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  opacity: ${props => props.loaded ? 0 : 1};
  transition: opacity 0.3s ease;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const ErrorPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.gray[100]};
  color: ${props => props.theme.colors.gray[500]};
  font-size: 0.875rem;
  text-align: center;
  padding: ${props => props.theme.spacing.md};
`;

const LazyImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  minHeight, 
  objectFit, 
  borderRadius,
  placeholder,
  onLoad,
  onError,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
    if (onError) onError();
  };

  return (
    <ImageContainer
      ref={imgRef}
      width={width}
      height={height}
      minHeight={minHeight}
      borderRadius={borderRadius}
      {...props}
    >
      {inView && !error && (
        <Image
          src={src}
          alt={alt}
          objectFit={objectFit}
          loaded={loaded}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      
      {!loaded && !error && (
        <SkeletonLoader loaded={loaded} />
      )}
      
      {error && (
        <ErrorPlaceholder>
          {placeholder || 'Failed to load image'}
        </ErrorPlaceholder>
      )}
    </ImageContainer>
  );
};

export default LazyImage;
