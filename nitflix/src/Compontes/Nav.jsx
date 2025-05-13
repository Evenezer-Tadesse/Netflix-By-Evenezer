import React, { useEffect } from "react";
// ... other imports

export default function Header() {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        document.querySelector('.header_container').classList.add('scrolled');
      } else {
        document.querySelector('.header_container').classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // ... your existing JSX
  );
}