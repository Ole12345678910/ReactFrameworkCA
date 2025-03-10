import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    body: ''
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the form from submitting automatically
    
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // If there are no validation errors, proceed to checkout
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form data:', formData);  // Log the form data
      setIsSuccess(true);  // Show success message
      setFormData({
        fullName: '',
        subject: '',
        email: '',
        body: ''
      });  // Clear the form fields after submission
    }
  };

  // Validation logic
  const validateForm = () => {
    const errors = {};

    if (formData.fullName.length < 3) {
      errors.fullName = 'Full Name must be at least 3 characters';
    }

    if (formData.subject.length < 3) {
      errors.subject = 'Subject must be at least 3 characters';
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (formData.body.length < 3) {
      errors.body = 'Message must be at least 3 characters';
    }

    return errors;
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      {isSuccess && <p className="success-message">Your message has been sent successfully!</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <p className="error-message">{errors.subject}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="body">Message</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
          ></textarea>
          {errors.body && <p className="error-message">{errors.body}</p>}
        </div>

        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
