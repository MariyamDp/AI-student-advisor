import './CategoriesSection.css';

interface Category {
  name: string;
  icon: string;
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
          <div key={category.name} className="category-item">
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
