// Footer.jsx
import React from "react";
import "../Footer/footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__social">
          <a href="https://facebook.com" aria-label="Facebook">
            <FacebookIcon className="footer__social-icon" />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <InstagramIcon className="footer__social-icon" />
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <TwitterIcon className="footer__social-icon" />
          </a>
          <a href="https://youtube.com" aria-label="YouTube">
            <YouTubeIcon className="footer__social-icon" />
          </a>
        </div>
        
        <div className="footer__links">
          <div className="footer__links-column">
            <a href="#">Audio Description</a>
            <a href="#">Investor Relations</a>
            <a href="#">Legal Notices</a>
          </div>
          <div className="footer__links-column">
            <a href="#">Help Center</a>
            <a href="#">Jobs</a>
            <a href="#">Cookie Preferences</a>
          </div>
          <div className="footer__links-column">
            <a href="#">Gift Cards</a>
            <a href="#">Terms of Use</a>
            <a href="#">Corporate Information</a>
          </div>
          <div className="footer__links-column">
            <a href="#">Media Center</a>
            <a href="#">Privacy</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
        
        <button className="footer__language">
          <LanguageIcon className="footer__language-icon" />
          English
        </button>
        
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Netflix Clone
        </p>
      </div>
    </footer>
  );
}