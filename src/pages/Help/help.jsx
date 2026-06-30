import React, { useState } from "react";
import "./help.css";
import { MdEmail, MdPhone, MdChat, MdKeyboardArrowDown } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const faqData = [
  {
    question: "How do I add a new product?",
    answer: "Go to the Product page from the sidebar, click 'Add Product' button, fill in the required details like name, category, price, and images, then click Save Product."
  },
  {
    question: "How can I track my transactions?",
    answer: "Navigate to the Transaction page from the sidebar. You can filter by status (Shipping, Completed, Cancel) and view details of each order including payment and shipping status."
  },
  {
    question: "How do I change my account password?",
    answer: "Go to Account & Settings from the sidebar, switch to the Security tab, enter your old password and new password, then click Update Password."
  },
  {
    question: "Can I export my sales report?",
    answer: "Yes. Visit the Sales Report page and click the 'Export' button at the top to download your report as a CSV file, which can be opened in Excel or Google Sheets."
  },
  {
    question: "How do I add a new customer?",
    answer: "Go to the Customers page and click 'Add Customer'. Fill in their details such as name, email, phone, and address, then save."
  },
  {
    question: "Is dark mode available?",
    answer: "Yes, you can toggle Dark Mode from the Tools section in the sidebar."
  },
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState(0);
  const [message, setMessage] = useState("");

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please write your message first!");
      return;
    }
    toast.success("Your message has been sent! We'll get back to you soon.");
    setMessage("");
  };

  return (
    <div className="help-page">

      {/* Title */}
      <div className="page-title">
        <h1>Help</h1>
<p>
  <Link to="/dashboard">Dashboard</Link> ⯈{" "}
  <span className="bold">Help</span>
</p>
      </div>

      <div className="help-grid">

        {/* LEFT - FAQ */}
        <div className="help-card">
          <h6>Frequently Asked Questions</h6>
          <p className="card-subtitle">Find quick answers to common questions about using the dashboard.</p>

          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div key={index} className={`faq-item ${openIndex === index ? "open" : ""}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <MdKeyboardArrowDown className="faq-arrow" />
                </div>
                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Contact Support */}
        <div className="help-side">

          <div className="help-card">
            <h6>Contact Support</h6>
            <p className="card-subtitle">Need more help? Reach out to our support team.</p>

            <div className="contact-item">
              <div className="contact-icon"><MdEmail /></div>
              <div>
                <small>Email</small>
                <p>support@kankystore.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><MdPhone /></div>
              <div>
                <small>Phone</small>
                <p>+62 8417 1723 1123</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><MdChat /></div>
              <div>
                <small>Live Chat</small>
                <p>Available 9AM - 6PM</p>
              </div>
            </div>
          </div>

          <div className="help-card">
            <h6>Send us a message</h6>
            <form onSubmit={handleSendMessage}>
              <textarea
                placeholder="Describe your issue..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="send-btn">Send Message</button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}