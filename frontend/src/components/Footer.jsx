import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import { STYLES } from '../constants/styles';
import { cn } from '@/lib/utils';

function Footer({
  contactText = "Get in touch",
  homeText = "Home page",
  homeUrl = "/",
  linkedInUrl = "https://linkedin.com", 
  githubUrl = "https://github.com",
  googleUrl = "mailto:sbeak@email.com",
  iconSize = 24,
  iconColor = "currentColor",
}) {
  return (
    <footer className={cn(
      "footer",
      "absolute left-0 right-0 w-full",
      "bg-[var(--brown-200)]",
      "pt-[40px] pb-[40px] md:py-[60px] md:px-[120px] md:h-[144px]",
    )}>
      <div className="footer-container h-full w-full flex flex-col md:flex-row md:justify-between md:items-center items-center">
        {/* Left: Get in touch + Social icons */}
        <div className="flex flex-row items-center gap-3 mb-4 md:mb-0 md:order-1 order-1">
          <p className={cn("contact-text", STYLES.typography.body1.base, STYLES.typography.body1.size)}>
            {contactText}
          </p>
          <div className="flex items-center space-x-3">
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className={cn("social-icon", "text-[#464440] hover:text-[#26231E] transition-colors")}> <Linkedin size={iconSize} color={iconColor} /> </a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className={cn("social-icon", "text-[#464440] hover:text-[#26231E] transition-colors")}> <Github size={iconSize} color={iconColor} /> </a>
            <a href={googleUrl} target="_blank" rel="noopener noreferrer" aria-label="Email"
              className={cn("social-icon", "text-[#464440] hover:text-[#26231E] transition-colors")}> <Mail size={iconSize} color={iconColor} /> </a>
          </div>
        </div>
        {/* Center: Copyright (desktop), bottom (mobile) */}
        <div className="w-full text-center text-xs md:text-base text-gray-500 mt-4 md:mt-0 md:w-auto md:order-2 order-last md:absolute md:left-1/2 md:-translate-x-1/2">
          © {new Date().getFullYear()} tazzyo.com All rights reserved.
        </div>
        {/* Right: Menu */}
        <div className="flex flex-row items-center gap-4 md:gap-8 mt-4 md:mt-0 md:order-3 order-2 md:ml-auto">
          <a 
            href="/contact"
            className={cn(
              "contact-link",
              STYLES.typography.body1.base,
              STYLES.typography.body1.size,
              "no-underline hover:text-[#26231E] transition-colors"
            )}
          >
            Contact Me
          </a>
          <a
            href="/about"
            className={cn(
              "about-link",
              STYLES.typography.body1.base,
              STYLES.typography.body1.size,
              "no-underline hover:text-[#26231E] transition-colors"
            )}
          >
            About Me
          </a>
            <a 
              href={homeUrl} 
              className={cn(
              "home-link",
                STYLES.typography.body1.base,
                STYLES.typography.body1.size,
                "no-underline hover:text-[#26231E] transition-colors"
              )}
            >
              {homeText}
            </a>
          </div>
      </div>
    </footer>
  );
}

export default Footer;
