import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    const result = await register(formData.name, formData.email, formData.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const Navbar = () => (
    <nav className="auth-navbar">
      <div className="auth-navbar-content">
        <div className="auth-navbar-brand">
          NOTES MANAGER APP
        </div>
        <div className="auth-navbar-user">
          <Link
            to="/login"
            className="auth-nav-button"
          >
            Login
          </Link>
          <div className="auth-nav-button auth-nav-button-primary">
            Sign Up
          </div>
        </div>
      </div>
    </nav>
  );

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
        <div className="auth-form-container" style={{ maxWidth: '500px' }}>
          <div className="auth-form-card">
            <div className="auth-form-header">
              <h2 className="auth-form-title">Join Notes Manager</h2>
              <p className="auth-form-subtitle">
                Create your account and start organizing your notes
              </p>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label className="auth-form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="auth-form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Email</label>
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
                <label className="auth-form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="auth-form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password (min. 6 characters)"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="auth-form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading" style={{ marginRight: '8px' }}></span>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="text-center mt-20">
              <p className="auth-form-subtitle">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="auth-link"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;