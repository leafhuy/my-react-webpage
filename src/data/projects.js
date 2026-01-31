// Projects Data
// Update this file with your project information
// Each project should have: id, title, description, image (or icon), tags, liveUrl, githubUrl

// Default project images path - place images in public/images/projects/
const PROJECT_IMAGES_PATH = '/images/projects/'

export const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform - OfflineShop',
        description: 'A online shopping key game platform with cart, checkout, and payment integration.',
        image: `${PROJECT_IMAGES_PATH}offline-shop.png`,
        icon: '🛒',
        tags: ['Next.js', 'PostgreSQL', 'TailwindCSS'],
        liveUrl: 'https://offline-shop.vercel.app/',
        githubUrl: 'https://github.com/leafhuy/offlineShop',
        featured: true
    },
    {
        id: 2,
        title: 'My-Todo-App',
        description: 'A collaborative task management tool with real-time updates and team features.',
        image: `${PROJECT_IMAGES_PATH}todo-app.png`,
        icon: '📋',
        tags: ['React', 'Firebase', 'CSS'],
        liveUrl: '#',
        githubUrl: 'https://github.com/leafhuy/my-todo-app',
        featured: true
    },
    {
        id: 3,
        title: 'Portfolio Site',
        description: 'A modern portfolio website with animations, dark mode, and responsive design.',
        image: `${PROJECT_IMAGES_PATH}portfolio.png`,
        icon: '💼',
        tags: ['React', 'Vite', 'CSS'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true
    },
    {
        id: 4,
        title: 'Weather Satellite Prediction',
        description: 'Using Machine Learning to predict weather based on satellite images.',
        image: `${PROJECT_IMAGES_PATH}weather-prediction.png`,
        icon: '🌤️',
        tags: ['Python', 'Machine Learning'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true
    },
    {
        id: 5,
        title: 'Digital Locking System',
        description: 'A digital locking system using AVR microcontroller.',
        image: `${PROJECT_IMAGES_PATH}digital-lock.jpg`,
        icon: '🔐',
        tags: ['AVR', 'C', 'Embedded System'],
        liveUrl: '#',
        githubUrl: 'https://github.com/leafhuy/DigitallockbaseCode',
        featured: true
    }
]

// Helper functions for filtering and getting projects
export function getAllProjects() {
    return projects
}

export function getFeaturedProjects() {
    return projects.filter(project => project.featured)
}

export function getProjectById(id) {
    return projects.find(project => project.id === id)
}

export function getProjectsByTag(tag) {
    return projects.filter(project =>
        project.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    )
}

export default projects
