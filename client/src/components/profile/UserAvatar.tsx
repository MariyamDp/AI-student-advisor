import './UserAvatar.css';

interface UserAvatarProps {
  user: { name?: string; email?: string } | null;
  size?: 'small' | 'medium' | 'large';
}

const UserAvatar = ({ user, size = 'medium' }: UserAvatarProps) => {
  const getInitials = () => {
    if (user?.name) {
      const names = user.name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.name.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return <div className={`user-avatar user-avatar-${size}`}>{getInitials()}</div>;
};

export default UserAvatar;
