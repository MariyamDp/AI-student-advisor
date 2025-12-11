// client/src/components/serve/WhoWeServe.tsx
import './WhoWeServe.css';

const WhoWeServe = () => {
  return (
    <section id="who-we-serve" className="serve">
      <div className="serve__container">
        <h2 className="serve__title">Who We Serve</h2>

        <div className="serve__grid">
          {/* 1. Students */}
          <article className="serve-card">
            <div className="serve-card__image-wrapper">
              <img src="/serve1.jpg" alt="Students" className="serve-card__image" />
            </div>
            <div className="serve-card__body">
              <h3 className="serve-card__title">Students</h3>
              <p className="serve-card__text">
                Plan your academic journey with confidence. AI Advisor helps students organize
                courses, calculate GPA, track milestones, and access key university services — all
                in one place.
              </p>
              <p className="serve-card__text">
                From personalized chatbot assistance to real-time academic insights, students can
                stay informed, supported, and fully prepared for every semester.
              </p>
            </div>
          </article>

          {/* 2. Academic Advisors */}
          <article className="serve-card">
            <div className="serve-card__image-wrapper">
              <img src="/serve2.jpg" alt="Academic advisors" className="serve-card__image" />
            </div>
            <div className="serve-card__body">
              <h3 className="serve-card__title">Academic Advisors</h3>
              <p className="serve-card__text">
                Empower advisors with data-driven tools to monitor student progress, provide timely
                feedback, and guide course planning efficiently.
              </p>
              <p className="serve-card__text">
                AI Advisor centralizes communication, making it easy to identify challenges early
                and offer personalized academic recommendations for success.
              </p>
            </div>
          </article>

          {/* 3. Career Advisors */}
          <article className="serve-card">
            <div className="serve-card__image-wrapper">
              <img src="/serve3.jpg" alt="Career advisors" className="serve-card__image" />
            </div>
            <div className="serve-card__body">
              <h3 className="serve-card__title">Career Advisors</h3>
              <p className="serve-card__text">
                Support students in discovering their strengths, exploring career paths, and
                connecting academic goals with future opportunities.
              </p>
              <p className="serve-card__text">
                Through integrated dashboards, advisors can help students build skill portfolios,
                track achievements, and prepare for internships or job placements.
              </p>
            </div>
          </article>

          {/* 4. International Office */}
          <article className="serve-card">
            <div className="serve-card__image-wrapper">
              <img src="/serve4.jpg" alt="International office" className="serve-card__image" />
            </div>
            <div className="serve-card__body">
              <h3 className="serve-card__title">International Office</h3>
              <p className="serve-card__text">
                Simplify global mobility and exchange opportunities. AI Advisor provides instant
                access to program details, eligibility tracking, and deadlines — ensuring students
                are ready for study abroad or double degree applications.
              </p>
              <p className="serve-card__text">
                The platform connects international advisors and students seamlessly, fostering
                global academic growth and cross-cultural experience.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
