import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ChatSupport from './components/ChatSupport';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import HireTeamMember from './pages/HireTeamMember';

// Theme
const theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    dark: '#1f2937',
    light: '#f8fafc',
    white: '#ffffff',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },
  fonts: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem'
  }
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    font-family: ${props => props.theme.fonts.primary};
    line-height: 1.6;
    color: ${props => props.theme.colors.dark};
    background-color: ${props => props.theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
  }

  h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 600;
  }

  h3 {
    font-size: clamp(1.25rem, 3vw, 1.875rem);
    font-weight: 600;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    transition: all 0.3s ease;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  /* Smooth scrolling for all elements */
  * {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.gray[300]};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.gray[400]};
  }

  /* Selection styles */
  ::selection {
    background: ${props => props.theme.colors.primary};
    color: white;
  }

  /* Responsive typography */
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    html {
      font-size: 14px;
    }
  }

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    html {
      font-size: 18px;
    }
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled(motion.main)`
  flex: 1;
  padding-top: 80px; /* Account for fixed navbar */
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Navbar />
          <MainContent
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/team" element={<Team />} />
              <Route path="/hire" element={<HireTeamMember />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/appointment" element={<Appointment />} />
            </Routes>
          </MainContent>
          <Footer />
          <ScrollToTop />
          <ChatSupport />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
