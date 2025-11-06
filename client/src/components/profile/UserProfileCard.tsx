import Button from '../button/Button';
import UserAvatar from './UserAvatar';
import ProfileEditForm from './ProfileEditForm';
import './UserProfileCard.css';

interface UserProfileCardProps {
  user: { name?: string; major?: string; yearOfStudy?: string; email?: string } | null;
  name: string;
  major: string;
  yearOfStudy: string;
  isEditing: boolean;
  loading?: boolean;
  error?: string | null;
  onEdit: () => void;
  onNameChange: (value: string) => void;
  onMajorChange: (value: string) => void;
  onYearOfStudyChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const UserProfileCard = ({
  user,
  name,
  major,
  yearOfStudy,
  isEditing,
  loading = false,
  error,
  onEdit,
  onNameChange,
  onMajorChange,
  onYearOfStudyChange,
  onSave,
  onCancel,
}: UserProfileCardProps) => {
  return (
    <div className="profile-card profile-card-user">
      <UserAvatar user={user} size="large" />
      {isEditing ? (
        <ProfileEditForm
          name={name}
          major={major}
          yearOfStudy={yearOfStudy}
          onNameChange={onNameChange}
          onMajorChange={onMajorChange}
          onYearOfStudyChange={onYearOfStudyChange}
          onSave={onSave}
          onCancel={onCancel}
          loading={loading}
          error={error}
        />
      ) : (
        <>
          <h2 className="user-name">{user?.name || 'Your Name'}</h2>
          <p className="user-major">{user?.major || 'Your Major'}</p>
          <p className="user-year">Year {user?.yearOfStudy || 'N/A'}</p>
          {/* <div className="user-school">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0L0 4V6C0 9.31 2.69 12 6 12H8V16H10V12H12C15.31 12 18 9.31 18 6V4L10 0L8 0Z" fill="currentColor"/>
            </svg>
            <span>{school}</span>
          </div> */}
          <Button variant="primary" onClick={onEdit} className="edit-button">
            Edit Profile
          </Button>
        </>
      )}
    </div>
  );
};

export default UserProfileCard;

