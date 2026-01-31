import './Hero.css'

function Hero() {
    function handleViewProjects() {
        const projectsSection = document.getElementById('projects')
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    function handleContactClick() {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section id="home" className="hero">
            <div className="container hero-container">
                {/* Left Side - Content */}
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="hero-badge-dot"></span>
                        Available for work
                    </div>

                    <h1 className="hero-title">
                        <span className="hero-title-line">YEP!!!</span>
                        <span className="hero-title-line">
                            <span className="hero-title-accent">That's me</span>
                        </span>
                    </h1>

                    <p className="hero-subtitle">
                        I'm Leaf Huy — an Embedded Systems Engineer passionate about
                        bridging hardware and software. From microcontrollers to IoT solutions,
                        I bring ideas to life with clean, efficient code.
                    </p>

                    <div className="hero-buttons">
                        <button className="btn btn-primary" onClick={handleViewProjects}>
                            View Projects
                        </button>
                        <button className="btn btn-outline" onClick={handleContactClick}>
                            Get in Touch
                        </button>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hero-visual">
                    <div className="hero-image-wrapper">
                        <div className="hero-decoration hero-decoration-1"></div>
                        <div className="hero-decoration hero-decoration-2"></div>

                        <div className="hero-image-container">
                            <img
                                src="/images/Me.jpg"
                                alt="Leaf Huy"
                                className="hero-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
