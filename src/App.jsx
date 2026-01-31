import { useState, useEffect } from 'react'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Projects from './components/Projects/Projects.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import './App.css'

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    function handleToggleTheme() {
        setIsDarkMode(prevMode => !prevMode)
    }

    // Apply theme to document
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            document.documentElement.removeAttribute('data-theme')
        }
    }, [isDarkMode])

    // Check system preference on mount
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDarkMode(prefersDark)
    }, [])

    return (
        <div className="app">
            <Header isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
            <main className="main-content">
                <Hero />
                <About />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}

export default App
