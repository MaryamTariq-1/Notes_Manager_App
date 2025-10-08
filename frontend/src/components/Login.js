import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const Navbar = () => (
    <nav className="auth-navbar">
      <div className="auth-navbar-content">
        <div className="auth-navbar-brand">
          NOTES MANAGER APP
        </div>
        <div className="auth-navbar-user">
          {!showLogin && (
            <button
              onClick={handleGetStarted}
              className="auth-nav-button"
            >
              Login
            </button>
          )}
          <Link
            to="/register"
            className="auth-nav-button auth-nav-button-primary"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );

  if (!showLogin) {
    return (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <video
          autoPlay
          muted
          loop
          className="video-background"
        >
          <source src="/videos/into.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>

        <Navbar />

        <div className="auth-container">
          <div className="intro-container">
            <div className="intro-header">
              <h1 className="intro-title">Notes Manager</h1>
              <p className="intro-subtitle">
                Your Personal Digital Notebook - Organize Your Thoughts, Anytime, Anywhere
              </p>
            </div>

            <div className="auth-form-card-new"> {/* Changed to new class */}
              <div style={{ marginBottom: '35px' }}>
                <h2 className="auth-form-title-new">Welcome to Notes Manager App</h2> {/* Changed to new class */}
                <p className="auth-form-subtitle-new"> {/* Changed to new class */}
                  A powerful, secure, and intuitive application designed to help you organize
                  your thoughts, ideas, and important information effortlessly across all your devices.
                </p>
              </div>

              <div className="features-grid">
                <div className="feature-item">
                  <h3 className="auth-form-label-new">Bank-Level Security</h3> {/* Changed to new class */}
                  <p className="auth-form-subtitle-new"> {/* Changed to new class */}
                    Military-grade encryption and JWT authentication keep your data safe
                  </p>
                </div>

                <div className="feature-item">
                  <h3 className="auth-form-label-new">Rich Media Notes</h3> {/* Changed to new class */}
                  <p className="auth-form-subtitle-new"> {/* Changed to new class */}
                    Create beautiful notes with images, tags, and organized content
                  </p>
                </div>

                <div className="feature-item">
                  <h3 className="auth-form-label-new">Smart Search</h3> {/* Changed to new class */}
                  <p className="auth-form-subtitle-new"> {/* Changed to new class */}
                    Find your notes instantly with intelligent search across all content
                  </p>
                </div>

                <div className="feature-item">
                  <h3 className="auth-form-label-new">Smart Themes</h3> {/* Changed to new class */}
                  <p className="auth-form-subtitle-new"> {/* Changed to new class */}
                    Comfortable reading experience with adaptive light and dark themes
                  </p>
                </div>
              </div>

              <button
                onClick={handleGetStarted}
                className="get-started-button-green" // Changed to green button
              >
                Get Started - It's Free!
              </button>
            </div>

            <div className="auth-footer-new"> {/* Changed to new class */}
              <p>Built with MERN Stack • Enterprise Security • Blazing Fast • Fully Responsive</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <video
        autoPlay
        muted
        loop
        className="video-background"
      >
        <source src="/videos/into.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      <Navbar />

      <div className="auth-container">
        <div className="auth-form-container">
          <div className="auth-form-card-new"> {/* Changed to new class */}
            <div className="auth-form-header">
              <h2 className="auth-form-title-new">Welcome Back</h2> {/* Changed to new class */}
              <p className="auth-form-subtitle-new"> {/* Changed to new class */}
                Sign in to your Notes Manager account
              </p>
            </div>

            {error && (
              <div className="auth-error-new"> {/* Changed to new class */}
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label className="auth-form-label-new">Email</label> {/* Changed to new class */}
                <input
                  type="email"
                  name="email"
                  className="auth-form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label-new">Password</label> {/* Changed to new class */}
                <input
                  type="password"
                  name="password"
                  className="auth-form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit-button-green" // Changed to green button
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading" style={{ marginRight: '8px' }}></span>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="text-center mt-20">
              <p className="auth-form-subtitle-new"> {/* Changed to new class */}
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="auth-link-new" // Changed to new class
                >
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;