import { FaMicrochip, FaCode, FaCogs, FaBolt } from 'react-icons/fa'
import './About.css'

function About() {
    const highlights = [
        {
            icon: <FaMicrochip />,
            title: 'Embedded Systems',
            description: 'Designing firmware for microcontrollers and embedded platforms'
        },
        {
            icon: <FaCode />,
            title: 'Low-Level Programming',
            description: 'C/C++, Assembly, and real-time operating systems'
        },
        {
            icon: <FaCogs />,
            title: 'Hardware Integration',
            description: 'Interfacing sensors, actuators, and communication protocols'
        },
        {
            icon: <FaBolt />,
            title: 'Optimization',
            description: 'Memory-efficient and power-optimized solutions'
        }
    ]

    const techStack = [
        'C', 'C++', 'Python', 'Assembly',
        'AVR', 'STM32', 'ESP32', 'Arduino',
        'FreeRTOS', 'I2C', 'SPI', 'UART',
        'PCB Design', 'Oscilloscope', 'Git', 'Linux'
    ]

    return (
        <section id="about" className="about section">
            <div className="container">
                {/* Section Header */}
                <div className="about-header">
                    <p className="about-label">About Me</p>
                    <h2 className="about-title">
                        Hi, I'm <span className="highlight">Leaf Huy</span>
                    </h2>
                </div>

                {/* Main Content */}
                <div className="about-content">
                    {/* Left - Bio */}
                    <div className="about-bio">
                        <div className="bio-card">
                            <p className="bio-text">
                                I'm an <strong>Embedded Systems Engineer</strong> based in Vietnam,
                                passionate about bridging the gap between hardware and software.
                            </p>
                            <p className="bio-text">
                                With experience in microcontroller programming, firmware development,
                                and IoT solutions, I enjoy working on projects that interact with
                                the physical world. From sensor integration to real-time systems,
                                I love making hardware come alive with code.
                            </p>
                            <p className="bio-text">
                                When I'm not debugging firmware or reading datasheets, you'll find me
                                tinkering with electronics, exploring new development boards,
                                or enjoying a good cup of coffee. ☕
                            </p>

                            <div className="bio-cta">
                                <a href="#contact" className="btn btn-primary">
                                    Let's Connect
                                </a>
                                <a href="#projects" className="btn btn-ghost">
                                    View Projects
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right - Highlights */}
                    <div className="about-highlights">
                        {highlights.map((item, index) => (
                            <div key={index} className="highlight-card">
                                <div className="highlight-icon">{item.icon}</div>
                                <div className="highlight-content">
                                    <h4 className="highlight-title">{item.title}</h4>
                                    <p className="highlight-desc">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="about-tech">
                    <h3 className="tech-title">Tech Stack & Tools</h3>
                    <div className="tech-grid">
                        {techStack.map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
