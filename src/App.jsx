import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import SubmitWork from './pages/SubmitWork.jsx';
import GenreQuiz from './pages/GenreQuiz.jsx';
import FilmFestival from './pages/FilmFestival.jsx';
import FestivalRegistration from './pages/FestivalRegistration.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogEdit from './pages/BlogEdit.jsx';
import BlogView from './pages/BlogView.jsx';
import BlogPreview from './pages/BlogPreview.jsx';
import BlogSuggestions from './pages/BlogSuggestions.jsx';
import SubmitFilmIdea from './pages/SubmitFilmIdea.jsx';
import AdminFilmIdeas from './pages/AdminFilmIdeas.jsx';
import SubmissionHome from './pages/submissionFlow/submissionHome.jsx';
import SubmissionInfo from './pages/submissionFlow/submissionBasicInfo.jsx';
import SubmissionLink from './pages/submissionFlow/submissionLink.jsx';
import SubmissionProduction from './pages/submissionFlow/submissionProduction.jsx';
import PaymentOptions from './pages/submissionFlow/paymentOptions.jsx';
import SubmissionComplete from './pages/submissionFlow/submissionComplete.jsx';
import Footer from './components/Footers.jsx';
import GenreVoting from './components/GenreVoting.jsx';
import { Toaster } from 'react-hot-toast';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// URL validation function
function isValidPath(path) {
  try {
    // Check if the path is a valid URL path
    if (typeof path !== 'string') return false;
    if (path.includes('://')) return false; // No protocol URLs
    if (path.includes('javascript:')) return false; // No javascript URLs
    return true;
  } catch (error) {
    return false;
  }
}

function App() {
  // Validate current URL on mount
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    if (!isValidPath(currentPath)) {
      console.error('Invalid path detected:', currentPath);
      window.location.href = '/';
    }
  }, []);

  return (
    <ErrorBoundary>
      <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
        <Router>
          <div className="min-h-screen bg-primary text-white">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/submit/submission" element={<SubmissionHome />} />
              <Route path="/submit/submissioninfo" element={<SubmissionInfo />} />
              <Route path="/submit/submissionlinks" element={<SubmissionLink />} />
              <Route path="/submit/submissionproduction" element={<SubmissionProduction />} />
              <Route path="/submit/paymentoptions" element={<PaymentOptions />} />
              <Route path="/submit/submissioncomplete" element={<SubmissionComplete />} />
              <Route path="/quiz" element={<GenreQuiz />} />
              <Route path="/quiz/results/:genres" element={<GenreQuiz />} />
              <Route path="/festivals" element={<FilmFestival />} />
              <Route path="/festival-registration" element={<FestivalRegistration />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blogs/new" element={<BlogEdit />} />
              <Route path="/blogs/suggestions" element={<BlogSuggestions />} />
              <Route path="/submit-idea" element={<SubmitFilmIdea />} />
              <Route path="/admin/film-ideas" element={<AdminFilmIdeas />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
            <GenreVoting />
            <Toaster position="top-right" />
          </div>
        </Router>
      </GoogleReCaptchaProvider>
    </ErrorBoundary>
  );
}

export default App;