// Contact Information Data
// Update this file with your personal information

export const contactInfo = {
    name: "Leaf Huy",
    email: "giphuy159@gmail.com",
    phone: "+84 358 942 700",
    location: "Vietnam",
    availability: "Available for freelance",

    // Social Links - Add or remove as needed
    // Supported platforms: github, linkedin, twitter, facebook, instagram, 
    // youtube, tiktok, discord, email, website, dribbble, behance, medium,
    // twitch, spotify, pinterest, reddit, telegram, whatsapp, skype
    social: {
        github: "https://github.com/leafhuy",
        linkedin: "https://www.linkedin.com/in/sinh-huy-g%E1%BB%8Dp-019965347/"
    },

    // Professional Info
    profession: "Full Stack Developer",
    tagline: "Building digital experiences with clean code and creative solutions.",
}

// Helper function to get active social links
// Usage: const links = getSocialLinks() 
// Returns: [{ platform: 'github', url: '...' }, ...]
export function getSocialLinks() {
    return Object.entries(contactInfo.social)
        .filter(([, url]) => url && url.trim() !== '')
        .map(([platform, url]) => ({
            platform,
            url
        }))
}

export default contactInfo
