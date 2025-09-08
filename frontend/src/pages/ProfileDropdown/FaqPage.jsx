import { useState } from 'react';
import { Box } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const FAQPage = () => {
  // FAQ data state
  const navigate = useNavigate() ;
  const [faqs] = useState([
    {
      id: 1,
      question: "How do I create an account?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
    },
    {
      id: 3,
      question: "How do I reset my password?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
    },
    {
      id: 4,
      question: "Can I cancel my subscription?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
    },
    {
      id: 5,
      question: "How can I contact customer support?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
    },
    {
      id: 6,
      question: "Do you offer refunds?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
    }
  ]);

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">FAQs</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Frequently asked questions about our services and platform.
          </p>
        </div>

        {/* FAQ Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-black p-2 rounded mr-3">
                  <Box className="text-white" size={20} />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button
            onClick={() => navigate('/ContactUs')}
            className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 font-medium py-2 px-6"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;