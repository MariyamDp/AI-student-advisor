import { Link } from 'react-router-dom';
import './Sidebar.css';

interface NavItem {
  name: string;
  path: string;
  active: boolean;
}

interface SidebarProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ navItems, isOpen, onClose }: SidebarProps) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-item ${item.active ? 'active' : ''}`}
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
