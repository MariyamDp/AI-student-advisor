import './FeaturesSection.css';

const features = [
  'Plan your semester with ease',
  'Find the best exchange or double degree opportunities',
  'Visualize your progress with smart dashboards',
  'Get quick answers for registration, research, and university services',
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">✓</div>
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
