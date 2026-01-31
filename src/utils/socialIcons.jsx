// Social Icons Component using react-icons library
// This file exports icon components for social platforms

import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaTiktok,
    FaDiscord,
    FaEnvelope,
    FaGlobe,
    FaDribbble,
    FaBehance,
    FaMedium,
    FaTwitch,
    FaSpotify,
    FaPinterest,
    FaReddit,
    FaTelegram,
    FaWhatsapp,
    FaSkype
} from 'react-icons/fa'

import { FiLink } from 'react-icons/fi'

// Map platform names to their icon components
export const socialIconComponents = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    facebook: FaFacebook,
    instagram: FaInstagram,
    youtube: FaYoutube,
    tiktok: FaTiktok,
    discord: FaDiscord,
    email: FaEnvelope,
    website: FaGlobe,
    dribbble: FaDribbble,
    behance: FaBehance,
    medium: FaMedium,
    twitch: FaTwitch,
    spotify: FaSpotify,
    pinterest: FaPinterest,
    reddit: FaReddit,
    telegram: FaTelegram,
    whatsapp: FaWhatsapp,
    skype: FaSkype,
    default: FiLink
}

// Get icon component by platform name
export function getIconComponent(platform) {
    return socialIconComponents[platform.toLowerCase()] || socialIconComponents.default
}

export default socialIconComponents
