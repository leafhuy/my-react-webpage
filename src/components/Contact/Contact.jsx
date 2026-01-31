import { useState } from 'react'
import contactInfo, { getSocialLinks } from '../../data/contactInfo'
import { getIconComponent } from '../../utils/socialIcons'
import { FaEnvelope, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'
import './Contact.css'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    function handleInputChange(event) {
        const { name, value } = event.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log('Form submitted:', formData)
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setIsSubmitted(false), 3000)
    }

    // Get social links using helper function
    const socialLinks = getSocialLinks()

    return (
        <section id="contact" className="contact section">
            <div className="container contact-container">
                <div className="contact-info">
                    <p className="contact-label">Contact</p>
                    <h2 className="contact-title">Let's Work Together</h2>
                    <p className="contact-description">
                        I'm always open to new opportunities and interesting projects.
                        Whether you have a question or just want to say hi, feel free to reach out!
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <div className="contact-icon"><FaEnvelope /></div>
                            <div className="contact-text">
                                <h4>Email</h4>
                                <p>{contactInfo.email}</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon"><FaMapMarkerAlt /></div>
                            <div className="contact-text">
                                <h4>Location</h4>
                                <p>{contactInfo.location}</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon"><FaBriefcase /></div>
                            <div className="contact-text">
                                <h4>Status</h4>
                                <p>{contactInfo.availability}</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-social">
                        {socialLinks.map(({ platform, url }) => {
                            const IconComponent = getIconComponent(platform)
                            return (
                                <a
                                    key={platform}
                                    href={url}
                                    className="social-link"
                                    aria-label={platform}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <IconComponent />
                                </a>
                            )
                        })}
                    </div>
                </div>

                <div className="contact-form-container">
                    {isSubmitted ? (
                        <div className="form-success">
                            <div className="form-success-icon">✅</div>
                            <h3>Message Sent!</h3>
                            <p>Thank you for reaching out. I'll get back to you soon.</p>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Smith"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Project Inquiry"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Tell me about your project..."
                                    required
                                ></textarea>
                            </div>

                            <div className="form-submit">
                                <button type="submit" className="btn btn-primary">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Contact
