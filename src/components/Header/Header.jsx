import { useState, useEffect } from 'react'
import WeatherWidget from '../WeatherWidget/WeatherWidget.jsx'
import './Header.css'

function Header({ isDarkMode, onToggleTheme }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    function handleScroll() {
        setIsScrolled(window.scrollY > 20)
    }

    function handleMobileMenuToggle() {
        setIsMobileMenuOpen(prevState => !prevState)
    }

    function handleNavClick() {
        setIsMobileMenuOpen(false)
    }

    function handleThemeToggle() {
        onToggleTheme()
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            {/* Top Bar with Weather Widget */}
            <div className="header-topbar">
                <div className="container header-topbar-container">
                    <WeatherWidget />
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container header-container">
                {/* Logo */}
                <a href="#" className="header-logo">
                    <div className="logo-img">
                        <img src="/images/Logo.png" alt="Leaf Huy" />
                    </div>
                    <span className="logo-text">
                        <span>L</span>EAF
                    </span>
                </a>

                {/* Navigation */}
                <nav className="header-nav">
                    <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                        <li>
                            <a href="#about" className="nav-link" onClick={handleNavClick}>
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#projects" className="nav-link" onClick={handleNavClick}>
                                Project
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="nav-link" onClick={handleNavClick}>
                                Contact
                            </a>
                        </li>
                    </ul>

                    <div className="header-actions">
                        <a href="src/data/file/GipSinhHuy_EmdeddedEngineer.pdf" className="resume-btn">
                            Resume
                        </a>

                        {/* Dark Mode Toggle */}
                        <button
                            className="theme-toggle"
                            onClick={handleThemeToggle}
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? '☀️' : '🌙'}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={handleMobileMenuToggle}
                    aria-label="Toggle mobile menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    )
}

export default Header
