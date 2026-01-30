import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { CalendlyProvider } from './components/CalendlyContext';
import ClarityAnalytics from './components/ClarityAnalytics';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Thanks from './pages/Thanks';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import BlogPost from './pages/blog/BlogPost';
import HarizCraneTrucks from './pages/work/HarizCraneTrucks';

const App: React.FC = () => {
  return (
    <HashRouter>
      <CalendlyProvider>
        <ClarityAnalytics />
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/work/hariz" element={<HarizCraneTrucks />} />
          </Routes>
        </Layout>
      </CalendlyProvider>
    </HashRouter>
  );
};

export default App;