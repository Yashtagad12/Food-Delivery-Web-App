import { useState } from 'react';
import './ContactUs.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { BsCheckLg } from 'react-icons/bs';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [focused, setFocused] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleReset = () => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page">

            <section className="contact-hero">
                <div className="hero-inner">
                    <div className="hero-tag">
                        <span className="tag-dot" />
                        We're here for you
                    </div>
                    <h1 className="hero-heading">
                        Let's Talk <br />
                        <span className="heading-accent">Food & More</span>
                    </h1>
                    <p className="hero-sub">
                        Got a question, feedback, or just want to say hi? Our team at Tomato is always hungry to hear from you. Share your thoughts—we’re always trying to serve up the best experience.
                    </p>
                </div>
                <div className="scroll-hint-container">
                    <div className="hero-scroll-hint">
                        <span />
                    </div>
                    <p>Scroll Down</p>
                </div>
            </section>

            <section className="contact-info-section">
                <div className="info-cards">
                    {[
                        { icon: <FaPhone />, label: 'Call Us', value: '+91 01234 56789', sub: 'Mon–Sat, 9am to 9pm' },
                        { icon: <FaEnvelope />, label: 'Email Us', value: 'support@tomato.in', sub: 'We reply within 24 hours' },
                        { icon: <FaMapMarkerAlt />, label: 'Find Us', value: '12 MG Road, Vadodara', sub: 'Gujarat, India — 390001' },
                    ].map((card, i) => (
                        <div className="info-card" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                            <div className="info-card-icon">{card.icon}</div>
                            <div className="info-card-body">
                                <span className="info-label">{card.label}</span>
                                <strong className="info-value">{card.value}</strong>
                                <span className="info-sub">{card.sub}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="contact-main-section">
                <div className="contact-grid">
                    <aside className="contact-aside">
                        <div className="aside-sticker">
                            <span className="sticker-emoji">🍅</span>
                            <span className="sticker-text">Tomato</span>
                        </div>
                        <h2 className="aside-heading">We love hearing from our customers</h2>
                        <p className="aside-body">
                            Whether you had an amazing experience, ran into an issue with your order, or have a suggestion to make Tomato even better — your voice shapes everything we do.
                        </p>
                        <ul className="aside-list">
                            <li><span className="list-bullet" />Order support &amp; tracking</li>
                            <li><span className="list-bullet" />Restaurant partnerships</li>
                            <li><span className="list-bullet" />Feedback &amp; suggestions</li>
                            <li><span className="list-bullet" />General enquiries</li>
                        </ul>
                        <div className="aside-socials">
                            <a href="#" className="social-btn" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="#" className="social-btn" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" className="social-btn" aria-label="Instagram"><FaInstagram /></a>
                        </div>
                    </aside>

                    <div className="contact-form-wrap">
                        {!submitted ? (
                            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                                <div className="form-row">
                                    <div className={`form-group ${focused === 'name' || formData.name ? 'is-active' : ''}`}>
                                        <label htmlFor="name">Full Name</label>
                                        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} autoComplete="name" required />
                                        <span className="input-bar" />
                                    </div>
                                    <div className={`form-group ${focused === 'email' || formData.email ? 'is-active' : ''}`}>
                                        <label htmlFor="email">Email Address</label>
                                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} autoComplete="email" required />
                                        <span className="input-bar" />
                                    </div>
                                </div>
                                <div className={`form-group ${focused === 'subject' || formData.subject ? 'is-active' : ''}`}>
                                    <label htmlFor="subject">Subject</label>
                                    <input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} onFocus={() => setFocused('subject')} onBlur={() => setFocused('')} autoComplete="off" required />
                                    <span className="input-bar" />
                                </div>
                                <div className={`form-group ${focused === 'message' || formData.message ? 'is-active' : ''}`}>
                                    <label htmlFor="message">Your Message</label>
                                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused('')} autoComplete="off" required />
                                    <span className="input-bar" />
                                </div>
                                <button type="submit" className="submit-btn">
                                    <span>Send Message</span>
                                    <IoSend />
                                </button>
                            </form>
                        ) : (
                            <div className="success-state">
                                <div className="success-circle"><BsCheckLg /></div>
                                <h3>Message Sent!</h3>
                                <p>Thanks <strong>{formData.name}</strong>! We've received your message and will get back to you at <strong>{formData.email}</strong> soon.</p>
                                <button className="reset-btn" onClick={handleReset}>Send Another Message</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="map-section">
                <div className="map-label">
                    <FaMapMarkerAlt className='marker' />
                    Tomato HQ — Vadodara, Gujarat
                </div>
                <iframe
                    title="Tomato Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.6569567738!2d73.1812!3d22.3072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5873b4c3a39%3A0x4f3a3b3e3b3e3b3e!2sMG%20Road%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1680000000000"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </section>
        </div>
    );
};

export default ContactUs;