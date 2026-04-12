import { FaGithub, FaLinkedin, FaTwitter, FaLink } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import type { SocialLink } from '../../types';

interface SocialIconProps {
  link: SocialLink;
  className?: string;
  imgClassName?: string; // Additional classes for the image Specifically such as opacity transitions
}

export function SocialIcon({ link, className = "w-5 h-5", imgClassName = "" }: SocialIconProps) {
  // If the link directly embeds a valid CMS image object, format as native IMG
  if (link.iconUrl?.assetUrl) {
    return (
      <img
        src={link.iconUrl.assetUrl}
        alt={link.iconUrl.altText || `${link.platform} icon`}
        className={`${className} object-contain ${imgClassName}`.trim()}
      />
    );
  }

  const platform = link.platform.toLowerCase();
  
  if (platform.includes('github')) return <FaGithub className={className} />;
  if (platform.includes('linkedin')) return <FaLinkedin className={className} />;
  if (platform.includes('x') || platform.includes('twitter')) return <FaTwitter className={className} />;
  if (platform.includes('mail') || platform.includes('email')) return <Mail className={className} />;
  
  return <FaLink className={className} />;
}
