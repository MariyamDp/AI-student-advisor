import { useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import './ProfileEditForm.css';

interface ProfileEditFormProps {
  name: string;
  major: string;
  yearOfStudy: string;
  onNameChange: (value: string) => void;
  onMajorChange: (value: string) => void;
  onYearOfStudyChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  loading?: boolean;
  error?: string | null;
}

const ProfileEditForm = ({
  name,
  major,
  yearOfStudy,
  onNameChange,
  onMajorChange,
  onYearOfStudyChange,
  onSave,
  onCancel,
  loading = false,
  error,
}: ProfileEditFormProps) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSave = () => {
    if (!name.trim() || !major.trim() || !yearOfStudy) {
      setLocalError('Please fill in all fields');
      return;
    }
    setLocalError(null);
    onSave();
  };

  const displayError = error || localError;

  return (
    <div className="profile-edit-form">
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => onNameChange(e.target.value)}
        error={displayError && !name.trim() ? 'Name is required' : null}
      />
      <Input
        type="text"
        placeholder="Your major"
        value={major}
        onChange={e => onMajorChange(e.target.value)}
        error={displayError && !major.trim() ? 'Major is required' : null}
      />
      <div className="input-wrapper">
        <select
          className={`input ${displayError && !yearOfStudy ? 'input-error' : ''}`}
          value={yearOfStudy}
          onChange={e => onYearOfStudyChange(e.target.value)}
        >
          <option value="">Select year of study</option>
          <option value="1">First Year</option>
          <option value="2">Second Year</option>
          <option value="3">Third Year</option>
          <option value="4">Fourth Year</option>
          <option value="5+">Fifth Year or Above</option>
        </select>
        {displayError && !yearOfStudy && (
          <div className="input-error-message">Year of study is required</div>
        )}
      </div>
      {displayError && name.trim() && major.trim() && yearOfStudy && (
        <div className="profile-error-message">{displayError}</div>
      )}
      <div className="profile-edit-actions">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={loading || !name.trim() || !major.trim() || !yearOfStudy}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditForm;
