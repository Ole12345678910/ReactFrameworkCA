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
    e.preventDefault();  // Prevent page refresh
    
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form data:', formData);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000); // Hide success message after 4 sec
      setFormData({
        fullName: '',
        subject: '',
        email: '',
        body: ''
      });
    }
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters';
    }

    if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.body.trim().length < 10) {
      newErrors.body = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      {isSuccess && <p className="success-message">✅ Your message has been sent successfully!</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={errors.fullName ? 'input-error' : ''}
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
            className={errors.subject ? 'input-error' : ''}
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
            className={errors.email ? 'input-error' : ''}
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
            className={errors.body ? 'input-error' : ''}
          ></textarea>
          {errors.body && <p className="error-message">{errors.body}</p>}
        </div>

        <button className='checkout-btn' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;
