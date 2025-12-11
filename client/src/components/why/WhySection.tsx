// client/src/components/why/WhySection.tsx
import './WhySection.css';

const whyItems = [
  {
    title: 'Built by & for Students and Educators',
    text: 'Developed in collaboration with university advisors, international students, and career mentors, AI Agent is designed with simplicity and impact in mind. It takes less than 10 minutes to get started — no technical background required.',
  },
  {
    title: 'Intuitive User Experience',
    text: 'With a clean, conversational interface, AI Agent helps students access key academic information, plan their goals, and connect with advisors effortlessly. Personalized recommendations and easy navigation make the platform accessible to everyone — from first-year students to academic staff.',
  },
  {
    title: 'Responsible & Secure AI',
    text: 'We prioritize transparency, data ethics, and student privacy. Every recommendation and interaction is backed by explainable AI models and compliant with university data protection standards.',
  },
  {
    title: 'Easy to Launch & Scale',
    text: 'Flexible, modular, and scalable — AI Agent integrates seamlessly with existing university systems. It’s cost-effective, quick to implement, and built to grow alongside your institution’s digital transformation journey.',
  },
];

const WhySection = () => {
  return (
    <section id="why" className="why">
      <div className="why__container">
        <h2 className="why__title">Why Partner With AI Advisor</h2>

        <div className="why__grid-wrapper">
          <div className="why__grid">
            {whyItems.map((item, index) => (
              <article key={index} className="why__card">
                <div className="why__icon">
                  <img src="/ailogo.png" alt="AI icon" />
                </div>

                <div className="why__content">
                  <h3 className="why__card-title">{item.title}</h3>
                  <p className="why__card-text">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
