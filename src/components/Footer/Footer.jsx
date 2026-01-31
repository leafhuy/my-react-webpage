import contactInfo, { getSocialLinks } from '../../data/contactInfo'
import { getIconComponent } from '../../utils/socialIcons'
import './Footer.css'

function Footer() {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' }
    ]

    const resources = [
        { label: 'Resume', href: '#' },
        { label: 'GitHub', href: contactInfo.social.github }
    ]

    // Get social links from contactInfo
    const socialLinks = getSocialLinks()

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src="/images/Logo.png" alt="Logo" className="footer-logo-img" />
                            <span className="footer-logo-text">
                                <span>L</span>EAF
                            </span>
                        </div>
                        <p className="footer-description">
                            Building embedded systems and digital experiences with clean code.
                            Let's create something amazing together.
                        </p>
                    </div>

                    <div className="footer-column">
                        <h4>Navigation</h4>
                        <nav className="footer-links">
                            {quickLinks.map((link, index) => (
                                <a key={index} href={link.href} className="footer-link">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="footer-column">
                        <h4>Resources</h4>
                        <nav className="footer-links">
                            {resources.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="footer-link"
                                    target={link.href.startsWith('http') ? '_blank' : undefined}
                                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="footer-column">
                        <h4>Contact</h4>
                        <nav className="footer-links">
                            <a href={`mailto:${contactInfo.email}`} className="footer-link">
                                {contactInfo.email}
                            </a>
                            <a href={`tel:${contactInfo.phone}`} className="footer-link">
                                {contactInfo.phone}
                            </a>
                        </nav>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} <a href="#">LEAF</a>. All rights reserved.
                    </p>

                    <div className="footer-social">
                        {socialLinks.map(({ platform, url }) => {
                            const IconComponent = getIconComponent(platform)
                            return (
                                <a
                                    key={platform}
                                    href={url}
                                    className="footer-social-link"
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
            </div>
        </footer>
    )
}

export default Footer
