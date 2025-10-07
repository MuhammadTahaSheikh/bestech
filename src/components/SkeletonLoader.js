import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonContainer = styled.div`
  display: ${props => props.display || 'block'};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.gray[200]} 25%, 
    ${props => props.theme.colors.gray[100]} 50%, 
    ${props => props.theme.colors.gray[200]} 75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${props => props.borderRadius || props.theme.borderRadius.md};
  margin: ${props => props.margin || '0'};
`;

const SkeletonCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.gray[200]};
`;

const SkeletonText = styled(SkeletonContainer)`
  height: 16px;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SkeletonTitle = styled(SkeletonContainer)`
  height: 24px;
  margin-bottom: ${props => props.theme.spacing.md};
  width: 60%;
`;

const SkeletonAvatar = styled(SkeletonContainer)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SkeletonButton = styled(SkeletonContainer)`
  height: 40px;
  width: 120px;
  border-radius: ${props => props.theme.borderRadius.md};
`;

const SkeletonImage = styled(SkeletonContainer)`
  height: 200px;
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SkeletonCardComponent = ({ children, ...props }) => (
  <SkeletonCard {...props}>
    {children}
  </SkeletonCard>
);

const SkeletonLoader = {
  Container: SkeletonContainer,
  Card: SkeletonCardComponent,
  Text: SkeletonText,
  Title: SkeletonTitle,
  Avatar: SkeletonAvatar,
  Button: SkeletonButton,
  Image: SkeletonImage,
};

export default SkeletonLoader;
