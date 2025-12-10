// client/src/pages/About.tsx
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <h1 className="about__title">
          Empower Every Student to Realize Their <span>Boldest Career Dreams</span>
        </h1>

        <div className="about__layout">
          {/* Левая колонка с текстом */}
          <div className="about__text">
            <p className="about__eyebrow">About AI Advisor</p>

            <p className="about__paragraph">
              <strong>AI Advisor</strong> is an intelligent academic advisor built to transform how
              students, advisors, and administrators interact within the university system. It goes
              beyond simple automation — empowering every user to make informed, timely, and
              confident academic decisions.
            </p>

            <p className="about__paragraph">
              By integrating data, personalization, and AI technology, AI Agent creates a unified
              academic ecosystem — where every student receives tailored guidance and every advisor
              has the tools to ensure success.
            </p>

            <p className="about__paragraph">
              The platform bridges communication, simplifies academic management, and turns complex
              educational paths into clear, achievable goals.
            </p>
          </div>

          <div className="about__image-wrapper">
            <img src="/chatphoto.jpg" alt="AI Agent interface" className="about__image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
