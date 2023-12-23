// ScrollToTopButton.js
import React, { useState, useEffect } from 'react';
import { IconImports } from '../assets';


const ScrollToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add scroll event listener to show/hide button based on scroll position
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-4 right-4 bg-accent text-white p-2 rounded-full focus:outline-none"
          onClick={scrollToTop}
        >
          <IconImports.FaArrowUp className='w-5 h-5' />
        </button>
      )}
    </>
  );
};

export default ScrollToTopBtn;
