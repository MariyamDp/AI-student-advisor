import './CategoriesSection.css';

interface Category {
  name: string;
  icon: string;
  notactive: boolean;
}

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  return (
    <section className="categories-section">
      <h3 className="categories-title">Academic Categories</h3>
      <div className="categories-grid">
        {categories.map(category => (
          <div
            key={category.name}
            className={`category-item ${category.notactive ? 'notactive' : ''}`}
          >
            <img src={category.icon} alt={category.name} className="category-icon" />
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
