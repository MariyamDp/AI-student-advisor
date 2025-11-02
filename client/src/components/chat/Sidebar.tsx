import { Link } from 'react-router-dom';
import './Sidebar.css';

interface NavItem {
  name: string;
  path: string;
  active: boolean;
}

interface SidebarProps {
  navItems: NavItem[];
}

const Sidebar = ({ navItems }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

