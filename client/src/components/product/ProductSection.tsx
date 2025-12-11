// client/src/components/product/ProductSection.tsx
import './ProductSection.css';

const ProductSection = () => {
  return (
    <section id="product" className="product">
      <div className="product__container">
        <h2 className="product__section-title">
          AI Advisor <span>for Smarter Academic Journey</span>
        </h2>

        <div className="product__layout">
          <div className="product__text">
            <p className="product__lead">
              Connect students with a personalized academic AI assistant that simplifies every step
              of university life.
            </p>

            <p className="product__paragraphh">
              From course planning and GPA tracking to academic mobility and research opportunities,
              AI Agent helps students stay informed, confident, and organized.
            </p>

            <p className="product__paragraph">
              With instant access to tailored guidance, students can explore degree options, plan
              semesters effectively, and receive AI-powered recommendations aligned with their
              academic goals. Advisors benefit too — gaining data-driven insights to support
              students more efficiently and ensure steady progress toward graduation.
            </p>
          </div>

          <div className="product__right">
            <div className="product__card">
              <div className="product__quote-icon">
                <img src="/quotes.png" alt="quote icon" />
              </div>

              <p className="product__quote">
                “AI Agent made it so much easier to understand my course path and requirements. I
                don’t have to ask around anymore — everything I need is right in one place.”
              </p>

              <div className="product__meta">
                <span className="product__meta-school">3 Year Public University</span>
                <span className="product__meta-name">Anna, Undergraduate Student</span>
              </div>
            </div>

            <div className="product__avatars-right">
              <img src="/emoji.png" alt="emoji" className="product__emoji" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
