import React from "react";

const FAQ = () => {

  const faqs = [
    {
      question: "How can I place an order?",
      answer:
        "Browse the products, add your desired items to the cart and proceed to checkout."
    },
    {
      question: "How can I check my order?",
      answer:
        "You can check your orders from your account after logging in."
    },
    {
      question: "What payment methods are available?",
      answer:
        "Available payment methods depend on the checkout options provided by Shopnest."
    },
    {
      question: "Can I return a product?",
      answer:
        "Return eligibility depends on the product and applicable return conditions."
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact us through the Contact Us page."
    }
  ];

  return (
    <>
      <style>{`
        .faq-page {
          padding: 60px 7%;
          background: #f8f7fc;
          min-height: 80vh;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .faq-header h1 {
          color: #24104f;
          font-size: 40px;
          margin-bottom: 10px;
        }

        .faq-header p {
          color: #777;
        }

        .faq-container {
          max-width: 850px;
          margin: auto;
        }

        .faq-item {
          background: white;
          padding: 25px;
          margin-bottom: 15px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }

        .faq-item h2 {
          color: #24104f;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .faq-item p {
          color: #666;
          line-height: 1.7;
          margin: 0;
        }
      `}</style>

      <div className="faq-page">

        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions</p>
        </div>

        <div className="faq-container">

          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>

              <h2>{faq.question}</h2>

              <p>{faq.answer}</p>

            </div>
          ))}

        </div>

      </div>
    </>
  );
};

export default FAQ;