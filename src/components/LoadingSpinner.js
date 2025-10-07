import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => props.height || '100px'};
  width: 100%;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.xl};
`;

const Spinner = styled.div`
  border: 4px solid ${props => props.theme.colors.gray[200]};
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 0.875rem;
  margin: 0;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-top: ${props => props.theme.spacing.sm};
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const LoadingSpinner = ({ 
  size = '40px', 
  height = '100px', 
  text = 'Loading...', 
  showDots = false 
}) => {
  return (
    <SpinnerContainer height={height}>
      <Spinner size={size} />
      {text && <LoadingText>{text}</LoadingText>}
      {showDots && (
        <DotsContainer>
          <Dot delay="0s" />
          <Dot delay="0.2s" />
          <Dot delay="0.4s" />
        </DotsContainer>
      )}
    </SpinnerContainer>
  );
};

export default LoadingSpinner;


