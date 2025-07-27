import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <Router>
        <div className="min-h-screen bg-primary text-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="submit/submission" element={<SubmissionHome />} />
            <Route exact path="submit/submissioninfo" element={<SubmissionInfo />} />
            <Route exact path="submit/submissionlinks" element={<SubmissionLink />} />
            <Route exact path="submit/submissionproduction" element={<SubmissionProduction />} />
            <Route exact path="submit/paymentoptions" element={<PaymentOptions />} />
            <Route exact path="submit/submissioncomplete" element={<SubmissionComplete />} />
            <Route path="/quiz" element={<GenreQuiz />} />
            <Route path="/quiz/results/:genres" element={<GenreQuiz />} />
            <Route path="/festivals" element={<FilmFestival />} />
            <Route path="/festival-registration" element={<FestivalRegistration />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/new" element={<BlogEdit />} />
            <Route path="/blogs/:slug/edit" element={<BlogEdit />} />
            <Route path="/blogs/:slug" element={<BlogView />} />
            <Route path="/blogs/:slug/preview" element={<BlogPreview />} />
            <Route path="/blogs/suggestions" element={<BlogSuggestions />} />
            <Route path="/submit-idea" element={<SubmitFilmIdea />} />
            <Route path="/admin/film-ideas" element={<AdminFilmIdeas />} />
          </Routes>
          <Footer />
          <GenreVoting />
          <Toaster position="top-right" />
        </div>
      </Router>
    </GoogleReCaptchaProvider>
  );
}

export default App;