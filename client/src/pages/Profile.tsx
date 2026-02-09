import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatHeader from '../components/chat/ChatHeader';
import Sidebar from '../components/chat/Sidebar';
import UserProfileCard from '../components/profile/UserProfileCard';
import AcademicInfoCard from '../components/profile/AcademicInfoCard';
import ProfileSetup from './ProfileSetup';
import { updateProfile as updateProfileApi } from '../services/auth.service';
import './Profile.css';

const Profile = () => {
  const { user, token, updateProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if this is the initial profile setup (from login/signup)
  const isInitialSetup = location.state?.isInitialSetup || false;

  useEffect(() => {
    // Load existing profile data if available
    if (user) {
      if (user.name) setName(user.name);
      if (user.major) setMajor(user.major);
      if (user.yearOfStudy) setYearOfStudy(user.yearOfStudy);
      // If user has profile data, they're not in initial setup
      if (user.name && user.major && user.yearOfStudy && isInitialSetup) {
        // Profile already complete, redirect to chat
        navigate('/chat', { replace: true });
      }
    }
  }, [user, isInitialSetup, navigate]);

  // If this is initial setup and profile is incomplete, show setup form
  if (isInitialSetup && (!user?.name || !user?.major || !user?.yearOfStudy)) {
    return <ProfileSetup />;
  }

  const navItems = [
    { name: 'Chat Assistant', path: '/chat', active: location.pathname === '/chat' },
    { name: 'Profile', path: '/profile', active: location.pathname === '/profile' },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
    if (user) {
      setName(user.name || '');
      setMajor(user.major || '');
      setYearOfStudy(user.yearOfStudy || '');
    }
    setError(null);
  };

  const handleSave = async () => {
    if (!name.trim() || !major || !yearOfStudy) {
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
      const response = await updateProfileApi(token, {
        name: name.trim(),
        major: major,
        yearOfStudy,
      });

      // Save new token if provided (contains updated profile data)
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
        // Refresh profile from the new token using AuthContext method
        if (refreshProfile) {
          await refreshProfile();
        }
      } else {
        // Update the auth context with new profile data (fallback if no token returned)
        if (updateProfile) {
          updateProfile({
            name: name.trim(),
            major: major,
            yearOfStudy,
          });
        }
      }

      setIsEditing(false);
    } catch (err) {
      const details = err instanceof Error ? err.message : 'Failed to update profile';
      setError(details);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <ChatHeader
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="profile-layout">
        <Sidebar
          navItems={navItems}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {isSidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
        )}
        <main className="profile-main">
          <div className="profile-content">
            <div className="profile-header">
              <h1 className="profile-title">Profile & Settings</h1>
              <p className="profile-subtitle">Manage your account and preferences</p>
            </div>

            <div className="profile-cards">
              <UserProfileCard
                user={user}
                name={name}
                major={major}
                yearOfStudy={yearOfStudy}
                isEditing={isEditing}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onNameChange={setName}
                onMajorChange={setMajor}
                onYearOfStudyChange={setYearOfStudy}
                onSave={handleSave}
                onCancel={handleCancel}
              />
              <AcademicInfoCard
                name={name}
                email={user?.email || ''}
                major={major}
                isEditing={isEditing}
                onNameChange={setName}
                onMajorChange={setMajor}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
