import DinoGame from '../DinoGame/DinoGame.jsx'
import { getAllProjects } from '../../data/projects'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import './Projects.css'

function Projects() {
    // Get projects from data file
    const projects = getAllProjects()

    function handleLiveClick(url) {
        window.open(url, '_blank')
    }

    function handleGithubClick(url) {
        window.open(url, '_blank')
    }

    return (
        <section id="projects" className="projects section">
            <div className="container">
                <div className="projects-header">
                    <p className="projects-label">Portfolio</p>
                    <h2 className="projects-title">Featured Projects</h2>
                    <p className="projects-subtitle">
                        Here are some of my recent projects that showcase my skills and passion for development.
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <article key={project.id} className="project-card">
                            <div className="project-image">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                            e.target.nextSibling.style.display = 'flex'
                                        }}
                                    />
                                ) : null}
                                <span
                                    className="project-icon"
                                    style={{ display: project.image ? 'none' : 'flex' }}
                                >
                                    {project.icon}
                                </span>
                                <div className="project-overlay">
                                    <button
                                        className="project-link"
                                        onClick={() => handleLiveClick(project.liveUrl)}
                                        aria-label="View live project"
                                    >
                                        <FaExternalLinkAlt />
                                    </button>
                                    <button
                                        className="project-link"
                                        onClick={() => handleGithubClick(project.githubUrl)}
                                        aria-label="View source code"
                                    >
                                        <FaGithub />
                                    </button>
                                </div>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Fun Section - Dino Game */}
                <div className="projects-game">
                    <h3 className="game-title">🎮 Take a Break — Play a Game!</h3>
                    <DinoGame />
                </div>
            </div>
        </section>
    )
}

export default Projects
