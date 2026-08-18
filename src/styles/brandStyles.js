import { css } from 'styled-components';

export const pageHeroStyles = css`
  background: ${(props) => props.theme.colors.brandBlack};
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(33, 11, 204, 0.22) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(33, 11, 204, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const pageContainerStyles = css`
  max-width: ${(props) => props.theme.layout.containerMaxWidth};
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.layout.containerPadding};
  position: relative;
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    padding: 0 1.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 0 0.75rem;
  }
`;

export const brandButtonStyles = css`
  background: ${(props) => props.theme.colors.primary};
  color: #ffffff;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }
`;

export const brandFocusRing = css`
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(33, 11, 204, 0.12);
  }
`;
