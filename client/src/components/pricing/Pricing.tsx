import './Pricing.css';

const PricingSection = () => {
  return (
    <section id="pricing" className="pricing">
      <div className="pricing__container">
        <h2 className="pricing__title">Pricing Plans</h2>
        <p className="pricing__subtitle">
          Empower your university with AI Advisor — a scalable academic advising system that
          enhances student success, improves planning, and supports digital transformation.
        </p>

        <div className="pricing__grid">
          <div className="pricing__card">
            <h3 className="pricing__card-title">Core Subscription</h3>

            <div className="pricing__price">
              <span className="pricing__currency">₸</span>
              <span className="pricing__amount">5,000,000</span>
              <span className="pricing__period">/year</span>
            </div>

            <ul className="pricing__features">
              <li>Academic advising chatbot</li>
              <li>GPA & credit tracking automation</li>
              <li>Basic analytics dashboard</li>
              <li>Email support for administrators</li>
            </ul>

            <p className="pricing__note">
              Covers essential AI advising features for small–mid scale institutions.
            </p>
          </div>

          <div className="pricing__card pricing__card--highlight">
            <h3 className="pricing__card-title">Recommended Subscription</h3>

            <div className="pricing__price">
              <span className="pricing__currency">₸</span>
              <span className="pricing__amount">6,000,000</span>
              <span className="pricing__period">/year</span>
            </div>

            <ul className="pricing__features">
              <li>Everything in Core Subscription</li>
              <li>Enhanced system reliability</li>
              <li>Infrastructure scaling & optimization</li>
              <li>Priority maintenance & faster response time</li>
            </ul>

            <p className="pricing__note">
              Ideal choice for universities seeking stability and continuous improvement.
            </p>
          </div>

          <div className="pricing__card">
            <h3 className="pricing__card-title">Premium Subscription</h3>

            <div className="pricing__price">
              <span className="pricing__currency">₸</span>
              <span className="pricing__amount">7,000,000</span>
              <span className="pricing__period">/year</span>
            </div>

            <ul className="pricing__features">
              <li>Full SIS & LMS integration</li>
              <li>Single Sign-On (SSO)</li>
              <li>Advanced analytics & predictive insights</li>
              <li>Custom branding & UI personalization</li>
            </ul>

            <p className="pricing__note">
              Complete automation and deep institutional-level integrations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
