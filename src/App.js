import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

// Components (always rendered — load eagerly)
import Navbar from './components/Navbar';
import AdminSubNavbar, { ADMIN_SUBNAV_HEIGHT_PX } from './components/AdminSubNavbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ChatSupport from './components/ChatSupport';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages — code-split into separate chunks for smaller initial bundle
const Home            = lazy(() => import('./pages/Home'));
const About           = lazy(() => import('./pages/About'));
const Services        = lazy(() => import('./pages/Services'));
const Portfolio       = lazy(() => import('./pages/Portfolio'));
const Team            = lazy(() => import('./pages/Team'));
const Contact         = lazy(() => import('./pages/Contact'));
const Appointment     = lazy(() => import('./pages/Appointment'));
const Careers         = lazy(() => import('./pages/Careers'));
const HireTeamMember  = lazy(() => import('./pages/HireTeamMember'));
const Blog            = lazy(() => import('./pages/Blog'));
const CaseStudy       = lazy(() => import('./pages/CaseStudy'));
const Support         = lazy(() => import('./pages/Support'));
const AdminSignIn     = lazy(() => import('./pages/AdminSignIn'));
const AdminDashboard  = lazy(() => import('./pages/AdminDashboard'));
const AdminBlog       = lazy(() => import('./pages/AdminBlog'));
const AdminTeam       = lazy(() => import('./pages/AdminTeam'));
const AdminPortfolio  = lazy(() => import('./pages/AdminPortfolio'));
const AdminServices   = lazy(() => import('./pages/AdminServices'));
const AdminTestimonials = lazy(() => import('./pages/AdminTestimonials'));

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
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }

  h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; }
  h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
  h3 { font-size: clamp(1.25rem, 3vw, 1.875rem); }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
  }

  ul, ol { list-style: none; }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  *:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: ${props => props.theme.colors.gray[100]}; }
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.gray[300]};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover { background: ${props => props.theme.colors.gray[400]}; }

  ::selection {
    background: ${props => props.theme.colors.primary};
    color: white;
  }

  /* Responsive typography */
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    html { font-size: 14px; }
  }

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    html { font-size: 18px; }
  }

  /* Respect prefers-reduced-motion for accessibility & performance */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Disable expensive backdrop-filter blur on low-end mobile */
  @media (max-width: ${props => props.theme.breakpoints.md}) and (hover: none) {
    * {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
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
  padding-top: ${(p) =>
    p.$adminBar
      ? `calc(80px + ${ADMIN_SUBNAV_HEIGHT_PX}px)`
      : '80px'};
  transition: padding-top 0.25s ease;
`;

// Simplified page transition — no y-shift to avoid layout shifts on mobile
const pageVariants = {
  initial: { opacity: 0 },
  in:      { opacity: 1 },
  out:     { opacity: 0 }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.2
};

function MainWithPadding({ children }) {
  const { user, booting } = useAuth();
  const adminBar = Boolean(user && !booting);
  return (
    <MainContent
      $adminBar={adminBar}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </MainContent>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <AppContainer>
            <Navbar />
            <AdminSubNavbar />
            <MainWithPadding>
              <Suspense fallback={<LoadingSpinner height="60vh" text="Loading..." />}>
                <Routes>
                  <Route path="/"              element={<Home />} />
                  <Route path="/about"         element={<About />} />
                  <Route path="/services"      element={<Services />} />
                  <Route path="/portfolio"     element={<Portfolio />} />
                  <Route path="/team"          element={<Team />} />
                  <Route path="/hire"          element={<HireTeamMember />} />
                  <Route path="/contact"       element={<Contact />} />
                  <Route path="/appointment"   element={<Appointment />} />
                  <Route path="/careers"       element={<Careers />} />
                  <Route path="/blog"          element={<Blog />} />
                  <Route path="/case-studies"  element={<CaseStudy />} />
                  <Route path="/support"       element={<Support />} />
                  <Route path="/admin/signin"  element={<AdminSignIn />} />
                  <Route path="/admin" element={
                    <ProtectedRoute><AdminDashboard /></ProtectedRoute>
                  } />
                  <Route path="/admin/blog" element={
                    <ProtectedRoute><AdminBlog /></ProtectedRoute>
                  } />
                  <Route path="/admin/team" element={
                    <ProtectedRoute><AdminTeam /></ProtectedRoute>
                  } />
                  <Route path="/admin/portfolio" element={
                    <ProtectedRoute><AdminPortfolio /></ProtectedRoute>
                  } />
                  <Route path="/admin/services" element={
                    <ProtectedRoute><AdminServices /></ProtectedRoute>
                  } />
                  <Route path="/admin/testimonials" element={
                    <ProtectedRoute><AdminTestimonials /></ProtectedRoute>
                  } />
                </Routes>
              </Suspense>
            </MainWithPadding>
            <Footer />
            <ScrollToTop />
            <ChatSupport />
          </AppContainer>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
