import './AcademicInfoCard.css';

interface AcademicInfoCardProps {
  name: string;
  email: string;
  major: string;
  isEditing: boolean;
  onNameChange: (value: string) => void;
  onMajorChange: (value: string) => void;
}

const AcademicInfoCard = ({
  name,
  email,
  major,
  isEditing,
  onNameChange,
  onMajorChange,
}: AcademicInfoCardProps) => {
  return (
    <div className="profile-card profile-card-academic">
      <div className="card-header">
        <div className="card-title-wrapper">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
              fill="currentColor"
            />
            <path
              d="M10 12C5.58172 12 2 13.7909 2 16V20H18V16C18 13.7909 14.4183 12 10 12Z"
              fill="currentColor"
            />
          </svg>
          <h3 className="card-title">Academic Information</h3>
        </div>
        <p className="card-subtitle">Your basic academic details</p>
      </div>
      <div className="academic-fields">
        <div className="academic-field">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => onNameChange(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? 'editable' : ''}
          />
        </div>
        <div className="academic-field">
          <label>Email</label>
          <input type="email" value={email} disabled className="disabled" />
        </div>
        <div className="academic-field">
          <label>Major</label>
          <input
            type="text"
            value={major}
            onChange={e => onMajorChange(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? 'editable' : ''}
          />
        </div>
        {/* <div className="academic-field">
          <label>School</label>
          <input
            type="text"
            value={school}
            onChange={e => onSchoolChange(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? 'editable' : ''}
          />
        </div> */}
      </div>
    </div>
  );
};

export default AcademicInfoCard;
