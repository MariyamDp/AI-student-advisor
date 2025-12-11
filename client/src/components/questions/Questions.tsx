// client/src/components/questions/Questions.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Questions.css';

type FaqItem = {
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  {
    question: 'What is AI Advisor?',
    answer:
      'AI Advisor is an intelligent academic advising assistant that helps universities support students with course planning, GPA tracking, mobility options, and personalized recommendations, all in one place.',
  },
  {
    question: 'What languages does AI Advisor support?',
    answer:
      'The system is built to be multilingual. It currently supports English and can be adapted to additional languages based on your university’s needs and regional requirements.',
  },
  {
    question: 'Who can use AI Advisor?',
    answer:
      'AI Advisor is designed for students, academic advisors, and administrators. Each group gets tailored tools and views to support their daily academic tasks.',
  },
  {
    question: 'How long does integration take?',
    answer:
      'A basic rollout can be completed in a few weeks, depending on data availability and internal approvals. Deeper integrations with SIS, LMS, and SSO may take additional time but follow a structured onboarding plan.',
  },
  {
    question: 'How does AI Advisor support students?',
    answer:
      'Students can ask questions about their degree progress, prerequisites, mobility options, deadlines, and more. AI Agent gives clear, structured answers and helps them plan each semester with confidence.',
  },
  {
    question: 'Is student data secure?',
    answer:
      'Yes. AI Advisor follows strict security and privacy practices: encrypted connections, role-based access control, and compliance with university data policies. Only authorized staff can access sensitive information.',
  },
  {
    question: 'Is AI Advisor customizable for each university?',
    answer:
      'Absolutely. AI Advisor can be configured to match your programs, credit structure, mobility rules, branding, and advising workflows, so it feels like a natural part of your institution.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'We provide onboarding training, documentation, and ongoing technical support. For pilot and full deployments, we also offer dedicated success check-ins to help your team get maximum value from the system.',
  },
];

const Questions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const handleTryChat = () => {
    navigate('/login');
  };

  return (
    <section id="faqs" className="faq">
      <div className="faq__container">
        <h2 className="faq__title">Frequently Asked Questions</h2>

        <div className="faq__grid">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <button
                key={item.question}
                type="button"
                className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
                onClick={() => handleToggle(index)}
              >
                <div className="faq__header">
                  <span className="faq__question">{item.question}</span>
                  <span className={`faq__icon ${isOpen ? 'faq__icon--open' : ''}`}>
                    {/* стрелочка-чёврон */}
                    <span className="faq__chevron" />
                  </span>
                </div>

                {isOpen && (
                  <div className="faq__body">
                    <p className="faq__answer">{item.answer}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="faq__cta-wrapper">
          <button className="faq__cta-btn" onClick={handleTryChat}>
            Try AI Advisor Chat
          </button>
        </div>
      </div>
    </section>
  );
};

export default Questions;
