import './BurgerMenu.css';

interface BurgerMenuProps {
  onClick: () => void;
  isOpen?: boolean;
}

const BurgerMenu = ({ onClick, isOpen = false }: BurgerMenuProps) => {
  return (
    <button
      className={`burger-menu ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label="Toggle menu"
      type="button"
    >
      <span className="burger-line"></span>
      <span className="burger-line"></span>
      <span className="burger-line"></span>
    </button>
  );
};

export default BurgerMenu;
