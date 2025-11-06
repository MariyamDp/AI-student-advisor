import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import { updateProfile as updateProfileApi } from '../services/auth.service';
import './ProfileSetup.css';

const ProfileSetup = () => {
  const { user, token, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load existing profile data if available
    if (user && 'name' in user) {
      setName(user.name || '');
    }
    if (user && 'major' in user) {
      setMajor(user.major || '');
    }
    if (user && 'yearOfStudy' in user) {
      setYearOfStudy(user.yearOfStudy || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !major.trim() || !yearOfStudy) {
      setError('Please fill in all fields');
      return;
    }

    if (!token) {
      setError('Not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateProfileApi(token, {
        name: name.trim(),
        major: major.trim(),
        yearOfStudy,
      });

      // Update the auth context with new profile data
      if (updateProfile) {
        updateProfile({
          name: name.trim(),
          major: major.trim(),
          yearOfStudy,
        });
      }

      // Navigate to chat after successful profile update
      navigate('/chat');
    } catch (err) {
      const details = err instanceof Error ? err.message : 'Failed to update profile';
      setError(details);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup-page">
      <div className="profile-setup-center">
        <div className="profile-setup-card">
          <h2 className="profile-setup-title">Complete Your Profile</h2>
          <p className="profile-setup-subtitle">Tell us about yourself to get started</p>
          <form onSubmit={handleSubmit} className="profile-setup-form">
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              error={error && !name.trim() ? 'Name is required' : null}
            />
            <Input
              type="text"
              placeholder="Your major"
              value={major}
              onChange={e => setMajor(e.target.value)}
              error={error && !major.trim() ? 'Major is required' : null}
            />
            <div className="input-wrapper">
              <select
                className={`input ${error && !yearOfStudy ? 'input-error' : ''}`}
                value={yearOfStudy}
                onChange={e => setYearOfStudy(e.target.value)}
              >
                <option value="">Select year of study</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
                <option value="5+">Fifth Year or Above</option>
              </select>
              {error && !yearOfStudy && (
                <div className="input-error-message">Year of study is required</div>
              )}
            </div>
            {error && name.trim() && major.trim() && yearOfStudy && (
              <div className="profile-error-message">{error}</div>
            )}
            <Button
              className="profile-setup-button"
              variant="primary"
              disabled={loading || !name.trim() || !major.trim() || !yearOfStudy}
              type="submit"
            >
              {loading ? 'Saving...' : 'Continue'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
